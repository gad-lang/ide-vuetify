// Structure dockview panel: the open file's declarations as a tree (`gad
// symbols`, IdeApi.symbols), refreshed a moment after the source changes; a
// click on one moves the editor's cursor to it.
import { defineComponent, inject, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { VBtn } from "../vuetify";
import { IdeControllerKey } from "../controller";
import StructureTree from "../structure/StructureTree";
import type { OutlineSym } from "../types";

export default defineComponent({
  name: "PanelStructure",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const symbols = ref<OutlineSym[]>([]);
    const error = ref("");
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function refresh() {
      const fn = ctx.api.symbols;
      if (!fn || !ctx.openPath.value) {
        symbols.value = [];
        return;
      }
      try {
        symbols.value = await fn(ctx.source.value, ctx.openPath.value);
        error.value = "";
      } catch (e) {
        error.value = e instanceof Error ? e.message : String(e);
      }
    }
    const later = () => {
      clearTimeout(timer);
      timer = setTimeout(refresh, 400);
    };

    onMounted(refresh);
    onBeforeUnmount(() => clearTimeout(timer));
    watch(() => ctx.openPath.value, refresh);
    watch(() => ctx.source.value, later);

    return () => (
      <div class="pnl">
        <div class="pnl-head">
          <span class="text-caption font-weight-medium">STRUCTURE</span>
          <VBtn size="x-small" variant="text" icon="mdi-refresh" title="Refresh" onClick={refresh} />
        </div>
        <div class="pnl-body" style={{ padding: 0 }}>
          {!ctx.api.symbols ? (
            <div class="text-medium-emphasis" style={{ padding: "8px" }}>No structure here.</div>
          ) : (
            <StructureTree
              symbols={symbols.value}
              emptyText={error.value || "No declarations."}
              onNavigate={(s: OutlineSym) => ctx.goto(s.line)}
            />
          )}
        </div>
      </div>
    );
  },
});
