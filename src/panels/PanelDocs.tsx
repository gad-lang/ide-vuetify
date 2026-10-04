// Preview dockview panel: the open file as it shows — an HTML file rendered
// (sandboxed: its scripts do not run), a Markdown file rendered, an image; a
// gad file's documentation in two views: its doc comments (rendered,
// auto-updating), or generated documentation via the shared DocPanel (Render
// Markdown/HTML, and Markdown/HTML/JSON/YAML source).
import { defineComponent, inject, onMounted, ref, watch } from "vue";
import { VBtn, VBtnToggle } from "../vuetify";
import { IdeControllerKey } from "../controller";
import DocPanel from "../DocPanel";
import { resolveDocPaths } from "../docPaths";
import type { DocKind } from "../docView";

// docSourceType maps the open file path to the doc dialect.
function docSourceType(path: string): string {
  if (path.endsWith(".gadx")) return "gadx";
  if (path.endsWith(".gadt")) return "gadTemplate";
  return "gad";
}

// HEADS is the panel's head by what it shows.
const HEADS: Record<DocKind, string> = { gad: "DOCS", html: "HTML", markdown: "MARKDOWN", image: "IMAGE", none: "PREVIEW" };

export default defineComponent({
  name: "PanelDocs",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const view = ref<"comments" | "generate">("comments");
    onMounted(() => void ctx.refreshDoc());
    watch(() => ctx.openPath.value, () => void ctx.refreshDoc());
    return () => (
      <div class="pnl">
        <div class="pnl-head">
          <span class="text-caption font-weight-medium">{HEADS[ctx.docKind.value]}</span>
          <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {ctx.docKind.value === "gad" && <VBtnToggle
              modelValue={view.value}
              {...{ "onUpdate:modelValue": (v: unknown) => { if (v) view.value = v as "comments" | "generate"; } }}
              density="compact"
              variant="outlined"
              mandatory
            >
              <VBtn size="x-small" value="comments">Comments</VBtn>
              <VBtn size="x-small" value="generate">Generate</VBtn>
            </VBtnToggle>}
            {(view.value === "comments" || ctx.docKind.value !== "gad") && (
              <VBtn size="x-small" variant="text" icon="mdi-refresh" title="Refresh" onClick={() => ctx.refreshDoc()} />
            )}
          </span>
        </div>
        {ctx.docKind.value === "html" ? (
          <iframe class="pnl-body gad-ide__preview-frame" sandbox="" srcdoc={ctx.docHtml.value} title={ctx.openPath.value} />
        ) : ctx.docKind.value === "image" ? (
          <div class="pnl-body gad-ide__image">
            {ctx.imageUrl(ctx.openPath.value) ? <img src={ctx.imageUrl(ctx.openPath.value)} alt={ctx.openPath.value} />
              : <span class="text-medium-emphasis">No preview of images here.</span>}
          </div>
        ) : ctx.docKind.value === "markdown" ? (
          <div class="pnl-body gad-ide__doc" innerHTML={ctx.docHtml.value} />
        ) : view.value === "generate" ? (
          <div class="pnl-body" style={{ padding: 0 }}>
            <DocPanel
              doc={ctx.api.docGen}
              source={() => ctx.source.value}
              sourceType={docSourceType(ctx.openPath.value)}
              docPath={ctx.openPath.value}
              onNavigate={(line: number) => ctx.goto(line)}
            />
          </div>
        ) : (
          <div class="pnl-body gad-ide__doc" innerHTML={resolveDocPaths(ctx.docHtml.value, ctx.openPath.value)} />
        )}
      </div>
    );
  },
});
