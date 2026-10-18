import { type PropType } from "vue";
import type { DockviewApi, DockviewPanelApi } from "dockview-vue";
import { type ExtraPanel } from "../extraPanels";
export declare function panelFor(def: ExtraPanel): import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    params: {
        type: PropType<{
            api: DockviewPanelApi;
            containerApi: DockviewApi;
        }>;
        required: true;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    params: {
        type: PropType<{
            api: DockviewPanelApi;
            containerApi: DockviewApi;
        }>;
        required: true;
    };
}>> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
/** ExpandButton expands the extra panel it is in over the others, and brings
 * it back: in its header (ExtraPanel.headerExpand), or floating. */
export declare const ExpandButton: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    variant: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element | null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    variant: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{}>, {
    variant: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
