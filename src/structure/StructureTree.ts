// StructureTree — the structure of a gad source as a tree, as IntelliJ's
// Structure panel shows it: each declaration (`gad symbols`) with the icon of
// its kind, its own members under it (a class's fields, an enum's values);
// a node opened or closed by its chevron, and a click on it navigates to the
// declaration. Shared by the IDE's Structure panel and the admin's editor of
// gad code (vx-gad-code).
import { defineComponent, h, reactive, type PropType, type VNode } from "vue";
import { VIcon } from "../vuetify";
import type { OutlineSym } from "../types";

/** KIND_ICONS are the icon and the color of each kind of declaration. */
export const KIND_ICONS: Record<string, { icon: string; color: string }> = {
  class: { icon: "mdi-alpha-c-circle", color: "#3592c4" },
  mixin: { icon: "mdi-alpha-m-circle", color: "#26a69a" },
  type: { icon: "mdi-alpha-t-circle", color: "#9876aa" },
  interface: { icon: "mdi-alpha-i-circle", color: "#62b543" },
  enum: { icon: "mdi-alpha-e-circle", color: "#e5932c" },
  func: { icon: "mdi-alpha-f-circle", color: "#c75450" },
  met: { icon: "mdi-alpha-f-circle-outline", color: "#c75450" },
  method: { icon: "mdi-alpha-m-circle-outline", color: "#c75450" },
  new: { icon: "mdi-alpha-n-circle-outline", color: "#c75450" },
  property: { icon: "mdi-alpha-p-circle-outline", color: "#b08b2c" },
  field: { icon: "mdi-alpha-f-box-outline", color: "#e5932c" },
  const: { icon: "mdi-alpha-c-box-outline", color: "#9876aa" },
  var: { icon: "mdi-alpha-v-box-outline", color: "#3592c4" },
  value: { icon: "mdi-circle-small", color: "#e5932c" },
};

/** kindIcon is the icon and color of kind (a tag for one it does not know). */
export function kindIcon(kind: string): { icon: string; color: string } {
  return KIND_ICONS[kind] ?? { icon: "mdi-tag-outline", color: "currentColor" };
}

export default defineComponent({
  name: "StructureTree",
  props: {
    symbols: { type: Array as PropType<OutlineSym[]>, default: () => [] },
    /** Called with the declaration clicked. */
    onNavigate: { type: Function as PropType<(sym: OutlineSym) => void>, default: undefined },
    /** What it says when there is nothing. */
    emptyText: { type: String, default: "No declarations." },
  },
  setup(props) {
    // the nodes closed, by their path of names (all open at first)
    const closed = reactive<Record<string, boolean>>({});

    const node = (sym: OutlineSym, key: string, depth: number): VNode => {
      const kids = sym.children ?? [];
      const open = !closed[key];
      const { icon, color } = kindIcon(sym.kind);
      const row = h(
        "div",
        {
          class: "gad-structure__row",
          title: `${sym.kind} ${sym.name}${sym.detail ? " " + sym.detail : ""} — ${sym.line}:${sym.column}`,
          style: {
            display: "flex", alignItems: "center", gap: "4px", cursor: "pointer",
            padding: `1px 6px 1px ${6 + depth * 14}px`, whiteSpace: "nowrap", fontSize: "13px",
          },
          onClick: () => props.onNavigate?.(sym),
        },
        [
          h(
            "span",
            {
              style: { width: "16px", display: "inline-flex", justifyContent: "center", flex: "0 0 16px" },
              onClick: (e: MouseEvent) => {
                if (!kids.length) return;
                e.stopPropagation();
                closed[key] = open;
              },
            },
            kids.length > 0 ? [h(VIcon, { size: "16" }, () => (open ? "mdi-chevron-down" : "mdi-chevron-right"))] : [],
          ),
          h(VIcon, { size: "16", style: { color } }, () => icon),
          h("span", sym.name),
          sym.detail
            ? h("span", { class: "text-medium-emphasis", style: { overflow: "hidden", textOverflow: "ellipsis" } }, sym.detail)
            : null,
        ],
      );
      return h("div", { key }, [row, ...(open ? kids.map((k, i) => node(k, `${key}/${i}:${k.name}`, depth + 1)) : [])]);
    };

    return () =>
      h(
        "div",
        { class: "gad-structure", style: { overflow: "auto", paddingBlock: "4px" } },
        props.symbols.length === 0
          ? [h("div", { class: "text-medium-emphasis", style: { padding: "8px", fontSize: "13px" } }, props.emptyText)]
          : props.symbols.map((s, i) => node(s, `${i}:${s.name}`, 0)),
      );
  },
});
