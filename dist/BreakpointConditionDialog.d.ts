import { type PropType } from "vue";
import type { BpMeta } from "./controller";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    line: {
        type: NumberConstructor;
        default: number;
    };
    initial: {
        type: PropType<BpMeta>;
        default: () => {};
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (_v: boolean) => true;
    save: (_m: BpMeta) => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    line: {
        type: NumberConstructor;
        default: number;
    };
    initial: {
        type: PropType<BpMeta>;
        default: () => {};
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((_v: boolean) => any) | undefined;
    onSave?: ((_m: BpMeta) => any) | undefined;
}>, {
    line: number;
    initial: BpMeta;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
