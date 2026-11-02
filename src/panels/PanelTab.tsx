// The tab of a dockview panel, as dockview's own (its title, the close
// button) — and, for the panels in expand (ExtraPanel.tabExpand), a button
// beside the close one that expands the panel over the others and brings it
// back (dockview's maximize).
import { defineComponent, onBeforeUnmount, ref, type PropType } from "vue";
import type { DockviewApi, DockviewPanelApi } from "dockview-vue";
import { VIcon } from "../vuetify";

export interface TabExpandTitles {
  expand: string;
  restore: string;
}

// tabFor is the default tab of the IDE's dockview: the panels of the ids in
// expand with the expand button, titled by titles().
export function tabFor(expand: Set<string>, titles: () => TabExpandTitles) {
  return defineComponent({
    name: "PanelTab",
    props: {
      // dockview's: { params, api, containerApi }
      params: { type: Object as PropType<{ api: DockviewPanelApi; containerApi: DockviewApi }>, required: true },
    },
    setup(props) {
      const api = props.params.api;
      const title = ref(api.title ?? "");
      const maximized = ref(api.isMaximized());
      const offs = [
        api.onDidTitleChange((e) => (title.value = e.title)),
        props.params.containerApi.onDidMaximizedGroupChange(() => (maximized.value = api.isMaximized())),
      ];
      onBeforeUnmount(() => offs.forEach((o) => o.dispose()));
      // the actions: not a drag of the tab, not its activation
      const action = (fn: () => void) => ({
        onPointerdown: (e: Event) => e.preventDefault(),
        onClick: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          fn();
        },
      });
      const toggle = () => {
        if (api.isMaximized()) api.exitMaximized();
        else api.maximize();
        maximized.value = api.isMaximized();
      };
      return () => (
        <div class="dv-default-tab" data-tab={api.id}>
          <div class="dv-default-tab-content">{title.value}</div>
          {expand.has(api.id) && (
            <div
              class="dv-default-tab-action gad-ide__tab-expand"
              title={maximized.value ? titles().restore : titles().expand}
              data-tab-expand={api.id}
              data-maximized={maximized.value ? "true" : "false"}
              {...action(toggle)}
            >
              <VIcon size="14" icon={maximized.value ? "mdi-arrow-collapse" : "mdi-arrow-expand"} />
            </div>
          )}
          <div class="dv-default-tab-action" data-tab-close={api.id} {...action(() => api.close())}>
            <VIcon size="14" icon="mdi-close" />
          </div>
        </div>
      );
    },
  });
}
