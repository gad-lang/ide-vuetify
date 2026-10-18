import { type PropType } from "vue";
export interface PanelToggle {
    id: string;
    label: string;
    visible: boolean;
}
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    config: {
        type: PropType<Record<string, unknown>>;
        required: true;
    };
    panels: {
        type: PropType<PanelToggle[]>;
        default: () => never[];
    };
    onTogglePanel: {
        type: PropType<(id: string, visible: boolean) => void>;
        required: true;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (_v: boolean) => true;
    save: (_next: Record<string, unknown>) => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    config: {
        type: PropType<Record<string, unknown>>;
        required: true;
    };
    panels: {
        type: PropType<PanelToggle[]>;
        default: () => never[];
    };
    onTogglePanel: {
        type: PropType<(id: string, visible: boolean) => void>;
        required: true;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((_v: boolean) => any) | undefined;
    onSave?: ((_next: Record<string, unknown>) => any) | undefined;
}>, {
    panels: PanelToggle[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
