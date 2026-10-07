import type { Component, ComputedRef, InjectionKey, Ref } from "vue";

/** ExtraPanel is a panel the host app gives the IDE (GadIde's extraPanels):
 * its component rendered in a dockview panel of the IDE — placed below the
 * editor by default —, in the Settings' panel toggles like the IDE's own,
 * with a button inside it that expands it over the others and brings it back
 * (dockview's maximize); and, with toolbarButton, a button in the Editor's
 * toolbar that opens it (or shows it, when open). */
export interface ExtraPanel {
  /** its id: the dockview panel's and its component's (unique among them) */
  id: string;
  /** its title, the tab's */
  label: string;
  /** an mdi icon: its toolbar button's */
  icon?: string;
  /** what it renders */
  component: Component;
  /** the props it is given */
  props?: Record<string, unknown>;
  /** where it opens: below the editor (default), right of it, or left */
  placement?: "bottom" | "right" | "left";
  /** a button in the Editor's toolbar that opens it */
  toolbarButton?: boolean;
  /** its component draws the expand/collapse button in its own header
   * (ExpandButton, by ExtraPanelExpandKey): none floats over it */
  headerExpand?: boolean;
  /** the titles of its expand and collapse button */
  expandTitle?: string;
  collapseTitle?: string;
}

/** What the IDE's own panels see of the extra ones: the toolbar buttons and
 * how to open one. */
export interface IdeExtraPanels {
  buttons: ComputedRef<{ id: string; label: string; icon: string }[]>;
  open: (id: string) => void;
}

export const IdeExtraPanelsKey: InjectionKey<IdeExtraPanels> = Symbol("gad-ide-extra-panels");

/** What an extra panel's component is given to expand it over the others
 * (dockview's maximize) and bring it back: drawn by ExpandButton in its
 * header (ExtraPanel.headerExpand). */
export interface ExtraPanelExpand {
  maximized: Ref<boolean>;
  toggle: () => void;
  expandTitle: string;
  collapseTitle: string;
}

export const ExtraPanelExpandKey: InjectionKey<ExtraPanelExpand> = Symbol("gad-ide-extra-panel-expand");
