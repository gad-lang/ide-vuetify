import { type PropType } from "vue";
import type { GitRepo } from "./gitRepo";
export declare const RepoSelect: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    git: {
        type: PropType<GitRepo>;
        required: true;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    workspace: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element | null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    git: {
        type: PropType<GitRepo>;
        required: true;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    workspace: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    label: string;
    workspace: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
