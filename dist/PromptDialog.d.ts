import { type PropType } from "vue";
import type { ConfirmRequest, PromptRequest } from "./controller";
export declare const PromptDialog: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    request: {
        type: PropType<PromptRequest | null>;
        default: null;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    done: () => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    request: {
        type: PropType<PromptRequest | null>;
        default: null;
    };
}>> & Readonly<{
    onDone?: (() => any) | undefined;
}>, {
    request: PromptRequest | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export declare const ConfirmDialog: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    request: {
        type: PropType<ConfirmRequest | null>;
        default: null;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    done: () => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    request: {
        type: PropType<ConfirmRequest | null>;
        default: null;
    };
}>> & Readonly<{
    onDone?: (() => any) | undefined;
}>, {
    request: ConfirmRequest | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
