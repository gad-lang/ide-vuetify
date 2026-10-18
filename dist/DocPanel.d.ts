import { type PropType } from "vue";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";
import { type DocRootFn } from "./docPaths";
import type { DocMode, DocResult } from "./types";
/** DocFn generates documentation for source in the given mode. */
export type DocFn = (source: string, sourceType: string, mode: DocMode) => Promise<DocResult>;
declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    doc: {
        type: PropType<DocFn>;
        required: true;
    };
    source: {
        type: PropType<() => string>;
        required: true;
    };
    sourceType: {
        type: StringConstructor;
        default: string;
    };
    docPath: {
        type: StringConstructor;
        default: string;
    };
    docRootFor: {
        type: PropType<DocRootFn>;
        default: undefined;
    };
    revision: {
        type: NumberConstructor;
        default: number;
    };
    onNavigate: {
        type: PropType<(line: number, column: number) => void>;
        default: undefined;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    doc: {
        type: PropType<DocFn>;
        required: true;
    };
    source: {
        type: PropType<() => string>;
        required: true;
    };
    sourceType: {
        type: StringConstructor;
        default: string;
    };
    docPath: {
        type: StringConstructor;
        default: string;
    };
    docRootFor: {
        type: PropType<DocRootFn>;
        default: undefined;
    };
    revision: {
        type: NumberConstructor;
        default: number;
    };
    onNavigate: {
        type: PropType<(line: number, column: number) => void>;
        default: undefined;
    };
}>> & Readonly<{}>, {
    sourceType: string;
    docPath: string;
    docRootFor: DocRootFn;
    revision: number;
    onNavigate: (line: number, column: number) => void;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
