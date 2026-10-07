import { computed, type ComputedRef, type InjectionKey } from "vue";

/** IdeMessages are the texts of the IDE's Changes and Git panels (and of the
 * diff browser in them), translatable: GadIde's `messages` prop gives them —
 * any left out is DEFAULT_MESSAGES' (English). */
export interface IdeMessages {
  /** the Changes panel's title (its tab, its toolbar button) */
  changes: string;
  /** the Git panel's title */
  git: string;
  /** the header's button that opens the Preview panel */
  preview: string;
  /** the header's button that opens the Settings */
  settings: string;
  refresh: string;
  /** the diff browser's tree */
  files: string;
  /** the Git panel's lists of branches */
  branches: string;
  remoteBranches: string;
  /** loads more commits of the log */
  more: string;
  /** shown with no commit chosen */
  chooseCommit: string;
  /** the button that downloads the commit's patch, and its title */
  patch: string;
  downloadCommitPatch: string;
  /** the titles of the downloads of a file of a commit */
  downloadFile: string;
  downloadPatch: string;
  /** the old side of a root commit's file */
  noParent: string;
  /** the title of the button that expands a panel over the others, and of
   * the one that brings it back */
  expand: string;
  restore: string;
  // the diff browser
  old: string;
  current: string;
  binary: string;
  noChanges: string;
  renamedTo: string;
  unchanged: string;
  loading: string;
  loadError: string;
  undo: string;
  redo: string;
  save: string;
  saving: string;
  saved: string;
  unsaved: string;
  revert: string;
  prev: string;
  next: string;
}

export const DEFAULT_MESSAGES: IdeMessages = {
  changes: "Changes",
  git: "Git",
  preview: "Preview",
  settings: "Settings",
  refresh: "Refresh",
  files: "Files",
  branches: "Branches",
  remoteBranches: "Remote",
  more: "More",
  chooseCommit: "Choose a commit.",
  patch: "Patch",
  downloadCommitPatch: "Download the patch of the commit",
  downloadFile: "Download the file (this commit's)",
  downloadPatch: "Download the patch (from the commit before)",
  noParent: "(none)",
  expand: "Expand",
  restore: "Restore",
  old: "Old",
  current: "Current",
  binary: "A binary file: it is not compared.",
  noChanges: "No changes.",
  renamedTo: "Renamed to",
  unchanged: "Its content did not change.",
  loading: "Loading…",
  loadError: "The diff could not be loaded.",
  undo: "Undo",
  redo: "Redo",
  save: "Save",
  saving: "Saving…",
  saved: "Saved",
  unsaved: "Not saved",
  revert: "Revert: the old part into the current",
  prev: "Previous change (Shift+F7)",
  next: "Next change (F7)",
};

export const IdeMessagesKey: InjectionKey<ComputedRef<IdeMessages>> = Symbol("gad-ide-messages");

/** messagesOf are the messages given over the defaults (an empty one is the
 * default's too). */
export const messagesOf = (given: () => Partial<IdeMessages> | undefined) =>
  computed<IdeMessages>(() => {
    const m = { ...DEFAULT_MESSAGES };
    for (const [k, v] of Object.entries(given() ?? {})) if (typeof v === "string" && v) (m as Record<string, string>)[k] = v;
    return m;
  });

/** diffLabels are the diff browser's label props of the messages. */
export const diffLabels = (m: IdeMessages) => ({
  filesTitle: m.files,
  oldLabel: m.old,
  newLabel: m.current,
  binaryText: m.binary,
  emptyText: m.noChanges,
  renamedText: m.renamedTo,
  unchangedText: m.unchanged,
  loadingText: m.loading,
  loadErrorText: m.loadError,
  undoText: m.undo,
  redoText: m.redo,
  saveText: m.save,
  savingText: m.saving,
  savedText: m.saved,
  unsavedText: m.unsaved,
  revertText: m.revert,
  prevText: m.prev,
  nextText: m.next,
});
