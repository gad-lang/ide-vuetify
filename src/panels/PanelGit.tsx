// Git dockview panel: @gad-lang/git-vuetify's GitPanel on the workspace's
// repository (api.git) — the file history following the editor's file —,
// the IDE's expand button at the end of its bar.
import { computed, defineComponent, inject } from "vue";
import { GitPanel } from "@gad-lang/git-vuetify";
import { IdeControllerKey } from "../controller";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "../messages";
import { ExpandButton } from "./PanelExtra";

export default defineComponent({
  name: "PanelGit",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const m = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    return () => (
      <GitPanel api={ctx.api.git!} dark={ctx.dark.value} openPath={ctx.openPath.value} messages={m.value}>
        {{ actions: () => <ExpandButton /> }}
      </GitPanel>
    );
  },
});
