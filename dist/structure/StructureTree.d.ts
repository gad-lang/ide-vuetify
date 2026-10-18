import { type PropType, type VNode } from "vue";
import type { OutlineSym } from "../types";
/** KIND_ICONS are the icon and the color of each kind of declaration. */
export declare const KIND_ICONS: Record<string, {
    icon: string;
    color: string;
}>;
/** kindIcon is the icon and color of kind (a tag for one it does not know). */
export declare function kindIcon(kind: string): {
    icon: string;
    color: string;
};
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    symbols: {
        type: PropType<OutlineSym[]>;
        default: () => never[];
    };
    /** Called with the declaration clicked. */
    onNavigate: {
        type: PropType<(sym: OutlineSym) => void>;
        default: undefined;
    };
    /** What it says when there is nothing. */
    emptyText: {
        type: StringConstructor;
        default: string;
    };
}>, () => VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    symbols: {
        type: PropType<OutlineSym[]>;
        default: () => never[];
    };
    /** Called with the declaration clicked. */
    onNavigate: {
        type: PropType<(sym: OutlineSym) => void>;
        default: undefined;
    };
    /** What it says when there is nothing. */
    emptyText: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    symbols: OutlineSym[];
    onNavigate: (sym: OutlineSym) => void;
    emptyText: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
