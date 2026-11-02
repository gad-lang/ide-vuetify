var yi = Object.defineProperty;
var Pi = (e, a, l) => a in e ? yi(e, a, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[a] = l;
var fe = (e, a, l) => Pi(e, typeof a != "symbol" ? a + "" : a, l);
import { computed as y, ref as v, shallowRef as ka, reactive as Se, watch as T, onScopeDispose as bi, defineComponent as N, createVNode as i, createTextVNode as S, Fragment as xe, inject as E, mergeProps as Z, onMounted as He, onBeforeUnmount as ze, h as ie, isVNode as Gi, provide as oa } from "vue";
import { themeDark as Zi, themeLight as Ai, DockviewVue as Mi } from "dockview-vue";
import { DEFAULT_GIT_MESSAGES as Bi, useWords as ki, useGitMessages as ji, ChangesPanel as Di, GitPanel as Hi, useStoredSize as da, ResizeHandle as ra, createHttpGitApi as at } from "@gad-lang/git-vuetify";
import { ChangesPanel as ko, DiffBrowser as jo, DiffMergeView as Do, GIT_I18N_MESSAGES as Ho, GIT_I18N_NAMESPACE as zo, GIT_MESSAGES_PT_BR as No, GitPanel as Wo, LANGUAGES as Eo, ResizeHandle as wo, createHttpGitApi as Ro, languageExtensions as Vo, languageOf as Lo, renamedTo as To, statusColor as Yo, treePath as Fo, unchangedContent as Uo, useStoredSize as Jo } from "@gad-lang/git-vuetify";
import { StateField as gt, RangeSet as tt, StateEffect as Ha, Compartment as aa, EditorState as ba } from "@codemirror/state";
import { gutter as zi, EditorView as De, GutterMarker as Ni, hoverTooltip as Wi, Decoration as Ye, keymap as Ei } from "@codemirror/view";
import { indentWithTab as wi, defaultKeymap as Ri, undo as Vi, redo as Li } from "@codemirror/commands";
import { oneDark as it } from "@codemirror/theme-one-dark";
import { StreamLanguage as Ti } from "@codemirror/language";
import { basicSetup as Yi } from "codemirror";
import { gad as Ga } from "@gad-lang/codemirror-gad";
import { json as Fi } from "@codemirror/lang-json";
import { html as Ui } from "@codemirror/lang-html";
import { css as Ji } from "@codemirror/lang-css";
import { javascript as ta } from "@codemirror/lang-javascript";
import { markdown as Xi } from "@codemirror/lang-markdown";
import { yaml as Qi } from "@codemirror/legacy-modes/mode/yaml";
import ye from "prismjs";
import { registerGad as Oi, registerGadTemplate as Ki } from "@gad-lang/prism-gad";
import { VSelect as _i, VBtn as qi, VTabs as $i, VTab as el, VTextField as al, VDialog as tl, VCard as il, VCardTitle as ll, VCardText as nl, VCardActions as ol, VSpacer as dl, VDivider as rl, VMenu as sl, VList as ul, VListItem as cl, VListSubheader as Il, VIcon as gl, VSwitch as pl, VCheckbox as ml, VWindow as vl, VWindowItem as fl, VCombobox as hl, VProgressLinear as Cl, VBtnToggle as Sl } from "vuetify/components";
const za = {
  preview: "Preview",
  settings: "Settings",
  expand: "Expand",
  restore: "Restore",
  repository: "Repository",
  workspaceRepository: "The workspace",
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
  dropMoveTitle: "Move?",
  fromDir: "From",
  toDir: "To",
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
  replaceOne: '"%s" already exists — replace it',
  replaceMany: "%d files already exist — replace them"
}, pt = {
  preview: "Visualizar",
  settings: "Configurações",
  expand: "Expandir",
  restore: "Restaurar",
  repository: "Repositório",
  workspaceRepository: "O espaço de trabalho",
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
  dropMoveTitle: "Mover?",
  fromDir: "De",
  toDir: "Para",
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
  replaceOne: '"%s" já existe — substituí-lo',
  replaceMany: "%d arquivos já existem — substituí-los"
}, Q = { ...Bi, ...za }, xl = "gadIde", yo = {
  en: { gadIde: za },
  pt: { gadIde: pt }
}, O = Symbol("gad-ide-messages");
function yl(e) {
  const a = ki(xl, { en: za, pt }, e), l = ji(e);
  return y(() => ({ ...l.value, ...a.value }));
}
const Te = (e, ...a) => {
  let l = 0;
  return e.replace(/%[sd]/g, () => String(a[l++] ?? ""));
}, mt = Ha.define(), vt = Ha.define();
class Pl extends Ni {
  toDOM() {
    const a = document.createElement("span");
    return a.className = "cm-bp-dot", a.textContent = "●", a;
  }
}
const ja = new Pl(), sa = gt.define({
  create() {
    return tt.empty;
  },
  update(e, a) {
    e = e.map(a.changes);
    for (const l of a.effects)
      if (l.is(vt))
        e = l.value.on ? e.update({ add: [ja.range(l.value.pos)] }) : e.update({ filter: (t) => t !== l.value.pos });
      else if (l.is(mt)) {
        const t = a.state.doc, n = [...new Set(l.value)].filter((o) => o >= 1 && o <= t.lines).sort((o, s) => o - s).map((o) => ja.range(t.line(o).from));
        e = tt.of(n);
      }
    return e;
  }
});
function bl(e) {
  const a = [], l = e.state.field(sa).iter();
  for (; l.value; )
    a.push(e.state.doc.lineAt(l.from).number), l.next();
  return a.sort((t, n) => t - n);
}
function Gl(e, a) {
  e.dispatch({ effects: mt.of(a) });
}
function Zl(e, a) {
  let l = !1;
  return e.state.field(sa).between(a, a, () => {
    l = !0;
  }), l;
}
function Al(e, a) {
  const l = (t) => e(bl(t));
  return [
    sa,
    zi({
      class: "cm-breakpoint-gutter",
      markers: (t) => t.state.field(sa),
      initialSpacer: () => ja,
      domEventHandlers: {
        // A single click toggles the breakpoint: it adds one on an empty line and
        // removes it when the line already has one.
        mousedown(t, n) {
          return t.dispatch({ effects: vt.of({ pos: n.from, on: !Zl(t, n.from) }) }), l(t), !0;
        },
        contextmenu(t, n, o) {
          return a ? (o.preventDefault(), a(t.state.doc.lineAt(n.from).number), !0) : !1;
        }
      }
    }),
    De.baseTheme({
      ".cm-breakpoint-gutter": { width: "1.1em", cursor: "pointer" },
      ".cm-breakpoint-gutter .cm-bp-dot": { color: "#e5484d", paddingLeft: "2px" }
    })
  ];
}
const ft = Ha.define(), Ml = Ye.line({ class: "cm-debug-line" }), Bl = Ye.mark({ class: "cm-debug-node" }), ia = (e) => /[A-Za-z0-9_]/.test(e);
function ht(e, a) {
  let l = Math.min(Math.max(a, 0), e.length);
  if (l >= e.length || !ia(e[l]))
    if (l > 0 && ia(e[l - 1])) l -= 1;
    else return null;
  let t = l, n = l;
  for (; t > 0 && ia(e[t - 1]); ) t--;
  for (; n < e.length && ia(e[n]); ) n++;
  return n <= t ? null : { start: t, end: n, word: e.slice(t, n) };
}
function kl(e, a) {
  if (!a || a.line < 1 || a.line > e.lines) return Ye.none;
  const l = e.line(a.line), t = [Ml.range(l.from)], n = ht(l.text, a.col - 1);
  return n && t.push(Bl.range(l.from + n.start, l.from + n.end)), Ye.set(t, !0);
}
const jl = gt.define({
  create() {
    return Ye.none;
  },
  update(e, a) {
    e = e.map(a.changes);
    for (const l of a.effects) l.is(ft) && (e = kl(a.state.doc, l.value));
    return e;
  },
  provide: (e) => De.decorations.from(e)
});
function Dl(e, a) {
  return [
    jl,
    Wi((l, t) => {
      const n = l.state.doc.lineAt(t), o = ht(n.text, t - n.from);
      if (!o) return null;
      const s = e().get(o.word);
      return s ? {
        pos: n.from + o.start,
        end: n.from + o.end,
        above: !0,
        create() {
          const g = document.createElement("div");
          g.className = "cm-locals-tooltip";
          const u = document.createElement("span");
          u.textContent = `${o.word}: ${s.type} = ${s.value}`;
          const r = document.createElement("button");
          return r.className = "cm-locals-tooltip-copy", r.title = "Copy value", r.textContent = "⎘", r.onclick = (h) => {
            var f;
            h.stopPropagation(), (f = navigator.clipboard) == null || f.writeText(s.value).catch(() => {
            });
          }, g.append(u, r), { dom: g };
        }
      } : null;
    }),
    De.baseTheme({
      ".cm-debug-line": { backgroundColor: "rgba(255, 200, 0, 0.18)" },
      ".cm-debug-node": {
        backgroundColor: "rgba(255, 160, 0, 0.45)",
        outline: "1px solid rgba(255, 140, 0, 0.9)",
        borderRadius: "2px"
      },
      ".cm-locals-tooltip": {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "2px 6px",
        fontFamily: "ui-monospace, monospace",
        fontSize: "0.85em"
      },
      ".cm-locals-tooltip-copy, .cm-locals-tooltip-inspect": {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0 2px",
        fontSize: "1em",
        lineHeight: 1,
        opacity: "0.6",
        color: "inherit",
        "&:hover": { opacity: "1" }
      }
    })
  ];
}
function Ct(e) {
  switch (e.slice(e.lastIndexOf(".") + 1).toLowerCase()) {
    case "gad":
      return "gad";
    case "gadt":
      return "gadt";
    case "gadx":
      return "gadx";
    case "json":
      return "json";
    case "yaml":
    case "yml":
      return "yaml";
    case "html":
    case "htm":
      return "html";
    case "css":
      return "css";
    case "scss":
      return "scss";
    case "js":
    case "mjs":
    case "cjs":
      return "javascript";
    case "ts":
    case "mts":
    case "cts":
      return "typescript";
    case "jsx":
      return "jsx";
    case "tsx":
      return "tsx";
    case "md":
    case "mdx":
    case "markdown":
      return "markdown";
    default:
      return "text";
  }
}
function lt(e, a, l) {
  switch (e) {
    case "gad":
      return Ga({ sourceType: "gad", diagnose: a });
    case "gadt":
      return Ga({ sourceType: "template", delimiters: { start: l == null ? void 0 : l.start, end: l == null ? void 0 : l.end }, preamble: l == null ? void 0 : l.preamble });
    case "gadx":
      return Ga({ sourceType: "gadx", diagnose: a });
    case "json":
      return Fi();
    case "yaml":
      return Ti.define(Qi);
    case "html":
      return Ui();
    case "css":
    case "scss":
      return Ji();
    case "javascript":
      return ta();
    case "typescript":
      return ta({ typescript: !0 });
    case "jsx":
      return ta({ jsx: !0 });
    case "tsx":
      return ta({ jsx: !0, typescript: !0 });
    case "markdown":
      return Xi();
    default:
      return [];
  }
}
function nt(e) {
  return De.theme({ "&": { fontSize: e + "px" } });
}
class Hl {
  constructor(a) {
    fe(this, "view");
    fe(this, "langComp", new aa());
    fe(this, "themeComp", new aa());
    fe(this, "roComp", new aa());
    fe(this, "fontComp", new aa());
    fe(this, "opts");
    this.opts = a;
    const l = ba.create({
      doc: a.doc,
      extensions: [
        Yi,
        Ei.of([wi, ...Ri]),
        this.langComp.of(a.customExtension ? a.customExtension() : lt(a.language, a.diagnose)),
        this.themeComp.of(a.dark ? it : []),
        this.roComp.of(ba.readOnly.of(!!a.readonly)),
        this.fontComp.of(nt(a.fontSize ?? 13)),
        a.breakpoints === !1 ? [] : Al(
          (t) => {
            var n;
            return (n = a.onBreakpointsChange) == null ? void 0 : n.call(a, t);
          },
          (t) => {
            var n;
            return (n = a.onBreakpointContext) == null ? void 0 : n.call(a, t);
          }
        ),
        Dl(() => {
          var t;
          return ((t = a.getLocals) == null ? void 0 : t.call(a)) ?? /* @__PURE__ */ new Map();
        }),
        De.updateListener.of((t) => {
          var n;
          t.docChanged && ((n = a.onChange) == null || n.call(a, t.state.doc.toString()));
        })
      ]
    });
    this.view = new De({ state: l, parent: a.parent });
  }
  getValue() {
    return this.view.state.doc.toString();
  }
  setValue(a) {
    this.view.dispatch({ changes: { from: 0, to: this.view.state.doc.length, insert: a } });
  }
  setLanguage(a, l, t) {
    this.opts.language = a, this.opts.customExtension = t, this.view.dispatch({
      effects: this.langComp.reconfigure(t ? t() : lt(a, l))
    });
  }
  setDark(a) {
    this.view.dispatch({ effects: this.themeComp.reconfigure(a ? it : []) });
  }
  setFontSize(a) {
    this.view.dispatch({ effects: this.fontComp.reconfigure(nt(a)) });
  }
  setReadonly(a) {
    this.view.dispatch({ effects: this.roComp.reconfigure(ba.readOnly.of(a)) });
  }
  setBreakpoints(a) {
    Gl(this.view, a);
  }
  /** setDebugLine highlights the paused line (1-based), or clears it with 0. */
  setDebugLine(a, l = 1) {
    this.view.dispatch({ effects: ft.of(a >= 1 ? { line: a, col: l } : null) });
  }
  undo() {
    Vi(this.view), this.view.focus();
  }
  redo() {
    Li(this.view), this.view.focus();
  }
  /** gotoLine moves the cursor to a 1-based line and scrolls it into view. */
  gotoLine(a, l = 1) {
    const t = this.view.state.doc;
    if (a < 1 || a > t.lines) return;
    const n = t.line(a), o = Math.min(n.from + Math.max(0, l - 1), n.to);
    this.view.dispatch({ selection: { anchor: o }, scrollIntoView: !0 }), this.view.focus();
  }
  destroy() {
    this.view.destroy();
  }
}
Oi(ye);
Ki(ye);
function ua(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ve(e) {
  let a = ua(e);
  return a = a.replace(/`([^`]+)`/g, "<code>$1</code>"), a = a.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), a = a.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>"), a;
}
function zl(e) {
  const a = e.split(`
`);
  let l = "", t = [], n = [], o = [];
  const s = (h) => h.trim().replace(/^\|/, "").replace(new RegExp("(?<!\\\\)\\|$"), "").split(new RegExp("(?<!\\\\)\\|")).map((f) => f.trim().replace(/\\\|/g, "|")), g = () => {
    if (!o.length) return;
    const h = o;
    if (o = [], h.length < 2 || !/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(h[1])) {
      t.push(...h);
      return;
    }
    const f = (x, j) => "<tr>" + s(x).map((w) => `<${j}>${Ve(w)}</${j}>`).join("") + "</tr>";
    l += "<table><thead>" + f(h[0], "th") + "</thead><tbody>" + h.slice(2).map((x) => f(x, "td")).join("") + "</tbody></table>";
  }, u = () => {
    t.length && (l += "<p>" + Ve(t.join(" ")) + "</p>", t = []);
  }, r = () => {
    n.length && (l += "<ul>" + n.map((h) => "<li>" + Ve(h) + "</li>").join("") + "</ul>", n = []);
  };
  for (const h of a) {
    const f = h.trimEnd(), x = /^(#{1,6})\s+(.*)$/.exec(f), j = /^\s*[-*]\s+(.*)$/.exec(f), w = /^\s*>\s?(.*)$/.exec(f);
    if (/^\s*\|/.test(f)) {
      u(), r(), o.push(f);
      continue;
    }
    if (g(), f.trim() === "")
      u(), r();
    else if (x) {
      u(), r();
      const H = x[1].length;
      let G = x[2], k = "";
      const z = /\s*\{data-src-pos="(\d+,\d+)"\}\s*$/.exec(G);
      z && (k = ` data-src-pos="${z[1]}"`, G = G.slice(0, z.index)), l += `<h${H}${k}>${Ve(G)}</h${H}>`;
    } else j ? (u(), n.push(j[1])) : n.length && /^\s+\S/.test(h) ? n[n.length - 1] += " " + f.trim() : w ? (u(), r(), l += "<blockquote>" + Ve(w[1]) + "</blockquote>") : (r(), t.push(f));
  }
  return g(), u(), r(), l;
}
function Na(e) {
  const a = e.split("```");
  let l = "";
  for (let t = 0; t < a.length; t++)
    if (t % 2 === 1) {
      let n = a[t], o = "gad";
      const s = n.indexOf(`
`);
      if (s >= 0) {
        const x = n.slice(0, s).trim();
        /^[a-zA-Z][\w-]*$/.test(x) && (o = x.toLowerCase(), n = n.slice(s + 1));
      }
      n = n.replace(/\n$/, "");
      const g = ye.languages[o] || ye.languages.gad, u = n.split(`
`);
      let r = "", h = [];
      const f = () => {
        if (!h.length) return;
        const x = h.join(`
`);
        r += g ? ye.highlight(x, g, o) : ua(x), r && !r.endsWith(`
`) && (r += `
`), h = [];
      };
      for (const x of u)
        x.startsWith(">>> ") ? (f(), r += `<span class="doc-result">${ua(x)}</span>
`) : h.push(x);
      f(), r = r.replace(/\n$/, ""), l += `<pre class="doc-code language-${o}"><code>${r}</code></pre>`;
    } else
      l += zl(a[t]);
  return l;
}
function ot(e) {
  return e.length ? e.map((a) => (a.kind === "root" ? "" : `<h4>${ua(a.title || a.kind)}</h4>`) + Na(a.content)).join(`
`) : '<p class="text-medium-emphasis">No documentation comments in this file.</p>';
}
const Nl = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp", "ico"];
function St(e) {
  const a = /\.([^./]+)$/.exec(e.toLowerCase());
  switch (a == null ? void 0 : a[1]) {
    case "html":
    case "htm":
      return "html";
    case "md":
    case "markdown":
      return "markdown";
    case "gad":
    case "gadt":
    case "gadx":
      return "gad";
    default:
      return a && Nl.includes(a[1]) ? "image" : "none";
  }
}
const Le = (e) => St(e) === "image", Wl = '<p class="text-medium-emphasis">No documentation for this kind of file.</p>';
function El(e, a) {
  switch (e) {
    case "html":
      return a;
    case "markdown":
      return Na(a);
    case "image":
      return "";
    default:
      return Wl;
  }
}
function xt(e) {
  return Array.from(e ?? []).map((a) => ({
    path: a.webkitRelativePath || a.name,
    file: a
  }));
}
async function wl(e) {
  var t;
  const a = [];
  for (const n of Array.from(e.items)) {
    const o = (t = n.webkitGetAsEntry) == null ? void 0 : t.call(n);
    o && a.push(o);
  }
  if (!a.length) return xt(e.files);
  const l = [];
  return await Promise.all(a.map((n) => yt(n, "", l))), l;
}
async function yt(e, a, l) {
  if (e.isFile) {
    l.push({ path: a + e.name, file: await Tl(e) });
    return;
  }
  const t = await Fl(e);
  await Promise.all(t.map((n) => yt(n, a + e.name + "/", l)));
}
function Rl(e) {
  if (e.includes(0)) return !1;
  try {
    return new TextDecoder("utf-8", { fatal: !0 }).decode(e), !0;
  } catch {
    return !1;
  }
}
function Vl(e) {
  let a = "";
  for (let l = 0; l < e.length; l += 32768) a += String.fromCharCode(...e.subarray(l, l + 32768));
  return btoa(a);
}
function Pt(e, a) {
  return Rl(a) ? { path: e, content: new TextDecoder().decode(a) } : { path: e, content: "", bytes: Vl(a) };
}
async function dt(e, a) {
  return Pt(e, new Uint8Array(await a.arrayBuffer()));
}
async function Ll(e) {
  const a = new Uint8Array(await e.arrayBuffer());
  let l = "";
  for (let t = 0; t < a.length; t++) l += String.fromCharCode(a[t]);
  return btoa(l);
}
function Tl(e) {
  return new Promise((a, l) => e.file(a, l));
}
async function Yl(e, a) {
  const l = Number(e.headers.get("Content-Length") || 0);
  if (!e.body)
    return a(l ? 100 : -1), new Uint8Array(await e.arrayBuffer());
  const t = e.body.getReader(), n = [];
  let o = 0;
  for (a(l ? 0 : -1); ; ) {
    const { done: u, value: r } = await t.read();
    if (u) break;
    r && (n.push(r), o += r.length, l && a(Math.min(100, Math.round(o / l * 100))));
  }
  const s = new Uint8Array(o);
  let g = 0;
  for (const u of n)
    s.set(u, g), g += u.length;
  return a(100), s;
}
function Fl(e) {
  const a = e.createReader(), l = [];
  return new Promise((t, n) => {
    const o = () => a.readEntries((s) => {
      if (!s.length) return t(l);
      l.push(...s), o();
    }, n);
    o();
  });
}
const Ul = [
  { extensions: ["gad"], icon: "mdi-language-go", language: "gad" },
  { extensions: ["gadt"], icon: "mdi-file-code-outline", language: "gadt" },
  { extensions: ["gadx"], icon: "mdi-xml", language: "gadx" },
  { extensions: ["json"], icon: "mdi-code-json", language: "json" },
  { extensions: ["yaml", "yml"], icon: "mdi-file-cog-outline", language: "yaml" },
  { extensions: ["html", "htm"], icon: "mdi-language-html5", language: "html" },
  { extensions: ["css"], icon: "mdi-language-css3", language: "css" },
  { extensions: ["scss"], icon: "mdi-sass", language: "scss" },
  { extensions: ["js", "mjs", "cjs"], icon: "mdi-language-javascript", language: "javascript" },
  { extensions: ["ts", "mts", "cts"], icon: "mdi-language-typescript", language: "typescript" },
  { extensions: ["jsx"], icon: "mdi-language-javascript", language: "jsx" },
  { extensions: ["tsx"], icon: "mdi-language-typescript", language: "tsx" },
  { extensions: ["md", "mdx", "markdown"], icon: "mdi-language-markdown-outline", language: "markdown" }
], Jl = "mdi-file-outline";
function Xl(e) {
  const a = e.lastIndexOf("/"), l = a === -1 ? e : e.slice(a + 1), t = l.lastIndexOf(".");
  return t === -1 ? "" : l.slice(t + 1).toLowerCase();
}
class Ql {
  constructor(a = []) {
    fe(this, "byExt", /* @__PURE__ */ new Map());
    for (const l of [...Ul, ...a])
      for (const t of l.extensions) this.byExt.set(t.toLowerCase(), l);
  }
  handlerFor(a) {
    return this.byExt.get(Xl(a));
  }
  iconFor(a) {
    var l;
    return ((l = this.handlerFor(a)) == null ? void 0 : l.icon) ?? Jl;
  }
  /** languageFor returns the built-in EditorLanguage for a path, or "text" when
   * the handler has none / a custom extension factory (see extensionFor). */
  languageFor(a) {
    var t;
    const l = (t = this.handlerFor(a)) == null ? void 0 : t.language;
    return typeof l == "string" ? l : "text";
  }
  /** extensionFor returns a custom CodeMirror Extension factory when the handler
   * provides one, else undefined (use languageFor instead). */
  extensionFor(a) {
    var t;
    const l = (t = this.handlerFor(a)) == null ? void 0 : t.language;
    return typeof l == "function" ? l : void 0;
  }
}
const q = Symbol("gad-ide-controller"), Ol = /* @__PURE__ */ new Set(["write", "mkfile", "mkdir", "del", "rename", "upload", "fetchUrl"]);
function Kl(e, a) {
  return new Proxy(e, {
    get(l, t, n) {
      const o = Reflect.get(l, t, n);
      return typeof o != "function" || !Ol.has(String(t)) ? o : (...s) => {
        const g = o.apply(l, s);
        return Promise.resolve(g).then(a, a), g;
      };
    }
  });
}
function _l(e, a, l, t = {}) {
  const n = v(0), o = Kl(e, () => n.value++), s = t.onReset, g = () => {
    var d;
    return ((d = t.getWords) == null ? void 0 : d.call(t)) ?? Q;
  }, u = y(() => {
    var d;
    return ((d = t.getReadonly) == null ? void 0 : d.call(t)) ?? !1;
  }), r = (d) => y(() => {
    var I;
    return !u.value && (((I = a.actions) == null ? void 0 : I[d]) ?? !0);
  }), h = r("create"), f = r("edit"), x = r("rename"), j = r("move"), w = r("delete"), H = y(() => r("import").value && !!o.upload), G = new Ql(t.fileTypes), k = (d) => G.iconFor(d), z = y(() => {
    const d = /* @__PURE__ */ new Set(), I = (C) => {
      for (const D of (C == null ? void 0 : C.children) ?? [])
        D.dir ? I(D) : d.add(D.path);
    };
    return I(m.value), d;
  });
  function A(d) {
    return z.value.has(d);
  }
  const m = ka(null), M = Se(/* @__PURE__ */ new Set()), P = v([]), W = v(-1), Y = y(() => {
    var d;
    return ((d = P.value[W.value]) == null ? void 0 : d.path) ?? "";
  }), F = y({
    get: () => {
      var d;
      return ((d = P.value[W.value]) == null ? void 0 : d.content) ?? "";
    },
    set: (d) => {
      const I = P.value[W.value];
      I && (I.content = d);
    }
  }), Pe = y(() => {
    const d = [], I = (C, D) => {
      for (const R of C.children ?? [])
        d.push({ node: R, depth: D }), R.dir && M.has(R.path) && I(R, D + 1);
    };
    return m.value && I(m.value, 0), d;
  }), te = v(!1);
  async function _() {
    m.value = await o.tree(te.value);
    const d = Y.value.split("/");
    for (let I = 1; I < d.length; I++) M.add(d.slice(0, I).join("/"));
  }
  async function Ue() {
    te.value = !te.value, await _();
  }
  async function le(d) {
    const I = P.value.findIndex((D) => D.path === d);
    if (I >= 0) {
      W.value = I;
      return;
    }
    const C = Le(d) ? "" : (await o.read(d)).content;
    P.value.push({ path: d, content: C, saved: C }), W.value = P.value.length - 1;
  }
  const Je = (d) => {
    const I = P.value.find((C) => C.path === d);
    return !!I && I.content !== I.saved;
  };
  function Ia(d) {
    d >= 0 && d < P.value.length && (W.value = d);
  }
  function Xe(d) {
    d < 0 || d >= P.value.length || (P.value.splice(d, 1), W.value >= P.value.length ? W.value = P.value.length - 1 : W.value > d && W.value--);
  }
  function Qe(d) {
    M.has(d) ? M.delete(d) : M.add(d);
  }
  function ee(d) {
    return M.has(d);
  }
  const be = y(() => {
    var d;
    return ((d = t.getAutosave) == null ? void 0 : d.call(t)) ?? !1;
  });
  async function Ne(d) {
    !f.value || d.content === d.saved || (await o.write(d.path, d.content), d.saved = d.content);
  }
  const he = () => Promise.all(P.value.map(Ne));
  T(F, (d) => {
    if (be.value !== !0 || !f.value) return;
    const I = P.value[W.value];
    I && (o.write(I.path, d), I.saved = d);
  });
  let Ie = null;
  T(
    be,
    (d) => {
      Ie && (clearInterval(Ie), Ie = null), typeof d == "number" && d > 0 && (Ie = setInterval(() => void he(), d));
    },
    { immediate: !0 }
  ), bi(() => {
    Ie && clearInterval(Ie);
  });
  function Ge() {
    const d = Y.value.lastIndexOf("/");
    return d === -1 ? "" : Y.value.slice(0, d + 1);
  }
  function Ze(d) {
    for (const I of (d == null ? void 0 : d.children) ?? []) {
      if (!I.dir) return I.path;
      const C = Ze(I);
      if (C) return C;
    }
    return null;
  }
  const Oe = v(null), Ke = v(null);
  function We(d, I, C = "") {
    return new Promise((D) => Oe.value = { title: d, label: I, initial: C, resolve: D });
  }
  function c(d, I) {
    return new Promise((C) => Ke.value = { title: d, message: I, resolve: C });
  }
  async function p() {
    const d = await We(g().newFile, g().fileNamePrompt, "untitled.gad");
    if (!d) return;
    const I = Ge() + d;
    await o.mkfile(I), await _(), await le(I);
  }
  async function B() {
    const d = await We(g().newFolder, g().folderName, "folder");
    d && (await o.mkdir(Ge() + d), await _());
  }
  async function V() {
    const d = Y.value;
    if (!d || !await c(g().deleteFile, Te(g().deleteConfirm, d))) return;
    await o.del(d);
    const I = P.value.findIndex((C) => C.path === d);
    I >= 0 && Xe(I), await _();
  }
  async function J() {
    const d = Y.value;
    if (!d) return;
    const I = d.lastIndexOf("/"), C = I === -1 ? "" : d.slice(0, I + 1), D = await We(g().rename, g().newName, d.slice(I + 1));
    !D || C + D === d || (await o.rename(d, C + D), pe(d, C + D), await _());
  }
  const U = v(null);
  async function ge() {
    const d = Y.value;
    if (!d) return;
    const I = await new Promise((D) => U.value = { path: d, resolve: D });
    if (U.value = null, I === null) return;
    const C = (I ? I.replace(/\/$/, "") + "/" : "") + d.slice(d.lastIndexOf("/") + 1);
    C !== d && (await o.rename(d, C), pe(d, C), await _());
  }
  function pe(d, I) {
    for (const C of P.value)
      C.path === d ? C.path = I : C.path.startsWith(d + "/") && (C.path = I + C.path.slice(d.length));
  }
  async function Ee(d, I) {
    const C = d.slice(d.lastIndexOf("/") + 1), D = d.includes("/") ? d.slice(0, d.lastIndexOf("/")) : "";
    if (!j.value || D === I || I === d || I.startsWith(d + "/")) return;
    const R = (Be) => "/" + Be;
    if (!await c(g().dropMoveTitle, `${C}
${g().fromDir}: ${R(D)}
${g().toDir}: ${R(I)}`)) return;
    const X = (I ? I + "/" : "") + C;
    await o.rename(d, X), pe(d, X), await _();
  }
  async function zt() {
    if (!s || !await c(g().resetWorkspace, g().resetConfirm)) return;
    await s(), P.value = [], W.value = -1, await _();
    const d = Ze(m.value);
    d && await le(d);
  }
  const Nt = y(() => !!s);
  async function ga(d, I) {
    if (!d.length) return;
    const C = (I ?? Ge().replace(/\/$/, "")).replace(/\/$/, ""), D = C ? C + "/" : "", R = d.map((X) => ({ ...X, path: D + X.path }));
    if (t.onUpload) await t.onUpload(R, C);
    else if (H.value)
      for (const X of R) X.archive || await o.upload([X]);
    else for (const X of R) !X.archive && !X.bytes && await o.write(X.path, X.content);
    await _();
    const $ = R.find((X) => !X.archive);
    $ && await le($.path);
  }
  const Wt = v(!1), Ae = v(0);
  function wa(d) {
    const I = d.toLowerCase();
    if (I.endsWith(".zip")) return "zip";
    if (I.endsWith(".tar.gz") || I.endsWith(".tgz")) return "tar.gz";
    if (I.endsWith(".tar")) return "tar";
  }
  async function Et(d, I, C = "") {
    if (Ae.value = 0, H.value && !t.onUpload) {
      Ae.value = -1;
      try {
        const D = decodeURIComponent(new URL(d, location.href).pathname.split("/").pop() || "download"), R = C.replace(/\/$/, ""), $ = (R ? R + "/" : "") + D;
        await o.fetchUrl(d, $), await _(), await le($);
      } finally {
        Ae.value = 0;
      }
      return;
    }
    try {
      const D = await fetch(d);
      if (!D.ok) throw new Error(`${d}: HTTP ${D.status}`);
      const R = await Yl(D, (Be) => Ae.value = Be), $ = decodeURIComponent(new URL(d, location.href).pathname.split("/").pop() || "download"), X = wa($);
      if (I && X) {
        let Be = "";
        for (let Pa = 0; Pa < R.length; Pa++) Be += String.fromCharCode(R[Pa]);
        await ga([{ path: $, content: "", archive: X, bytes: btoa(Be) }], C);
      } else
        await ga([Pt($, R)], C);
    } finally {
      Ae.value = 0;
    }
  }
  const pa = (d) => {
    const I = Ct(d);
    return I === "gadx" ? "gadx" : I === "gadt" ? "gadTemplate" : "gad";
  }, wt = (d, I) => o.diagnose(d, I), ne = v(!1), _e = v(null), Ra = () => ({ source: F.value, path: Y.value, args: [] });
  async function Va(d) {
    const I = d ?? Ra();
    ne.value = !0;
    try {
      _e.value = await o.run({
        source: I.source,
        path: I.path,
        sourceType: pa(I.path),
        args: I.args,
        tagEncode: I.tagEncode || void 0
      });
    } finally {
      ne.value = !1;
    }
  }
  async function Rt() {
    ne.value = !0;
    try {
      const d = await o.format(F.value);
      d.ok ? F.value = d.source : _e.value = { ok: !1, stdout: "", stderr: "", result: "", diagnostics: d.diagnostics };
    } finally {
      ne.value = !1;
    }
  }
  const ma = ka(null);
  function Vt(d) {
    ma.value = d;
  }
  async function Lt() {
    const d = P.value[W.value];
    !d || Le(d.path) || !f.value || (await o.write(d.path, d.content), d.saved = d.content);
  }
  async function La(d) {
    const I = P.value.find((D) => D.path === d);
    if (!I || I.content !== I.saved || Le(d)) return;
    const C = (await o.read(d)).content;
    I.content === I.saved && (I.content = C, I.saved = C);
  }
  async function Tt() {
    await _(), await Promise.all(P.value.map((d) => La(d.path).catch(() => {
    }))), n.value++;
  }
  async function Yt() {
    const d = P.value[W.value];
    if (!d) return;
    if (Le(d.path)) {
      fa.value++;
      return;
    }
    const I = (await o.read(d.path)).content;
    d.content = I, d.saved = I;
  }
  const we = v(t.initialFontSize ?? 13);
  function va(d) {
    var I;
    we.value = Math.max(8, Math.min(32, Math.round(d))), (I = t.onFontSize) == null || I.call(t, we.value);
  }
  const Ft = () => va(we.value + 1), Ut = () => va(we.value - 1);
  function Jt() {
    var d;
    (d = ma.value) == null || d.undo();
  }
  function Xt() {
    var d;
    (d = ma.value) == null || d.redo();
  }
  const Ta = v(""), Qt = y(() => Le(Y.value)), fa = v(0), Ot = (d) => o.rawUrl ? o.rawUrl(d) + (fa.value ? "&v=" + fa.value : "") : "", Ya = v("none");
  let Fa = 0;
  async function Ua() {
    const d = ++Fa, I = St(Y.value);
    let C;
    if (I === "gad" && F.value.trim()) {
      const D = await o.doc(F.value);
      C = ot(D);
    } else I === "gad" ? C = ot([]) : C = El(I, F.value);
    d === Fa && (Ya.value = I, Ta.value = C);
  }
  const me = v(null), ve = v(null), ha = v(""), Ca = Se({}), Me = Se({});
  function Ce(d) {
    return d && Ca[d] || [];
  }
  function Ja(d) {
    return d && Me[d] || {};
  }
  function Kt() {
    const d = {};
    for (const [I, C] of Object.entries(Ca)) C.length && (d[I] = C);
    return d;
  }
  function qe(d, I) {
    const C = [...new Set(I)].sort((R, $) => R - $);
    Ca[d] = C;
    const D = Me[d];
    if (D)
      for (const R of Object.keys(D)) C.includes(Number(R)) || delete D[Number(R)];
  }
  function _t(d, I, C) {
    Me[d] || (Me[d] = {}), Me[d][I] = { ...Me[d][I] || {}, ...C }, Ce(d).includes(I) || qe(d, [...Ce(d), I]);
  }
  function qt(d, I) {
    qe(d, Ce(d).filter((C) => C !== I));
  }
  function $t(d) {
    const I = Ja(d);
    return Ce(d).map((C) => {
      var D, R;
      return { line: C, disabled: (D = I[C]) == null ? void 0 : D.disabled, condition: (R = I[C]) == null ? void 0 : R.condition };
    });
  }
  const ei = y({
    get: () => Ce(Y.value),
    set: (d) => qe(Y.value, d)
  }), Sa = v({ line: 0, seq: 0 });
  function Xa(d) {
    Sa.value = { line: d, seq: Sa.value.seq + 1 };
  }
  async function ai(d, I) {
    d && d !== Y.value && await le(d), Xa(I);
  }
  const Qa = v(null);
  function ti(d, I) {
    Qa.value = { path: d, line: I };
  }
  const ii = y(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.state) === "stopped" ? ve.value.line ?? 0 : 0;
  }), li = y(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.column) ?? 1;
  }), ni = y(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.state) === "stopped";
  }), oi = y(() => {
    var I;
    const d = /* @__PURE__ */ new Map();
    for (const C of ((I = ve.value) == null ? void 0 : I.locals) ?? []) d.set(C.name, C);
    return d;
  }), di = () => oi.value;
  function Oa(d) {
    ve.value = d, d.output && (ha.value += d.output), d.state === "terminated" || d.state === "error" ? me.value = null : d.session && (me.value = d.session);
  }
  async function Ka(d) {
    const I = d ?? Ra();
    ne.value = !0, ha.value = "", ve.value = null, _e.value = null;
    try {
      Oa(
        await o.dbgStart({
          source: I.source,
          path: I.path,
          sourceType: pa(I.path),
          args: I.args,
          breakpoints: Ce(I.path),
          breakpointSpecs: $t(I.path),
          stopOnEntry: !1
        })
      );
    } finally {
      ne.value = !1;
    }
  }
  async function ri(d) {
    if (me.value) {
      ne.value = !0;
      try {
        Oa(await o.dbgCmd(me.value, d));
      } finally {
        ne.value = !1;
      }
    }
  }
  const xa = v(""), _a = v("");
  async function si() {
    if (!me.value || !xa.value.trim()) return;
    const d = await o.dbgEval(me.value, xa.value, !0);
    _a.value = d.ok ? d.value ?? "" : "error: " + (d.error ?? "");
  }
  const ui = async (d) => {
    const I = await o.inspect({
      expr: d,
      session: me.value ?? void 0,
      source: F.value,
      path: Y.value,
      sourceType: qa.value
    });
    return I.ok ? I.inspect ?? null : null;
  }, qa = y(() => pa(Y.value)), $e = y(() => {
    var d;
    return ((d = t.getRunProfiles) == null ? void 0 : d.call(t)) ?? [];
  }), ea = y(() => {
    var d;
    return ((d = t.getRunMode) == null ? void 0 : d.call(t)) ?? "debug";
  }), Re = v(null), ci = v(!1), ya = y(() => $e.value.find((d) => d.name === Re.value) ?? null), Ii = y(() => {
    var d;
    return ((d = ya.value) == null ? void 0 : d.name) ?? g().currentFile;
  }), gi = y(() => ea.value === "run" || ea.value === "debug"), pi = y(() => ea.value === "debug");
  async function $a() {
    const d = ya.value;
    return d ? { source: d.path === Y.value ? F.value : (await o.read(d.path)).content, path: d.path, args: d.args, tagEncode: d.tagEncode } : { source: F.value, path: Y.value, args: [] };
  }
  async function mi() {
    await Va(await $a());
  }
  async function vi() {
    await Ka(await $a());
  }
  function fi(d) {
    var I;
    (I = t.emitRunProfiles) == null || I.call(t, [...$e.value.filter((C) => C.name !== d.name), d]), Re.value = d.name;
  }
  function hi(d) {
    var I;
    (I = t.emitRunProfiles) == null || I.call(t, $e.value.filter((C) => C.name !== d)), Re.value === d && (Re.value = null);
  }
  const et = v(0);
  function Ci() {
    Ua(), et.value++;
  }
  const Si = v(!1);
  async function xi() {
    await _();
    const d = a.openFile || Ze(m.value);
    d && await le(d);
  }
  return {
    api: o,
    dark: l,
    writes: n,
    refreshFile: La,
    filesChanged: Tt,
    workspace: a,
    // tree
    tree: m,
    rows: Pe,
    openPath: Y,
    source: F,
    isExpanded: ee,
    toggleDir: Qe,
    openFile: le,
    tabs: P,
    active: W,
    activateTab: Ia,
    closeTab: Xe,
    isDirty: Je,
    autosave: be,
    tabNameMax: y(() => {
      var d;
      return ((d = t.getTabNameMax) == null ? void 0 : d.call(t)) ?? 25;
    }),
    showHidden: te,
    toggleHidden: Ue,
    newFile: p,
    newDir: B,
    removeOpen: V,
    reset: zt,
    canReset: Nt,
    upload: ga,
    uploadUrl: Et,
    urlDialog: Wt,
    uploadProgress: Ae,
    pathExists: A,
    archiveKind: wa,
    readonly: u,
    fileTypes: G,
    iconFor: k,
    canUpload: y(() => (!!t.onUpload || H.value) && !u.value),
    canCreate: h,
    canRename: x,
    canMove: j,
    canDelete: w,
    renameOpen: J,
    moveOpen: ge,
    moveReq: U,
    dropMove: Ee,
    // an archive is extracted only by a host's onUpload
    canExtract: y(() => !!t.onUpload),
    canEdit: f,
    promptReq: Oe,
    confirmReq: Ke,
    diagnose: wt,
    // run/format/doc
    busy: ne,
    runRes: _e,
    run: Va,
    format: Rt,
    docHtml: Ta,
    docKind: Ya,
    refreshDoc: Ua,
    isImage: Qt,
    imageUrl: Ot,
    // editor actions
    registerEditor: Vt,
    save: Lt,
    reload: Yt,
    undo: Jt,
    redo: Xt,
    fontSize: we,
    incFont: Ft,
    decFont: Ut,
    setFontSize: va,
    // run/debug profiles + gating
    runProfiles: $e,
    runMode: ea,
    activeProfile: Re,
    profileDialog: ci,
    activeProfileObj: ya,
    runLabel: Ii,
    canRun: gi,
    canDebug: pi,
    runActive: mi,
    debugActive: vi,
    addProfile: fi,
    deleteProfile: hi,
    docRequest: et,
    requestDocs: Ci,
    settingsOpen: Si,
    // debug
    session: me,
    snap: ve,
    dbgOutput: ha,
    breakpoints: ei,
    debugLine: ii,
    debugColumn: li,
    stopped: ni,
    getLocals: di,
    debugStart: Ka,
    debugCmd: ri,
    evalExpr: xa,
    evalOut: _a,
    doEval: si,
    inspectFn: ui,
    dialect: qa,
    // breakpoints
    bpFor: Ce,
    bpMetaFor: Ja,
    allBreakpoints: Kt,
    setFileBreakpoints: qe,
    setBpMeta: _t,
    removeBreakpoint: qt,
    gotoTarget: Sa,
    goto: Xa,
    gotoFileLine: ai,
    bpDialog: Qa,
    openBpCondition: ti,
    init: xi
  };
}
const b = qi, Fe = _i, bt = Sl, oe = il, de = ol, re = nl, se = ll, ke = ml, ql = hl, ue = tl, rt = rl, ae = gl, $l = ul, Za = cl, en = Il, an = sl, tn = Cl, ce = dl, Gt = pl, je = el, Zt = $i, K = al, ln = vl, la = fl, At = /* @__PURE__ */ N({
  name: "DirRow",
  props: {
    node: {
      type: Object,
      required: !0
    },
    selected: {
      type: String,
      required: !0
    },
    depth: {
      type: Number,
      default: 0
    },
    onSelect: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    return () => {
      const a = (e.node.children ?? []).filter((l) => l.dir);
      return i(xe, null, [i("div", {
        class: ["dirtree-row", {
          "dirtree-row--active": e.selected === e.node.path
        }],
        style: {
          paddingLeft: 6 + e.depth * 14 + "px"
        },
        onClick: () => e.onSelect(e.node.path)
      }, [i(ae, {
        size: "14",
        class: "mr-1"
      }, {
        default: () => [S("mdi-folder-outline")]
      }), i("span", {
        class: "pnl-ellipsis"
      }, [e.node.name])]), a.map((l) => i(At, {
        key: l.path,
        node: l,
        selected: e.selected,
        depth: e.depth + 1,
        onSelect: e.onSelect
      }, null))]);
    };
  }
}), Wa = /* @__PURE__ */ N({
  name: "DirTree",
  props: {
    root: {
      type: Object,
      default: null
    },
    selected: {
      type: String,
      default: ""
    },
    onSelect: {
      type: Function,
      required: !0
    }
  },
  setup(e) {
    return () => {
      var a;
      return i("div", {
        class: "dirtree"
      }, [i("div", {
        class: ["dirtree-row", {
          "dirtree-row--active": e.selected === ""
        }],
        onClick: () => e.onSelect("")
      }, [i(ae, {
        size: "14",
        class: "mr-1"
      }, {
        default: () => [S("mdi-folder-home-outline")]
      }), i("span", null, [S("/ (root)")])]), (((a = e.root) == null ? void 0 : a.children) ?? []).filter((l) => l.dir).map((l) => i(At, {
        key: l.path,
        node: l,
        selected: e.selected,
        depth: 1,
        onSelect: e.onSelect
      }, null))]);
    };
  }
}), nn = (e) => e.slice(e.lastIndexOf("/") + 1), st = (e, a) => e ? e + "/" + a : a, on = /* @__PURE__ */ N({
  name: "UploadReviewDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: !0
    },
    raw: {
      type: Array,
      default: () => []
    },
    initialDir: {
      type: String,
      default: ""
    }
  },
  emits: {
    "update:modelValue": (e) => !0,
    confirm: (e, a) => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = E(q), t = E(O, y(() => Q)), n = v(""), o = v(""), s = v(!0), g = v(!1), u = v(!1), r = v(!1), h = y(() => e.raw.length === 1), f = y(() => h.value ? l.archiveKind(o.value) : void 0);
    T(() => e.modelValue, (G) => {
      G && (n.value = e.initialDir, o.value = h.value ? nn(e.raw[0].path) : "", s.value = !0, g.value = !1, u.value = !1);
    });
    const x = y(() => h.value ? f.value && s.value ? [] : [st(n.value, o.value)] : e.raw.map((G) => st(n.value, G.path))), j = y(() => x.value.filter((G) => l.pathExists(G))), w = y(() => j.value.length > 0 && !g.value);
    async function H() {
      r.value = !0;
      try {
        let G;
        h.value && f.value && s.value ? G = [{
          path: o.value,
          content: "",
          archive: f.value,
          bytes: await Ll(e.raw[0].file)
        }] : h.value ? G = [await dt(o.value, e.raw[0].file)] : G = await Promise.all(e.raw.map((k) => dt(k.path, k.file))), a("confirm", G, n.value), a("update:modelValue", !1);
      } finally {
        r.value = !1;
      }
    }
    return () => i(ue, Z({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (G) => a("update:modelValue", G)
    }, {
      maxWidth: "520"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => [h.value ? t.value.uploadFile : Te(t.value.uploadNFiles, e.raw.length)]
        }), i(re, null, {
          default: () => [h.value ? i(K, Z({
            modelValue: o.value
          }, {
            "onUpdate:modelValue": (G) => o.value = G
          }, {
            label: t.value.destinationName,
            density: "compact",
            variant: "outlined",
            hideDetails: !0,
            class: "mb-2"
          }), null) : i("div", {
            class: "text-caption mb-2"
          }, [e.raw.slice(0, 6).map((G) => i("div", {
            class: "pnl-ellipsis",
            key: G.path
          }, [G.path])), e.raw.length > 6 && i("div", {
            class: "text-medium-emphasis"
          }, [S("…and "), e.raw.length - 6, S(" more")])]), h.value && f.value && i(Gt, Z({
            modelValue: s.value
          }, {
            "onUpdate:modelValue": (G) => s.value = !!G
          }, {
            label: Te(t.value.extractArchiveOf, f.value.toUpperCase()),
            density: "compact",
            hideDetails: !0,
            color: "primary",
            class: "mb-1"
          }), null), i("div", {
            class: "d-flex align-center",
            style: {
              gap: "4px"
            }
          }, [i(K, {
            modelValue: n.value || "/ (root)",
            label: t.value.targetFolder,
            density: "compact",
            variant: "outlined",
            readonly: !0,
            hideDetails: !0,
            onClick: () => u.value = !u.value
          }, null), i(b, {
            size: "small",
            variant: "text",
            icon: "mdi-folder-search-outline",
            title: t.value.chooseFolder,
            onClick: () => u.value = !u.value
          }, null)]), u.value && i("div", {
            class: "dirtree-box mt-1"
          }, [i(Wa, {
            root: l.tree.value,
            selected: n.value,
            onSelect: (G) => {
              n.value = G, u.value = !1;
            }
          }, null)]), j.value.length > 0 && i(ke, Z({
            modelValue: g.value
          }, {
            "onUpdate:modelValue": (G) => g.value = !!G
          }, {
            label: j.value.length === 1 ? Te(t.value.replaceOne, j.value[0]) : Te(t.value.replaceMany, j.value.length),
            density: "compact",
            hideDetails: !0,
            color: "error",
            class: "mt-2"
          }), null)]
        }), i(de, null, {
          default: () => [i(ce, null, null), i(b, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [t.value.cancel]
          }), i(b, {
            color: "primary",
            loading: r.value,
            disabled: w.value || h.value && !o.value.trim(),
            onClick: H
          }, {
            default: () => [t.value.upload]
          })]
        })]
      })]
    });
  }
}), dn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjRDk3NzA2OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNGRUYzQzc7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+Cjwvc3ZnPgo=", rn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjMDZCNkQ0OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNFMEY3RkE7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAuYmFkZ2UtcmVkICAgeyBmaWxsOiAjRTUzOTM1OyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBnbHlwaCAqLwogICAgICAgICAgICAuYmFkZ2Utd2hpdGUgeyBmaWxsOiAjRkZGRkZGOyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBvdXRsaW5lL2dhcCAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CiAgPCEtLSBHQURUICh0ZW1wbGF0ZSkgYmFkZ2U6IHJlZCAieyIgKyB3aGl0ZSBib3JkZXIvZ2FwICgxcHg7IDJweCBsZWZ0KSwgYm90dG9tLXJpZ2h0LiAtLT4KICA8cmVjdCB4PSIxMiIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMiIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEyIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTQiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTUiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTUiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNSIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTQiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEzIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMSIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjExIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxNSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjE1IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgPHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxNCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEzIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+Cjwvc3ZnPgo=", sn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjMDZCNkQ0OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNFMEY3RkE7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAuYmFkZ2UtcmVkICAgeyBmaWxsOiAjRTUzOTM1OyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBnbHlwaCAqLwogICAgICAgICAgICAuYmFkZ2Utd2hpdGUgeyBmaWxsOiAjRkZGRkZGOyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBvdXRsaW5lL2dhcCAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CiAgICA8IS0tIEdBRFggKHB1ZykgYmFkZ2U6IDFweCByZWQgQCArIDFweCB3aGl0ZSBib3JkZXIvZ2FwLCBib3R0b20tcmlnaHQuIC0tPgogICAgPHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTQiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNSIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTUiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNSIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjE0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTQiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgo8L3N2Zz4K", un = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjRDk3NzA2OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNGRUYzQzc7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAudGVzdC1yZWQgICB7IGZpbGw6ICNEQjU4NjA7IH0gLyogdGVzdCBiYWRnZSBsZWZ0ICovCiAgICAgICAgICAgIC50ZXN0LWdyZWVuIHsgZmlsbDogIzU5QTg2OTsgfSAvKiB0ZXN0IGJhZGdlIHJpZ2h0ICovCiAgICAgICAgICAgIC50ZXN0LXdoaXRlIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiB0ZXN0IGJhZGdlIGRpYW1vbmQvZ2FwICovCiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KCiAgICA8IS0tIENISUZSRVMgKHRvcG8sIHk9MCkgLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMyIgY2xhc3M9Imhvcm4tc2lsdmVyIiAvPgoKICAgIDxyZWN0IHg9IjkiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjQiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMyIgY2xhc3M9Imhvcm4tc2lsdmVyIiAvPgoKICAgIDwhLS0gT1JFTEhBUyBMQVRFUkFJUyAtLT4KICAgIDxyZWN0IHg9IjEiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIyIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjMiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8IS0tIENBQkXDh0EgQUZVTklMQURBIFBBUkEgQkFJWE8gKGZvY2luaG8gZGUgZ2F6ZWxhLCB5PTQgLT4gMTYpIC0tPgogICAgPHJlY3QgeD0iMyIgeT0iNCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjciIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIHRvcG8gbGFyZ28gKG9saG9zKSAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjExIiB3aWR0aD0iOCIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSBhZnVuaWxhIDEgLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIxMyIgd2lkdGg9IjYiIGhlaWdodD0iMyIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gZm9jaW5obyAtLT4KCiAgICA8cmVjdCB4PSI0IiB5PSI1IiB3aWR0aD0iOCIgaGVpZ2h0PSI2IiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjExIiB3aWR0aD0iNiIgaGVpZ2h0PSIyIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KICAgIDxyZWN0IHg9IjYiIHk9IjEzIiB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8IS0tIExJU1RSQSBGQUNJQUwgQ0VOVFJBTCAtLT4KICAgIDxyZWN0IHg9IjciIHk9IjUiIHdpZHRoPSIyIiBoZWlnaHQ9IjEwIiBjbGFzcz0iZnVyLWxpZ2h0IiAvPgogICAgPHJlY3QgeD0iNyIgeT0iMTQiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYXNlLWRhcmsiIC8+IDwhLS0gTmFyaXogLS0+CgogICAgPCEtLSBPTEhPUyBHSUdBTlRFUyAoRXN0aWxvIE1hc2NvdGUgZG8gR28pIC0tPgogICAgPCEtLSBPbGhvIEVzcXVlcmRvIC0tPgogICAgPHJlY3QgeD0iNCIgeT0iNiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIFB1cGlsYSAtLT4KCiAgICA8IS0tIE9saG8gRGlyZWl0byAtLT4KICAgIDxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgY2xhc3M9ImV5ZS13aGl0ZSIgLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIFB1cGlsYSAtLT4KICAgIDwhLS0gVGVzdCBiYWRnZTogY3Jpc3AgcGl4ZWwgZGlhbW9uZCAocmVkIHw8IC8gZ3JlZW4gPnwpLCAxcHggd2hpdGUgYm9yZGVyK2dhcC4gLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjYiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjciIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI3IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI4IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iNiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjYiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjciIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iNyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iNyIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtcmVkIi8+CiAgICA8cmVjdCB4PSI4IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iOSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtcmVkIi8+CiAgICA8cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjExIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1ncmVlbiIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1ncmVlbiIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KPC9zdmc+Cg==";
function ut(e) {
  const a = e.toLowerCase();
  if (a.endsWith("_test.gad")) return un;
  if (a.endsWith(".gadx")) return sn;
  if (a.endsWith(".gadt")) return rn;
  if (a.endsWith(".gad")) return dn;
}
const cn = /* @__PURE__ */ N({
  name: "PanelExplorer",
  setup() {
    const e = E(q), a = E(O, y(() => Q)), l = v(), t = v(null), n = v(!1), o = v([]), s = v(""), g = "application/x-gad-ide-path", u = v(null), r = v(null);
    let h, f = "";
    const x = (m, M) => G(m) !== M && M !== m && !M.startsWith(m + "/");
    function j(m, M, P) {
      const W = u.value;
      return W === null ? !1 : (m.stopPropagation(), x(W, M) ? (m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = "move"), r.value = M, P != null && P.dir && !e.isExpanded(P.path) && f !== P.path && (clearTimeout(h), f = P.path, h = setTimeout(() => {
        r.value === P.path && !e.isExpanded(P.path) && e.toggleDir(P.path);
      }, 700)), !0) : (r.value = null, !0));
    }
    function w(m, M) {
      const P = u.value;
      return P === null ? !1 : (m.preventDefault(), m.stopPropagation(), H(), x(P, M) && e.dropMove(P, M), !0);
    }
    function H() {
      u.value = null, r.value = null, f = "", clearTimeout(h);
    }
    const G = (m) => {
      const M = m.lastIndexOf("/");
      return M === -1 ? "" : m.slice(0, M);
    };
    function k(m, M) {
      m.length && (o.value = m, s.value = M, n.value = !0);
    }
    async function z(m, M) {
      t.value = null, !(!e.canUpload.value || !m.dataTransfer) && k(await wl(m.dataTransfer), M);
    }
    async function A(m) {
      const M = m.target, P = xt(M.files);
      M.value = "", k(P, "");
    }
    return () => i("div", {
      class: "pnl"
    }, [i("div", {
      class: "pnl-head"
    }, [i("span", {
      class: "text-caption font-weight-medium"
    }, [a.value.explorer.toUpperCase()]), i("div", null, [e.canCreate.value && i(xe, null, [i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-file-plus-outline",
      title: a.value.newFile,
      onClick: () => e.newFile()
    }, null), i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-folder-plus-outline",
      title: a.value.newFolder,
      onClick: () => e.newDir()
    }, null)]), e.canUpload.value && i(xe, null, [i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-upload-outline",
      title: a.value.uploadFiles,
      onClick: () => {
        var m;
        return (m = l.value) == null ? void 0 : m.click();
      }
    }, null), i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-link-variant",
      title: a.value.importFromUrl,
      onClick: () => e.urlDialog.value = !0
    }, null)]), e.canRename.value && i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-rename-outline",
      title: a.value.renameOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.renameOpen()
    }, null), e.canMove.value && i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-file-move-outline",
      title: a.value.moveOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.moveOpen()
    }, null), e.canDelete.value && i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-delete-outline",
      title: a.value.deleteOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.removeOpen()
    }, null), i(b, {
      size: "x-small",
      variant: "text",
      icon: e.showHidden.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
      title: e.showHidden.value ? a.value.hideHidden : a.value.showHidden,
      onClick: () => e.toggleHidden()
    }, null), e.canReset.value && e.canEdit.value && i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-backup-restore",
      title: a.value.resetChanges,
      onClick: () => e.reset()
    }, null)])]), i("div", {
      class: ["pnl-body", {
        "pnl-body--drop": e.canUpload.value && t.value === "" || r.value === ""
      }],
      onDragover: (m) => {
        j(m, "") || e.canUpload.value && (m.preventDefault(), t.value = "");
      },
      onDragleave: () => {
        t.value = null, r.value = null;
      },
      onDrop: (m) => {
        w(m, "") || e.canUpload.value && (m.preventDefault(), z(m, ""));
      }
    }, [e.rows.value.map((m) => {
      const M = m.node.dir ? m.node.path : G(m.node.path);
      return i("div", {
        key: m.node.path,
        class: ["pnl-row", {
          "pnl-row--active": m.node.path === e.openPath.value,
          "pnl-row--drop": e.canUpload.value && u.value === null && t.value === M,
          "pnl-row--movedrop": m.node.dir && r.value === m.node.path,
          "pnl-row--dragged": u.value === m.node.path
        }],
        style: {
          paddingLeft: 6 + m.depth * 14 + "px"
        },
        "data-path": m.node.path,
        draggable: e.canMove.value,
        onDragstart: (P) => {
          !e.canMove.value || !P.dataTransfer || (P.dataTransfer.setData(g, m.node.path), P.dataTransfer.effectAllowed = "move", u.value = m.node.path);
        },
        onDragend: H,
        onClick: () => m.node.dir ? e.toggleDir(m.node.path) : e.openFile(m.node.path),
        onDragover: (P) => {
          j(P, M, {
            dir: m.node.dir,
            path: m.node.path
          }) || e.canUpload.value && (P.preventDefault(), P.stopPropagation(), t.value = M);
        },
        onDrop: (P) => {
          w(P, M) || e.canUpload.value && (P.preventDefault(), P.stopPropagation(), z(P, M));
        }
      }, [!m.node.dir && ut(m.node.path) ? i("img", {
        src: ut(m.node.path),
        alt: "",
        width: "16",
        height: "16",
        class: "mr-1",
        style: {
          imageRendering: "pixelated",
          verticalAlign: "-3px"
        }
      }, null) : i(ae, {
        size: "16",
        class: "mr-1"
      }, {
        default: () => [m.node.dir ? e.isExpanded(m.node.path) ? "mdi-folder-open-outline" : "mdi-folder-outline" : e.iconFor(m.node.path)]
      }), i("span", {
        class: "pnl-ellipsis"
      }, [m.node.name])]);
    }), e.canUpload.value && u.value === null && t.value !== null && i("div", {
      class: "pnl-drop-hint"
    }, [S("Drop into "), t.value || "/ (root)"]), r.value !== null && i("div", {
      class: "pnl-drop-hint",
      "data-move-hint": !0
    }, [a.value.move, S(" → /"), r.value])]), i("input", {
      ref: l,
      type: "file",
      multiple: !0,
      style: {
        display: "none"
      },
      onChange: A
    }, null), i(on, Z({
      modelValue: n.value
    }, {
      "onUpdate:modelValue": (m) => n.value = m
    }, {
      raw: o.value,
      initialDir: s.value,
      onConfirm: (m, M) => e.upload(m, M)
    }), null)]);
  }
}), Ea = /* @__PURE__ */ N({
  name: "GadEditor",
  props: {
    path: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      required: !0
    },
    language: {
      type: String,
      default: void 0
    },
    dark: {
      type: Boolean,
      default: !1
    },
    readonly: {
      type: Boolean,
      default: !1
    },
    fontSize: {
      type: Number,
      default: 13
    },
    /** Custom CodeMirror language extension (host-registered file type); replaces
     * the built-in language derived from `path`/`language`. */
    customExtension: {
      type: Function,
      default: void 0
    },
    diagnose: {
      type: Function,
      default: void 0
    },
    breakpoints: {
      type: Array,
      default: () => []
    },
    /** Shows the breakpoint gutter (default true); read when mounted. */
    breakpointGutter: {
      type: Boolean,
      default: !0
    },
    debugLine: {
      type: Number,
      default: 0
    },
    debugColumn: {
      type: Number,
      default: 1
    },
    getLocals: {
      type: Function,
      default: void 0
    },
    /** Navigation request: scroll to `gotoLine`; bump `gotoSeq` to re-trigger. */
    gotoLine: {
      type: Number,
      default: 0
    },
    gotoSeq: {
      type: Number,
      default: 0
    },
    /** Right-click on a breakpoint line: (line) => void (e.g. edit condition). */
    onBreakpointContext: {
      type: Function,
      default: void 0
    }
  },
  emits: {
    "update:modelValue": (e) => !0,
    "update:breakpoints": (e) => !0,
    ready: (e) => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = v();
    let t = null, n = !1;
    const o = () => e.language ?? Ct(e.path);
    return He(() => {
      t = new Hl({
        parent: l.value,
        doc: e.modelValue,
        language: o(),
        dark: e.dark,
        readonly: e.readonly,
        fontSize: e.fontSize,
        diagnose: e.diagnose,
        getLocals: e.getLocals,
        customExtension: e.customExtension,
        onChange: (s) => {
          n = !0, a("update:modelValue", s), n = !1;
        },
        onBreakpointsChange: (s) => a("update:breakpoints", s),
        onBreakpointContext: (s) => {
          var g;
          return (g = e.onBreakpointContext) == null ? void 0 : g.call(e, s);
        },
        breakpoints: e.breakpointGutter
      }), e.breakpoints.length && t.setBreakpoints(e.breakpoints), e.debugLine && t.setDebugLine(e.debugLine, e.debugColumn), a("ready", t);
    }), ze(() => t == null ? void 0 : t.destroy()), T(() => e.modelValue, (s) => {
      t && !n && s !== t.getValue() && t.setValue(s);
    }), T([() => e.path, () => e.language, () => e.customExtension], () => t == null ? void 0 : t.setLanguage(o(), e.diagnose, e.customExtension)), T(() => e.dark, (s) => t == null ? void 0 : t.setDark(s)), T(() => e.readonly, (s) => t == null ? void 0 : t.setReadonly(s)), T(() => e.fontSize, (s) => t == null ? void 0 : t.setFontSize(s)), T(() => e.breakpoints, (s) => t == null ? void 0 : t.setBreakpoints(s ?? [])), T([() => e.debugLine, () => e.debugColumn], ([s, g]) => t == null ? void 0 : t.setDebugLine(s ?? 0, g ?? 1)), T(() => e.gotoSeq, () => {
      e.gotoLine && (t == null || t.gotoLine(e.gotoLine));
    }), () => i("div", {
      ref: l,
      class: "gad-editor"
    }, null);
  }
}), ct = (e) => e.slice(e.lastIndexOf("/") + 1), In = (e, a) => e.length > a ? e.slice(0, a - 1) + "…" : e, gn = /* @__PURE__ */ N({
  name: "PanelEditor",
  setup() {
    const e = E(q), a = E(O, y(() => Q)), l = () => !!e.openPath.value, t = (n, o, s, g = {}) => i(b, {
      size: "small",
      variant: "text",
      icon: n,
      title: o,
      disabled: g.disabled,
      color: g.color,
      onClick: s
    }, null);
    return () => {
      var n;
      return i("div", {
        class: "pnl"
      }, [e.tabs.value.length > 0 && i("div", {
        class: "editor-tabs"
      }, [e.tabs.value.map((o, s) => {
        const g = e.isDirty(o.path);
        return i("div", {
          key: o.path,
          class: ["editor-tab", {
            "editor-tab--active": s === e.active.value,
            "editor-tab--dirty": g
          }],
          title: ct(o.path) + (g ? " • modified" : ""),
          onClick: () => e.activateTab(s),
          onMousedown: (u) => {
            u.button === 1 && (u.preventDefault(), e.closeTab(s));
          }
        }, [i("span", {
          class: "editor-tab-name"
        }, [In(ct(o.path), e.tabNameMax.value)]), i("span", {
          class: ["editor-tab-close", {
            "editor-tab-close--dirty": g
          }],
          title: a.value.close,
          onClick: (u) => {
            u.stopPropagation(), e.closeTab(s);
          }
        }, null)]);
      })]), i("div", {
        class: "pnl-toolbar"
      }, [e.canEdit.value && i(xe, null, [t("mdi-content-save-outline", a.value.save, () => e.save(), {
        disabled: !l() || e.isImage.value
      }), t("mdi-auto-fix", a.value.format, () => e.format(), {
        disabled: !l() || e.isImage.value
      })]), t("mdi-refresh", a.value.reloadFromDisk, () => e.reload(), {
        disabled: !l()
      }), e.canEdit.value && i(xe, null, [t("mdi-undo", a.value.undo, () => e.undo(), {
        disabled: !l() || e.isImage.value
      }), t("mdi-redo", a.value.redo, () => e.redo(), {
        disabled: !l() || e.isImage.value
      })]), e.canRun.value && i(rt, {
        vertical: !0,
        class: "mx-1"
      }, null), e.canRun.value && t("mdi-play", a.value.run, () => e.runActive(), {
        disabled: !l(),
        color: "success"
      }), e.canDebug.value && t(e.session.value ? "mdi-restart" : "mdi-bug", e.session.value ? a.value.restart : a.value.debug, () => e.debugActive(), {
        disabled: !l(),
        color: "warning"
      }), e.canRun.value && i(an, {
        location: "bottom start"
      }, {
        activator: ({
          props: o
        }) => i(b, Z({
          size: "small",
          variant: "text",
          class: "text-none",
          appendIcon: "mdi-chevron-down",
          disabled: !e.canRun.value
        }, o), {
          default: () => [e.runLabel.value]
        }),
        default: () => i($l, {
          density: "compact",
          minWidth: "220"
        }, {
          default: () => [i(Za, {
            title: a.value.currentFile,
            active: e.activeProfile.value === null,
            onClick: () => e.activeProfile.value = null
          }, null), e.runProfiles.value.length > 0 && i(en, null, {
            default: () => [a.value.profiles]
          }), e.runProfiles.value.map((o) => i(Za, {
            key: o.name,
            title: o.name,
            subtitle: o.path + (o.args.length ? " " + o.args.join(" ") : ""),
            active: e.activeProfile.value === o.name,
            onClick: () => e.activeProfile.value = o.name
          }, {
            append: () => i(b, {
              size: "x-small",
              variant: "text",
              icon: "mdi-delete-outline",
              title: a.value.deleteProfile,
              onClick: (s) => {
                s.stopPropagation(), e.deleteProfile(o.name);
              }
            }, null)
          })), i(Za, {
            title: a.value.newProfile,
            prependIcon: "mdi-plus",
            onClick: () => e.profileDialog.value = !0
          }, null)]
        })
      }), e.stopped.value && i(xe, null, [i(rt, {
        vertical: !0,
        class: "mx-1"
      }, null), t("mdi-play-outline", a.value.continueRun, () => e.debugCmd("continue"), {
        disabled: e.busy.value
      }), t("mdi-debug-step-over", a.value.stepOver, () => e.debugCmd("next"), {
        disabled: e.busy.value
      }), t("mdi-debug-step-into", a.value.stepIn, () => e.debugCmd("stepIn"), {
        disabled: e.busy.value
      }), t("mdi-debug-step-out", a.value.stepOut, () => e.debugCmd("stepOut"), {
        disabled: e.busy.value
      })]), ((n = e.snap.value) == null ? void 0 : n.state) === "stopped" && i("span", {
        class: "text-caption ml-2"
      }, [S("stopped ("), e.snap.value.reason, S(") @ "), e.snap.value.line, S(":"), e.snap.value.column])]), i("div", {
        class: "pnl-editor"
      }, [l() && e.isImage.value ? (
        // an image: shown whole, its aspect ratio kept
        i("div", {
          class: "gad-ide__image"
        }, [e.imageUrl(e.openPath.value) ? i("img", {
          src: e.imageUrl(e.openPath.value),
          alt: e.openPath.value
        }, null) : i("span", {
          class: "text-medium-emphasis"
        }, [a.value.noImagePreview])])
      ) : l() ? i(Ea, Z({
        key: e.openPath.value + (e.canDebug.value ? ":debug" : ""),
        modelValue: e.source.value
      }, {
        "onUpdate:modelValue": (o) => e.source.value = o
      }, {
        breakpoints: e.breakpoints.value,
        breakpointGutter: e.canDebug.value
      }, {
        "onUpdate:breakpoints": (o) => e.breakpoints.value = o
      }, {
        path: e.openPath.value,
        dark: e.dark.value,
        readonly: e.readonly.value || !e.canEdit.value,
        fontSize: e.fontSize.value,
        customExtension: e.fileTypes.extensionFor(e.openPath.value),
        diagnose: e.diagnose,
        debugLine: e.debugLine.value,
        debugColumn: e.debugColumn.value,
        getLocals: e.getLocals,
        gotoLine: e.gotoTarget.value.line,
        gotoSeq: e.gotoTarget.value.seq,
        onBreakpointContext: (o) => e.openBpCondition(e.openPath.value, o),
        onReady: (o) => e.registerEditor(o)
      }), null) : i("div", {
        class: "pa-4 text-medium-emphasis"
      }, [a.value.selectOrCreate])]), i("div", {
        class: "editor-statusbar"
      }, [i("span", {
        class: "editor-statusbar-path",
        title: e.openPath.value
      }, [e.openPath.value || a.value.noFile]), i("span", {
        class: "editor-statusbar-font"
      }, [i("button", {
        class: "fs-btn",
        title: a.value.decreaseFont,
        onClick: () => e.decFont()
      }, [S("A-")]), i("span", {
        class: "fs-val"
      }, [e.fontSize.value, S("px")]), i("button", {
        class: "fs-btn",
        title: a.value.increaseFont,
        onClick: () => e.incFont()
      }, [S("A+")])])])]);
    };
  }
}), pn = /* @__PURE__ */ N({
  name: "PanelCallStack",
  setup() {
    const e = E(q);
    return () => {
      var a, l, t;
      return i("div", {
        class: "pnl"
      }, [i("div", {
        class: "pnl-body"
      }, [i("ul", {
        class: "pnl-list"
      }, [(((a = e.snap.value) == null ? void 0 : a.frames) ?? []).map((n, o) => i("li", {
        key: o
      }, [n.name, S(" "), i("span", {
        class: "text-medium-emphasis"
      }, [S("@ "), n.line, S(":"), n.column])])), !((t = (l = e.snap.value) == null ? void 0 : l.frames) != null && t.length) && i("li", {
        class: "text-medium-emphasis"
      }, [S("(not paused)")])])])]);
    };
  }
}), Mt = /* @__PURE__ */ N({
  name: "InspectorNode",
  props: {
    inspect: {
      type: Function,
      required: !0
    },
    label: {
      type: String,
      required: !0
    },
    expr: {
      type: String,
      required: !0
    },
    type: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    expandable: {
      type: Boolean,
      default: !1
    },
    depth: {
      type: Number,
      default: 0
    },
    root: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const a = v(!1), l = v(!1), t = v(null), n = v(e.type), o = v(e.value), s = v(e.expandable);
    async function g() {
      l.value = !0;
      const r = await e.inspect(e.expr);
      if (l.value = !1, !r) {
        t.value = [];
        return;
      }
      n.value = r.type, o.value = r.value, s.value = r.expandable, t.value = r.entries ?? [];
    }
    async function u() {
      s.value && (t.value === null && await g(), a.value = !a.value);
    }
    return He(() => {
      e.root && g();
    }), () => i("div", {
      class: "ins-node"
    }, [i("div", {
      class: "ins-row",
      style: {
        paddingLeft: e.depth * 14 + "px"
      },
      onClick: u
    }, [i("span", {
      class: "ins-twist"
    }, [s.value ? a.value ? "▾" : "▸" : "·"]), i("span", {
      class: "ins-key"
    }, [e.label]), i("span", {
      class: "ins-type"
    }, [n.value]), i("span", {
      class: "ins-val"
    }, [o.value]), l.value && i("span", {
      class: "ins-load"
    }, [S("…")])]), a.value && t.value ? t.value.map((r) => i(Mt, {
      key: r.accessor,
      inspect: e.inspect,
      label: r.key,
      expr: e.expr + r.accessor,
      type: r.type,
      value: r.value,
      expandable: r.expandable,
      depth: e.depth + 1
    }, null)) : null]);
  }
}), mn = /* @__PURE__ */ N({
  name: "PanelLocals",
  setup() {
    const e = E(q), a = E(O, y(() => Q)), l = v(!1), t = v(""), n = v(""), o = (s, g) => {
      s.trim() && (t.value = s, n.value = g, l.value = !0);
    };
    return () => {
      var s, g, u;
      return i("div", {
        class: "pnl"
      }, [i("div", {
        class: "pnl-body"
      }, [i("div", {
        class: "d-flex align-center",
        style: {
          gap: "4px"
        }
      }, [i(K, Z({
        modelValue: e.evalExpr.value
      }, {
        "onUpdate:modelValue": (r) => e.evalExpr.value = r
      }, {
        label: a.value.evaluate,
        density: "compact",
        variant: "outlined",
        hideDetails: !0,
        onKeyup: (r) => r.key === "Enter" && e.doEval()
      }), null), i(b, {
        size: "small",
        variant: "tonal",
        disabled: !e.stopped.value,
        onClick: () => e.doEval()
      }, {
        default: () => [S("Eval")]
      }), i(b, {
        size: "x-small",
        variant: "text",
        icon: "mdi-file-tree-outline",
        title: a.value.inspectValue,
        disabled: !e.evalExpr.value.trim(),
        onClick: () => o(e.evalExpr.value, e.evalExpr.value)
      }, null)]), e.evalOut.value && i("pre", {
        class: "pnl-out"
      }, [e.evalOut.value]), i("div", {
        class: "text-caption text-medium-emphasis mt-2 mb-1"
      }, [a.value.locals.toUpperCase()]), i("ul", {
        class: "pnl-list"
      }, [(((s = e.snap.value) == null ? void 0 : s.locals) ?? []).map((r, h) => i("li", {
        key: h,
        class: "pnl-local"
      }, [i("span", {
        class: "pnl-ellipsis"
      }, [r.name, S(" = "), r.value, S(" "), i("span", {
        class: "text-medium-emphasis"
      }, [S("("), r.type, S(")")])]), i(b, {
        size: "x-small",
        variant: "text",
        icon: "mdi-file-tree-outline",
        title: a.value.inspectValue,
        onClick: () => o(r.name, r.name)
      }, null)])), !((u = (g = e.snap.value) == null ? void 0 : g.locals) != null && u.length) && i("li", {
        class: "text-medium-emphasis"
      }, [S("(none)")])])]), i(ue, Z({
        modelValue: l.value
      }, {
        "onUpdate:modelValue": (r) => l.value = r
      }, {
        maxWidth: "720",
        scrollable: !0
      }), {
        default: () => [i(oe, null, {
          default: () => [i(se, {
            class: "text-subtitle-1"
          }, {
            default: () => [S("Inspect — "), n.value]
          }), i(re, {
            style: {
              maxHeight: "60vh",
              overflow: "auto"
            }
          }, {
            default: () => [l.value && i(Mt, {
              key: t.value,
              inspect: e.inspectFn,
              label: n.value,
              expr: t.value,
              root: !0
            }, null)]
          }), i(de, null, {
            default: () => [i(ce, null, null), i(b, {
              onClick: () => l.value = !1
            }, {
              default: () => [a.value.close]
            })]
          })]
        })]
      })]);
    };
  }
}), vn = /* @__PURE__ */ N({
  name: "PanelOutput",
  setup() {
    const e = E(q), a = E(O, y(() => Q));
    return () => {
      var t;
      const l = e.runRes.value;
      return i("div", {
        class: "pnl"
      }, [i("div", {
        class: "pnl-body"
      }, [l && i(xe, null, [l.stdout && i("pre", {
        class: "pnl-out"
      }, [l.stdout]), l.stderr && i("pre", {
        class: "pnl-out pnl-out--err"
      }, [l.stderr]), l.ok && l.result && i("div", {
        class: "pnl-return"
      }, [S("↩ "), l.result]), (l.diagnostics ?? []).map((n, o) => i("div", {
        key: o,
        class: "pnl-diag"
      }, [n.line, S(":"), n.column, S(" "), n.message]))]), e.dbgOutput.value && i("pre", {
        class: "pnl-out"
      }, [e.dbgOutput.value]), (((t = e.snap.value) == null ? void 0 : t.diagnostics) ?? []).map((n, o) => i("div", {
        key: "s" + o,
        class: "pnl-diag"
      }, [n.line, S(":"), n.column, S(" "), n.message])), !l && !e.dbgOutput.value && i("div", {
        class: "text-medium-emphasis"
      }, [a.value.runToSeeOutput])])]);
    };
  }
});
function fn(e) {
  const a = e.replace(/^\/+/, ""), l = a.lastIndexOf("/");
  return l === -1 ? "" : a.slice(0, l);
}
function Da(e, a) {
  const l = e.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, ""), t = /^([a-z][a-z0-9+.-]*:\/\/|\/\/|\/)/i.exec(l), n = t ? t[1] : "", o = [];
  for (const s of l.slice(n.length).split("/"))
    s === "" || s === "." || (s === ".." ? o.pop() : o.push(s));
  return n + o.join("/");
}
function hn(e, a, l) {
  return !e || e.startsWith("#") || e.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(e) ? null : e.startsWith("/") ? Da(a, e) : Da(l, e);
}
function ca(e, a, l) {
  if (!e || typeof DOMParser > "u") return e;
  const t = l ? l(a) : "doc", n = fn(a), o = n ? Da(t, n) : t, s = new DOMParser().parseFromString(e, "text/html");
  for (const g of ["src", "href"])
    s.querySelectorAll(`[${g}]`).forEach((u) => {
      const r = hn(u.getAttribute(g) ?? "", t, o);
      r !== null && u.setAttribute(g, r);
    });
  return s.body.innerHTML;
}
function Cn(e) {
  return e.endsWith(".gadx") ? "gadx" : e.endsWith(".gadt") ? "gadTemplate" : "gad";
}
const Sn = {
  gad: "DOCS",
  html: "HTML",
  markdown: "MARKDOWN",
  image: "IMAGE",
  none: "PREVIEW"
}, xn = /* @__PURE__ */ N({
  name: "PanelDocs",
  setup() {
    const e = E(q), a = E(O, y(() => Q)), l = v(""), t = v(""), n = v(!1);
    let o;
    async function s() {
      if (!(e.docKind.value !== "gad" || !e.openPath.value)) {
        n.value = !0;
        try {
          const r = await e.api.docGen(e.source.value, Cn(e.openPath.value), "render-html");
          l.value = r.ok ? r.html ?? "" : "", t.value = r.ok ? "" : r.error ?? "";
        } catch (r) {
          l.value = "", t.value = r instanceof Error ? r.message : String(r);
        } finally {
          n.value = !1;
        }
      }
    }
    const g = async () => {
      await e.refreshDoc(), await s();
    };
    He(g), ze(() => clearTimeout(o)), T(() => e.openPath.value, g), T(() => e.source.value, () => {
      e.docKind.value === "gad" && (clearTimeout(o), o = setTimeout(s, 500));
    });
    const u = (r) => {
      var x;
      const h = (x = r.target.closest("[data-src-pos]")) == null ? void 0 : x.getAttribute("data-src-pos");
      if (!h) return;
      const [f] = h.split(",").map(Number);
      f && e.goto(f);
    };
    return () => i("div", {
      class: "pnl"
    }, [i("div", {
      class: "pnl-head"
    }, [i("span", {
      class: "text-caption font-weight-medium"
    }, [Sn[e.docKind.value]]), i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-refresh",
      title: a.value.refresh,
      loading: n.value,
      onClick: g
    }, null)]), e.docKind.value === "html" ? i("iframe", {
      class: "pnl-body gad-ide__preview-frame",
      sandbox: "",
      srcdoc: e.docHtml.value,
      title: e.openPath.value
    }, null) : e.docKind.value === "image" ? i("div", {
      class: "pnl-body gad-ide__image"
    }, [e.imageUrl(e.openPath.value) ? i("img", {
      src: e.imageUrl(e.openPath.value),
      alt: e.openPath.value
    }, null) : i("span", {
      class: "text-medium-emphasis"
    }, [a.value.noImagePreview])]) : e.docKind.value === "gad" ? i("div", {
      class: "pnl-body gad-ide__doc",
      "data-ide-doc-gen": !0,
      onClick: u
    }, [t.value ? i("pre", {
      class: "text-error text-caption",
      style: {
        whiteSpace: "pre-wrap"
      }
    }, [t.value]) : l.value ? i("div", {
      class: "gp-doc-rendered",
      innerHTML: ca(l.value, e.openPath.value)
    }, null) : i("span", {
      class: "text-medium-emphasis"
    }, [a.value.noDocumentation])]) : i("div", {
      class: "pnl-body gad-ide__doc",
      innerHTML: ca(e.docHtml.value, e.openPath.value)
    }, null)]);
  }
}), yn = {
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
  overload: { icon: "mdi-function-variant", color: "#c75450" }
};
function Pn(e) {
  return yn[e] ?? { icon: "mdi-tag-outline", color: "currentColor" };
}
const bn = N({
  name: "StructureTree",
  props: {
    symbols: { type: Array, default: () => [] },
    /** Called with the declaration clicked. */
    onNavigate: { type: Function, default: void 0 },
    /** What it says when there is nothing. */
    emptyText: { type: String, default: "No declarations." }
  },
  setup(e) {
    const a = Se({}), l = (t, n, o) => {
      const s = t.children ?? [], g = !a[n], { icon: u, color: r } = Pn(t.kind), h = ie(
        "div",
        {
          class: "gad-structure__row",
          title: `${t.kind} ${t.name}${t.detail ? " " + t.detail : ""} — ${t.line}:${t.column}`,
          style: {
            display: "flex",
            alignItems: "center",
            gap: "4px",
            cursor: "pointer",
            padding: `1px 6px 1px ${6 + o * 14}px`,
            whiteSpace: "nowrap",
            fontSize: "13px"
          },
          onClick: () => {
            var f;
            return (f = e.onNavigate) == null ? void 0 : f.call(e, t);
          }
        },
        [
          ie(
            "span",
            {
              style: { width: "16px", display: "inline-flex", justifyContent: "center", flex: "0 0 16px" },
              onClick: (f) => {
                s.length && (f.stopPropagation(), a[n] = g);
              }
            },
            s.length > 0 ? [ie(ae, { size: "16" }, () => g ? "mdi-chevron-down" : "mdi-chevron-right")] : []
          ),
          ie(ae, { size: "16", style: { color: r } }, () => u),
          ie("span", t.name),
          t.detail ? ie("span", { class: "text-medium-emphasis", style: { overflow: "hidden", textOverflow: "ellipsis" } }, t.detail) : null
        ]
      );
      return ie("div", { key: n }, [h, ...g ? s.map((f, x) => l(f, `${n}/${x}:${f.name}`, o + 1)) : []]);
    };
    return () => ie(
      "div",
      { class: "gad-structure", style: { overflow: "auto", paddingBlock: "4px" } },
      e.symbols.length === 0 ? [ie("div", { class: "text-medium-emphasis", style: { padding: "8px", fontSize: "13px" } }, e.emptyText)] : e.symbols.map((t, n) => l(t, `${n}:${t.name}`, 0))
    );
  }
}), Gn = /* @__PURE__ */ N({
  name: "PanelStructure",
  setup() {
    const e = E(q), a = E(O, y(() => Q)), l = v([]), t = v("");
    let n;
    async function o() {
      const g = e.api.symbols;
      if (!g || !e.openPath.value) {
        l.value = [];
        return;
      }
      try {
        l.value = await g(e.source.value, e.openPath.value), t.value = "";
      } catch (u) {
        t.value = u instanceof Error ? u.message : String(u);
      }
    }
    const s = () => {
      clearTimeout(n), n = setTimeout(o, 400);
    };
    return He(o), ze(() => clearTimeout(n)), T(() => e.openPath.value, o), T(() => e.source.value, s), () => i("div", {
      class: "pnl"
    }, [i("div", {
      class: "pnl-head"
    }, [i("span", {
      class: "text-caption font-weight-medium"
    }, [a.value.structure.toUpperCase()]), i(b, {
      size: "x-small",
      variant: "text",
      icon: "mdi-refresh",
      title: a.value.refresh,
      onClick: o
    }, null)]), i("div", {
      class: "pnl-body",
      style: {
        padding: 0
      }
    }, [e.api.symbols ? i(bn, {
      symbols: l.value,
      emptyText: t.value || a.value.noDeclarations,
      onNavigate: (g) => e.goto(g.line)
    }, null) : i("div", {
      class: "text-medium-emphasis",
      style: {
        padding: "8px"
      }
    }, [a.value.noStructure])])]);
  }
}), Zn = /* @__PURE__ */ N({
  name: "PanelBreakpoints",
  setup() {
    const e = E(q), a = E(O, y(() => Q)), l = v("current"), t = (n, o) => {
      const s = e.bpMetaFor(n)[o] || {};
      return i("div", {
        key: n + ":" + o,
        class: ["bp-row", {
          "bp-row--off": s.disabled
        }]
      }, [i("span", {
        class: "bp-entry",
        title: a.value.goToLine,
        onClick: () => e.gotoFileLine(n, o)
      }, [i(ae, {
        size: "14",
        color: "error",
        class: "mr-1"
      }, {
        default: () => [S("mdi-circle")]
      }), l.value === "all" ? n + ":" + o : "line " + o, s.condition ? i("em", {
        class: "bp-cond"
      }, [S(" if "), s.condition]) : null]), i("span", {
        class: "bp-actions"
      }, [i(b, {
        size: "x-small",
        variant: "text",
        icon: "mdi-pencil-outline",
        title: a.value.editCondition,
        onClick: () => e.openBpCondition(n, o)
      }, null), i(b, {
        size: "x-small",
        variant: "text",
        icon: "mdi-close",
        title: a.value.remove,
        onClick: () => e.removeBreakpoint(n, o)
      }, null)])]);
    };
    return () => {
      const n = e.openPath.value, o = e.allBreakpoints();
      return i("div", {
        class: "pnl"
      }, [i(Zt, Z({
        modelValue: l.value
      }, {
        "onUpdate:modelValue": (s) => l.value = s
      }, {
        density: "compact"
      }), {
        default: () => [i(je, {
          value: "current"
        }, {
          default: () => [a.value.currentFile]
        }), i(je, {
          value: "all"
        }, {
          default: () => [a.value.all]
        })]
      }), i("div", {
        class: "pnl-body"
      }, [l.value === "current" ? n ? e.bpFor(n).length ? e.bpFor(n).map((s) => t(n, s)) : i("div", {
        class: "text-medium-emphasis"
      }, [S("No breakpoints in "), n.split("/").pop(), S(".")]) : i("div", {
        class: "text-medium-emphasis"
      }, [a.value.noFileOpen]) : Object.keys(o).length ? Object.entries(o).flatMap(([s, g]) => g.map((u) => t(s, u))) : i("div", {
        class: "text-medium-emphasis"
      }, [a.value.noBreakpoints])])]);
    };
  }
}), An = /* @__PURE__ */ N({
  name: "BreakpointConditionDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: !0
    },
    line: {
      type: Number,
      default: 0
    },
    initial: {
      type: Object,
      default: () => ({})
    }
  },
  emits: {
    "update:modelValue": (e) => !0,
    save: (e) => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = E(O, y(() => Q)), t = v(e.initial.condition ?? ""), n = v(!!e.initial.disabled);
    T(() => e.modelValue, (s) => {
      s && (t.value = e.initial.condition ?? "", n.value = !!e.initial.disabled);
    });
    function o() {
      a("save", {
        condition: t.value.trim() || void 0,
        disabled: n.value
      }), a("update:modelValue", !1);
    }
    return () => i(ue, Z({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (s) => a("update:modelValue", s)
    }, {
      maxWidth: "440"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => [S("Breakpoint · line "), e.line]
        }), i(re, null, {
          default: () => [i(K, Z({
            modelValue: t.value
          }, {
            "onUpdate:modelValue": (s) => t.value = s
          }, {
            label: l.value.condition,
            hint: l.value.conditionHint,
            persistentHint: !0,
            density: "compact",
            variant: "outlined",
            autofocus: !0,
            onKeyup: (s) => s.key === "Enter" && o()
          }), null), i(ke, Z({
            modelValue: n.value
          }, {
            "onUpdate:modelValue": (s) => n.value = !!s
          }, {
            label: l.value.disabled,
            density: "compact",
            hideDetails: !0,
            class: "mt-2"
          }), null)]
        }), i(de, null, {
          default: () => [i(ce, null, null), i(b, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [l.value.cancel]
          }), i(b, {
            color: "primary",
            onClick: o
          }, {
            default: () => [l.value.save]
          })]
        })]
      })]
    });
  }
});
function Mn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Gi(e);
}
const Aa = [["array-item-in-new-line", "arrayItemNewLine"], ["dict-item-in-new-line", "dictItemNewLine"], ["call-params-in-new-line", "callParamsNewLine"]], Bn = /* @__PURE__ */ N({
  name: "SettingsDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: !0
    },
    config: {
      type: Object,
      required: !0
    },
    panels: {
      type: Array,
      default: () => []
    },
    onTogglePanel: {
      type: Function,
      required: !0
    }
  },
  emits: {
    "update:modelValue": (e) => !0,
    save: (e) => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = E(O, y(() => Q)), t = v("panels"), n = (A) => e.config[A] || {}, o = n("fmt"), s = n("transpile"), g = n("template"), u = Se(Object.fromEntries(Aa.map(([A]) => [A, o[A] === !0]))), r = v(o.format === !0), h = v(String(o["max-columns"] ?? "")), f = v(o.backup === !0), x = v(String(s.writeFunc ?? "")), j = v(String(s.rawStrFuncStart ?? "")), w = v(String(s.rawStrFuncEnd ?? "")), H = v(String(g.start_delimiter ?? "")), G = v(String(g.end_delimiter ?? ""));
    function k() {
      const A = {
        ...o
      };
      for (const [F] of Aa)
        u[F] ? A[F] = !0 : delete A[F];
      r.value ? A.format = !0 : delete A.format;
      const m = parseInt(h.value, 10);
      Number.isFinite(m) && m > 0 ? A["max-columns"] = m : delete A["max-columns"], f.value ? A.backup = !0 : delete A.backup;
      const M = {
        ...s
      }, P = (F, Pe, te) => {
        te.trim() === "" ? delete F[Pe] : F[Pe] = te;
      };
      P(M, "writeFunc", x.value), P(M, "rawStrFuncStart", j.value), P(M, "rawStrFuncEnd", w.value);
      const W = {
        ...g
      };
      H.value === "" ? delete W.start_delimiter : W.start_delimiter = H.value, G.value === "" ? delete W.end_delimiter : W.end_delimiter = G.value;
      const Y = {
        ...e.config,
        fmt: A
      };
      Object.keys(M).length > 0 ? Y.transpile = M : delete Y.transpile, Object.keys(W).length > 0 ? Y.template = W : delete Y.template, a("save", Y), a("update:modelValue", !1);
    }
    const z = (A) => ({
      modelValue: A.value,
      "onUpdate:modelValue": (m) => A.value = m
    });
    return () => {
      let A;
      return i(ue, Z({
        modelValue: e.modelValue
      }, {
        "onUpdate:modelValue": (m) => a("update:modelValue", m)
      }, {
        maxWidth: "560"
      }), {
        default: () => [i(oe, null, {
          default: () => [i(se, null, {
            default: () => [l.value.settings]
          }), i(Zt, Z({
            modelValue: t.value
          }, {
            "onUpdate:modelValue": (m) => t.value = m
          }), {
            default: () => [i(je, {
              value: "panels"
            }, {
              default: () => [l.value.panels]
            }), i(je, {
              value: "formatter"
            }, {
              default: () => [l.value.formatter]
            }), i(je, {
              value: "transpile"
            }, {
              default: () => [l.value.transpile]
            }), i(je, {
              value: "template"
            }, {
              default: () => [l.value.template]
            })]
          }), i(re, null, {
            default: () => [i(ln, Z({
              modelValue: t.value
            }, {
              "onUpdate:modelValue": (m) => t.value = m
            }), {
              default: () => [i(la, {
                value: "panels"
              }, Mn(A = e.panels.map((m) => i(ke, Z({
                key: m.id,
                modelValue: m.visible
              }, {
                "onUpdate:modelValue": (M) => e.onTogglePanel(m.id, !!M)
              }, {
                label: m.label,
                density: "compact",
                hideDetails: !0
              }), null))) ? A : {
                default: () => [A]
              }), i(la, {
                value: "formatter"
              }, {
                default: () => [i(ke, Z({
                  modelValue: r.value
                }, {
                  "onUpdate:modelValue": (m) => r.value = !!m
                }, {
                  label: l.value.forceMultiline,
                  density: "compact",
                  hideDetails: !0
                }), null), i(K, Z({
                  modelValue: h.value
                }, {
                  "onUpdate:modelValue": (m) => h.value = m
                }, {
                  label: l.value.maxColumns,
                  type: "number",
                  density: "compact",
                  hideDetails: !0
                }), null), Aa.map(([m, M]) => i(ke, Z({
                  key: m,
                  modelValue: u[m]
                }, {
                  "onUpdate:modelValue": (P) => u[m] = !!P
                }, {
                  label: l.value[M],
                  density: "compact",
                  hideDetails: !0
                }), null)), i(ke, Z({
                  modelValue: f.value
                }, {
                  "onUpdate:modelValue": (m) => f.value = !!m
                }, {
                  label: l.value.keepBackup,
                  density: "compact",
                  hideDetails: !0
                }), null)]
              }), i(la, {
                value: "transpile"
              }, {
                default: () => [i(K, Z(z(x), {
                  label: "writeFunc",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), i(K, Z(z(j), {
                  label: "rawStrFuncStart",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), i(K, Z(z(w), {
                  label: "rawStrFuncEnd",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0
                }), null)]
              }), i(la, {
                value: "template"
              }, {
                default: () => [i(K, Z(z(H), {
                  label: "start_delimiter",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), i(K, Z(z(G), {
                  label: "end_delimiter",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0
                }), null)]
              })]
            })]
          }), i(de, null, {
            default: () => [i(ce, null, null), i(b, {
              onClick: () => a("update:modelValue", !1)
            }, {
              default: () => [l.value.cancel]
            }), i(b, {
              color: "primary",
              onClick: k
            }, {
              default: () => [l.value.save]
            })]
          })]
        })]
      });
    };
  }
}), kn = /* @__PURE__ */ N({
  name: "RunProfileDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: !0
    },
    /** Default file path for a new profile (the open file). */
    defaultPath: {
      type: String,
      default: ""
    }
  },
  emits: {
    "update:modelValue": (e) => !0,
    create: (e) => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = E(O, y(() => Q)), t = v(""), n = v(e.defaultPath), o = v([]), s = v(""), g = () => /\.gadx$/i.test(n.value);
    T(() => e.modelValue, (r) => {
      r && (n.value = e.defaultPath, t.value || (t.value = e.defaultPath.split("/").pop() ?? "profile"));
    });
    function u() {
      const r = {
        name: t.value.trim() || (n.value.split("/").pop() ?? "profile"),
        path: n.value,
        args: [...o.value]
      };
      g() && s.value && (r.tagEncode = s.value), a("create", r), a("update:modelValue", !1), t.value = "", o.value = [], s.value = "";
    }
    return () => i(ue, Z({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (r) => a("update:modelValue", r)
    }, {
      maxWidth: "520"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => [l.value.newRunProfile]
        }), i(re, null, {
          default: () => [i(K, Z({
            modelValue: t.value
          }, {
            "onUpdate:modelValue": (r) => t.value = r
          }, {
            label: l.value.name,
            density: "compact",
            variant: "outlined",
            class: "mb-2",
            hideDetails: !0
          }), null), i(K, Z({
            modelValue: n.value
          }, {
            "onUpdate:modelValue": (r) => n.value = r
          }, {
            label: l.value.file,
            density: "compact",
            variant: "outlined",
            class: "mb-2",
            hideDetails: !0
          }), null), i(ql, Z({
            modelValue: o.value
          }, {
            "onUpdate:modelValue": (r) => o.value = r
          }, {
            label: l.value.arguments,
            hint: l.value.argumentsHint,
            persistentHint: !0,
            multiple: !0,
            chips: !0,
            closableChips: !0,
            density: "compact",
            variant: "outlined"
          }), null), g() && i(Fe, Z({
            modelValue: s.value
          }, {
            "onUpdate:modelValue": (r) => s.value = r ?? ""
          }, {
            items: [{
              title: l.value.renderHtml,
              value: ""
            }, {
              title: "JSON",
              value: "json"
            }, {
              title: "YAML",
              value: "yaml"
            }],
            label: l.value.gadxTagOutput,
            density: "compact",
            variant: "outlined",
            hideDetails: !0,
            class: "mt-2"
          }), null)]
        }), i(de, null, {
          default: () => [i(ce, null, null), i(b, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [l.value.cancel]
          }), i(b, {
            color: "primary",
            disabled: !n.value.trim(),
            onClick: u
          }, {
            default: () => [l.value.create]
          })]
        })]
      })]
    });
  }
}), jn = /* @__PURE__ */ N({
  name: "PromptDialog",
  props: {
    request: {
      type: Object,
      default: null
    }
  },
  emits: {
    done: () => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = E(O, y(() => Q)), t = v("");
    T(() => e.request, (o) => {
      o && (t.value = o.initial);
    });
    const n = (o) => {
      var s;
      (s = e.request) == null || s.resolve(o ? t.value.trim() : null), a("done");
    };
    return () => i(ue, Z({
      modelValue: !!e.request
    }, {
      "onUpdate:modelValue": (o) => {
        o || n(!1);
      }
    }, {
      maxWidth: "420"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => {
            var o;
            return [(o = e.request) == null ? void 0 : o.title];
          }
        }), i(re, null, {
          default: () => {
            var o;
            return [i(K, Z({
              modelValue: t.value
            }, {
              "onUpdate:modelValue": (s) => t.value = s
            }, {
              label: (o = e.request) == null ? void 0 : o.label,
              density: "compact",
              variant: "outlined",
              autofocus: !0,
              hideDetails: !0,
              onKeyup: (s) => s.key === "Enter" && n(!0)
            }), null)];
          }
        }), i(de, null, {
          default: () => [i(ce, null, null), i(b, {
            onClick: () => n(!1)
          }, {
            default: () => [l.value.cancel]
          }), i(b, {
            color: "primary",
            onClick: () => n(!0)
          }, {
            default: () => [l.value.ok]
          })]
        })]
      })]
    });
  }
}), Dn = /* @__PURE__ */ N({
  name: "ConfirmDialog",
  props: {
    request: {
      type: Object,
      default: null
    }
  },
  emits: {
    done: () => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = E(O, y(() => Q)), t = (n) => {
      var o;
      (o = e.request) == null || o.resolve(n), a("done");
    };
    return () => i(ue, Z({
      modelValue: !!e.request
    }, {
      "onUpdate:modelValue": (n) => {
        n || t(!1);
      }
    }, {
      maxWidth: "420"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => {
            var n;
            return [(n = e.request) == null ? void 0 : n.title];
          }
        }), i(re, {
          style: "white-space: pre-line"
        }, {
          default: () => {
            var n;
            return [(n = e.request) == null ? void 0 : n.message];
          }
        }), i(de, null, {
          default: () => [i(ce, null, null), i(b, {
            onClick: () => t(!1)
          }, {
            default: () => [l.value.cancel]
          }), i(b, {
            color: "primary",
            onClick: () => t(!0)
          }, {
            default: () => [l.value.ok]
          })]
        })]
      })]
    });
  }
}), Hn = /* @__PURE__ */ N({
  name: "UrlImportDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: !0
    },
    /** Download progress percent (0–100), or -1 for indeterminate. */
    progress: {
      type: Number,
      default: 0
    }
  },
  emits: {
    "update:modelValue": (e) => !0,
    import: (e, a, l) => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = E(q), t = E(O, y(() => Q)), n = v(""), o = v(!0), s = v(!1), g = v(""), u = v(""), r = v(!1), h = y(() => /\.(zip|tar|tar\.gz|tgz)(\?|#|$)/i.test(n.value));
    async function f() {
      if (n.value.trim()) {
        s.value = !0, g.value = "";
        try {
          await a("import", n.value.trim(), h.value && o.value && l.canExtract.value, u.value), a("update:modelValue", !1), n.value = "";
        } catch (x) {
          g.value = String(x);
        } finally {
          s.value = !1;
        }
      }
    }
    return () => i(ue, Z({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (x) => a("update:modelValue", x)
    }, {
      maxWidth: "520"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => [t.value.importFromUrl]
        }), i(re, null, {
          default: () => [i(K, Z({
            modelValue: n.value
          }, {
            "onUpdate:modelValue": (x) => n.value = x
          }, {
            label: t.value.url,
            placeholder: "https://example.com/file.gad",
            density: "compact",
            variant: "outlined",
            autofocus: !0,
            hideDetails: !0,
            onKeyup: (x) => x.key === "Enter" && f()
          }), null), h.value && l.canExtract.value && i(Gt, Z({
            modelValue: o.value
          }, {
            "onUpdate:modelValue": (x) => o.value = !!x
          }, {
            label: t.value.extractArchive,
            density: "compact",
            hideDetails: !0,
            class: "mt-2",
            color: "primary"
          }), null), i("div", {
            class: "d-flex align-center mt-2",
            style: {
              gap: "4px"
            }
          }, [i(K, {
            modelValue: u.value || "/ (root)",
            label: t.value.targetFolder,
            density: "compact",
            variant: "outlined",
            readonly: !0,
            hideDetails: !0,
            onClick: () => r.value = !r.value
          }, null), i(b, {
            size: "small",
            variant: "text",
            icon: "mdi-folder-search-outline",
            title: t.value.chooseFolder,
            onClick: () => r.value = !r.value
          }, null)]), r.value && i("div", {
            class: "dirtree-box mt-1"
          }, [i(Wa, {
            root: l.tree.value,
            selected: u.value,
            onSelect: (x) => {
              u.value = x, r.value = !1;
            }
          }, null)]), s.value && i("div", {
            class: "mt-3"
          }, [i(tn, {
            modelValue: e.progress < 0 ? void 0 : e.progress,
            indeterminate: e.progress < 0,
            color: "primary",
            height: "6",
            rounded: !0
          }, null), e.progress >= 0 && i("div", {
            class: "text-caption text-center mt-1"
          }, [e.progress, S("%")])]), g.value && i("div", {
            class: "pnl-diag mt-2"
          }, [g.value])]
        }), i(de, null, {
          default: () => [i(ce, null, null), i(b, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [t.value.cancel]
          }), i(b, {
            color: "primary",
            loading: s.value,
            disabled: !n.value.trim(),
            onClick: f
          }, {
            default: () => [t.value.importAction]
          })]
        })]
      })]
    });
  }
}), zn = /* @__PURE__ */ N({
  name: "MoveDialog",
  setup() {
    const e = E(q), a = E(O, y(() => Q)), l = v("");
    T(() => e.moveReq.value, (n) => {
      n && (l.value = n.path.includes("/") ? n.path.slice(0, n.path.lastIndexOf("/")) : "");
    });
    const t = (n) => {
      var o;
      return (o = e.moveReq.value) == null ? void 0 : o.resolve(n);
    };
    return () => i(ue, Z({
      modelValue: !!e.moveReq.value
    }, {
      "onUpdate:modelValue": (n) => !n && t(null)
    }, {
      maxWidth: "480"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => {
            var n;
            return [S("Move "), (n = e.moveReq.value) == null ? void 0 : n.path];
          }
        }), i(re, null, {
          default: () => [i("div", {
            class: "text-caption mb-1"
          }, [S("To the folder: "), l.value || "/ (root)"]), i("div", {
            class: "dirtree-box"
          }, [i(Wa, {
            root: e.tree.value,
            selected: l.value,
            onSelect: (n) => l.value = n
          }, null)])]
        }), i(de, null, {
          default: () => [i(ce, null, null), i(b, {
            variant: "text",
            onClick: () => t(null)
          }, {
            default: () => [a.value.cancel]
          }), i(b, {
            color: "primary",
            variant: "flat",
            onClick: () => t(l.value)
          }, {
            default: () => [a.value.move]
          })]
        })]
      })]
    });
  }
}), Nn = Symbol("gad-ide-extra-panels"), Bt = Symbol("gad-ide-extra-panel-expand");
function Wn(e) {
  return /* @__PURE__ */ N({
    name: "PanelExtra_" + e.id.replace(/\W/g, "_"),
    props: {
      // dockview's: { params, api, containerApi }
      params: {
        type: Object,
        required: !0
      }
    },
    setup(a) {
      const l = v(!1), t = () => l.value = a.params.api.isMaximized();
      let n;
      return He(() => {
        t(), n = a.params.containerApi.onDidMaximizedGroupChange(t);
      }), ze(() => n == null ? void 0 : n.dispose()), oa(Bt, {
        maximized: l,
        toggle: () => {
          a.params.api.isMaximized() ? a.params.api.exitMaximized() : a.params.api.maximize(), t();
        },
        expandTitle: e.expandTitle ?? "Expand",
        collapseTitle: e.collapseTitle ?? "Restore"
      }), () => i("div", {
        class: "gad-ide__extra",
        "data-extra-panel": e.id
      }, [i("div", {
        class: "gad-ide__extra-body"
      }, [ie(e.component, e.props ?? {})]), !e.headerExpand && !e.tabExpand && i(En, {
        class: "gad-ide__extra-expand",
        variant: "tonal"
      }, null)]);
    }
  });
}
const En = /* @__PURE__ */ N({
  name: "ExpandButton",
  props: {
    variant: {
      type: String,
      default: "text"
    }
  },
  setup(e) {
    const a = E(Bt, null);
    return () => a && i(b, {
      size: "x-small",
      variant: e.variant,
      icon: a.maximized.value ? "mdi-arrow-collapse" : "mdi-arrow-expand",
      title: a.maximized.value ? a.collapseTitle : a.expandTitle,
      "data-extra-expand": a.maximized.value ? "collapse" : "expand",
      onClick: a.toggle
    }, null);
  }
});
function wn(e, a) {
  return /* @__PURE__ */ N({
    name: "PanelTab",
    props: {
      // dockview's: { params, api, containerApi }
      params: {
        type: Object,
        required: !0
      }
    },
    setup(l) {
      const t = l.params.api, n = v(t.title ?? ""), o = v(t.isMaximized()), s = [t.onDidTitleChange((r) => n.value = r.title), l.params.containerApi.onDidMaximizedGroupChange(() => o.value = t.isMaximized())];
      ze(() => s.forEach((r) => r.dispose()));
      const g = (r) => ({
        onPointerdown: (h) => h.preventDefault(),
        onClick: (h) => {
          h.preventDefault(), h.stopPropagation(), r();
        }
      }), u = () => {
        t.isMaximized() ? t.exitMaximized() : t.maximize(), o.value = t.isMaximized();
      };
      return () => i("div", {
        class: "dv-default-tab",
        "data-tab": t.id
      }, [i("div", {
        class: "dv-default-tab-content"
      }, [n.value]), e.has(t.id) && i("div", Z({
        class: "dv-default-tab-action gad-ide__tab-expand",
        title: o.value ? a().restore : a().expand,
        "data-tab-expand": t.id,
        "data-maximized": o.value ? "true" : "false"
      }, g(u)), [i(ae, {
        size: "14",
        icon: o.value ? "mdi-arrow-collapse" : "mdi-arrow-expand"
      }, null)]), i("div", Z({
        class: "dv-default-tab-action",
        "data-tab-close": t.id
      }, g(() => t.close())), [i(ae, {
        size: "14",
        icon: "mdi-close"
      }, null)])]);
    }
  });
}
function Rn(e, a) {
  let l;
  for (const t of e)
    (t === "" ? l === void 0 : a === t || a.startsWith(t + "/")) && (l === void 0 || t.length > l.length) && (l = t);
  return l;
}
function kt(e) {
  const a = ka([""]), l = v(null);
  e.api.gitRepos && e.api.gitRepos().then((g) => {
    g.length && (a.value = g);
  }).catch(() => {
  }), T(() => e.openPath.value, () => {
    l.value = null;
  });
  const t = y(() => l.value !== null && a.value.includes(l.value) ? l.value : Rn(a.value, e.openPath.value) ?? a.value[0] ?? ""), n = y(() => e.api.gitFor ? e.api.gitFor(t.value) : e.api.git);
  return { repos: a, repo: t, choose: (g) => {
    l.value = g;
  }, api: n, rel: (g) => {
    const u = t.value;
    return u ? g.startsWith(u + "/") ? g.slice(u.length + 1) : "" : g;
  }, abs: (g) => t.value ? t.value + "/" + g : g };
}
const jt = /* @__PURE__ */ N({
  name: "RepoSelect",
  props: {
    git: {
      type: Object,
      required: !0
    },
    label: {
      type: String,
      default: "Repository"
    },
    workspace: {
      type: String,
      default: "The workspace"
    }
  },
  setup(e) {
    return () => e.git.repos.value.length > 1 ? i(Fe, Z({
      class: "gad-ide__repo-select",
      density: "compact",
      variant: "outlined",
      hideDetails: !0,
      prependInnerIcon: "mdi-source-repository",
      style: "max-width: 260px; min-width: 160px",
      title: e.label,
      "aria-label": e.label,
      "data-repo-select": "",
      items: e.git.repos.value.map((a) => ({
        title: a || e.workspace,
        value: a
      })),
      modelValue: e.git.repo.value
    }, {
      "onUpdate:modelValue": (a) => e.git.choose(a)
    }), null) : null;
  }
}), Vn = /* @__PURE__ */ N({
  name: "PanelChanges",
  setup() {
    var n;
    const e = E(q), a = E(O, y(() => Q)), l = ((n = e.workspace.actions) == null ? void 0 : n.edit) ?? !0, t = kt(e);
    return () => i(Di, {
      key: t.repo.value,
      api: t.api.value,
      dark: e.dark.value,
      readonly: !l || e.readonly.value,
      canCommit: !!e.workspace.gitCommit && l && !e.readonly.value,
      writes: e.writes.value,
      messages: a.value,
      onSaved: (o) => void e.refreshFile(t.abs(o))
    }, {
      actions: () => [i(jt, {
        git: t,
        label: a.value.repository,
        workspace: a.value.workspaceRepository
      }, null)]
    });
  }
}), Ln = /* @__PURE__ */ N({
  name: "PanelGit",
  setup() {
    const e = E(q), a = E(O, y(() => Q)), l = kt(e);
    return () => i(Hi, {
      key: l.repo.value,
      api: l.api.value,
      dark: e.dark.value,
      openPath: l.rel(e.openPath.value),
      messages: a.value,
      onChanged: () => void e.filesChanged()
    }, {
      actions: () => [i(jt, {
        git: l,
        label: a.value.repository,
        workspace: a.value.workspaceRepository
      }, null)]
    });
  }
}), Ma = [
  // the left column: the Explorer above the Structure, at the editor's left
  // — each by the other when it is open
  {
    id: "explorer",
    label: "Explorer",
    word: "explorer",
    add: (e) => e.addPanel({
      id: "explorer",
      component: "explorer",
      title: "Explorer",
      ...e.getPanel("structure") ? {
        position: {
          referencePanel: "structure",
          direction: "above"
        }
      } : e.getPanel("editor") ? {
        position: {
          referencePanel: "editor",
          direction: "left"
        }
      } : {}
    })
  },
  // the editor: right of the left column; closed and open again, by what
  // there is (left of the Preview, else above the panels below)
  {
    id: "editor",
    label: "Editor",
    word: "editor",
    add: (e) => e.addPanel({
      id: "editor",
      component: "editor",
      title: "Editor",
      ...e.getPanel("explorer") ? {
        position: {
          referencePanel: "explorer",
          direction: "right"
        }
      } : e.getPanel("structure") ? {
        position: {
          referencePanel: "structure",
          direction: "right"
        }
      } : e.getPanel("docs") ? {
        position: {
          referencePanel: "docs",
          direction: "left"
        }
      } : e.panels.length ? {
        position: {
          direction: "above"
        }
      } : {}
    })
  },
  {
    id: "structure",
    label: "Structure",
    word: "structure",
    add: (e) => e.addPanel({
      id: "structure",
      component: "structure",
      title: "Structure",
      position: e.getPanel("explorer") ? {
        referencePanel: "explorer",
        direction: "below"
      } : {
        referencePanel: "editor",
        direction: "left"
      }
    })
  },
  {
    id: "docs",
    label: "Preview",
    word: "preview",
    add: (e) => e.addPanel({
      id: "docs",
      component: "docs",
      title: "Preview",
      position: {
        referencePanel: "editor",
        direction: "right"
      }
    })
  },
  {
    id: "output",
    label: "Output",
    word: "output",
    add: (e) => e.addPanel({
      id: "output",
      component: "output",
      title: "Output",
      position: {
        referencePanel: "editor",
        direction: "below"
      }
    })
  },
  {
    id: "callstack",
    label: "Call Stack",
    word: "callStack",
    add: (e) => e.addPanel({
      id: "callstack",
      component: "callstack",
      title: "Call Stack",
      position: {
        referencePanel: "output",
        direction: "within"
      }
    })
  },
  {
    id: "locals",
    label: "Locals",
    word: "locals",
    add: (e) => e.addPanel({
      id: "locals",
      component: "locals",
      title: "Locals",
      position: {
        referencePanel: "output",
        direction: "within"
      }
    })
  },
  {
    id: "breakpoints",
    label: "Breakpoints",
    word: "breakpoints",
    add: (e) => e.addPanel({
      id: "breakpoints",
      component: "breakpoints",
      title: "Breakpoints",
      position: {
        referencePanel: "output",
        direction: "within"
      }
    })
  }
], Tn = {
  explorer: cn,
  editor: gn,
  docs: xn,
  structure: Gn,
  callstack: pn,
  locals: mn,
  breakpoints: Zn,
  output: vn
}, Po = /* @__PURE__ */ N({
  name: "GadIde",
  props: {
    api: {
      type: Object,
      required: !0
    },
    workspace: {
      type: Object,
      required: !0
    },
    dark: {
      type: Boolean,
      default: !1
    },
    onReset: {
      type: Function,
      default: void 0
    },
    /** Handle files uploaded (Explorer button or drag-drop). When absent, files
     * are written to the workspace via the api. */
    onUpload: {
      type: Function,
      default: void 0
    },
    layoutConfig: {
      type: Object,
      default: null
    },
    config: {
      type: Object,
      default: () => ({})
    },
    runProfiles: {
      type: Array,
      default: () => []
    },
    /** Gates the run/debug actions (v-model). Defaults to "debug" (all enabled). */
    runMode: {
      type: String,
      default: "debug"
    },
    /** Read-only workspace (v-model): disables create/delete/upload/import. */
    readonly: {
      type: Boolean,
      default: !1
    },
    /** Auto-save: false = manual (dirty tabs are marked); true = save on every
     * edit; a positive number = save all dirty tabs every N milliseconds. */
    autosave: {
      type: [Boolean, Number],
      default: !1
    },
    /** Max characters of a tab's file name before it is truncated (default 25). */
    tabNameMax: {
      type: Number,
      default: 25
    },
    /** Editor font size in pixels (v-model; default 13). */
    fontSize: {
      type: Number,
      default: 13
    },
    /** Extra file-type handlers (icon + editor language/plugin) for the Explorer
     * icons and editor highlighting — merged over the built-ins. */
    fileTypes: {
      type: Array,
      default: () => []
    },
    /** The panels the IDE has, by id (explorer, editor, docs, output,
     * callstack, locals, breakpoints) — default all. One left out is not built,
     * is taken out of a restored layout and is not offered in the Settings: an
     * IDE that runs no code needs no Output nor debugger panels. */
    panels: {
      type: Array,
      default: void 0
    },
    /** Panels of the host app (ExtraPanel): rendered in the layout like the
     * IDE's own — below the editor by default —, in the Settings' toggles,
     * each with an expand/collapse button, and a button in the Editor's
     * toolbar that opens it (toolbarButton). */
    extraPanels: {
      type: Array,
      default: () => []
    },
    /** Panels of the host (or the IDE's: "changes", "git") open in the
     * default layout, in this order — with panels [], an IDE of them alone
     * (only Git and Changes: a repository's). */
    openPanels: {
      type: Array,
      default: () => []
    },
    /** Buttons of the host app in the IDE's header, at its right after the
     * panels' (Changes): their icon, their title (and label, when given),
     * what their click does — a host's "back into the page", say. */
    headerActions: {
      type: Array,
      default: () => []
    },
    /** The texts of the Changes and Git panels (IdeMessages), translated:
     * any left out is English. */
    messages: {
      type: Object,
      default: void 0
    }
  },
  emits: {
    "update:layoutConfig": (e) => !0,
    "update:config": (e) => !0,
    "update:runProfiles": (e) => !0,
    "update:runMode": (e) => !0,
    "update:readonly": (e) => !0,
    "update:fontSize": (e) => !0
  },
  setup(e, {
    emit: a
  }) {
    const l = y(() => e.dark), t = yl(() => e.messages), n = _l(e.api, e.workspace, l, {
      onReset: e.onReset,
      onUpload: e.onUpload,
      getRunProfiles: () => e.runProfiles,
      getRunMode: () => e.runMode,
      emitRunProfiles: (c) => a("update:runProfiles", c),
      getReadonly: () => e.readonly,
      getAutosave: () => e.autosave,
      getTabNameMax: () => e.tabNameMax,
      initialFontSize: e.fontSize,
      onFontSize: (c) => a("update:fontSize", c),
      fileTypes: e.fileTypes,
      getWords: () => t.value
    });
    oa(q, n), oa(O, t), T(() => e.fontSize, (c) => {
      c !== n.fontSize.value && n.setFontSize(c);
    });
    let o = null, s = null, g = !1, u = "";
    const r = Se(/* @__PURE__ */ new Set()), f = [...e.workspace.git && e.api.git ? [
      // Changes: its button in the left strip, below the Structure
      {
        id: "changes",
        label: t.value.changes,
        icon: "mdi-file-compare",
        component: Vn,
        toolbarButton: !0,
        strip: "left",
        tabExpand: !0
      },
      {
        id: "git",
        label: t.value.git,
        icon: "mdi-source-branch",
        component: Ln,
        toolbarButton: !0,
        tabExpand: !0
      }
    ] : [], ...e.extraPanels], x = /* @__PURE__ */ new Set(["editor", "explorer", "structure", "docs", ...f.filter((c) => c.tabExpand).map((c) => c.id)]), j = wn(x, () => ({
      expand: t.value.expand,
      restore: t.value.restore
    })), w = y(() => f.map((c) => ({
      id: c.id,
      label: c.label,
      add: (p) => {
        var pe;
        const B = c.placement ?? "bottom", V = f.find((Ee) => Ee.id !== c.id && (Ee.placement ?? "bottom") === B && p.getPanel(Ee.id)), J = B === "right" ? "right" : B === "left" ? "left" : "below", U = f.indexOf(c) < f.indexOf(V) ? "left" : "right", ge = V ? {
          referencePanel: V.id,
          direction: B === "bottom" ? U : "within"
        } : p.panels.length ? {
          direction: J
        } : void 0;
        p.addPanel({
          id: c.id,
          component: c.id,
          title: c.label,
          ...ge ? {
            position: ge
          } : {}
        }), !V && B === "bottom" && ((pe = p.getPanel(c.id)) == null || pe.api.setSize({
          height: _(p)
        }));
      }
    }))), H = {
      ...Tn
    };
    for (const c of f) H[c.id] = Wn(c);
    const G = (c) => c.word ? t.value[c.word] : c.label, k = y(() => [...(e.panels ? Ma.filter((c) => e.panels.includes(c.id)) : Ma).map((c) => ({
      ...c,
      label: G(c)
    })), ...w.value]), z = (c) => k.value.some((p) => p.id === c);
    function A(c, p) {
      try {
        p.add(c);
      } catch {
        c.addPanel({
          id: p.id,
          component: p.id,
          title: p.label
        });
      }
      const B = c.getPanel(p.id);
      B && B.title !== p.label && B.api.setTitle(p.label);
    }
    function m(c) {
      for (const p of k.value) p.id !== "docs" && p.id !== "structure" && !w.value.some((B) => B.id === p.id) && A(c, p);
      for (const p of e.openPanels) {
        const B = w.value.find((V) => V.id === p);
        B && !c.getPanel(p) && A(c, B);
      }
    }
    function M(c) {
      for (const p of [...c.panels]) z(p.id) || c.removePanel(p);
    }
    const P = v("");
    function W() {
      var c;
      if (o) {
        r.clear();
        for (const p of o.panels) r.add(p.id);
        P.value = ((c = o.panels.find((p) => p.api.isMaximized())) == null ? void 0 : c.id) ?? "";
      }
    }
    function Y(c) {
      const p = o == null ? void 0 : o.getPanel(c);
      p && (p.api.isMaximized() ? p.api.exitMaximized() : p.api.maximize(), W());
    }
    function F(c) {
      for (const p of Ma) {
        const B = c.getPanel(p.id);
        B && B.title !== G(p) && B.api.setTitle(G(p));
      }
    }
    T(t, () => o && F(o));
    function Pe(c) {
      o = c.api;
      const p = e.layoutConfig;
      try {
        p && p.grid ? (o.fromJSON(p), M(o), F(o), o.panels.length || m(o)) : m(o);
      } catch {
        o.clear(), m(o);
      }
      W(), u = JSON.stringify(o.toJSON());
      const B = o.onDidMaximizedGroupChange(() => W()), V = o.onDidLayoutChange(() => {
        if (!o || (W(), g)) return;
        const J = o.toJSON(), U = JSON.stringify(J);
        U !== u && (u = U, a("update:layoutConfig", J));
      });
      s = {
        dispose: () => {
          B.dispose(), V.dispose();
        }
      };
    }
    T(() => e.layoutConfig, (c) => {
      if (!(!o || !c || JSON.stringify(c) === u)) {
        g = !0;
        try {
          o.fromJSON(c), M(o), F(o), u = JSON.stringify(o.toJSON());
        } catch {
        } finally {
          g = !1, W();
        }
      }
    });
    const te = "gad-ide.bottom.height";
    function _(c) {
      let p = 0;
      try {
        p = Number(localStorage.getItem(te)) || 0;
      } catch {
      }
      const B = Math.max(160, c.height - 120);
      return Math.min(B, Math.max(160, p || Math.round(c.height / 3)));
    }
    const Ue = "gad-ide.preview.width";
    function le(c) {
      let p = 0;
      try {
        p = Number(localStorage.getItem(Ue)) || 0;
      } catch {
      }
      return Math.min(Math.max(240, c.width - 300), Math.max(240, p || Math.round(c.width / 3)));
    }
    const Je = "gad-ide.left.width";
    function Ia(c) {
      var V, J;
      if (!o) return;
      const p = k.value.find((U) => U.id === c);
      if (!p || o.getPanel(c)) return;
      const B = !o.getPanel(c === "explorer" ? "structure" : "explorer");
      if (A(o, p), B) {
        let U = 0;
        try {
          U = Number(localStorage.getItem(Je)) || 0;
        } catch {
        }
        (V = o.getPanel(c)) == null || V.api.setSize({
          width: Math.min(Math.max(160, o.width - 300), Math.max(160, U || 260))
        });
      }
      (J = o.getPanel(c)) == null || J.api.setActive();
    }
    function Xe(c) {
      var V, J;
      if (c === "docs" || c === "explorer" || c === "structure") {
        const U = (V = o == null ? void 0 : o.getPanel(c)) == null ? void 0 : V.api.width, ge = c === "docs" ? Ue : Je;
        if (U) try {
          localStorage.setItem(ge, String(Math.round(U)));
        } catch {
        }
        return;
      }
      const p = f.find((U) => U.id === c), B = (J = o == null ? void 0 : o.getPanel(c)) == null ? void 0 : J.api.height;
      if (!(!p || (p.placement ?? "bottom") !== "bottom" || !B))
        try {
          localStorage.setItem(te, String(Math.round(B)));
        } catch {
        }
    }
    function Qe(c, p) {
      if (o)
        if (p) {
          const B = k.value.find((V) => V.id === c);
          B && !o.getPanel(c) && A(o, B);
        } else {
          const B = o.getPanel(c);
          B && (Xe(c), o.removePanel(B));
        }
    }
    const ee = {
      buttons: y(() => f.filter((c) => c.toolbarButton).map((c) => ({
        id: c.id,
        label: c.label,
        icon: c.icon ?? "mdi-view-split-horizontal",
        align: c.buttonAlign ?? "left",
        bottom: (c.placement ?? "bottom") === "bottom",
        strip: c.strip ?? "bottom"
      }))),
      open: (c) => {
        var B;
        if (!o) return;
        const p = k.value.find((V) => V.id === c);
        p && !o.getPanel(c) && A(o, p), (B = o.getPanel(c)) == null || B.api.setActive();
      }
    };
    oa(Nn, ee);
    const be = (c, p, B = !1) => i(b, {
      key: c.id,
      size: "small",
      variant: r.has(c.id) ? "tonal" : "text",
      prependIcon: c.icon,
      class: "text-none",
      disabled: B,
      "data-extra-open": c.id,
      onClick: p
    }, {
      default: () => [c.label]
    }), Ne = y(() => ee.buttons.value.filter((c) => c.bottom && c.strip === "bottom")), he = (c, p = "bottom", B = () => ee.open(c.id), V = !1) => {
      const J = r.has(c.id), U = P.value === c.id, ge = J && !x.has(c.id), pe = p === "right" ? J ? "mdi-chevron-right" : "mdi-chevron-left" : p === "left" ? J ? "mdi-chevron-left" : "mdi-chevron-right" : J ? "mdi-chevron-down" : "mdi-chevron-up";
      return i("span", {
        key: c.id,
        class: "gad-ide__strip-item"
      }, [i("button", {
        type: "button",
        class: ["gad-ide__strip-btn", {
          "gad-ide__strip-btn--open": J
        }],
        title: c.label,
        disabled: V,
        "data-extra-open": c.id,
        "data-open": J ? "true" : "false",
        onClick: () => J ? Qe(c.id, !1) : B()
      }, [i(ae, {
        size: "16",
        icon: c.icon
      }, null), i("span", {
        class: "gad-ide__strip-label"
      }, [c.label]), i(ae, {
        size: "14",
        icon: pe
      }, null)]), ge && i("button", {
        type: "button",
        class: "gad-ide__strip-btn gad-ide__strip-expand",
        title: U ? t.value.restore : t.value.expand,
        "data-strip-expand": c.id,
        "data-maximized": U ? "true" : "false",
        onClick: () => Y(c.id)
      }, [i(ae, {
        size: "14",
        icon: U ? "mdi-arrow-collapse" : "mdi-arrow-expand"
      }, null)])]);
    }, Ie = {
      id: "docs",
      label: t.value.preview,
      icon: "mdi-file-eye-outline"
    }, Ge = y(() => [{
      id: "editor",
      label: t.value.editor,
      icon: "mdi-file-document-edit-outline"
    }, {
      id: "explorer",
      label: t.value.explorer,
      icon: "mdi-file-tree-outline"
    }, {
      id: "structure",
      label: t.value.structure,
      icon: "mdi-file-tree"
    }].filter((c) => z(c.id))), Ze = y(() => ee.buttons.value.filter((c) => c.bottom && c.strip === "left")), Oe = y(() => k.value.map((c) => ({
      id: c.id,
      label: c.label,
      visible: r.has(c.id)
    })));
    T(() => n.docRequest.value, () => {
      var p, B;
      const c = k.value.find((V) => V.id === "docs");
      o && c && !o.getPanel("docs") && (A(o, c), (p = o.getPanel("docs")) == null || p.api.setSize({
        width: le(o)
      })), (B = o == null ? void 0 : o.getPanel("docs")) == null || B.api.setActive();
    });
    function Ke(c) {
      a("update:config", c);
    }
    He(() => void n.init()), ze(() => s == null ? void 0 : s.dispose());
    const We = y(() => e.dark ? Zi : Ai);
    return () => {
      var c;
      return i("div", {
        class: "gad-ide"
      }, [i("div", {
        class: "gad-ide__header",
        "data-ide-header": !0
      }, [ee.buttons.value.filter((p) => !p.bottom && p.align === "left").map((p) => be(p, () => ee.open(p.id))), i(b, {
        size: "small",
        variant: "text",
        prependIcon: "mdi-cog-outline",
        class: "text-none",
        "data-ide-settings": !0,
        onClick: () => n.settingsOpen.value = !0
      }, {
        default: () => [t.value.settings]
      }), i("span", {
        class: "gad-ide__header-spacer"
      }, null), ee.buttons.value.filter((p) => !p.bottom && p.align === "right").map((p) => be(p, () => ee.open(p.id))), e.headerActions.map((p) => (
        // with a label, its text beside the icon; else an icon button
        // (no children: a default slot, even empty, hides the icon)
        p.label ? i(b, {
          key: "action-" + p.id,
          size: "small",
          variant: "text",
          class: "text-none",
          prependIcon: p.icon,
          title: p.title ?? p.label,
          "data-ide-action": p.id,
          onClick: p.onClick
        }, {
          default: () => [p.label]
        }) : i(b, {
          key: "action-" + p.id,
          size: "small",
          variant: "text",
          density: "comfortable",
          icon: p.icon,
          title: p.title,
          "data-ide-action": p.id,
          onClick: p.onClick
        }, null)
      ))]), i("div", {
        class: "gad-ide__main"
      }, [Ge.value.length + Ze.value.length > 0 && i("div", {
        class: "gad-ide__strip gad-ide__strip--side gad-ide__strip--left",
        "data-ide-strip-left": !0
      }, [Ge.value.map((p) => he(p, "left", () => p.id === "editor" ? ee.open(p.id) : Ia(p.id))), Ze.value.map((p) => he(p, "left"))]), i("div", {
        class: "gad-ide__dock"
      }, [i(Mi, {
        style: {
          height: "100%"
        },
        theme: We.value,
        components: H,
        defaultTabComponent: j,
        onReady: Pe
      }, null)]), z("docs") && i("div", {
        class: "gad-ide__strip gad-ide__strip--side gad-ide__strip--right",
        "data-ide-strip-right": !0
      }, [he(Ie, "right", () => n.requestDocs(), !n.openPath.value && !r.has("docs"))])]), Ne.value.length > 0 && i("div", {
        class: "gad-ide__strip",
        "data-ide-strip": !0
      }, [Ne.value.filter((p) => p.align === "left").map((p) => he(p)), i("span", {
        class: "gad-ide__header-spacer"
      }, null), Ne.value.filter((p) => p.align === "right").map((p) => he(p))]), i(Bn, Z({
        modelValue: n.settingsOpen.value
      }, {
        "onUpdate:modelValue": (p) => n.settingsOpen.value = p
      }, {
        config: e.config,
        panels: Oe.value,
        onTogglePanel: Qe,
        onSave: Ke
      }), null), i(kn, Z({
        modelValue: n.profileDialog.value
      }, {
        "onUpdate:modelValue": (p) => n.profileDialog.value = p
      }, {
        defaultPath: n.openPath.value,
        onCreate: n.addProfile
      }), null), i(An, Z({
        modelValue: !!n.bpDialog.value
      }, {
        "onUpdate:modelValue": (p) => {
          p || (n.bpDialog.value = null);
        }
      }, {
        line: ((c = n.bpDialog.value) == null ? void 0 : c.line) ?? 0,
        initial: n.bpDialog.value ? n.bpMetaFor(n.bpDialog.value.path)[n.bpDialog.value.line] ?? {} : {},
        onSave: (p) => {
          n.bpDialog.value && n.setBpMeta(n.bpDialog.value.path, n.bpDialog.value.line, p);
        }
      }), null), i(jn, {
        request: n.promptReq.value,
        onDone: () => n.promptReq.value = null
      }, null), i(zn, null, null), i(Dn, {
        request: n.confirmReq.value,
        onDone: () => n.confirmReq.value = null
      }, null), i(Hn, Z({
        modelValue: n.urlDialog.value
      }, {
        "onUpdate:modelValue": (p) => n.urlDialog.value = p
      }, {
        progress: n.uploadProgress.value,
        onImport: (p, B, V) => n.uploadUrl(p, B, V)
      }), null)]);
    };
  }
});
Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  comment: {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: {
    pattern: /\bnull\b/,
    alias: "keyword"
  }
};
Prism.languages.webmanifest = Prism.languages.json;
(function(e) {
  var a = /[*&][^\s[\]{},]+/, l = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/, t = "(?:" + l.source + "(?:[ 	]+" + a.source + ")?|" + a.source + "(?:[ 	]+" + l.source + ")?)", n = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function() {
    return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
  }), o = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
  function s(g, u) {
    u = (u || "").replace(/m/g, "") + "m";
    var r = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
      return t;
    }).replace(/<<value>>/g, function() {
      return g;
    });
    return RegExp(r, u);
  }
  e.languages.yaml = {
    scalar: {
      pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function() {
        return t;
      })),
      lookbehind: !0,
      alias: "string"
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
        return t;
      }).replace(/<<key>>/g, function() {
        return "(?:" + n + "|" + o + ")";
      })),
      lookbehind: !0,
      greedy: !0,
      alias: "atrule"
    },
    directive: {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: !0,
      alias: "important"
    },
    datetime: {
      pattern: s(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
      lookbehind: !0,
      alias: "number"
    },
    boolean: {
      pattern: s(/false|true/.source, "i"),
      lookbehind: !0,
      alias: "important"
    },
    null: {
      pattern: s(/null|~/.source, "i"),
      lookbehind: !0,
      alias: "important"
    },
    string: {
      pattern: s(o),
      lookbehind: !0,
      greedy: !0
    },
    number: {
      pattern: s(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, "i"),
      lookbehind: !0
    },
    tag: l,
    important: a,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
  }, e.languages.yml = e.languages.yaml;
})(Prism);
(function(e) {
  var a = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
  function l(h) {
    return h = h.replace(/<inner>/g, function() {
      return a;
    }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + h + ")");
  }
  var t = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, n = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
    return t;
  }), o = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
  e.languages.markdown = e.languages.extend("markup", {}), e.languages.insertBefore("markdown", "prolog", {
    "front-matter-block": {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        punctuation: /^---|---$/,
        "front-matter": {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ["yaml", "language-yaml"],
          inside: e.languages.yaml
        }
      }
    },
    blockquote: {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: "punctuation"
    },
    table: {
      pattern: RegExp("^" + n + o + "(?:" + n + ")*", "m"),
      inside: {
        "table-data-rows": {
          pattern: RegExp("^(" + n + o + ")(?:" + n + ")*$"),
          lookbehind: !0,
          inside: {
            "table-data": {
              pattern: RegExp(t),
              inside: e.languages.markdown
            },
            punctuation: /\|/
          }
        },
        "table-line": {
          pattern: RegExp("^(" + n + ")" + o + "$"),
          lookbehind: !0,
          inside: {
            punctuation: /\||:?-{3,}:?/
          }
        },
        "table-header-row": {
          pattern: RegExp("^" + n + "$"),
          inside: {
            "table-header": {
              pattern: RegExp(t),
              alias: "important",
              inside: e.languages.markdown
            },
            punctuation: /\|/
          }
        }
      }
    },
    code: [
      {
        // Prefixed by 4 spaces or 1 tab and preceded by an empty line
        pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
        lookbehind: !0,
        alias: "keyword"
      },
      {
        // ```optional language
        // code block
        // ```
        pattern: /^```[\s\S]*?^```$/m,
        greedy: !0,
        inside: {
          "code-block": {
            pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
            lookbehind: !0
          },
          "code-language": {
            pattern: /^(```).+/,
            lookbehind: !0
          },
          punctuation: /```/
        }
      }
    ],
    title: [
      {
        // title 1
        // =======
        // title 2
        // -------
        pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
        alias: "important",
        inside: {
          punctuation: /==+$|--+$/
        }
      },
      {
        // # title 1
        // ###### title 6
        pattern: /(^\s*)#.+/m,
        lookbehind: !0,
        alias: "important",
        inside: {
          punctuation: /^#+|#+$/
        }
      }
    ],
    hr: {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: !0,
      alias: "punctuation"
    },
    list: {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: !0,
      alias: "punctuation"
    },
    "url-reference": {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        variable: {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: !0
        },
        string: /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        punctuation: /^[\[\]!:]|[<>]/
      },
      alias: "url"
    },
    bold: {
      // **strong**
      // __strong__
      // allow one nested instance of italic text using the same delimiter
      pattern: l(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /\*\*|__/
      }
    },
    italic: {
      // *em*
      // _em_
      // allow one nested instance of bold text using the same delimiter
      pattern: l(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /[*_]/
      }
    },
    strike: {
      // ~~strike through~~
      // ~strike~
      // eslint-disable-next-line regexp/strict
      pattern: l(/(~~?)(?:(?!~)<inner>)+\2/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        content: {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        punctuation: /~~?/
      }
    },
    "code-snippet": {
      // `code`
      // ``code``
      pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
      lookbehind: !0,
      greedy: !0,
      alias: ["code", "keyword"]
    },
    url: {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: l(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
      lookbehind: !0,
      greedy: !0,
      inside: {
        operator: /^!/,
        content: {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: !0,
          inside: {}
          // see below
        },
        variable: {
          pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
          lookbehind: !0
        },
        url: {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: !0
        },
        string: {
          pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
          lookbehind: !0
        }
      }
    }
  }), ["url", "bold", "italic", "strike"].forEach(function(h) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(f) {
      h !== f && (e.languages.markdown[h].inside.content.inside[f] = e.languages.markdown[f]);
    });
  }), e.hooks.add("after-tokenize", function(h) {
    if (h.language !== "markdown" && h.language !== "md")
      return;
    function f(x) {
      if (!(!x || typeof x == "string"))
        for (var j = 0, w = x.length; j < w; j++) {
          var H = x[j];
          if (H.type !== "code") {
            f(H.content);
            continue;
          }
          var G = H.content[1], k = H.content[3];
          if (G && k && G.type === "code-language" && k.type === "code-block" && typeof G.content == "string") {
            var z = G.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            z = (/[a-z][\w-]*/i.exec(z) || [""])[0].toLowerCase();
            var A = "language-" + z;
            k.alias ? typeof k.alias == "string" ? k.alias = [k.alias, A] : k.alias.push(A) : k.alias = [A];
          }
        }
    }
    f(h.tokens);
  }), e.hooks.add("wrap", function(h) {
    if (h.type === "code-block") {
      for (var f = "", x = 0, j = h.classes.length; x < j; x++) {
        var w = h.classes[x], H = /language-(.+)/.exec(w);
        if (H) {
          f = H[1];
          break;
        }
      }
      var G = e.languages[f];
      if (G)
        h.content = e.highlight(r(h.content), G, f);
      else if (f && f !== "none" && e.plugins.autoloader) {
        var k = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
        h.attributes.id = k, e.plugins.autoloader.loadLanguages(f, function() {
          var z = document.getElementById(k);
          z && (z.innerHTML = e.highlight(z.textContent, e.languages[f], f));
        });
      }
    }
  });
  var s = RegExp(e.languages.markup.tag.pattern.source, "gi"), g = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  }, u = String.fromCodePoint || String.fromCharCode;
  function r(h) {
    var f = h.replace(s, "");
    return f = f.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(x, j) {
      if (j = j.toLowerCase(), j[0] === "#") {
        var w;
        return j[1] === "x" ? w = parseInt(j.slice(2), 16) : w = Number(j.slice(1)), u(w);
      } else {
        var H = g[j];
        return H || x;
      }
    }), f;
  }
  e.languages.md = e.languages.markdown;
})(Prism);
const Yn = [{
  title: "Render Markdown",
  value: "render-md"
}, {
  title: "Markdown",
  value: "md"
}, {
  title: "Render HTML",
  value: "render-html"
}, {
  title: "HTML",
  value: "html"
}, {
  title: "Encode JSON",
  value: "json"
}, {
  title: "Encode YAML",
  value: "yaml"
}];
function Fn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const Un = (e) => e.replace(/\s*\{data-src-pos="\d+,\d+"\}/g, "");
function na(e, a) {
  const l = ye.languages[a];
  return l ? ye.highlight(e, l, a) : Fn(e);
}
const Dt = /* @__PURE__ */ N({
  name: "DocPanel",
  props: {
    doc: {
      type: Function,
      required: !0
    },
    source: {
      type: Function,
      required: !0
    },
    sourceType: {
      type: String,
      default: ""
    },
    // The open file's workspace path, used to resolve doc-comment asset/link
    // references against the generated `doc/` tree (see resolveDocPaths).
    docPath: {
      type: String,
      default: ""
    },
    // Optional override for the doc root used to resolve those references, chosen
    // per source path (e.g. to serve assets from a different URI). Defaults to `doc`.
    docRootFor: {
      type: Function,
      default: void 0
    },
    // Bumped by the host on every source edit so the panel re-generates in sync.
    revision: {
      type: Number,
      default: 0
    },
    // Called with a documented symbol's source position when it is clicked.
    onNavigate: {
      type: Function,
      default: void 0
    }
  },
  setup(e, {
    slots: a
  }) {
    const l = v("render-md"), t = v(null), n = v(!1);
    let o = 0, s;
    async function g() {
      const r = ++o;
      n.value = !0;
      try {
        const h = await e.doc(e.source(), e.sourceType, l.value);
        r === o && (t.value = h);
      } finally {
        r === o && (n.value = !1);
      }
    }
    T([l, () => e.sourceType], g, {
      immediate: !0
    }), T(() => e.revision, () => {
      clearTimeout(s), s = setTimeout(g, 250);
    });
    function u() {
      const r = t.value;
      if (!r) return i("p", {
        class: "gp-muted"
      }, [S("Generating documentation…")]);
      if (!r.ok || r.error) return i("div", {
        class: "gp-error gad-ide__diag"
      }, [r.error || "doc failed"]);
      switch (l.value) {
        case "render-md":
          return i("div", {
            class: "gp-doc-rendered",
            innerHTML: ca(Na(r.markdown ?? ""), e.docPath, e.docRootFor)
          }, null);
        case "render-html":
          return i("div", {
            class: "gp-doc-rendered",
            innerHTML: ca(r.html ?? "", e.docPath, e.docRootFor)
          }, null);
        case "md":
          return i("pre", {
            class: "gp-doc-src language-markdown",
            innerHTML: na(Un(r.markdown ?? ""), "markdown")
          }, null);
        case "html":
          return i("pre", {
            class: "gp-doc-src language-markup",
            innerHTML: na(r.html ?? "", "markup")
          }, null);
        case "json":
          return i("pre", {
            class: "gp-doc-src language-json",
            innerHTML: na(r.text ?? "", "json")
          }, null);
        case "yaml":
          return i("pre", {
            class: "gp-doc-src language-yaml",
            innerHTML: na(r.text ?? "", "yaml")
          }, null);
        default:
          return null;
      }
    }
    return () => {
      var r;
      return i("div", {
        class: "gp-doc"
      }, [i("div", {
        class: "gp-pane-head"
      }, [i("span", {
        class: "gp-doc-title"
      }, [S("Doc")]), i("span", {
        class: "gp-actions gp-doc-actions"
      }, [i(Fe, Z({
        class: "gp-doc-ctl",
        modelValue: l.value
      }, {
        "onUpdate:modelValue": (h) => l.value = h ?? "render-md"
      }, {
        items: Yn,
        density: "compact",
        variant: "outlined",
        hideDetails: !0,
        disabled: n.value,
        style: {
          maxWidth: "180px"
        }
      }), null), i(b, {
        class: "gp-doc-ctl",
        size: "small",
        height: "32",
        variant: "tonal",
        loading: n.value,
        title: "Reload documentation",
        onClick: g
      }, {
        default: () => [S("↻")]
      }), (r = a.default) == null ? void 0 : r.call(a)])]), i("div", {
        class: "gp-doc-body",
        onClick: (h) => {
          if (!e.onNavigate) return;
          const f = h.target.closest("[data-src-pos]"), x = f == null ? void 0 : f.getAttribute("data-src-pos");
          if (x) {
            const [j, w] = x.split(",").map((H) => parseInt(H, 10));
            j && e.onNavigate(j, w || 1);
          }
        }
      }, [u()])]);
    };
  }
}), Jn = {
  gad: `/**
# Greetings

A tiny module with a documented **public API**. Open the *Doc* panel (top-right)
to see it rendered — try the Markdown, HTML and JSON/YAML views too.
**/

/// greet builds a friendly greeting; the \`greeting\` prefix defaults to "Hello".
export greet = func(name; greeting = "Hello") => greeting + ", " + name

/// squares holds n*n for each n in 1..4, kept where n > 1.
export squares = [n * n for n in [1, 2, 3, 4] if n > 1]
`,
  gadt: `{%
/**
# Greeting Template

A **mixed-mode** template: literal HTML with \`{% … %}\` code islands and
\`{%= … %}\` value output. Open the *Doc* panel to see this rendered.
**/
var (name = "Gad", items = [1, 2, 3])
%}
<h1>Hello, {%= name %}!</h1>
<ul>
{% for i in items %}  <li>item {%= i %}</li>
{% end %}</ul>
`,
  gadx: `/**
# Hello Gadx

An indentation-based HTML template; its \`@main\` component is the public entry.
Open the *Doc* panel to see this rendered.
**/
/** main renders the page. **/
@main
    h1 Hello Gadx
    ul
        @for i in [1, 2, 3]
            li item {= i }
`
}, Xn = {
  gad: "gad",
  gadt: "gadt",
  gadx: "gadx"
}, Qn = {
  gad: "",
  gadt: "gadTemplate",
  gadx: "gadx"
}, bo = /* @__PURE__ */ N({
  name: "GadPlayground",
  props: {
    runner: {
      type: Object,
      required: !0
    },
    dark: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const a = v("gad"), l = Se({
      ...Jn
    }), t = y({
      get: () => l[a.value],
      set: (k) => l[a.value] = k
    }), n = y(() => Qn[a.value]), o = v(!1), s = v(""), g = v(!1), u = v(0), r = v(0), h = v(0), f = v(null), x = e.runner.diagnose ? (k) => e.runner.diagnose(k, n.value) : void 0;
    async function j(k) {
      o.value = !0;
      try {
        const z = await e.runner.format(t.value, n.value);
        f.value = {
          kind: "format",
          fmt: z
        }, k && z.ok && (t.value = z.source);
      } finally {
        o.value = !1;
      }
    }
    async function w() {
      o.value = !0;
      try {
        const k = a.value === "gadx" ? s.value : "";
        f.value = {
          kind: "run",
          run: await e.runner.run(t.value, n.value, k)
        };
      } finally {
        o.value = !1;
      }
    }
    const H = da("gad-ide.playground.editor", 560, 200, 4e3), G = da("gad-ide.playground.doc", 420, 160, 4e3);
    return () => {
      var k, z;
      return i("div", {
        class: "gp-split"
      }, [i("section", {
        class: "gp-pane",
        style: {
          flex: `0 0 ${H.size.value}px`
        }
      }, [i("div", {
        class: "gp-pane-head"
      }, [i(bt, Z({
        modelValue: a.value
      }, {
        "onUpdate:modelValue": (A) => {
          A && (a.value = A);
        }
      }, {
        density: "compact",
        variant: "outlined",
        mandatory: !0
      }), {
        default: () => [i(b, {
          size: "small",
          value: "gad"
        }, {
          default: () => [S("GAD")]
        }), i(b, {
          size: "small",
          value: "gadt"
        }, {
          default: () => [S("GAD Template")]
        }), i(b, {
          size: "small",
          value: "gadx"
        }, {
          default: () => [S("GADx")]
        })]
      }), i("span", {
        class: "gp-actions"
      }, [a.value === "gadx" && i(Fe, Z({
        modelValue: s.value
      }, {
        "onUpdate:modelValue": (A) => s.value = A ?? ""
      }, {
        items: [{
          title: "Render",
          value: ""
        }, {
          title: "JSON",
          value: "json"
        }, {
          title: "YAML",
          value: "yaml"
        }],
        label: "Tag",
        density: "compact",
        variant: "outlined",
        hideDetails: !0,
        style: {
          maxWidth: "120px"
        }
      }), null), i(b, {
        size: "small",
        variant: "tonal",
        loading: o.value,
        onClick: () => j(!1)
      }, {
        default: () => [S("Format")]
      }), i(b, {
        size: "small",
        variant: "tonal",
        loading: o.value,
        onClick: () => j(!0)
      }, {
        default: () => [S("Format & apply")]
      }), i(b, {
        size: "small",
        color: "primary",
        prependIcon: "mdi-play",
        loading: o.value,
        onClick: w
      }, {
        default: () => [S("Run")]
      }), e.runner.doc && i(b, {
        size: "small",
        variant: g.value ? "flat" : "tonal",
        color: g.value ? "primary" : void 0,
        onClick: () => g.value = !g.value,
        title: "Toggle the documentation panel"
      }, {
        default: () => [S("Doc")]
      })])]), i("div", {
        class: "gp-editor"
      }, [i(Ea, Z({
        key: a.value,
        modelValue: t.value
      }, {
        "onUpdate:modelValue": (A) => {
          t.value = A, g.value && u.value++;
        }
      }, {
        language: Xn[a.value],
        dark: e.dark,
        diagnose: x,
        gotoLine: r.value,
        gotoSeq: h.value
      }), null)])]), i(ra, {
        onStart: H.begin,
        onDrag: (A) => H.drag(A),
        onReset: H.reset
      }, null), i("section", {
        class: "gp-pane",
        style: {
          flex: "1 1 auto"
        }
      }, [i("div", {
        class: "gp-pane-head"
      }, [S("Output")]), i("div", {
        class: "gp-pane-body"
      }, [!f.value && i("p", {
        class: "text-medium-emphasis"
      }, [S("Format or run the source on the left.")]), ((k = f.value) == null ? void 0 : k.kind) === "format" && i(On, {
        fmt: f.value.fmt
      }, null), ((z = f.value) == null ? void 0 : z.kind) === "run" && i(Kn, {
        run: f.value.run
      }, null)])]), e.runner.doc && g.value && i(ra, {
        onStart: G.begin,
        onDrag: (A) => G.drag(A, -1),
        onReset: G.reset
      }, null), e.runner.doc && g.value && i("section", {
        class: "gp-pane gp-pane--doc",
        style: {
          flex: `0 0 ${G.size.value}px`
        }
      }, [i(Dt, {
        doc: e.runner.doc,
        source: () => t.value,
        sourceType: n.value,
        revision: u.value,
        onNavigate: (A) => {
          r.value = A, h.value++;
        }
      }, {
        default: () => [i(b, {
          class: "gp-doc-ctl",
          size: "small",
          height: "32",
          variant: "tonal",
          title: "Close the doc panel",
          onClick: () => g.value = !1
        }, {
          default: () => [S("✕")]
        })]
      })])]);
    };
  }
}), On = /* @__PURE__ */ N({
  props: {
    fmt: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return () => e.fmt.ok ? i("pre", {
      class: "gp-out"
    }, [e.fmt.source]) : i("div", null, [(e.fmt.diagnostics ?? []).map((a, l) => i("div", {
      class: "gad-ide__diag",
      key: l
    }, [a.line, S(":"), a.column, S(" "), a.message]))]);
  }
}), Kn = /* @__PURE__ */ N({
  props: {
    run: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return () => i("div", {
      class: e.run.ok ? "" : "gp-error"
    }, [e.run.stdout && i("pre", {
      class: "gp-out"
    }, [e.run.stdout]), e.run.stderr && i("pre", {
      class: "gp-out gad-ide__diag"
    }, [e.run.stderr]), e.run.ok && e.run.result && i("div", {
      class: "pnl-return"
    }, [S("↩ "), e.run.result]), (e.run.diagnostics ?? []).map((a, l) => i("div", {
      class: "gad-ide__diag",
      key: l
    }, [a.line, S(":"), a.column, S(" "), a.message]))]);
  }
}), _n = {
  gad: "gad",
  gadt: "gadt",
  gadx: "gadx"
}, Ba = {
  gad: "",
  gadt: "gadTemplate",
  gadx: "gadx"
};
let qn = 1;
const It = (e = "", a = "gad") => ({
  id: qn++,
  source: e,
  dialect: a,
  tagEncode: "",
  result: null,
  running: !1,
  showDoc: !1,
  docRev: 0,
  gotoLine: 0,
  gotoSeq: 0
}), $n = [{
  dialect: "gad",
  source: `/**
# Squares

A documented module. Toggle the **Doc** button below to see its public API.
**/

/// squares holds n*n for each n in 1..5.
export squares = [n * n for n in [1, 2, 3, 4, 5]]
`
}, {
  dialect: "gadt",
  source: `{%
/**
# Greeting Template

A mixed-mode template. Toggle **Doc** to see this comment rendered.
**/
var (name = "Gad", items = [1, 2, 3])
%}
<h1>Hello, {%= name %}!</h1>
<ul>
{% for i in items %}  <li>item {%= i %}</li>
{% end %}</ul>
`
}, {
  dialect: "gadx",
  source: `/**
# Hello Gadx

An indentation-based HTML template; \`@main\` is its public entry.
**/
/** main renders the page. **/
@main
    h1 Hello Gadx
    ul
        @for i in [1, 2, 3]
            li item {= i }
`
}], Go = /* @__PURE__ */ N({
  name: "GadNotebook",
  props: {
    runner: {
      type: Object,
      required: !0
    },
    dark: {
      type: Boolean,
      default: !1
    }
  },
  setup(e) {
    const a = v($n.map((u) => It(u.source, u.dialect)));
    async function l(u) {
      u.running = !0;
      try {
        const r = u.dialect === "gadx" ? u.tagEncode : "";
        u.result = await e.runner.run(u.source, Ba[u.dialect], r);
      } catch (r) {
        u.result = {
          ok: !1,
          stdout: "",
          stderr: String(r),
          result: "",
          diagnostics: []
        };
      } finally {
        u.running = !1;
      }
    }
    const t = () => a.value.push(It()), n = (u) => {
      a.value.length > 1 && (a.value = a.value.filter((r) => r.id !== u));
    }, o = (u) => e.runner.diagnose ? (r) => e.runner.diagnose(r, Ba[u.dialect]) : void 0, s = da("gad-ide.notebook.editor", 220, 80, 4e3), g = da("gad-ide.notebook.doc", 420, 160, 4e3);
    return () => i("div", {
      class: "gnb"
    }, [i("p", {
      class: "text-medium-emphasis"
    }, [S("Each cell runs independently.")]), a.value.map((u) => i("div", {
      class: "gnb-cell",
      key: u.id
    }, [i("div", {
      class: "gnb-cell-main" + (u.showDoc ? " gnb-cell-main--doc" : "")
    }, [i("div", {
      class: "gnb-editor",
      style: {
        height: `${s.size.value}px`
      }
    }, [i(Ea, Z({
      key: u.id + ":" + u.dialect,
      modelValue: u.source
    }, {
      "onUpdate:modelValue": (r) => {
        u.source = r, u.showDoc && u.docRev++;
      }
    }, {
      language: _n[u.dialect],
      dark: e.dark,
      diagnose: o(u),
      gotoLine: u.gotoLine,
      gotoSeq: u.gotoSeq
    }), null)]), e.runner.doc && u.showDoc && i(ra, {
      onStart: g.begin,
      onDrag: (r) => g.drag(r, -1),
      onReset: g.reset
    }, null), e.runner.doc && u.showDoc && i("div", {
      class: "gnb-doc",
      style: {
        flex: `0 0 ${g.size.value}px`,
        height: `${s.size.value}px`
      }
    }, [i(Dt, {
      doc: e.runner.doc,
      source: () => u.source,
      sourceType: Ba[u.dialect],
      revision: u.docRev,
      onNavigate: (r) => {
        u.gotoLine = r, u.gotoSeq++;
      }
    }, {
      default: () => [i(b, {
        class: "gp-doc-ctl",
        size: "small",
        height: "32",
        variant: "tonal",
        title: "Close the doc panel",
        onClick: () => u.showDoc = !1
      }, {
        default: () => [S("✕")]
      })]
    })])]), i(ra, {
      direction: "row",
      onStart: s.begin,
      onDrag: (r) => s.drag(r),
      onReset: s.reset
    }, null), i("div", {
      class: "gnb-bar"
    }, [i(bt, Z({
      modelValue: u.dialect
    }, {
      "onUpdate:modelValue": (r) => {
        r && (u.dialect = r);
      }
    }, {
      density: "compact",
      variant: "outlined",
      mandatory: !0
    }), {
      default: () => [i(b, {
        size: "small",
        value: "gad"
      }, {
        default: () => [S("GAD")]
      }), i(b, {
        size: "small",
        value: "gadt"
      }, {
        default: () => [S("GAD Template")]
      }), i(b, {
        size: "small",
        value: "gadx"
      }, {
        default: () => [S("GADx")]
      })]
    }), u.dialect === "gadx" && i(Fe, Z({
      modelValue: u.tagEncode
    }, {
      "onUpdate:modelValue": (r) => u.tagEncode = r ?? ""
    }, {
      items: [{
        title: "Render",
        value: ""
      }, {
        title: "JSON",
        value: "json"
      }, {
        title: "YAML",
        value: "yaml"
      }],
      label: "Tag",
      density: "compact",
      variant: "outlined",
      hideDetails: !0,
      style: {
        maxWidth: "120px"
      }
    }), null), i(b, {
      size: "small",
      color: "primary",
      prependIcon: "mdi-play",
      loading: u.running,
      onClick: () => l(u)
    }, {
      default: () => [S("Run")]
    }), e.runner.doc && i(b, {
      size: "small",
      variant: u.showDoc ? "flat" : "tonal",
      color: u.showDoc ? "primary" : void 0,
      title: "Toggle the documentation panel for this cell",
      onClick: () => {
        u.showDoc = !u.showDoc, u.docRev++;
      }
    }, {
      default: () => [S("Doc")]
    }), i(b, {
      size: "small",
      variant: "text",
      onClick: () => n(u.id)
    }, {
      default: () => [S("Remove")]
    })]), u.result && i("div", {
      class: "gnb-out" + (u.result.ok ? "" : " gp-error")
    }, [u.result.stdout && i("pre", {
      class: "gp-out"
    }, [u.result.stdout]), u.result.stderr && i("pre", {
      class: "gp-out gad-ide__diag"
    }, [u.result.stderr]), u.result.ok && u.result.result && i("div", {
      class: "pnl-return"
    }, [S("↩ "), u.result.result]), (u.result.diagnostics ?? []).map((r, h) => i("div", {
      class: "gad-ide__diag",
      key: h
    }, [r.line, S(":"), r.column, S(" "), r.message]))])])), i(b, {
      size: "small",
      variant: "tonal",
      prependIcon: "mdi-plus",
      onClick: t
    }, {
      default: () => [S("Add cell")]
    })]);
  }
});
async function L(e, a, l) {
  const t = await fetch(a, {
    method: e,
    headers: l ? { "Content-Type": "application/json" } : void 0,
    body: l ? JSON.stringify(l) : void 0
  }), n = await t.json().catch(() => ({}));
  if (!t.ok) throw new Error(n.error || t.statusText);
  return n;
}
function eo(e = "") {
  const a = (t) => e + t, l = at(a("api/ide/"));
  return {
    /** the workspace's repository (Workspace.git) */
    git: l,
    /** gitFor is the repository of a folder of the workspace (one of
     * gitRepos): the Changes and Git panels on it. */
    gitFor: (t) => t ? at(a("api/ide/"), t) : l,
    /** gitRepos are the repositories of the workspace: "" when it is in
     * one, then its folders that are one. */
    gitRepos: () => L("GET", a("api/ide/git/repos")).then((t) => t.repos || []),
    workspace: () => L("GET", a("api/ide/workspace")),
    tree: (t = !1) => L("GET", a("api/ide/tree") + (t ? "?hidden=true" : "")),
    read: (t) => L(
      "GET",
      a("api/ide/file?path=") + encodeURIComponent(t)
    ),
    /** rawUrl is the URL of the file's bytes as they are (an image to show). */
    rawUrl: (t) => a("api/ide/file?raw=1&path=") + encodeURIComponent(t),
    write: (t, n) => L("PUT", a("api/ide/file"), { path: t, content: n }),
    mkfile: (t) => L("PUT", a("api/ide/file"), { path: t, content: "" }),
    del: (t) => L("POST", a("api/ide/delete"), { path: t }),
    rename: (t, n) => L("POST", a("api/ide/rename"), { path: t, to: n }),
    mkdir: (t) => L("POST", a("api/ide/mkdir"), { path: t }),
    /** upload writes files uploaded — text, or bytes (base64) — at their paths. */
    upload: (t) => L("POST", a("api/ide/upload"), {
      files: t.map((n) => n.bytes ? { path: n.path, bytes: n.bytes } : { path: n.path, content: n.content })
    }),
    fetchUrl: (t, n) => L("POST", a("api/ide/fetch"), { url: t, path: n }),
    config: () => L("GET", a("api/ide/config")),
    saveConfig: (t) => L("PUT", a("api/ide/config"), t),
    modules: () => L("GET", a("api/ide/modules")),
    format: (t) => L("POST", a("api/ide/format"), { source: t }),
    /** symbols is the structure of source (`gad symbols`): its declarations as
     * a tree; path (or sourceType) says its dialect. */
    symbols: (t, n, o) => L("POST", a("api/ide/symbols"), { source: t, path: n, sourceType: o }),
    transpile: (t, n) => L("POST", a("api/ide/transpile"), { source: t, path: n }),
    doc: (t) => L("POST", a("api/ide/doc"), { source: t }).then((n) => n.docs || []),
    /** docGen generates documentation for source in the requested mode. */
    docGen: (t, n, o) => L("POST", a("api/ide/doc-gen"), { source: t, sourceType: n, mode: o }),
    eval: (t) => L("POST", a("api/ide/eval"), t),
    inspect: (t) => L("POST", a("api/ide/inspect"), t),
    diagnose: (t, n) => L("POST", a("api/ide/diagnose"), { source: t, sourceType: n }).then(
      (o) => o.diagnostics || []
    ),
    run: (t) => L("POST", a("api/ide/run"), t),
    dbgStart: (t) => L("POST", a("api/ide/debug/start"), t),
    dbgCmd: (t, n) => L("POST", a("api/ide/debug/command"), { session: t, command: n }),
    dbgEval: (t, n, o) => L("POST", a("api/ide/debug/eval"), {
      session: t,
      expr: n,
      repr: o
    })
  };
}
const Ht = eo(), Zo = Ht;
async function Ao() {
  try {
    return await Ht.workspace();
  } catch {
    return null;
  }
}
export {
  ko as ChangesPanel,
  Ul as DEFAULT_FILE_TYPES,
  za as DEFAULT_IDE_OWN_MESSAGES,
  Q as DEFAULT_MESSAGES,
  jo as DiffBrowser,
  Do as DiffMergeView,
  Dt as DocPanel,
  Ql as FileTypeRegistry,
  Ho as GIT_I18N_MESSAGES,
  zo as GIT_I18N_NAMESPACE,
  No as GIT_MESSAGES_PT_BR,
  Ea as GadEditor,
  Hl as GadEditorView,
  Po as GadIde,
  Go as GadNotebook,
  bo as GadPlayground,
  Wo as GitPanel,
  yo as IDE_I18N_MESSAGES,
  xl as IDE_I18N_NAMESPACE,
  pt as IDE_OWN_MESSAGES_PT_BR,
  q as IdeControllerKey,
  Mt as InspectorNode,
  yn as KIND_ICONS,
  Eo as LANGUAGES,
  wo as ResizeHandle,
  bn as StructureTree,
  _l as createController,
  Ro as createHttpGitApi,
  eo as createHttpIdeApi,
  Zo as httpIdeApi,
  Ht as ideApi,
  Pn as kindIcon,
  lt as langExtension,
  Ct as langOf,
  Vo as languageExtensions,
  Lo as languageOf,
  Ao as probeIde,
  To as renamedTo,
  Na as renderDocMarkdown,
  Yo as statusColor,
  Fo as treePath,
  Uo as unchangedContent,
  yl as useIdeMessages,
  Jo as useStoredSize
};
