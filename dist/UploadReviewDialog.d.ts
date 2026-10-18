import { type PropType } from "vue";
import { type RawFile } from "./upload";
import type { UploadedFile } from "./api";
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    raw: {
        type: PropType<RawFile[]>;
        default: () => never[];
    };
    initialDir: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (_v: boolean) => true;
    confirm: (_files: UploadedFile[], _targetDir: string) => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    raw: {
        type: PropType<RawFile[]>;
        default: () => never[];
    };
    initialDir: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((_v: boolean) => any) | undefined;
    onConfirm?: ((_files: UploadedFile[], _targetDir: string) => any) | undefined;
}>, {
    raw: RawFile[];
    initialDir: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
