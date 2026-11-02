// Git dockview panel: @gad-lang/git-vuetify's GitPanel on the repository of
// the file open (gitRepo.ts: the workspace's, or a folder's that is one; a
// selector when there are several) — the file history following the
// editor's file, as a path of that repository —, the IDE's expand button at
// the end of its bar.
import { computed, defineComponent, inject } from "vue";
import { GitPanel } from "@gad-lang/git-vuetify";
import { IdeControllerKey } from "../controller";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "../messages";
import { ExpandButton } from "./PanelExtra";
import { useGitRepo } from "./gitRepo";
import { RepoSelect } from "./RepoSelect";

export default defineComponent({
  name: "PanelGit",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const m = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    const git = useGitRepo(ctx);
    return () => (
      <GitPanel key={git.repo.value} api={git.api.value} dark={ctx.dark.value} openPath={git.rel(ctx.openPath.value)} messages={m.value}>
        {{
          actions: () => [
            <RepoSelect git={git} label={m.value.repository} workspace={m.value.workspaceRepository} />,
            <ExpandButton />,
          ],
        }}
      </GitPanel>
    );
  },
});
