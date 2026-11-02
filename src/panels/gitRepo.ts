// The repository of the Changes and Git panels: a workspace may have several
// (its own, its folders that are one — nested, submodules). The panels
// follow the file open — the deepest repository it is in —, unless one is
// chosen in their selector (until another file is open); their paths are of
// that repository's folder.
import { computed, ref, shallowRef, watch, type ComputedRef, type Ref } from "vue";
import type { IdeGitApi } from "../api";
import type { IdeController } from "../controller";

export interface GitRepo {
  /** the repositories of the workspace ("" its own) */
  repos: Ref<string[]>;
  /** the repository of the panels */
  repo: ComputedRef<string>;
  /** a repository chosen (the selector) */
  choose: (r: string) => void;
  /** the client of the repository */
  api: ComputedRef<IdeGitApi>;
  /** the path of the workspace as a path of the repository ("" when out of it) */
  rel: (p: string) => string;
  /** the path of the repository as a path of the workspace */
  abs: (p: string) => string;
}

/** repoOf is the deepest repository of repos path is in (undefined: none). */
export function repoOf(repos: string[], path: string): string | undefined {
  let best: string | undefined;
  for (const r of repos) {
    if (r === "" ? best === undefined : path === r || path.startsWith(r + "/")) {
      if (best === undefined || r.length > best.length) best = r;
    }
  }
  return best;
}

export function useGitRepo(ctx: IdeController): GitRepo {
  const repos = shallowRef<string[]>([""]);
  const chosen = ref<string | null>(null);
  if (ctx.api.gitRepos) {
    ctx.api.gitRepos().then((r) => { if (r.length) repos.value = r; }).catch(() => undefined);
  }
  // another file open: the panels follow it again
  watch(() => ctx.openPath.value, () => { chosen.value = null; });
  const repo = computed(() => {
    if (chosen.value !== null && repos.value.includes(chosen.value)) return chosen.value;
    return repoOf(repos.value, ctx.openPath.value) ?? repos.value[0] ?? "";
  });
  const api = computed(() => (ctx.api.gitFor ? ctx.api.gitFor(repo.value) : ctx.api.git!));
  const rel = (p: string) => {
    const r = repo.value;
    if (!r) return p;
    return p.startsWith(r + "/") ? p.slice(r.length + 1) : "";
  };
  const abs = (p: string) => (repo.value ? repo.value + "/" + p : p);
  return { repos, repo, choose: (r) => { chosen.value = r; }, api, rel, abs };
}
