import { type ComputedRef, type Ref } from "vue";
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
export declare function repoOf(repos: string[], path: string): string | undefined;
export declare function useGitRepo(ctx: IdeController): GitRepo;
