import { type PropType } from "vue";
import type { DockviewApi, DockviewPanelApi } from "dockview-vue";
export interface TabExpandTitles {
    expand: string;
    restore: string;
}
export declare function tabFor(expand: Set<string>, titles: () => TabExpandTitles): import("vue").DefineComponent<import("vue").ExtractPropTypes<{
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
