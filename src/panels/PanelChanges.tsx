// Changes dockview panel: the files of the workspace changed and not
// committed (api.git.changes), in the diff browser — each compared with
// HEAD's, the current side edited (a change taken back, undone, redone,
// saved). Looked at again when the IDE writes a file, and on its button.
import { computed, defineComponent, h, inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { VBtn, VProgressCircular } from "../vuetify";
import { IdeControllerKey } from "../controller";
import { ExpandButton } from "./PanelExtra";
import { DEFAULT_MESSAGES, diffLabels, IdeMessagesKey } from "../messages";
import DiffBrowser from "../diff/DiffBrowser.vue";
import type { Content, DiffFile, SaveState } from "../diff/diffBrowserContext";

const message = (e: unknown) => String((e as { message?: string })?.message || e);

export default defineComponent({
  name: "PanelChanges",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const git = ctx.api.git!;
    const m = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    const files = ref<DiffFile[]>([]);
    const error = ref("");
    const loading = ref(false);
    const browser = ref<{ reload(): void }>();

    // refresh asks for the changes again, and for the diffs open: the last
    // asked is the one shown
    let seq = 0;
    async function refresh() {
      const n = ++seq;
      loading.value = true;
      try {
        const f = await git.changes();
        if (n !== seq) return;
        files.value = f;
        error.value = "";
        browser.value?.reload();
      } catch (e) {
        if (n === seq) error.value = message(e);
      } finally {
        if (n === seq) loading.value = false;
      }
    }
    onMounted(refresh);

    // a file written by the IDE: looked at again, once the writes stop
    let timer: ReturnType<typeof setTimeout> | undefined;
    watch(ctx.writes, () => {
      clearTimeout(timer);
      timer = setTimeout(refresh, 400);
    });
    onBeforeUnmount(() => clearTimeout(timer));

    const load = (c: Content) =>
      git.diff(c.file.path, c.file.from).then(
        (v) => {
          c.value = v;
          c.error = undefined;
        },
        (e) => (c.error = message(e)),
      );
    const save = (path: string, state: SaveState) =>
      git.save(path, state.value).then(
        () => {
          state.saved = true;
          // the editor's tab of it, when it has no changes of its own
          void ctx.refreshFile(path);
          void refresh();
        },
        (e) => (state.error = message(e)),
      );
    const canSave = ctx.workspace.actions?.edit ?? true;

    return () => (
      <div class="gad-ide__changes" data-git-changes>
        <div class="gad-ide__git-bar">
          <span class="gad-ide__git-title">{m.value.changes}</span>
          <span class="gad-ide__git-count">{files.value.length}</span>
          <VBtn size="x-small" variant="text" icon="mdi-refresh" title={m.value.refresh} data-changes-refresh onClick={refresh} />
          {loading.value && <VProgressCircular indeterminate size={14} width={2} color="primary" />}
          {error.value && <span class="text-error text-body-2 ms-2">{error.value}</span>}
          <span class="gad-ide__git-spacer" />
          <ExpandButton />
        </div>
        <div class="gad-ide__git-fill">
          {h(DiffBrowser, {
            ...diffLabels(m.value),
            ref: browser,
            files: files.value,
            load,
            save: canSave && !ctx.readonly.value ? save : undefined,
            dark: ctx.dark.value,
            height: "100%",
          })}
        </div>
      </div>
    );
  },
});
