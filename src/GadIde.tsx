// GadIde — a reusable Vuetify 3 IDE for the Gad language. Panels are hosted in a
// dockview-vue layout (resizable, movable, dockable, tabbable): Explorer, Editor,
// Docs, Call Stack, Locals, Breakpoints and Output. The editor/run controls live
// in the Editor panel's toolbar; the host app owns Settings + the theme toggle
// (open the Settings dialog via the exposed `openSettings()`). Three v-models:
// `layoutConfig` (dockview layout), `config` (Settings document) and
// `runProfiles`, plus `runMode`. Backend-agnostic via `api`.
import { computed, defineComponent, onBeforeUnmount, onMounted, provide, reactive, ref, watch, type PropType } from "vue";
import { DockviewVue, themeDark, themeLight } from "dockview-vue";
import type { DockviewApi, DockviewReadyEvent, SerializedDockview, VueComponent } from "dockview-vue";
import { createController, IdeControllerKey } from "./controller";
import type { IdeApi, RunMode, RunProfile, UploadedFile, Workspace } from "./api";
import type { FileTypeHandler } from "./fileTypes";
import PanelExplorer from "./panels/PanelExplorer";
import PanelEditor from "./panels/PanelEditor";
import PanelCallStack from "./panels/PanelCallStack";
import PanelLocals from "./panels/PanelLocals";
import PanelOutput from "./panels/PanelOutput";
import PanelDocs from "./panels/PanelDocs";
import PanelStructure from "./panels/PanelStructure";
import PanelBreakpoints from "./panels/PanelBreakpoints";
import BreakpointConditionDialog from "./BreakpointConditionDialog";
import SettingsDialog, { type PanelToggle } from "./SettingsDialog";
import RunProfileDialog from "./RunProfileDialog";
import { ConfirmDialog, PromptDialog } from "./PromptDialog";
import UrlImportDialog from "./UrlImportDialog";
import MoveDialog from "./MoveDialog";
import { panelFor } from "./panels/PanelExtra";
import PanelChanges from "./panels/PanelChanges";
import PanelGit from "./panels/PanelGit";
import { IdeExtraPanelsKey, type ExtraPanel, type HeaderAction } from "./extraPanels";
import { IdeMessagesKey, useIdeMessages, type IdeMessages } from "./messages";
import { VBtn, VIcon } from "./vuetify";

// The dockview theme CSS is the consumer's responsibility (like Vuetify's
// styles): import "dockview-core/dist/styles/dockview.css" once in the host app.
import "./styles.css";

// The registered panels: dockview component name, title (English; the IDE's
// word of it shown) and default placement.
interface PanelDef {
  id: string;
  label: string;
  /** the word of its title (the IDE's messages) */
  word?: keyof IdeMessages;
  add: (api: DockviewApi) => void;
}
const PANELS: PanelDef[] = [
  // the left column: the Explorer above the Structure, at the editor's left
  // — each by the other when it is open
  {
    id: "explorer", label: "Explorer", word: "explorer", add: (a) => a.addPanel({
      id: "explorer", component: "explorer", title: "Explorer",
      ...(a.getPanel("structure") ? { position: { referencePanel: "structure", direction: "above" } }
        : a.getPanel("editor") ? { position: { referencePanel: "editor", direction: "left" } } : {}),
    }),
  },
  { id: "editor", label: "Editor", word: "editor", add: (a) => a.addPanel({ id: "editor", component: "editor", title: "Editor", position: { referencePanel: "explorer", direction: "right" } }) },
  {
    id: "structure", label: "Structure", word: "structure", add: (a) => a.addPanel({
      id: "structure", component: "structure", title: "Structure",
      position: a.getPanel("explorer") ? { referencePanel: "explorer", direction: "below" } : { referencePanel: "editor", direction: "left" },
    }),
  },
  { id: "docs", label: "Preview", word: "preview", add: (a) => a.addPanel({ id: "docs", component: "docs", title: "Preview", position: { referencePanel: "editor", direction: "right" } }) },
  { id: "output", label: "Output", word: "output", add: (a) => a.addPanel({ id: "output", component: "output", title: "Output", position: { referencePanel: "editor", direction: "below" } }) },
  { id: "callstack", label: "Call Stack", word: "callStack", add: (a) => a.addPanel({ id: "callstack", component: "callstack", title: "Call Stack", position: { referencePanel: "output", direction: "within" } }) },
  { id: "locals", label: "Locals", word: "locals", add: (a) => a.addPanel({ id: "locals", component: "locals", title: "Locals", position: { referencePanel: "output", direction: "within" } }) },
  { id: "breakpoints", label: "Breakpoints", word: "breakpoints", add: (a) => a.addPanel({ id: "breakpoints", component: "breakpoints", title: "Breakpoints", position: { referencePanel: "output", direction: "within" } }) },
];

