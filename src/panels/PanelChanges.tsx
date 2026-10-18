// Changes dockview panel: @gad-lang/git-vuetify's ChangesPanel on the
// workspace's repository (api.git) — looked at again when the IDE writes a
// file; a file saved there, its editor's tab read again —, the IDE's expand
// button at the end of its bar.
import { computed, defineComponent, inject } from "vue";
import { ChangesPanel } from "@gad-lang/git-vuetify";
import { IdeControllerKey } from "../controller";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "../messages";
import { ExpandButton } from "./PanelExtra";

export default defineComponent({
  name: "PanelChanges",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const m = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    const canSave = ctx.workspace.actions?.edit ?? true;
    return () => (
      <ChangesPanel
        api={ctx.api.git!}
        dark={ctx.dark.value}
        readonly={!canSave || ctx.readonly.value}
        writes={ctx.writes.value}
        messages={m.value}
        onSaved={(path: string) => void ctx.refreshFile(path)}
      >
        {{ actions: () => <ExpandButton /> }}
      </ChangesPanel>
    );
  },
});
