// Changes dockview panel: @gad-lang/git-vuetify's ChangesPanel on the
// repository of the file open (gitRepo.ts: the workspace's, or a folder's
// that is one; a selector when there are several) — looked at again when the
// IDE writes a file; a file saved there, its editor's tab read again —, its
// expand button in its tab. It commits (the files chosen) when the workspace
// says gitCommit and the files may be edited.
import { computed, defineComponent, inject } from "vue";
import { ChangesPanel } from "@gad-lang/git-vuetify";
import { IdeControllerKey } from "../controller";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "../messages";
import { useGitRepo } from "./gitRepo";
import { RepoSelect } from "./RepoSelect";

export default defineComponent({
  name: "PanelChanges",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const m = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    const canSave = ctx.workspace.actions?.edit ?? true;
    const git = useGitRepo(ctx);
    return () => (
      <ChangesPanel
        key={git.repo.value}
        api={git.api.value}
        dark={ctx.dark.value}
        readonly={!canSave || ctx.readonly.value}
        canCommit={!!ctx.workspace.gitCommit && canSave && !ctx.readonly.value}
        writes={ctx.writes.value}
        messages={m.value}
        onSaved={(path: string) => void ctx.refreshFile(git.abs(path))}
      >
        {{
          actions: () => [
            <RepoSelect git={git} label={m.value.repository} workspace={m.value.workspaceRepository} />,
          ],
        }}
      </ChangesPanel>
    );
  },
});
