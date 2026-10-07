// An extra panel of the host app (GadIde's extraPanels) in its dockview panel:
// its component, and a button inside it — at its top right — that expands it
// over the other panels and brings it back (dockview's maximize).
import { defineComponent, h, inject, onBeforeUnmount, onMounted, provide, ref, type PropType } from "vue";
import type { DockviewApi, DockviewPanelApi } from "dockview-vue";
import { VBtn } from "../vuetify";
import { ExtraPanelExpandKey, type ExtraPanel } from "../extraPanels";

// panelFor is the dockview component of the extra panel def.
export function panelFor(def: ExtraPanel) {
  return defineComponent({
    name: "PanelExtra_" + def.id.replace(/\W/g, "_"),
    props: {
      // dockview's: { params, api, containerApi }
      params: { type: Object as PropType<{ api: DockviewPanelApi; containerApi: DockviewApi }>, required: true },
    },
    setup(props) {
      const maximized = ref(false);
      const sync = () => (maximized.value = props.params.api.isMaximized());
      let off: { dispose(): void } | undefined;
      onMounted(() => {
        sync();
        off = props.params.containerApi.onDidMaximizedGroupChange(sync);
      });
      onBeforeUnmount(() => off?.dispose());
      const toggle = () => {
        if (props.params.api.isMaximized()) props.params.api.exitMaximized();
        else props.params.api.maximize();
        sync();
      };
      provide(ExtraPanelExpandKey, {
        maximized,
        toggle,
        expandTitle: def.expandTitle ?? "Expand",
        collapseTitle: def.collapseTitle ?? "Restore",
      });
      return () => (
        <div class="gad-ide__extra" data-extra-panel={def.id}>
          <div class="gad-ide__extra-body">{h(def.component, def.props ?? {})}</div>
          {!def.headerExpand && <ExpandButton class="gad-ide__extra-expand" variant="tonal" />}
        </div>
      );
    },
  });
}

/** ExpandButton expands the extra panel it is in over the others, and brings
 * it back: in its header (ExtraPanel.headerExpand), or floating. */
export const ExpandButton = defineComponent({
  name: "ExpandButton",
  props: { variant: { type: String, default: "text" } },
  setup(props) {
    const x = inject(ExtraPanelExpandKey, null);
    return () =>
      x && (
        <VBtn
          size="x-small"
          variant={props.variant}
          icon={x.maximized.value ? "mdi-arrow-collapse" : "mdi-arrow-expand"}
          title={x.maximized.value ? x.collapseTitle : x.expandTitle}
          data-extra-expand={x.maximized.value ? "collapse" : "expand"}
          onClick={x.toggle}
        />
      );
  },
});
