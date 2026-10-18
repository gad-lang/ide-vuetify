// Preview dockview panel: the open file as it shows — an HTML file rendered
// (sandboxed: its scripts do not run), a Markdown file rendered, an image; a
// gad file, its documentation (`gad doc`, IdeApi.docGen) rendered — as the
// admin's editor of gad code shows it —, generated again a moment after an
// edit; a click on a symbol of it moves the editor to its declaration.
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { VBtn } from "../vuetify";
import { IdeControllerKey } from "../controller";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "../messages";
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
    const w = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    // a gad file: its documentation (`gad doc`), rendered — as the admin's
    // editor of gad code shows it —, generated again a moment after an edit
    const genHtml = ref("");
    const genError = ref("");
    const busy = ref(false);
    let timer: ReturnType<typeof setTimeout> | undefined;
    async function generate() {
      if (ctx.docKind.value !== "gad" || !ctx.openPath.value) return;
      busy.value = true;
      try {
        const r = await ctx.api.docGen(ctx.source.value, docSourceType(ctx.openPath.value), "render-html");
        genHtml.value = r.ok ? r.html ?? "" : "";
        genError.value = r.ok ? "" : r.error ?? "";
      } catch (e) {
        genHtml.value = "";
        genError.value = e instanceof Error ? e.message : String(e);
      } finally {
        busy.value = false;
      }
    }
    const refresh = async () => {
      await ctx.refreshDoc();
      await generate();
    };
    onMounted(refresh);
    onBeforeUnmount(() => clearTimeout(timer));
    watch(() => ctx.openPath.value, refresh);
    watch(
      () => ctx.source.value,
      () => {
        if (ctx.docKind.value !== "gad") return;
        clearTimeout(timer);
        timer = setTimeout(generate, 500);
      },
    );
    // a click on a symbol of the documentation: the editor at its declaration
    const navigate = (e: MouseEvent) => {
      const pos = (e.target as HTMLElement).closest("[data-src-pos]")?.getAttribute("data-src-pos");
      if (!pos) return;
      const [line] = pos.split(",").map(Number);
      if (line) ctx.goto(line);
    };
    return () => (
      <div class="pnl">
        <div class="pnl-head">
          <span class="text-caption font-weight-medium">{HEADS[ctx.docKind.value]}</span>
          <VBtn size="x-small" variant="text" icon="mdi-refresh" title={w.value.refresh} loading={busy.value} onClick={refresh} />
        </div>
        {ctx.docKind.value === "html" ? (
          <iframe class="pnl-body gad-ide__preview-frame" sandbox="" srcdoc={ctx.docHtml.value} title={ctx.openPath.value} />
        ) : ctx.docKind.value === "image" ? (
          <div class="pnl-body gad-ide__image">
            {ctx.imageUrl(ctx.openPath.value) ? <img src={ctx.imageUrl(ctx.openPath.value)} alt={ctx.openPath.value} />
              : <span class="text-medium-emphasis">{w.value.noImagePreview}</span>}
          </div>
        ) : ctx.docKind.value === "gad" ? (
          <div class="pnl-body gad-ide__doc" data-ide-doc-gen onClick={navigate}>
            {genError.value ? (
              <pre class="text-error text-caption" style={{ whiteSpace: "pre-wrap" }}>{genError.value}</pre>
            ) : genHtml.value ? (
              <div class="gp-doc-rendered" innerHTML={resolveDocPaths(genHtml.value, ctx.openPath.value)} />
            ) : (
              <span class="text-medium-emphasis">{w.value.noDocumentation}</span>
            )}
          </div>
        ) : (
          <div class="pnl-body gad-ide__doc" innerHTML={resolveDocPaths(ctx.docHtml.value, ctx.openPath.value)} />
        )}
      </div>
    );
  },
});
