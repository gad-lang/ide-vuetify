// The IDE's words: its own (the namespace `gadIde` of the app's vue-i18n) and
// its Changes and Git panels' (@gad-lang/git-vuetify's, `gadGit`), in the
// app's locale over the defaults (English, Brazilian Portuguese), GadIde's
// `messages` prop over them. The app translates them by merging its own into
// its vue-i18n (`mergeLocaleMessage("pt", { gadIde: {...}, gadGit: {...} })`).
import { computed, type ComputedRef, type InjectionKey } from "vue";
import {
  DEFAULT_GIT_MESSAGES,
  GIT_MESSAGES_PT_BR,
  diffLabels,
  useGitMessages,
  useWords,
  type GitMessages,
  type Locales,
} from "@gad-lang/git-vuetify";

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
export interface IdeMessages extends GitMessages, IdeOwnMessages {}

export const DEFAULT_IDE_OWN_MESSAGES: IdeOwnMessages = {
  preview: "Preview",
  settings: "Settings",
  expand: "Expand",
  restore: "Restore",
  explorer: "Explorer",
  editor: "Editor",
  structure: "Structure",
  output: "Output",
  callStack: "Call Stack",
  locals: "Locals",
  breakpoints: "Breakpoints",
  close: "Close",
  cancel: "Cancel",
  ok: "OK",
  format: "Format",
  reloadFromDisk: "Reload from disk",
  run: "Run",
  debug: "Debug",
  restart: "Restart",
  currentFile: "Current file",
  profiles: "Profiles",
  deleteProfile: "Delete profile",
  newProfile: "New profile…",
  continueRun: "Continue",
  stepOver: "Step Over",
  stepIn: "Step In",
  stepOut: "Step Out",
  noImagePreview: "No preview of images here.",
  selectOrCreate: "Select or create a file to begin.",
  noFile: "(no file)",
  decreaseFont: "Decrease font size",
  increaseFont: "Increase font size",
  newFile: "New file",
  newFolder: "New folder",
  uploadFiles: "Upload files",
  importFromUrl: "Import from URL",
  renameOpenFile: "Rename open file",
  moveOpenFile: "Move open file",
  deleteOpenFile: "Delete open file",
  hideHidden: "Hide hidden files",
  showHidden: "Show hidden files",
  resetChanges: "Reset changes",
  noStructure: "No structure here.",
  noDeclarations: "No declarations.",
  noDocumentation: "No documentation.",
  goToLine: "Go to line",
  editCondition: "Edit condition",
  remove: "Remove",
  all: "All",
  noFileOpen: "No file open.",
  noBreakpoints: "No breakpoints.",
  evaluate: "Evaluate",
  inspectValue: "Inspect value",
  runToSeeOutput: "Run or debug to see output.",
  panels: "Panels",
  formatter: "Formatter",
  transpile: "Transpile",
  template: "Template",
  arrayItemNewLine: "Each array item on its own line",
  dictItemNewLine: "Each dict item on its own line",
  callParamsNewLine: "Each call argument on its own line",
  forceMultiline: "Force the full multi-line layout",
  maxColumns: "Max columns (blank uses the default)",
  keepBackup: "Keep .backup on format",
  move: "Move",
  uploadFile: "Upload file",
  uploadNFiles: "Upload %d files",
  destinationName: "Destination name",
  extractArchiveOf: "Extract archive (%s)",
  targetFolder: "Target folder",
  chooseFolder: "Choose folder",
  replaceExisting: "Replace existing",
  upload: "Upload",
  url: "URL",
  extractArchive: "Extract archive (ZIP / TAR / TAR.GZ)",
  importAction: "Import",
  newRunProfile: "New run profile",
  name: "Name",
  arguments: "Arguments",
  argumentsHint: "Press Enter after each argument (e.g. --count=5, a value, --flag)",
  gadxTagOutput: "GADX tag output",
  renderHtml: "Render (HTML)",
  create: "Create",
  condition: "Condition (Gad expression)",
  conditionHint: "Pause only when this is truthy, e.g. i > 10",
  disabled: "Disabled",
  fileNamePrompt: "File name (e.g. hello.gad)",
  folderName: "Folder name",
  deleteFile: "Delete file",
  deleteConfirm: "Delete %s?",
  rename: "Rename",
  newName: "New name",
  resetWorkspace: "Reset workspace",
  resetConfirm: "Discard all your changes and restore the samples?",
  replaceOne: "\"%s\" already exists — replace it",
  replaceMany: "%d files already exist — replace them",
};

