import { type PropType } from "vue";
import type { InspectResult } from "./api";
export type InspectFn = (expr: string) => Promise<InspectResult | null>;
declare const InspectorNode: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    inspect: {
        type: PropType<InspectFn>;
        required: true;
    };
    label: {
        type: StringConstructor;
        required: true;
    };
    expr: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    expandable: {
        type: BooleanConstructor;
        default: boolean;
    };
    depth: {
        type: NumberConstructor;
        default: number;
    };
    root: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    inspect: {
        type: PropType<InspectFn>;
        required: true;
    };
    label: {
        type: StringConstructor;
        required: true;
    };
    expr: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    expandable: {
        type: BooleanConstructor;
        default: boolean;
    };
    depth: {
        type: NumberConstructor;
        default: number;
    };
    root: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{}>, {
    value: string;
    type: string;
    root: boolean;
    expandable: boolean;
    depth: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default InspectorNode;