const components = {
  explorer: PanelExplorer,
  editor: PanelEditor,
  docs: PanelDocs,
  structure: PanelStructure,
  callstack: PanelCallStack,
  locals: PanelLocals,
  breakpoints: PanelBreakpoints,
  output: PanelOutput,
} as unknown as Record<string, VueComponent>;

export default defineComponent({
  name: "GadIde",
  props: {
    api: { type: Object as PropType<IdeApi>, required: true },
    workspace: { type: Object as PropType<Workspace>, required: true },
    dark: { type: Boolean, default: false },
    onReset: { type: Function as PropType<() => Promise<void> | void>, default: undefined },
    /** Handle files uploaded (Explorer button or drag-drop). When absent, files
     * are written to the workspace via the api. */
    onUpload: { type: Function as PropType<(files: UploadedFile[]) => Promise<void> | void>, default: undefined },
    layoutConfig: { type: Object as PropType<SerializedDockview | null>, default: null },
    config: { type: Object as PropType<Record<string, unknown>>, default: () => ({}) },
    runProfiles: { type: Array as PropType<RunProfile[]>, default: () => [] },
    /** Gates the run/debug actions (v-model). Defaults to "debug" (all enabled). */
    runMode: { type: String as PropType<RunMode>, default: "debug" },
    /** Read-only workspace (v-model): disables create/delete/upload/import. */
    readonly: { type: Boolean, default: false },
    /** Auto-save: false = manual (dirty tabs are marked); true = save on every
     * edit; a positive number = save all dirty tabs every N milliseconds. */
    autosave: { type: [Boolean, Number] as PropType<boolean | number>, default: false },
    /** Max characters of a tab's file name before it is truncated (default 25). */
    tabNameMax: { type: Number, default: 25 },
    /** Editor font size in pixels (v-model; default 13). */
    fontSize: { type: Number, default: 13 },
    /** Extra file-type handlers (icon + editor language/plugin) for the Explorer
     * icons and editor highlighting — merged over the built-ins. */
    fileTypes: { type: Array as PropType<FileTypeHandler[]>, default: () => [] },
    /** The panels the IDE has, by id (explorer, editor, docs, output,
     * callstack, locals, breakpoints) — default all. One left out is not built,
     * is taken out of a restored layout and is not offered in the Settings: an
     * IDE that runs no code needs no Output nor debugger panels. */
    panels: { type: Array as PropType<string[]>, default: undefined },
    /** Panels of the host app (ExtraPanel): rendered in the layout like the
     * IDE's own — below the editor by default —, in the Settings' toggles,
     * each with an expand/collapse button, and a button in the Editor's
     * toolbar that opens it (toolbarButton). */
    extraPanels: { type: Array as PropType<ExtraPanel[]>, default: () => [] },
    /** Buttons of the host app in the IDE's header, at its right after the
     * panels' (Changes): their icon, their title (and label, when given),
     * what their click does — a host's "back into the page", say. */
    headerActions: { type: Array as PropType<HeaderAction[]>, default: () => [] },
    /** The texts of the Changes and Git panels (IdeMessages), translated:
     * any left out is English. */
    messages: { type: Object as PropType<Partial<IdeMessages>>, default: undefined },
  },
  emits: {
    "update:layoutConfig": (_v: SerializedDockview) => true,
    "update:config": (_v: Record<string, unknown>) => true,
    "update:runProfiles": (_v: RunProfile[]) => true,
    "update:runMode": (_v: RunMode) => true,
    "update:readonly": (_v: boolean) => true,
    "update:fontSize": (_v: number) => true,
  },
  setup(props, { emit }) {
    const dark = computed(() => props.dark);
    // the words: the app's vue-i18n's (gadIde, gadGit), the messages prop's over them
    const messages = useIdeMessages(() => props.messages);
    const ctx = createController(props.api, props.workspace, dark, {
      onReset: props.onReset,
      onUpload: props.onUpload,
      getRunProfiles: () => props.runProfiles,
      getRunMode: () => props.runMode,
      emitRunProfiles: (p) => emit("update:runProfiles", p),
      getReadonly: () => props.readonly,
      getAutosave: () => props.autosave,
      getTabNameMax: () => props.tabNameMax,
      initialFontSize: props.fontSize,
      onFontSize: (px) => emit("update:fontSize", px),
      fileTypes: props.fileTypes,
      getWords: () => messages.value,
    });
    provide(IdeControllerKey, ctx);
    provide(IdeMessagesKey, messages);

    // External fontSize changes (e.g. a restore) reflect into the controller.
    watch(
      () => props.fontSize,
      (px) => { if (px !== ctx.fontSize.value) ctx.setFontSize(px); },
    );

    let dv: DockviewApi | null = null;
    let disposer: { dispose(): void } | null = null;
    let applyingExternal = false;
    let lastJSON = "";
    const visible = reactive(new Set<string>());

    // the workspace in a git repository (Workspace.git, api.git): the Changes
    // and Git panels, opened by their buttons as the host's are
    const gitPanels: ExtraPanel[] =
      props.workspace.git && props.api.git
        ? [
            { id: "changes", label: messages.value.changes, icon: "mdi-file-compare", component: PanelChanges, toolbarButton: true, buttonAlign: "right",
              headerExpand: true, expandTitle: messages.value.expand, collapseTitle: messages.value.restore },
            { id: "git", label: messages.value.git, icon: "mdi-source-branch", component: PanelGit, toolbarButton: true,
              headerExpand: true, expandTitle: messages.value.expand, collapseTitle: messages.value.restore },
          ]
        : [];
    const extras = [...gitPanels, ...props.extraPanels];

    // the host's panels (extraPanels): placed by the editor (or the first
    // panel there is), their components wrapped (PanelExtra)
    const extraDefs = computed<PanelDef[]>(() =>
      extras.map((x) => ({
        id: x.id,
        label: x.label,
        add: (a: DockviewApi) => {
          const placement = x.placement ?? "bottom";
          // another of the same place open: a tab beside it; else the whole
          // layout's side (below all, as IntelliJ's tool windows)
          const sibling = extras.find((o) => o.id !== x.id && (o.placement ?? "bottom") === placement && a.getPanel(o.id));
          const direction = placement === "right" ? "right" : placement === "left" ? "left" : "below";
          const position = sibling
            ? { referencePanel: sibling.id, direction: "within" as const }
            : a.panels.length
              ? { direction }
              : undefined;
          a.addPanel({ id: x.id, component: x.id, title: x.label, ...(position ? { position } : {}) });
          // below: the height it had when closed, else a third of the height
          if (!sibling && placement === "bottom") a.getPanel(x.id)?.api.setSize({ height: bottomHeight(a) });
        },
      })),
    );
    const allComponents: Record<string, VueComponent> = { ...components };
    for (const x of extras) allComponents[x.id] = panelFor(x) as unknown as VueComponent;

    // the panels this IDE has (props.panels), in PANELS' order, then the host's
    // the IDE's panels titled in the IDE's words
    const labelOf = (def: PanelDef) => (def.word ? messages.value[def.word] : def.label);
    const panelDefs = computed(() => [
      ...(props.panels ? PANELS.filter((p) => props.panels!.includes(p.id)) : PANELS).map((p) => ({ ...p, label: labelOf(p) })),
      ...extraDefs.value,
    ]);
    const hasPanel = (id: string) => panelDefs.value.some((p) => p.id === id);

    // addPanel adds def — next to the panel it is placed by, or alone when that
    // one is not there (left out by props.panels, or closed).
    function addPanel(api: DockviewApi, def: PanelDef) {
      try {
        def.add(api);
      } catch {
        api.addPanel({ id: def.id, component: def.id, title: def.label });
      }
      // its title in the IDE's words
      const p = api.getPanel(def.id);
      if (p && p.title !== def.label) p.api.setTitle(def.label);
    }
    function buildDefault(api: DockviewApi) {
      // the host's panels open when asked (their button, the Settings)
      // (the Preview and the Structure too: closed, by their strips)
      for (const p of panelDefs.value)
        if (p.id !== "docs" && p.id !== "structure" && !extraDefs.value.some((x) => x.id === p.id)) addPanel(api, p);
    }
    // dropUnknown takes out of a restored layout the panels this IDE has not.
    function dropUnknown(api: DockviewApi) {
      for (const p of [...api.panels]) if (!hasPanel(p.id)) api.removePanel(p);
    }
    // the panel expanded over the others (dockview's maximize), if any
    const maximized = ref("");
    function syncVisible() {
      if (!dv) return;
      visible.clear();
      for (const p of dv.panels) visible.add(p.id);
      maximized.value = dv.panels.find((p) => p.api.isMaximized())?.id ?? "";
    }
    // toggleMaximized expands the panel id over the others, or brings it back
    function toggleMaximized(id: string) {
      const p = dv?.getPanel(id);
      if (!p) return;
      if (p.api.isMaximized()) p.api.exitMaximized();
      else p.api.maximize();
      syncVisible();
    }

    // retitle gives a restored layout's panels their titles of now (a layout
    // saved with an older one: "Docs", now "Preview").
    function retitle(api: DockviewApi) {
      for (const def of PANELS) {
        const p = api.getPanel(def.id);
        if (p && p.title !== labelOf(def)) p.api.setTitle(labelOf(def));
      }
    }
    // the words changed (the locale): the titles too
    watch(messages, () => dv && retitle(dv));

    function onReady(e: DockviewReadyEvent) {
      dv = e.api;
      const initial = props.layoutConfig;
      try {
        if (initial && (initial as { grid?: unknown }).grid) {
          dv.fromJSON(initial);
          dropUnknown(dv);
          retitle(dv);
          if (!dv.panels.length) buildDefault(dv);
        } else buildDefault(dv);
      } catch {
        dv.clear();
        buildDefault(dv);
      }
      syncVisible();
      lastJSON = JSON.stringify(dv.toJSON());
      const offMax = dv.onDidMaximizedGroupChange(() => syncVisible());
      const offLayout = dv.onDidLayoutChange(() => {
        if (!dv) return;
        syncVisible();
        if (applyingExternal) return;
        const json = dv.toJSON();
        const s = JSON.stringify(json);
        if (s !== lastJSON) {
          lastJSON = s;
          emit("update:layoutConfig", json);
        }
      });
      disposer = { dispose: () => { offMax.dispose(); offLayout.dispose(); } };
    }

    // External layoutConfig changes (e.g. a restore) re-apply to the dockview.
    watch(
      () => props.layoutConfig,
      (cfg) => {
        if (!dv || !cfg) return;
        const s = JSON.stringify(cfg);
        if (s === lastJSON) return;
        applyingExternal = true;
        try {
          dv.fromJSON(cfg);
          dropUnknown(dv);
          retitle(dv);
          lastJSON = JSON.stringify(dv.toJSON());
        } catch {
          /* ignore malformed layout */
        } finally {
          applyingExternal = false;
          syncVisible();
        }
      },
    );

    // the height of the bottom panels (Git, Changes, …): kept when one is
    // closed, given back when one opens
    const BOTTOM_KEY = "gad-ide.bottom.height";
    function bottomHeight(a: DockviewApi): number {
      let h = 0;
      try { h = Number(localStorage.getItem(BOTTOM_KEY)) || 0; } catch { /* no storage */ }
      const max = Math.max(160, a.height - 120);
      return Math.min(max, Math.max(160, h || Math.round(a.height / 3)));
    }
    // the Preview's width, kept as the bottom panels' height
    const PREVIEW_KEY = "gad-ide.preview.width";
    function previewWidth(a: DockviewApi): number {
      let w = 0;
      try { w = Number(localStorage.getItem(PREVIEW_KEY)) || 0; } catch { /* no storage */ }
      return Math.min(Math.max(240, a.width - 300), Math.max(240, w || Math.round(a.width / 3)));
    }
    // the left column's width (the Explorer's, the Structure's), kept so
    const LEFT_KEY = "gad-ide.left.width";
    function openSide(id: string) {
      if (!dv) return;
      const def = panelDefs.value.find((p) => p.id === id);
      if (!def || dv.getPanel(id)) return;
      const alone = !dv.getPanel(id === "explorer" ? "structure" : "explorer");
      addPanel(dv, def);
      if (alone) {
        let w = 0;
        try { w = Number(localStorage.getItem(LEFT_KEY)) || 0; } catch { /* no storage */ }
        dv.getPanel(id)?.api.setSize({ width: Math.min(Math.max(160, dv.width - 300), Math.max(160, w || 260)) });
      }
      dv.getPanel(id)?.api.setActive();
    }
    function keepSize(id: string) {
      if (id === "docs" || id === "explorer" || id === "structure") {
        const w = dv?.getPanel(id)?.api.width;
        const key = id === "docs" ? PREVIEW_KEY : LEFT_KEY;
        if (w) try { localStorage.setItem(key, String(Math.round(w))); } catch { /* no storage */ }
        return;
      }
      const x = extras.find((o) => o.id === id);
      const h = dv?.getPanel(id)?.api.height;
      if (!x || (x.placement ?? "bottom") !== "bottom" || !h) return;
      try { localStorage.setItem(BOTTOM_KEY, String(Math.round(h))); } catch { /* no storage */ }
    }

    function togglePanel(id: string, show: boolean) {
      if (!dv) return;
      if (show) {
        const def = panelDefs.value.find((p) => p.id === id);
        if (def && !dv.getPanel(id)) addPanel(dv, def);
      } else {
        const p = dv.getPanel(id);
        if (p) {
          keepSize(id);
          dv.removePanel(p);
        }
      }
    }

    // the host's panels, to the IDE's own (the Editor's toolbar): their
    // buttons, and opening one — shown, when it is open
    const extraPanels = {
      buttons: computed(() =>
        extras
          .filter((x) => x.toolbarButton)
          .map((x) => ({
            id: x.id,
            label: x.label,
            icon: x.icon ?? "mdi-view-split-horizontal",
            align: x.buttonAlign ?? ("left" as const),
            bottom: (x.placement ?? "bottom") === "bottom",
          })),
      ),
      open: (id: string) => {
        if (!dv) return;
        const def = panelDefs.value.find((p) => p.id === id);
        if (def && !dv.getPanel(id)) addPanel(dv, def);
        dv.getPanel(id)?.api.setActive();
      },
    };
    provide(IdeExtraPanelsKey, extraPanels);

    // the header's button of a panel: open (or shown) on its click; marked
    // while the panel is in the layout
    const headerBtn = (b: { id: string; label: string; icon: string }, onClick: () => void, disabled = false) => (
      <VBtn
        key={b.id}
        size="small"
        variant={visible.has(b.id) ? "tonal" : "text"}
        prependIcon={b.icon}
        class="text-none"
        disabled={disabled}
        data-extra-open={b.id}
        onClick={onClick}
      >
        {b.label}
      </VBtn>
    );

    // the bottom strip's buttons: open or closed, a click turns it
    const bottomButtons = computed(() => extraPanels.buttons.value.filter((b) => b.bottom));
    // a strip's button (the bottom's, the right's): a click opens its panel,
    // another closes it; open, a button beside it expands it over the others
    // and brings it back
    const stripBtn = (b: { id: string; label: string; icon: string }, side: "bottom" | "right" | "left" = "bottom", onOpen = () => extraPanels.open(b.id), disabled = false) => {
      const open = visible.has(b.id);
      const max = maximized.value === b.id;
      const chevron =
        side === "right" ? (open ? "mdi-chevron-right" : "mdi-chevron-left")
          : side === "left" ? (open ? "mdi-chevron-left" : "mdi-chevron-right")
            : open ? "mdi-chevron-down" : "mdi-chevron-up";
      return (
        <span key={b.id} class="gad-ide__strip-item">
          <button
            type="button"
            class={["gad-ide__strip-btn", { "gad-ide__strip-btn--open": open }]}
            title={b.label}
            disabled={disabled}
            data-extra-open={b.id}
            data-open={open ? "true" : "false"}
            onClick={() => (open ? togglePanel(b.id, false) : onOpen())}
          >
            <VIcon size="16" icon={b.icon} />
            <span class="gad-ide__strip-label">{b.label}</span>
            <VIcon size="14" icon={chevron} />
          </button>
          {open && (
            <button
              type="button"
              class="gad-ide__strip-btn gad-ide__strip-expand"
              title={max ? messages.value.restore : messages.value.expand}
              data-strip-expand={b.id}
              data-maximized={max ? "true" : "false"}
              onClick={() => toggleMaximized(b.id)}
            >
              <VIcon size="14" icon={max ? "mdi-arrow-collapse" : "mdi-arrow-expand"} />
            </button>
          )}
        </span>
      );
    };
    const previewBtn = { id: "docs", label: messages.value.preview, icon: "mdi-file-eye-outline" };
    // the left strip: the Explorer above the Structure
    const leftBtns = computed(() =>
      [
        { id: "explorer", label: messages.value.explorer, icon: "mdi-file-tree-outline" },
        { id: "structure", label: messages.value.structure, icon: "mdi-file-tree" },
      ].filter((b) => hasPanel(b.id)),
    );

    const panelToggles = computed<PanelToggle[]>(() =>
      panelDefs.value.map((p) => ({ id: p.id, label: p.label, visible: visible.has(p.id) })),
    );

    // The editor toolbar's Doc button bumps ctx.docRequest; reveal/focus Docs.
    watch(
      () => ctx.docRequest.value,
      () => {
        const def = panelDefs.value.find((p) => p.id === "docs");
        if (dv && def && !dv.getPanel("docs")) {
          addPanel(dv, def);
          dv.getPanel("docs")?.api.setSize({ width: previewWidth(dv) });
        }
        dv?.getPanel("docs")?.api.setActive();
      },
    );

    function saveConfig(next: Record<string, unknown>) {
      emit("update:config", next);
    }

    onMounted(() => void ctx.init());
    onBeforeUnmount(() => disposer?.dispose());

    // dockview v7 themes via a `theme` option object (not a CSS ancestor class);
    // the default is themeAbyss (dark), so it must be set and kept in sync.
    const dvTheme = computed(() => (props.dark ? themeDark : themeLight));

    return () => (
      <div class="gad-ide">
        {/* The header: the panels opened by a button — Preview, Git, the
            host's — and the Settings at the left, Changes at the right. */}
        <div class="gad-ide__header" data-ide-header>
          {extraPanels.buttons.value.filter((b) => !b.bottom && b.align === "left").map((b) => headerBtn(b, () => extraPanels.open(b.id)))}
          <VBtn size="small" variant="text" prependIcon="mdi-cog-outline" class="text-none" data-ide-settings
            onClick={() => (ctx.settingsOpen.value = true)}>
            {messages.value.settings}
          </VBtn>
          <span class="gad-ide__header-spacer" />
          {extraPanels.buttons.value.filter((b) => !b.bottom && b.align === "right").map((b) => headerBtn(b, () => extraPanels.open(b.id)))}
          {props.headerActions.map((a) =>
            // with a label, its text beside the icon; else an icon button
            // (no children: a default slot, even empty, hides the icon)
            a.label ? (
              <VBtn key={"action-" + a.id} size="small" variant="text" class="text-none" prependIcon={a.icon}
                title={a.title ?? a.label} data-ide-action={a.id} onClick={a.onClick}>
                {a.label}
              </VBtn>
            ) : (
              <VBtn key={"action-" + a.id} size="small" variant="text" density="comfortable" icon={a.icon}
                title={a.title} data-ide-action={a.id} onClick={a.onClick} />
            ),
          )}
        </div>
        <div class="gad-ide__main">
          {leftBtns.value.length > 0 && (
            <div class="gad-ide__strip gad-ide__strip--side gad-ide__strip--left" data-ide-strip-left>
              {leftBtns.value.map((b) => stripBtn(b, "left", () => openSide(b.id)))}
            </div>
          )}
          <div class="gad-ide__dock">
            <DockviewVue style={{ height: "100%" }} theme={dvTheme.value} components={allComponents} onReady={onReady} />
          </div>
          {/* The right strip: the Preview — closed, its button; a click opens
              it right of the editor (its width by the sash), another closes it. */}
          {hasPanel("docs") && (
            <div class="gad-ide__strip gad-ide__strip--side gad-ide__strip--right" data-ide-strip-right>
              {stripBtn(previewBtn, "right", () => ctx.requestDocs(), !ctx.openPath.value && !visible.has("docs"))}
            </div>
          )}
        </div>
        {/* The bottom strip: the panels placed below (Git, Changes, the
            host's) — closed, a button each; a click opens it below the
            layout (its height by the sash, kept), another closes it. */}
        {bottomButtons.value.length > 0 && (
          <div class="gad-ide__strip" data-ide-strip>
            {bottomButtons.value.filter((b) => b.align === "left").map((b) => stripBtn(b))}
            <span class="gad-ide__header-spacer" />
            {bottomButtons.value.filter((b) => b.align === "right").map((b) => stripBtn(b))}
          </div>
        )}

        <SettingsDialog
          modelValue={ctx.settingsOpen.value}
          {...{ "onUpdate:modelValue": (v: boolean) => (ctx.settingsOpen.value = v) }}
          config={props.config}
          panels={panelToggles.value}
          onTogglePanel={togglePanel}
          onSave={saveConfig}
        />

        <RunProfileDialog
          modelValue={ctx.profileDialog.value}
          {...{ "onUpdate:modelValue": (v: boolean) => (ctx.profileDialog.value = v) }}
          defaultPath={ctx.openPath.value}
          onCreate={ctx.addProfile}
        />

        <BreakpointConditionDialog
          modelValue={!!ctx.bpDialog.value}
          {...{ "onUpdate:modelValue": (v: boolean) => { if (!v) ctx.bpDialog.value = null; } }}
          line={ctx.bpDialog.value?.line ?? 0}
          initial={ctx.bpDialog.value ? ctx.bpMetaFor(ctx.bpDialog.value.path)[ctx.bpDialog.value.line] ?? {} : {}}
          onSave={(m: { disabled?: boolean; condition?: string }) => {
            if (ctx.bpDialog.value) ctx.setBpMeta(ctx.bpDialog.value.path, ctx.bpDialog.value.line, m);
          }}
        />

        <PromptDialog request={ctx.promptReq.value} onDone={() => (ctx.promptReq.value = null)} />
        <MoveDialog />
        <ConfirmDialog request={ctx.confirmReq.value} onDone={() => (ctx.confirmReq.value = null)} />
        <UrlImportDialog
          modelValue={ctx.urlDialog.value}
          {...{ "onUpdate:modelValue": (v: boolean) => (ctx.urlDialog.value = v) }}
          progress={ctx.uploadProgress.value}
          onImport={(url: string, extract: boolean, targetDir: string) => ctx.uploadUrl(url, extract, targetDir)}
        />
      </div>
    );
  },
});
