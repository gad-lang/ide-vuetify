import { type PropType } from "vue";
import type { TreeNode } from "./api";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    root: {
        type: PropType<TreeNode | null>;
        default: null;
    };
    selected: {
        type: StringConstructor;
        default: string;
    };
    onSelect: {
        type: PropType<(path: string) => void>;
        required: true;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    root: {
        type: PropType<TreeNode | null>;
        default: null;
    };
    selected: {
        type: StringConstructor;
        default: string;
    };
    onSelect: {
        type: PropType<(path: string) => void>;
        required: true;
    };
}>> & Readonly<{}>, {
    root: TreeNode | null;
    selected: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
