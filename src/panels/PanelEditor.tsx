// Editor dockview panel: the CodeMirror editor bound to the open file, with the
// editor/run control toolbar (Save, Format, Reload, Undo, Redo, Run, Debug, the
// run-profile selector — only where code runs (runMode) — and Preview, plus the
// debugger step controls while paused). An image file is shown instead of
// edited.
import { defineComponent, inject } from "vue";
import GadEditor from "../GadEditor";
import { VBtn, VDivider, VList, VListItem, VListSubheader, VMenu } from "../vuetify";
import { IdeControllerKey } from "../controller";
import type { GadEditorView } from "../codemirror";
import type { RunProfile } from "../api";

const baseName = (path: string) => path.slice(path.lastIndexOf("/") + 1);
const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

export default defineComponent({
  name: "PanelEditor",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const has = () => !!ctx.openPath.value;

    const iconBtn = (icon: string, title: string, onClick: () => void, opts: { disabled?: boolean; color?: string } = {}) => (
      <VBtn size="small" variant="text" icon={icon} title={title} disabled={opts.disabled} color={opts.color} onClick={onClick} />
    );

    return () => (
      <div class="pnl">
        {/* Open-file tabs — basename truncated to 15 chars; full name on hover. */}
        {ctx.tabs.value.length > 0 && (
          <div class="editor-tabs">
            {ctx.tabs.value.map((t, i) => {
              const dirty = ctx.isDirty(t.path);
              return (
                <div
                  key={t.path}
                  class={["editor-tab", { "editor-tab--active": i === ctx.active.value, "editor-tab--dirty": dirty }]}
                  title={baseName(t.path) + (dirty ? " • modified" : "")}
                  onClick={() => ctx.activateTab(i)}
                  onMousedown={(e: MouseEvent) => { if (e.button === 1) { e.preventDefault(); ctx.closeTab(i); } }}
                >
                  <span class="editor-tab-name">{truncate(baseName(t.path), ctx.tabNameMax.value)}</span>
                  <span
                    class={["editor-tab-close", { "editor-tab-close--dirty": dirty }]}
                    title="Close"
                    onClick={(e: MouseEvent) => { e.stopPropagation(); ctx.closeTab(i); }}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div class="pnl-toolbar">
          {ctx.canEdit.value && (
            <>
              {iconBtn("mdi-content-save-outline", "Save", () => ctx.save(), { disabled: !has() || ctx.isImage.value })}
              {iconBtn("mdi-auto-fix", "Format", () => ctx.format(), { disabled: !has() || ctx.isImage.value })}
            </>
          )}
          {iconBtn("mdi-refresh", "Reload from disk", () => ctx.reload(), { disabled: !has() })}
          {ctx.canEdit.value && (
            <>
              {iconBtn("mdi-undo", "Undo", () => ctx.undo(), { disabled: !has() || ctx.isImage.value })}
              {iconBtn("mdi-redo", "Redo", () => ctx.redo(), { disabled: !has() || ctx.isImage.value })}
            </>
          )}
          {/* Run, Debug and the profile selector: only where code runs (runMode). */}
          {ctx.canRun.value && <VDivider vertical class="mx-1" />}
          {ctx.canRun.value && iconBtn("mdi-play", "Run", () => ctx.runActive(), { disabled: !has(), color: "success" })}
          {ctx.canDebug.value && iconBtn(ctx.session.value ? "mdi-restart" : "mdi-bug", ctx.session.value ? "Restart" : "Debug",
            () => ctx.debugActive(), { disabled: !has(), color: "warning" })}
          {/* Run/debug profile selector ("…" menu). */}
          {ctx.canRun.value && <VMenu location="bottom start">
            {{
              activator: ({ props: menuProps }: { props: Record<string, unknown> }) => (
                <VBtn size="small" variant="text" class="text-none" appendIcon="mdi-chevron-down" disabled={!ctx.canRun.value} {...menuProps}>
                  {ctx.runLabel.value}
                </VBtn>
              ),
              default: () => (
                <VList density="compact" minWidth="220">
                  <VListItem title="Current file" active={ctx.activeProfile.value === null} onClick={() => (ctx.activeProfile.value = null)} />
                  {ctx.runProfiles.value.length > 0 && <VListSubheader>Profiles</VListSubheader>}
                  {ctx.runProfiles.value.map((p: RunProfile) => (
                    <VListItem
                      key={p.name}
                      title={p.name}
                      subtitle={p.path + (p.args.length ? " " + p.args.join(" ") : "")}
                      active={ctx.activeProfile.value === p.name}
                      onClick={() => (ctx.activeProfile.value = p.name)}
                    >
                      {{
                        append: () => (
                          <VBtn size="x-small" variant="text" icon="mdi-delete-outline" title="Delete profile"
                            onClick={(e: Event) => { e.stopPropagation(); ctx.deleteProfile(p.name); }} />
                        ),
                      }}
                    </VListItem>
                  ))}
                  <VListItem title="New profile…" prependIcon="mdi-plus" onClick={() => (ctx.profileDialog.value = true)} />
                </VList>
              ),
            }}
          </VMenu>}
          {/* Debugger step controls (shown while paused). */}
          {ctx.stopped.value && (
            <>
              <VDivider vertical class="mx-1" />
              {iconBtn("mdi-play-outline", "Continue", () => ctx.debugCmd("continue"), { disabled: ctx.busy.value })}
              {iconBtn("mdi-debug-step-over", "Step Over", () => ctx.debugCmd("next"), { disabled: ctx.busy.value })}
              {iconBtn("mdi-debug-step-into", "Step In", () => ctx.debugCmd("stepIn"), { disabled: ctx.busy.value })}
              {iconBtn("mdi-debug-step-out", "Step Out", () => ctx.debugCmd("stepOut"), { disabled: ctx.busy.value })}
            </>
          )}

          {ctx.snap.value?.state === "stopped" && (
            <span class="text-caption ml-2">stopped ({ctx.snap.value.reason}) @ {ctx.snap.value.line}:{ctx.snap.value.column}</span>
          )}

          {/* Right-aligned: Doc then Settings. */}
          <span class="pnl-toolbar-spacer" />
          {iconBtn("mdi-file-eye-outline", "Preview", () => ctx.requestDocs(), { disabled: !has() })}
          {iconBtn("mdi-cog-outline", "Settings", () => (ctx.settingsOpen.value = true))}
        </div>
        <div class="pnl-editor">
          {has() && ctx.isImage.value ? (
            // an image: shown whole, its aspect ratio kept
            <div class="gad-ide__image">
              {ctx.imageUrl(ctx.openPath.value) ? <img src={ctx.imageUrl(ctx.openPath.value)} alt={ctx.openPath.value} />
                : <span class="text-medium-emphasis">No preview of images here.</span>}
            </div>
          ) : has() ? (
            <GadEditor
              key={ctx.openPath.value + (ctx.canDebug.value ? ":debug" : "")}
              modelValue={ctx.source.value}
              {...{ "onUpdate:modelValue": (v: string) => (ctx.source.value = v) }}
              breakpoints={ctx.breakpoints.value}
              breakpointGutter={ctx.canDebug.value}
              {...{ "onUpdate:breakpoints": (b: number[]) => (ctx.breakpoints.value = b) }}
              path={ctx.openPath.value}
              dark={ctx.dark.value}
              readonly={ctx.readonly.value}
              fontSize={ctx.fontSize.value}
              customExtension={ctx.fileTypes.extensionFor(ctx.openPath.value)}
              diagnose={ctx.diagnose}
              debugLine={ctx.debugLine.value}
              debugColumn={ctx.debugColumn.value}
              getLocals={ctx.getLocals}
              gotoLine={ctx.gotoTarget.value.line}
              gotoSeq={ctx.gotoTarget.value.seq}
              onBreakpointContext={(line: number) => ctx.openBpCondition(ctx.openPath.value, line)}
              onReady={(v: GadEditorView) => ctx.registerEditor(v)}
            />
          ) : (
            <div class="pa-4 text-medium-emphasis">Select or create a file to begin.</div>
          )}
        </div>
        {/* Thin status bar: the open file's full path, and font-size controls. */}
        <div class="editor-statusbar">
          <span class="editor-statusbar-path" title={ctx.openPath.value}>{ctx.openPath.value || "(no file)"}</span>
          <span class="editor-statusbar-font">
            <button class="fs-btn" title="Decrease font size" onClick={() => ctx.decFont()}>A−</button>
            <span class="fs-val">{ctx.fontSize.value}px</span>
            <button class="fs-btn" title="Increase font size" onClick={() => ctx.incFont()}>A+</button>
          </span>
        </div>
      </div>
    );
  },
});