/** IDE_OWN_MESSAGES_PT_BR are the IDE's own texts in Brazilian Portuguese. */
export const IDE_OWN_MESSAGES_PT_BR: IdeOwnMessages = {
  preview: "Visualizar",
  settings: "Configurações",
  expand: "Expandir",
  restore: "Restaurar",
  explorer: "Explorador",
  editor: "Editor",
  structure: "Estrutura",
  output: "Saída",
  callStack: "Pilha de chamadas",
  locals: "Variáveis locais",
  breakpoints: "Pontos de parada",
  close: "Fechar",
  cancel: "Cancelar",
  ok: "OK",
  format: "Formatar",
  reloadFromDisk: "Recarregar do disco",
  run: "Executar",
  debug: "Depurar",
  restart: "Reiniciar",
  currentFile: "Arquivo atual",
  profiles: "Perfis",
  deleteProfile: "Excluir perfil",
  newProfile: "Novo perfil…",
  continueRun: "Continuar",
  stepOver: "Passar por cima",
  stepIn: "Entrar",
  stepOut: "Sair",
  noImagePreview: "Sem visualização de imagens aqui.",
  selectOrCreate: "Selecione ou crie um arquivo para começar.",
  noFile: "(nenhum arquivo)",
  decreaseFont: "Diminuir a fonte",
  increaseFont: "Aumentar a fonte",
  newFile: "Novo arquivo",
  newFolder: "Nova pasta",
  uploadFiles: "Enviar arquivos",
  importFromUrl: "Importar de URL",
  renameOpenFile: "Renomear o arquivo aberto",
  moveOpenFile: "Mover o arquivo aberto",
  deleteOpenFile: "Excluir o arquivo aberto",
  hideHidden: "Ocultar arquivos ocultos",
  showHidden: "Mostrar arquivos ocultos",
  resetChanges: "Desfazer as alterações",
  noStructure: "Nenhuma estrutura aqui.",
  noDeclarations: "Nenhuma declaração.",
  noDocumentation: "Nenhuma documentação.",
  goToLine: "Ir para a linha",
  editCondition: "Editar condição",
  remove: "Remover",
  all: "Todos",
  noFileOpen: "Nenhum arquivo aberto.",
  noBreakpoints: "Nenhum ponto de parada.",
  evaluate: "Avaliar",
  inspectValue: "Inspecionar o valor",
  runToSeeOutput: "Execute ou depure para ver a saída.",
  panels: "Painéis",
  formatter: "Formatador",
  transpile: "Transpilar",
  template: "Template",
  arrayItemNewLine: "Cada item de array numa linha",
  dictItemNewLine: "Cada item de dict numa linha",
  callParamsNewLine: "Cada argumento de chamada numa linha",
  forceMultiline: "Forçar o layout de várias linhas",
  maxColumns: "Máximo de colunas (vazio: o padrão)",
  keepBackup: "Manter .backup ao formatar",
  move: "Mover",
  uploadFile: "Enviar arquivo",
  uploadNFiles: "Enviar %d arquivos",
  destinationName: "Nome de destino",
  extractArchiveOf: "Extrair o arquivo compactado (%s)",
  targetFolder: "Pasta de destino",
  chooseFolder: "Escolher a pasta",
  replaceExisting: "Substituir o existente",
  upload: "Enviar",
  url: "URL",
  extractArchive: "Extrair o arquivo compactado (ZIP / TAR / TAR.GZ)",
  importAction: "Importar",
  newRunProfile: "Novo perfil de execução",
  name: "Nome",
  arguments: "Argumentos",
  argumentsHint: "Tecle Enter após cada argumento (ex.: --count=5, um valor, --flag)",
  gadxTagOutput: "Saída das tags GADX",
  renderHtml: "Renderizar (HTML)",
  create: "Criar",
  condition: "Condição (expressão Gad)",
  conditionHint: "Pausa só quando isto for verdadeiro, ex.: i > 10",
  disabled: "Desativado",
  fileNamePrompt: "Nome do arquivo (ex.: hello.gad)",
  folderName: "Nome da pasta",
  deleteFile: "Excluir arquivo",
  deleteConfirm: "Excluir %s?",
  rename: "Renomear",
  newName: "Novo nome",
  resetWorkspace: "Restaurar o espaço de trabalho",
  resetConfirm: "Descartar todas as suas alterações e restaurar os exemplos?",
  replaceOne: "\"%s\" já existe — substituí-lo",
  replaceMany: "%d arquivos já existem — substituí-los",
};

export const DEFAULT_MESSAGES: IdeMessages = { ...DEFAULT_GIT_MESSAGES, ...DEFAULT_IDE_OWN_MESSAGES };

/** IDE_I18N_NAMESPACE is the namespace of the IDE's own words in the app's
 * vue-i18n: `{ gadIde: { explorer: "…", … } }` in a locale's messages. */
export const IDE_I18N_NAMESPACE = "gadIde";

/** IDE_I18N_MESSAGES are the IDE's defaults by locale, as vue-i18n's messages
 * (the Git panels' are GIT_I18N_MESSAGES). */
export const IDE_I18N_MESSAGES: Locales<{ gadIde: IdeOwnMessages }> = {
  en: { gadIde: DEFAULT_IDE_OWN_MESSAGES },
  pt: { gadIde: IDE_OWN_MESSAGES_PT_BR },
};

export const IdeMessagesKey: InjectionKey<ComputedRef<IdeMessages>> = Symbol("gad-ide-messages");

/** useIdeMessages are the IDE's words — the app's vue-i18n's (gadIde,
 * gadGit) in its locale, over the defaults —, the given ones over them. In
 * setup. */
export function useIdeMessages(given?: () => Partial<IdeMessages> | undefined): ComputedRef<IdeMessages> {
  const own = useWords<IdeOwnMessages>(IDE_I18N_NAMESPACE, { en: DEFAULT_IDE_OWN_MESSAGES, pt: IDE_OWN_MESSAGES_PT_BR }, given);
  const git = useGitMessages(given);
  return computed<IdeMessages>(() => ({ ...git.value, ...own.value }));
}

/** messagesOf are the messages given over the defaults (an empty one is the
 * default's too) — with no vue-i18n. */
export const messagesOf = (given: () => Partial<IdeMessages> | undefined) =>
  computed<IdeMessages>(() => {
    const m = { ...DEFAULT_MESSAGES };
    for (const [k, v] of Object.entries(given() ?? {})) if (typeof v === "string" && v) (m as Record<string, string>)[k] = v;
    return m;
  });

/** fmt fills a text's %s and %d with args, in order. */
export const fmt = (text: string, ...args: (string | number)[]) => {
  let i = 0;
  return text.replace(/%[sd]/g, () => String(args[i++] ?? ""));
};

export { GIT_MESSAGES_PT_BR };

/** diffLabels are the diff browser's label props of the messages. */
export { diffLabels };
