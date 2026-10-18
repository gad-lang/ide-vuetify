declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    /** Download progress percent (0–100), or -1 for indeterminate. */
    progress: {
        type: NumberConstructor;
        default: number;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (_v: boolean) => true;
    import: (_url: string, _extract: boolean, _targetDir: string) => true;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        required: true;
    };
    /** Download progress percent (0–100), or -1 for indeterminate. */
    progress: {
        type: NumberConstructor;
        default: number;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((_v: boolean) => any) | undefined;
    onImport?: ((_url: string, _extract: boolean, _targetDir: string) => any) | undefined;
}>, {
    progress: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
