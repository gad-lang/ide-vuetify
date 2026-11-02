// The selector of the repository of the Changes and Git panels (gitRepo.ts):
// shown when the workspace has more than one.
import { defineComponent, type PropType } from "vue";
import { VSelect } from "../vuetify";
import type { GitRepo } from "./gitRepo";

export const RepoSelect = defineComponent({
  name: "RepoSelect",
  props: {
    git: { type: Object as PropType<GitRepo>, required: true },
    label: { type: String, default: "Repository" },
    workspace: { type: String, default: "The workspace" },
  },
  setup(props) {
    return () =>
      props.git.repos.value.length > 1 ? (
        <VSelect
          class="gad-ide__repo-select"
          density="compact"
          variant="outlined"
          hideDetails
          prependInnerIcon="mdi-source-repository"
          style="max-width: 260px; min-width: 160px"
          title={props.label}
          aria-label={props.label}
          data-repo-select=""
          items={props.git.repos.value.map((r) => ({ title: r || props.workspace, value: r }))}
          modelValue={props.git.repo.value}
          {...{ "onUpdate:modelValue": (v: string) => props.git.choose(v) }}
        />
      ) : null;
  },
});
