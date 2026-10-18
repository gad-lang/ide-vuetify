import { type ComputedRef, type InjectionKey } from "vue";
import { GIT_MESSAGES_PT_BR, diffLabels, type GitMessages, type Locales } from "@gad-lang/git-vuetify";
/** IdeOwnMessages are the texts of the IDE's own: its panels, toolbars,
 * dialogs. */
export interface IdeOwnMessages {
    /** the header's button that opens the Preview panel */
    preview: string;
    /** the header's button that opens the Settings */
    settings: string;
    /** the title of the button that expands a panel over the others */
    expand: string;
    /** the title of the button that brings a panel expanded back */
    restore: string;
    /** title of the panel of the files. */
    explorer: string;
    /** title of the panel of the editor. */
    editor: string;
    /** title of the panel of the declarations of the code. */
    structure: string;
    /** title of the panel of the output of a run. */
    output: string;
    /** title of the panel of the call stack of the debugger. */
    callStack: string;
    /** title of the panel of the local variables of the debugger. */
    locals: string;
    /** title of the panel of the breakpoints. */
    breakpoints: string;
    /** button or title that closes. */
    close: string;
    /** button that cancels a dialog. */
    cancel: string;
    /** button that confirms a dialog. */
    ok: string;
    /** button of the editor that formats the code. */
    format: string;
    /** button of the editor that reads the file again. */
    reloadFromDisk: string;
    /** button of the editor that runs the file. */
    run: string;
    /** button of the editor that debugs the file. */
    debug: string;
    /** button of the editor that restarts the debugger. */
    restart: string;
    /** the file open, as what a run runs. */
    currentFile: string;
    /** title of the list of the run profiles. */
    profiles: string;
    /** title of the button that deletes a run profile. */
    deleteProfile: string;
    /** item that creates a run profile. */
    newProfile: string;
    /** button of the debugger: continues. */
    continueRun: string;
    /** button of the debugger: the next line. */
    stepOver: string;
    /** button of the debugger: into the call. */
    stepIn: string;
    /** button of the debugger: out of the function. */
    stepOut: string;
    /** shown for an image that cannot be shown. */
    noImagePreview: string;
    /** shown in the editor with no file open. */
    selectOrCreate: string;
    /** the status bar with no file open. */
    noFile: string;
    /** title of the button that makes the font smaller. */
    decreaseFont: string;
    /** title of the button that makes the font larger. */
    increaseFont: string;
    /** button and dialog that create a file. */
    newFile: string;
    /** button and dialog that create a folder. */
    newFolder: string;
    /** button that uploads files. */
    uploadFiles: string;
    /** button and dialog that download a file of a URL. */
    importFromUrl: string;
    /** title of the button that renames the file open. */
    renameOpenFile: string;
    /** title of the button that moves the file open. */
    moveOpenFile: string;
    /** title of the button that deletes the file open. */
    deleteOpenFile: string;
    /** title of the button that hides the hidden files. */
    hideHidden: string;
    /** title of the button that shows the hidden files. */
    showHidden: string;
    /** title of the button that resets the workspace. */
    resetChanges: string;
    /** shown when the file has no structure (not code). */
    noStructure: string;
    /** shown when the code declares nothing. */
    noDeclarations: string;
    /** shown when the file has no documentation. */
    noDocumentation: string;
    /** title of a breakpoint: goes to its line. */
    goToLine: string;
    /** title of the button that edits the condition of a breakpoint. */
    editCondition: string;
    /** title of the button that removes a breakpoint. */
    remove: string;
    /** tab of all the breakpoints. */
    all: string;
    /** shown with no file open. */
    noFileOpen: string;
    /** shown with no breakpoints. */
    noBreakpoints: string;
    /** label of the field that evaluates an expression in the debugger. */
    evaluate: string;
    /** title of the button that inspects a value. */
    inspectValue: string;
    /** shown in the panel of the output before a run. */
    runToSeeOutput: string;
    /** tab of the settings: the panels shown. */
    panels: string;
    /** tab of the settings: the formatter. */
    formatter: string;
    /** tab of the settings: the transpiler. */
    transpile: string;
    /** tab of the settings: the templates. */
    template: string;
    /** option of the formatter. */
    arrayItemNewLine: string;
    /** option of the formatter. */
    dictItemNewLine: string;
    /** option of the formatter. */
    callParamsNewLine: string;
    /** option of the formatter. */
    forceMultiline: string;
    /** option of the formatter. */
    maxColumns: string;
    /** option of the formatter. */
    keepBackup: string;
    /** button of the dialog that moves a file. */
    move: string;
    /** title of the dialog that uploads one file. */
    uploadFile: string;
    /** title of the dialog that uploads several files (%d: how many). */
    uploadNFiles: string;
    /** label of the name of an uploaded file. */
    destinationName: string;
    /** option of an upload of an archive (%s: its kind). */
    extractArchiveOf: string;
    /** label of the folder of an upload or import. */
    targetFolder: string;
    /** title of the button that chooses the folder. */
    chooseFolder: string;
    /** option of an upload over a file that exists. */
    replaceExisting: string;
    /** button of the dialog that uploads. */
    upload: string;
    /** label of the URL of an import. */
    url: string;
    /** option of an import of an archive. */
    extractArchive: string;
    /** button of the dialog that imports. */
    importAction: string;
    /** title of the dialog that creates a run profile. */
    newRunProfile: string;
    /** label of a name. */
    name: string;
    /** label of the arguments of a run profile. */
    arguments: string;
    /** hint of the arguments of a run profile. */
    argumentsHint: string;
    /** label of the output of the tags of a gadx run. */
    gadxTagOutput: string;
    /** an output of the tags of a gadx run. */
    renderHtml: string;
    /** button of a dialog that creates. */
    create: string;
    /** label of the condition of a breakpoint. */
    condition: string;
    /** hint of the condition of a breakpoint. */
    conditionHint: string;
    /** option that disables a breakpoint. */
    disabled: string;
    /** label of the name of a new file. */
    fileNamePrompt: string;
    /** label of the name of a new folder. */
    folderName: string;
    /** title of the dialog that deletes a file. */
    deleteFile: string;
    /** question of the dialog that deletes a file (%s: its path). */
    deleteConfirm: string;
    /** title of the dialog that renames a file. */
    rename: string;
    /** label of the new name of a file. */
    newName: string;
    /** title of the dialog that resets the workspace. */
    resetWorkspace: string;
    /** question of the dialog that resets the workspace. */
    resetConfirm: string;
    /** option of an upload over a file that exists (%s: its name). */
    replaceOne: string;
    /** option of an upload over files that exist (%d: how many). */
    replaceMany: string;
}
/** IdeMessages are the IDE's texts and its Changes and Git panels'. */
export interface IdeMessages extends GitMessages, IdeOwnMessages {
}
export declare const DEFAULT_IDE_OWN_MESSAGES: IdeOwnMessages;
/** IDE_OWN_MESSAGES_PT_BR are the IDE's own texts in Brazilian Portuguese. */
export declare const IDE_OWN_MESSAGES_PT_BR: IdeOwnMessages;
export declare const DEFAULT_MESSAGES: IdeMessages;
/** IDE_I18N_NAMESPACE is the namespace of the IDE's own words in the app's
 * vue-i18n: `{ gadIde: { explorer: "…", … } }` in a locale's messages. */
export declare const IDE_I18N_NAMESPACE = "gadIde";
/** IDE_I18N_MESSAGES are the IDE's defaults by locale, as vue-i18n's messages
 * (the Git panels' are GIT_I18N_MESSAGES). */
export declare const IDE_I18N_MESSAGES: Locales<{
    gadIde: IdeOwnMessages;
}>;
export declare const IdeMessagesKey: InjectionKey<ComputedRef<IdeMessages>>;
/** useIdeMessages are the IDE's words — the app's vue-i18n's (gadIde,
 * gadGit) in its locale, over the defaults —, the given ones over them. In
 * setup. */
export declare function useIdeMessages(given?: () => Partial<IdeMessages> | undefined): ComputedRef<IdeMessages>;
/** messagesOf are the messages given over the defaults (an empty one is the
 * default's too) — with no vue-i18n. */
export declare const messagesOf: (given: () => Partial<IdeMessages> | undefined) => ComputedRef<IdeMessages>;
/** fmt fills a text's %s and %d with args, in order. */
export declare const fmt: (text: string, ...args: (string | number)[]) => string;
export { GIT_MESSAGES_PT_BR };
/** diffLabels are the diff browser's label props of the messages. */
export { diffLabels };
