var xi = Object.defineProperty;
var yi = (e, a, l) => a in e ? xi(e, a, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[a] = l;
var fe = (e, a, l) => yi(e, typeof a != "symbol" ? a + "" : a, l);
import { computed as x, ref as v, shallowRef as Aa, reactive as Ce, watch as R, onScopeDispose as Pi, defineComponent as H, createVNode as i, createTextVNode as S, Fragment as Se, inject as D, mergeProps as b, onMounted as Me, onBeforeUnmount as Re, h as te, isVNode as bi, provide as aa } from "vue";
import { themeDark as Gi, themeLight as Zi, DockviewVue as Ai } from "dockview-vue";
import { DEFAULT_GIT_MESSAGES as Mi, useWords as Bi, useGitMessages as ki, ChangesPanel as ji, GitPanel as Hi, useStoredSize as ta, ResizeHandle as ia, createHttpGitApi as $a } from "@gad-lang/git-vuetify";
import { ChangesPanel as Ao, DiffBrowser as Mo, DiffMergeView as Bo, GIT_I18N_MESSAGES as ko, GIT_I18N_NAMESPACE as jo, GIT_MESSAGES_PT_BR as Ho, GitPanel as Do, LANGUAGES as zo, ResizeHandle as No, createHttpGitApi as Wo, languageExtensions as wo, languageOf as Eo, renamedTo as Ro, statusColor as Vo, treePath as Lo, unchangedContent as Yo, useStoredSize as To } from "@gad-lang/git-vuetify";
import { StateField as ct, RangeSet as et, StateEffect as ka, Compartment as Ke, EditorState as xa } from "@codemirror/state";
import { gutter as Di, EditorView as Ae, GutterMarker as zi, hoverTooltip as Ni, Decoration as Ee, keymap as Wi } from "@codemirror/view";
import { indentWithTab as wi, defaultKeymap as Ei, undo as Ri, redo as Vi } from "@codemirror/commands";
import { oneDark as at } from "@codemirror/theme-one-dark";
import { StreamLanguage as Li } from "@codemirror/language";
import { basicSetup as Yi } from "codemirror";
import { gad as ya } from "@gad-lang/codemirror-gad";
import { json as Ti } from "@codemirror/lang-json";
import { html as Fi } from "@codemirror/lang-html";
import { css as Ui } from "@codemirror/lang-css";
import { javascript as _e } from "@codemirror/lang-javascript";
import { markdown as Ji } from "@codemirror/lang-markdown";
import { yaml as Xi } from "@codemirror/legacy-modes/mode/yaml";
import xe from "prismjs";
import { registerGad as Qi, registerGadTemplate as Oi } from "@gad-lang/prism-gad";
import { VSelect as Ki, VBtn as _i, VTabs as qi, VTab as $i, VTextField as el, VDialog as al, VCard as tl, VCardTitle as il, VCardText as ll, VCardActions as nl, VSpacer as ol, VDivider as dl, VMenu as rl, VList as sl, VListItem as ul, VListSubheader as cl, VIcon as Il, VSwitch as gl, VCheckbox as pl, VWindow as ml, VWindowItem as vl, VCombobox as fl, VProgressLinear as hl, VBtnToggle as Cl } from "vuetify/components";
const ja = {
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
}, It = {
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
}, X = { ...Mi, ...ja }, Sl = "gadIde", Co = {
  en: { gadIde: ja },
  pt: { gadIde: It }
}, Q = Symbol("gad-ide-messages");
function xl(e) {
  const a = Bi(Sl, { en: ja, pt: It }, e), l = ki(e);
  return x(() => ({ ...l.value, ...a.value }));
}
const we = (e, ...a) => {
  let l = 0;
  return e.replace(/%[sd]/g, () => String(a[l++] ?? ""));
}, gt = ka.define(), pt = ka.define();
class yl extends zi {
  toDOM() {
    const a = document.createElement("span");
    return a.className = "cm-bp-dot", a.textContent = "●", a;
  }
}
const Ma = new yl(), la = ct.define({
  create() {
    return et.empty;
  },
  update(e, a) {
    e = e.map(a.changes);
    for (const l of a.effects)
      if (l.is(pt))
        e = l.value.on ? e.update({ add: [Ma.range(l.value.pos)] }) : e.update({ filter: (t) => t !== l.value.pos });
      else if (l.is(gt)) {
        const t = a.state.doc, n = [...new Set(l.value)].filter((o) => o >= 1 && o <= t.lines).sort((o, s) => o - s).map((o) => Ma.range(t.line(o).from));
        e = et.of(n);
      }
    return e;
  }
});
function Pl(e) {
  const a = [], l = e.state.field(la).iter();
  for (; l.value; )
    a.push(e.state.doc.lineAt(l.from).number), l.next();
  return a.sort((t, n) => t - n);
}
function bl(e, a) {
  e.dispatch({ effects: gt.of(a) });
}
function Gl(e, a) {
  let l = !1;
  return e.state.field(la).between(a, a, () => {
    l = !0;
  }), l;
}
function Zl(e, a) {
  const l = (t) => e(Pl(t));
  return [
    la,
    Di({
      class: "cm-breakpoint-gutter",
      markers: (t) => t.state.field(la),
      initialSpacer: () => Ma,
      domEventHandlers: {
        // A single click toggles the breakpoint: it adds one on an empty line and
        // removes it when the line already has one.
        mousedown(t, n) {
          return t.dispatch({ effects: pt.of({ pos: n.from, on: !Gl(t, n.from) }) }), l(t), !0;
        },
        contextmenu(t, n, o) {
          return a ? (o.preventDefault(), a(t.state.doc.lineAt(n.from).number), !0) : !1;
        }
      }
    }),
    Ae.baseTheme({
      ".cm-breakpoint-gutter": { width: "1.1em", cursor: "pointer" },
      ".cm-breakpoint-gutter .cm-bp-dot": { color: "#e5484d", paddingLeft: "2px" }
    })
  ];
}
const mt = ka.define(), Al = Ee.line({ class: "cm-debug-line" }), Ml = Ee.mark({ class: "cm-debug-node" }), qe = (e) => /[A-Za-z0-9_]/.test(e);
function vt(e, a) {
  let l = Math.min(Math.max(a, 0), e.length);
  if (l >= e.length || !qe(e[l]))
    if (l > 0 && qe(e[l - 1])) l -= 1;
    else return null;
  let t = l, n = l;
  for (; t > 0 && qe(e[t - 1]); ) t--;
  for (; n < e.length && qe(e[n]); ) n++;
  return n <= t ? null : { start: t, end: n, word: e.slice(t, n) };
}
function Bl(e, a) {
  if (!a || a.line < 1 || a.line > e.lines) return Ee.none;
  const l = e.line(a.line), t = [Al.range(l.from)], n = vt(l.text, a.col - 1);
  return n && t.push(Ml.range(l.from + n.start, l.from + n.end)), Ee.set(t, !0);
}
const kl = ct.define({
  create() {
    return Ee.none;
  },
  update(e, a) {
    e = e.map(a.changes);
    for (const l of a.effects) l.is(mt) && (e = Bl(a.state.doc, l.value));
    return e;
  },
  provide: (e) => Ae.decorations.from(e)
});
function jl(e, a) {
  return [
    kl,
    Ni((l, t) => {
      const n = l.state.doc.lineAt(t), o = vt(n.text, t - n.from);
      if (!o) return null;
      const s = e().get(o.word);
      return s ? {
        pos: n.from + o.start,
        end: n.from + o.end,
        above: !0,
        create() {
          const p = document.createElement("div");
          p.className = "cm-locals-tooltip";
          const u = document.createElement("span");
          u.textContent = `${o.word}: ${s.type} = ${s.value}`;
          const r = document.createElement("button");
          return r.className = "cm-locals-tooltip-copy", r.title = "Copy value", r.textContent = "⎘", r.onclick = (f) => {
            var I;
            f.stopPropagation(), (I = navigator.clipboard) == null || I.writeText(s.value).catch(() => {
            });
          }, p.append(u, r), { dom: p };
        }
      } : null;
    }),
    Ae.baseTheme({
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
function ft(e) {
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
function tt(e, a, l) {
  switch (e) {
    case "gad":
      return ya({ sourceType: "gad", diagnose: a });
    case "gadt":
      return ya({ sourceType: "template", delimiters: { start: l == null ? void 0 : l.start, end: l == null ? void 0 : l.end }, preamble: l == null ? void 0 : l.preamble });
    case "gadx":
      return ya({ sourceType: "gadx", diagnose: a });
    case "json":
      return Ti();
    case "yaml":
      return Li.define(Xi);
    case "html":
      return Fi();
    case "css":
    case "scss":
      return Ui();
    case "javascript":
      return _e();
    case "typescript":
      return _e({ typescript: !0 });
    case "jsx":
      return _e({ jsx: !0 });
    case "tsx":
      return _e({ jsx: !0, typescript: !0 });
    case "markdown":
      return Ji();
    default:
      return [];
  }
}
function it(e) {
  return Ae.theme({ "&": { fontSize: e + "px" } });
}
class Hl {
  constructor(a) {
    fe(this, "view");
    fe(this, "langComp", new Ke());
    fe(this, "themeComp", new Ke());
    fe(this, "roComp", new Ke());
    fe(this, "fontComp", new Ke());
    fe(this, "opts");
    this.opts = a;
    const l = xa.create({
      doc: a.doc,
      extensions: [
        Yi,
        Wi.of([wi, ...Ei]),
        this.langComp.of(a.customExtension ? a.customExtension() : tt(a.language, a.diagnose)),
        this.themeComp.of(a.dark ? at : []),
        this.roComp.of(xa.readOnly.of(!!a.readonly)),
        this.fontComp.of(it(a.fontSize ?? 13)),
        a.breakpoints === !1 ? [] : Zl(
          (t) => {
            var n;
            return (n = a.onBreakpointsChange) == null ? void 0 : n.call(a, t);
          },
          (t) => {
            var n;
            return (n = a.onBreakpointContext) == null ? void 0 : n.call(a, t);
          }
        ),
        jl(() => {
          var t;
          return ((t = a.getLocals) == null ? void 0 : t.call(a)) ?? /* @__PURE__ */ new Map();
        }),
        Ae.updateListener.of((t) => {
          var n;
          t.docChanged && ((n = a.onChange) == null || n.call(a, t.state.doc.toString()));
        })
      ]
    });
    this.view = new Ae({ state: l, parent: a.parent });
  }
  getValue() {
    return this.view.state.doc.toString();
  }
  setValue(a) {
    this.view.dispatch({ changes: { from: 0, to: this.view.state.doc.length, insert: a } });
  }
  setLanguage(a, l, t) {
    this.opts.language = a, this.opts.customExtension = t, this.view.dispatch({
      effects: this.langComp.reconfigure(t ? t() : tt(a, l))
    });
  }
  setDark(a) {
    this.view.dispatch({ effects: this.themeComp.reconfigure(a ? at : []) });
  }
  setFontSize(a) {
    this.view.dispatch({ effects: this.fontComp.reconfigure(it(a)) });
  }
  setReadonly(a) {
    this.view.dispatch({ effects: this.roComp.reconfigure(xa.readOnly.of(a)) });
  }
  setBreakpoints(a) {
    bl(this.view, a);
  }
  /** setDebugLine highlights the paused line (1-based), or clears it with 0. */
  setDebugLine(a, l = 1) {
    this.view.dispatch({ effects: mt.of(a >= 1 ? { line: a, col: l } : null) });
  }
  undo() {
    Ri(this.view), this.view.focus();
  }
  redo() {
    Vi(this.view), this.view.focus();
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
Qi(xe);
Oi(xe);
function na(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ne(e) {
  let a = na(e);
  return a = a.replace(/`([^`]+)`/g, "<code>$1</code>"), a = a.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), a = a.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>"), a;
}
function Dl(e) {
  const a = e.split(`
`);
  let l = "", t = [], n = [], o = [];
  const s = (f) => f.trim().replace(/^\|/, "").replace(new RegExp("(?<!\\\\)\\|$"), "").split(new RegExp("(?<!\\\\)\\|")).map((I) => I.trim().replace(/\\\|/g, "|")), p = () => {
    if (!o.length) return;
    const f = o;
    if (o = [], f.length < 2 || !/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(f[1])) {
      t.push(...f);
      return;
    }
    const I = (h, G) => "<tr>" + s(h).map((W) => `<${G}>${Ne(W)}</${G}>`).join("") + "</tr>";
    l += "<table><thead>" + I(f[0], "th") + "</thead><tbody>" + f.slice(2).map((h) => I(h, "td")).join("") + "</tbody></table>";
  }, u = () => {
    t.length && (l += "<p>" + Ne(t.join(" ")) + "</p>", t = []);
  }, r = () => {
    n.length && (l += "<ul>" + n.map((f) => "<li>" + Ne(f) + "</li>").join("") + "</ul>", n = []);
  };
  for (const f of a) {
    const I = f.trimEnd(), h = /^(#{1,6})\s+(.*)$/.exec(I), G = /^\s*[-*]\s+(.*)$/.exec(I), W = /^\s*>\s?(.*)$/.exec(I);
    if (/^\s*\|/.test(I)) {
      u(), r(), o.push(I);
      continue;
    }
    if (p(), I.trim() === "")
      u(), r();
    else if (h) {
      u(), r();
      const M = h[1].length;
      let P = h[2], B = "";
      const z = /\s*\{data-src-pos="(\d+,\d+)"\}\s*$/.exec(P);
      z && (B = ` data-src-pos="${z[1]}"`, P = P.slice(0, z.index)), l += `<h${M}${B}>${Ne(P)}</h${M}>`;
    } else G ? (u(), n.push(G[1])) : n.length && /^\s+\S/.test(f) ? n[n.length - 1] += " " + I.trim() : W ? (u(), r(), l += "<blockquote>" + Ne(W[1]) + "</blockquote>") : (r(), t.push(I));
  }
  return p(), u(), r(), l;
}
function Ha(e) {
  const a = e.split("```");
  let l = "";
  for (let t = 0; t < a.length; t++)
    if (t % 2 === 1) {
      let n = a[t], o = "gad";
      const s = n.indexOf(`
`);
      if (s >= 0) {
        const h = n.slice(0, s).trim();
        /^[a-zA-Z][\w-]*$/.test(h) && (o = h.toLowerCase(), n = n.slice(s + 1));
      }
      n = n.replace(/\n$/, "");
      const p = xe.languages[o] || xe.languages.gad, u = n.split(`
`);
      let r = "", f = [];
      const I = () => {
        if (!f.length) return;
        const h = f.join(`
`);
        r += p ? xe.highlight(h, p, o) : na(h), r && !r.endsWith(`
`) && (r += `
`), f = [];
      };
      for (const h of u)
        h.startsWith(">>> ") ? (I(), r += `<span class="doc-result">${na(h)}</span>
`) : f.push(h);
      I(), r = r.replace(/\n$/, ""), l += `<pre class="doc-code language-${o}"><code>${r}</code></pre>`;
    } else
      l += Dl(a[t]);
  return l;
}
function lt(e) {
  return e.length ? e.map((a) => (a.kind === "root" ? "" : `<h4>${na(a.title || a.kind)}</h4>`) + Ha(a.content)).join(`
`) : '<p class="text-medium-emphasis">No documentation comments in this file.</p>';
}
const zl = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp", "ico"];
function ht(e) {
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
      return a && zl.includes(a[1]) ? "image" : "none";
  }
}
const We = (e) => ht(e) === "image", Nl = '<p class="text-medium-emphasis">No documentation for this kind of file.</p>';
function Wl(e, a) {
  switch (e) {
    case "html":
      return a;
    case "markdown":
      return Ha(a);
    case "image":
      return "";
    default:
      return Nl;
  }
}
function Ct(e) {
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
  if (!a.length) return Ct(e.files);
  const l = [];
  return await Promise.all(a.map((n) => St(n, "", l))), l;
}
async function St(e, a, l) {
  if (e.isFile) {
    l.push({ path: a + e.name, file: await Ll(e) });
    return;
  }
  const t = await Tl(e);
  await Promise.all(t.map((n) => St(n, a + e.name + "/", l)));
}
function El(e) {
  if (e.includes(0)) return !1;
  try {
    return new TextDecoder("utf-8", { fatal: !0 }).decode(e), !0;
  } catch {
    return !1;
  }
}
function Rl(e) {
  let a = "";
  for (let l = 0; l < e.length; l += 32768) a += String.fromCharCode(...e.subarray(l, l + 32768));
  return btoa(a);
}
function xt(e, a) {
  return El(a) ? { path: e, content: new TextDecoder().decode(a) } : { path: e, content: "", bytes: Rl(a) };
}
async function nt(e, a) {
  return xt(e, new Uint8Array(await a.arrayBuffer()));
}
async function Vl(e) {
  const a = new Uint8Array(await e.arrayBuffer());
  let l = "";
  for (let t = 0; t < a.length; t++) l += String.fromCharCode(a[t]);
  return btoa(l);
}
function Ll(e) {
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
  let p = 0;
  for (const u of n)
    s.set(u, p), p += u.length;
  return a(100), s;
}
function Tl(e) {
  const a = e.createReader(), l = [];
  return new Promise((t, n) => {
    const o = () => a.readEntries((s) => {
      if (!s.length) return t(l);
      l.push(...s), o();
    }, n);
    o();
  });
}
const Fl = [
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
], Ul = "mdi-file-outline";
function Jl(e) {
  const a = e.lastIndexOf("/"), l = a === -1 ? e : e.slice(a + 1), t = l.lastIndexOf(".");
  return t === -1 ? "" : l.slice(t + 1).toLowerCase();
}
class Xl {
  constructor(a = []) {
    fe(this, "byExt", /* @__PURE__ */ new Map());
    for (const l of [...Fl, ...a])
      for (const t of l.extensions) this.byExt.set(t.toLowerCase(), l);
  }
  handlerFor(a) {
    return this.byExt.get(Jl(a));
  }
  iconFor(a) {
    var l;
    return ((l = this.handlerFor(a)) == null ? void 0 : l.icon) ?? Ul;
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
const _ = Symbol("gad-ide-controller"), Ql = /* @__PURE__ */ new Set(["write", "mkfile", "mkdir", "del", "rename", "upload", "fetchUrl"]);
function Ol(e, a) {
  return new Proxy(e, {
    get(l, t, n) {
      const o = Reflect.get(l, t, n);
      return typeof o != "function" || !Ql.has(String(t)) ? o : (...s) => {
        const p = o.apply(l, s);
        return Promise.resolve(p).then(a, a), p;
      };
    }
  });
}
function Kl(e, a, l, t = {}) {
  const n = v(0), o = Ol(e, () => n.value++), s = t.onReset, p = () => {
    var d;
    return ((d = t.getWords) == null ? void 0 : d.call(t)) ?? X;
  }, u = x(() => {
    var d;
    return ((d = t.getReadonly) == null ? void 0 : d.call(t)) ?? !1;
  }), r = (d) => x(() => {
    var c;
    return !u.value && (((c = a.actions) == null ? void 0 : c[d]) ?? !0);
  }), f = r("create"), I = r("edit"), h = r("rename"), G = r("move"), W = r("delete"), M = x(() => r("import").value && !!o.upload), P = new Xl(t.fileTypes), B = (d) => P.iconFor(d), z = x(() => {
    const d = /* @__PURE__ */ new Set(), c = (C) => {
      for (const k of (C == null ? void 0 : C.children) ?? [])
        k.dir ? c(k) : d.add(k.path);
    };
    return c(j.value), d;
  });
  function A(d) {
    return z.value.has(d);
  }
  const j = Aa(null), T = Ce(/* @__PURE__ */ new Set()), N = v([]), w = v(-1), V = x(() => {
    var d;
    return ((d = N.value[w.value]) == null ? void 0 : d.path) ?? "";
  }), F = x({
    get: () => {
      var d;
      return ((d = N.value[w.value]) == null ? void 0 : d.content) ?? "";
    },
    set: (d) => {
      const c = N.value[w.value];
      c && (c.content = d);
    }
  }), ye = x(() => {
    const d = [], c = (C, k) => {
      for (const Y of C.children ?? [])
        d.push({ node: Y, depth: k }), Y.dir && T.has(Y.path) && c(Y, k + 1);
    };
    return j.value && c(j.value, 0), d;
  }), ee = v(!1);
  async function q() {
    j.value = await o.tree(ee.value);
    const d = V.value.split("/");
    for (let c = 1; c < d.length; c++) T.add(d.slice(0, c).join("/"));
  }
  async function Le() {
    ee.value = !ee.value, await q();
  }
  async function ie(d) {
    const c = N.value.findIndex((k) => k.path === d);
    if (c >= 0) {
      w.value = c;
      return;
    }
    const C = We(d) ? "" : (await o.read(d)).content;
    N.value.push({ path: d, content: C, saved: C }), w.value = N.value.length - 1;
  }
  const da = (d) => {
    const c = N.value.find((C) => C.path === d);
    return !!c && c.content !== c.saved;
  };
  function Ye(d) {
    d >= 0 && d < N.value.length && (w.value = d);
  }
  function ae(d) {
    d < 0 || d >= N.value.length || (N.value.splice(d, 1), w.value >= N.value.length ? w.value = N.value.length - 1 : w.value > d && w.value--);
  }
  function Te(d) {
    T.has(d) ? T.delete(d) : T.add(d);
  }
  function Be(d) {
    return T.has(d);
  }
  const Ie = x(() => {
    var d;
    return ((d = t.getAutosave) == null ? void 0 : d.call(t)) ?? !1;
  });
  async function ra(d) {
    !I.value || d.content === d.saved || (await o.write(d.path, d.content), d.saved = d.content);
  }
  const Fe = () => Promise.all(N.value.map(ra));
  R(F, (d) => {
    if (Ie.value !== !0 || !I.value) return;
    const c = N.value[w.value];
    c && (o.write(c.path, d), c.saved = d);
  });
  let ge = null;
  R(
    Ie,
    (d) => {
      ge && (clearInterval(ge), ge = null), typeof d == "number" && d > 0 && (ge = setInterval(() => void Fe(), d));
    },
    { immediate: !0 }
  ), Pi(() => {
    ge && clearInterval(ge);
  });
  function ke() {
    const d = V.value.lastIndexOf("/");
    return d === -1 ? "" : V.value.slice(0, d + 1);
  }
  function je(d) {
    for (const c of (d == null ? void 0 : d.children) ?? []) {
      if (!c.dir) return c.path;
      const C = je(c);
      if (C) return C;
    }
    return null;
  }
  const g = v(null), m = v(null);
  function Z(d, c, C = "") {
    return new Promise((k) => g.value = { title: d, label: c, initial: C, resolve: k });
  }
  function L(d, c) {
    return new Promise((C) => m.value = { title: d, message: c, resolve: C });
  }
  async function J() {
    const d = await Z(p().newFile, p().fileNamePrompt, "untitled.gad");
    if (!d) return;
    const c = ke() + d;
    await o.mkfile(c), await q(), await ie(c);
  }
  async function U() {
    const d = await Z(p().newFolder, p().folderName, "folder");
    d && (await o.mkdir(ke() + d), await q());
  }
  async function pe() {
    const d = V.value;
    if (!d || !await L(p().deleteFile, we(p().deleteConfirm, d))) return;
    await o.del(d);
    const c = N.value.findIndex((C) => C.path === d);
    c >= 0 && ae(c), await q();
  }
  async function He() {
    const d = V.value;
    if (!d) return;
    const c = d.lastIndexOf("/"), C = c === -1 ? "" : d.slice(0, c + 1), k = await Z(p().rename, p().newName, d.slice(c + 1));
    !k || C + k === d || (await o.rename(d, C + k), Wa(d, C + k), await q());
  }
  const sa = v(null);
  async function Ht() {
    const d = V.value;
    if (!d) return;
    const c = await new Promise((k) => sa.value = { path: d, resolve: k });
    if (sa.value = null, c === null) return;
    const C = (c ? c.replace(/\/$/, "") + "/" : "") + d.slice(d.lastIndexOf("/") + 1);
    C !== d && (await o.rename(d, C), Wa(d, C), await q());
  }
  function Wa(d, c) {
    const C = N.value.find((k) => k.path === d);
    C && (C.path = c);
  }
  async function Dt() {
    if (!s || !await L(p().resetWorkspace, p().resetConfirm)) return;
    await s(), N.value = [], w.value = -1, await q();
    const d = je(j.value);
    d && await ie(d);
  }
  const zt = x(() => !!s);
  async function ua(d, c) {
    if (!d.length) return;
    const C = (c ?? ke().replace(/\/$/, "")).replace(/\/$/, ""), k = C ? C + "/" : "", Y = d.map((O) => ({ ...O, path: k + O.path }));
    if (t.onUpload) await t.onUpload(Y, C);
    else if (M.value)
      for (const O of Y) O.archive || await o.upload([O]);
    else for (const O of Y) !O.archive && !O.bytes && await o.write(O.path, O.content);
    await q();
    const $ = Y.find((O) => !O.archive);
    $ && await ie($.path);
  }
  const Nt = v(!1), Pe = v(0);
  function wa(d) {
    const c = d.toLowerCase();
    if (c.endsWith(".zip")) return "zip";
    if (c.endsWith(".tar.gz") || c.endsWith(".tgz")) return "tar.gz";
    if (c.endsWith(".tar")) return "tar";
  }
  async function Wt(d, c, C = "") {
    if (Pe.value = 0, M.value && !t.onUpload) {
      Pe.value = -1;
      try {
        const k = decodeURIComponent(new URL(d, location.href).pathname.split("/").pop() || "download"), Y = C.replace(/\/$/, ""), $ = (Y ? Y + "/" : "") + k;
        await o.fetchUrl(d, $), await q(), await ie($);
      } finally {
        Pe.value = 0;
      }
      return;
    }
    try {
      const k = await fetch(d);
      if (!k.ok) throw new Error(`${d}: HTTP ${k.status}`);
      const Y = await Yl(k, (Oe) => Pe.value = Oe), $ = decodeURIComponent(new URL(d, location.href).pathname.split("/").pop() || "download"), O = wa($);
      if (c && O) {
        let Oe = "";
        for (let Sa = 0; Sa < Y.length; Sa++) Oe += String.fromCharCode(Y[Sa]);
        await ua([{ path: $, content: "", archive: O, bytes: btoa(Oe) }], C);
      } else
        await ua([xt($, Y)], C);
    } finally {
      Pe.value = 0;
    }
  }
  const ca = (d) => {
    const c = ft(d);
    return c === "gadx" ? "gadx" : c === "gadt" ? "gadTemplate" : "gad";
  }, wt = (d, c) => o.diagnose(d, c), le = v(!1), Ue = v(null), Ea = () => ({ source: F.value, path: V.value, args: [] });
  async function Ra(d) {
    const c = d ?? Ea();
    le.value = !0;
    try {
      Ue.value = await o.run({
        source: c.source,
        path: c.path,
        sourceType: ca(c.path),
        args: c.args,
        tagEncode: c.tagEncode || void 0
      });
    } finally {
      le.value = !1;
    }
  }
  async function Et() {
    le.value = !0;
    try {
      const d = await o.format(F.value);
      d.ok ? F.value = d.source : Ue.value = { ok: !1, stdout: "", stderr: "", result: "", diagnostics: d.diagnostics };
    } finally {
      le.value = !1;
    }
  }
  const Ia = Aa(null);
  function Rt(d) {
    Ia.value = d;
  }
  async function Vt() {
    const d = N.value[w.value];
    !d || We(d.path) || !I.value || (await o.write(d.path, d.content), d.saved = d.content);
  }
  async function Lt(d) {
    const c = N.value.find((k) => k.path === d);
    if (!c || c.content !== c.saved || We(d)) return;
    const C = (await o.read(d)).content;
    c.content === c.saved && (c.content = C, c.saved = C);
  }
  async function Yt() {
    const d = N.value[w.value];
    if (!d) return;
    if (We(d.path)) {
      pa.value++;
      return;
    }
    const c = (await o.read(d.path)).content;
    d.content = c, d.saved = c;
  }
  const De = v(t.initialFontSize ?? 13);
  function ga(d) {
    var c;
    De.value = Math.max(8, Math.min(32, Math.round(d))), (c = t.onFontSize) == null || c.call(t, De.value);
  }
  const Tt = () => ga(De.value + 1), Ft = () => ga(De.value - 1);
  function Ut() {
    var d;
    (d = Ia.value) == null || d.undo();
  }
  function Jt() {
    var d;
    (d = Ia.value) == null || d.redo();
  }
  const Va = v(""), Xt = x(() => We(V.value)), pa = v(0), Qt = (d) => o.rawUrl ? o.rawUrl(d) + (pa.value ? "&v=" + pa.value : "") : "", La = v("none");
  let Ya = 0;
  async function Ta() {
    const d = ++Ya, c = ht(V.value);
    let C;
    if (c === "gad" && F.value.trim()) {
      const k = await o.doc(F.value);
      C = lt(k);
    } else c === "gad" ? C = lt([]) : C = Wl(c, F.value);
    d === Ya && (La.value = c, Va.value = C);
  }
  const me = v(null), ve = v(null), ma = v(""), va = Ce({}), be = Ce({});
  function he(d) {
    return d && va[d] || [];
  }
  function Fa(d) {
    return d && be[d] || {};
  }
  function Ot() {
    const d = {};
    for (const [c, C] of Object.entries(va)) C.length && (d[c] = C);
    return d;
  }
  function Je(d, c) {
    const C = [...new Set(c)].sort((Y, $) => Y - $);
    va[d] = C;
    const k = be[d];
    if (k)
      for (const Y of Object.keys(k)) C.includes(Number(Y)) || delete k[Number(Y)];
  }
  function Kt(d, c, C) {
    be[d] || (be[d] = {}), be[d][c] = { ...be[d][c] || {}, ...C }, he(d).includes(c) || Je(d, [...he(d), c]);
  }
  function _t(d, c) {
    Je(d, he(d).filter((C) => C !== c));
  }
  function qt(d) {
    const c = Fa(d);
    return he(d).map((C) => {
      var k, Y;
      return { line: C, disabled: (k = c[C]) == null ? void 0 : k.disabled, condition: (Y = c[C]) == null ? void 0 : Y.condition };
    });
  }
  const $t = x({
    get: () => he(V.value),
    set: (d) => Je(V.value, d)
  }), fa = v({ line: 0, seq: 0 });
  function Ua(d) {
    fa.value = { line: d, seq: fa.value.seq + 1 };
  }
  async function ei(d, c) {
    d && d !== V.value && await ie(d), Ua(c);
  }
  const Ja = v(null);
  function ai(d, c) {
    Ja.value = { path: d, line: c };
  }
  const ti = x(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.state) === "stopped" ? ve.value.line ?? 0 : 0;
  }), ii = x(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.column) ?? 1;
  }), li = x(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.state) === "stopped";
  }), ni = x(() => {
    var c;
    const d = /* @__PURE__ */ new Map();
    for (const C of ((c = ve.value) == null ? void 0 : c.locals) ?? []) d.set(C.name, C);
    return d;
  }), oi = () => ni.value;
  function Xa(d) {
    ve.value = d, d.output && (ma.value += d.output), d.state === "terminated" || d.state === "error" ? me.value = null : d.session && (me.value = d.session);
  }
  async function Qa(d) {
    const c = d ?? Ea();
    le.value = !0, ma.value = "", ve.value = null, Ue.value = null;
    try {
      Xa(
        await o.dbgStart({
          source: c.source,
          path: c.path,
          sourceType: ca(c.path),
          args: c.args,
          breakpoints: he(c.path),
          breakpointSpecs: qt(c.path),
          stopOnEntry: !1
        })
      );
    } finally {
      le.value = !1;
    }
  }
  async function di(d) {
    if (me.value) {
      le.value = !0;
      try {
        Xa(await o.dbgCmd(me.value, d));
      } finally {
        le.value = !1;
      }
    }
  }
  const ha = v(""), Oa = v("");
  async function ri() {
    if (!me.value || !ha.value.trim()) return;
    const d = await o.dbgEval(me.value, ha.value, !0);
    Oa.value = d.ok ? d.value ?? "" : "error: " + (d.error ?? "");
  }
  const si = async (d) => {
    const c = await o.inspect({
      expr: d,
      session: me.value ?? void 0,
      source: F.value,
      path: V.value,
      sourceType: Ka.value
    });
    return c.ok ? c.inspect ?? null : null;
  }, Ka = x(() => ca(V.value)), Xe = x(() => {
    var d;
    return ((d = t.getRunProfiles) == null ? void 0 : d.call(t)) ?? [];
  }), Qe = x(() => {
    var d;
    return ((d = t.getRunMode) == null ? void 0 : d.call(t)) ?? "debug";
  }), ze = v(null), ui = v(!1), Ca = x(() => Xe.value.find((d) => d.name === ze.value) ?? null), ci = x(() => {
    var d;
    return ((d = Ca.value) == null ? void 0 : d.name) ?? p().currentFile;
  }), Ii = x(() => Qe.value === "run" || Qe.value === "debug"), gi = x(() => Qe.value === "debug");
  async function _a() {
    const d = Ca.value;
    return d ? { source: d.path === V.value ? F.value : (await o.read(d.path)).content, path: d.path, args: d.args, tagEncode: d.tagEncode } : { source: F.value, path: V.value, args: [] };
  }
  async function pi() {
    await Ra(await _a());
  }
  async function mi() {
    await Qa(await _a());
  }
  function vi(d) {
    var c;
    (c = t.emitRunProfiles) == null || c.call(t, [...Xe.value.filter((C) => C.name !== d.name), d]), ze.value = d.name;
  }
  function fi(d) {
    var c;
    (c = t.emitRunProfiles) == null || c.call(t, Xe.value.filter((C) => C.name !== d)), ze.value === d && (ze.value = null);
  }
  const qa = v(0);
  function hi() {
    Ta(), qa.value++;
  }
  const Ci = v(!1);
  async function Si() {
    await q();
    const d = a.openFile || je(j.value);
    d && await ie(d);
  }
  return {
    api: o,
    dark: l,
    writes: n,
    refreshFile: Lt,
    workspace: a,
    // tree
    tree: j,
    rows: ye,
    openPath: V,
    source: F,
    isExpanded: Be,
    toggleDir: Te,
    openFile: ie,
    tabs: N,
    active: w,
    activateTab: Ye,
    closeTab: ae,
    isDirty: da,
    autosave: Ie,
    tabNameMax: x(() => {
      var d;
      return ((d = t.getTabNameMax) == null ? void 0 : d.call(t)) ?? 25;
    }),
    showHidden: ee,
    toggleHidden: Le,
    newFile: J,
    newDir: U,
    removeOpen: pe,
    reset: Dt,
    canReset: zt,
    upload: ua,
    uploadUrl: Wt,
    urlDialog: Nt,
    uploadProgress: Pe,
    pathExists: A,
    archiveKind: wa,
    readonly: u,
    fileTypes: P,
    iconFor: B,
    canUpload: x(() => (!!t.onUpload || M.value) && !u.value),
    canCreate: f,
    canRename: h,
    canMove: G,
    canDelete: W,
    renameOpen: He,
    moveOpen: Ht,
    moveReq: sa,
    // an archive is extracted only by a host's onUpload
    canExtract: x(() => !!t.onUpload),
    canEdit: I,
    promptReq: g,
    confirmReq: m,
    diagnose: wt,
    // run/format/doc
    busy: le,
    runRes: Ue,
    run: Ra,
    format: Et,
    docHtml: Va,
    docKind: La,
    refreshDoc: Ta,
    isImage: Xt,
    imageUrl: Qt,
    // editor actions
    registerEditor: Rt,
    save: Vt,
    reload: Yt,
    undo: Ut,
    redo: Jt,
    fontSize: De,
    incFont: Tt,
    decFont: Ft,
    setFontSize: ga,
    // run/debug profiles + gating
    runProfiles: Xe,
    runMode: Qe,
    activeProfile: ze,
    profileDialog: ui,
    activeProfileObj: Ca,
    runLabel: ci,
    canRun: Ii,
    canDebug: gi,
    runActive: pi,
    debugActive: mi,
    addProfile: vi,
    deleteProfile: fi,
    docRequest: qa,
    requestDocs: hi,
    settingsOpen: Ci,
    // debug
    session: me,
    snap: ve,
    dbgOutput: ma,
    breakpoints: $t,
    debugLine: ti,
    debugColumn: ii,
    stopped: li,
    getLocals: oi,
    debugStart: Qa,
    debugCmd: di,
    evalExpr: ha,
    evalOut: Oa,
    doEval: ri,
    inspectFn: si,
    dialect: Ka,
    // breakpoints
    bpFor: he,
    bpMetaFor: Fa,
    allBreakpoints: Ot,
    setFileBreakpoints: Je,
    setBpMeta: Kt,
    removeBreakpoint: _t,
    gotoTarget: fa,
    goto: Ua,
    gotoFileLine: ei,
    bpDialog: Ja,
    openBpCondition: ai,
    init: Si
  };
}
const y = _i, Ve = Ki, yt = Cl, oe = tl, de = nl, re = ll, se = il, Ge = pl, _l = fl, ue = al, ot = dl, ne = Il, ql = sl, Pa = ul, $l = cl, en = rl, an = hl, ce = ol, Pt = gl, Ze = $i, bt = qi, K = el, tn = ml, $e = vl, Gt = /* @__PURE__ */ H({
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
      return i(Se, null, [i("div", {
        class: ["dirtree-row", {
          "dirtree-row--active": e.selected === e.node.path
        }],
        style: {
          paddingLeft: 6 + e.depth * 14 + "px"
        },
        onClick: () => e.onSelect(e.node.path)
      }, [i(ne, {
        size: "14",
        class: "mr-1"
      }, {
        default: () => [S("mdi-folder-outline")]
      }), i("span", {
        class: "pnl-ellipsis"
      }, [e.node.name])]), a.map((l) => i(Gt, {
        key: l.path,
        node: l,
        selected: e.selected,
        depth: e.depth + 1,
        onSelect: e.onSelect
      }, null))]);
    };
  }
}), Da = /* @__PURE__ */ H({
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
      }, [i(ne, {
        size: "14",
        class: "mr-1"
      }, {
        default: () => [S("mdi-folder-home-outline")]
      }), i("span", null, [S("/ (root)")])]), (((a = e.root) == null ? void 0 : a.children) ?? []).filter((l) => l.dir).map((l) => i(Gt, {
        key: l.path,
        node: l,
        selected: e.selected,
        depth: 1,
        onSelect: e.onSelect
      }, null))]);
    };
  }
}), ln = (e) => e.slice(e.lastIndexOf("/") + 1), dt = (e, a) => e ? e + "/" + a : a, nn = /* @__PURE__ */ H({
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
    const l = D(_), t = D(Q, x(() => X)), n = v(""), o = v(""), s = v(!0), p = v(!1), u = v(!1), r = v(!1), f = x(() => e.raw.length === 1), I = x(() => f.value ? l.archiveKind(o.value) : void 0);
    R(() => e.modelValue, (P) => {
      P && (n.value = e.initialDir, o.value = f.value ? ln(e.raw[0].path) : "", s.value = !0, p.value = !1, u.value = !1);
    });
    const h = x(() => f.value ? I.value && s.value ? [] : [dt(n.value, o.value)] : e.raw.map((P) => dt(n.value, P.path))), G = x(() => h.value.filter((P) => l.pathExists(P))), W = x(() => G.value.length > 0 && !p.value);
    async function M() {
      r.value = !0;
      try {
        let P;
        f.value && I.value && s.value ? P = [{
          path: o.value,
          content: "",
          archive: I.value,
          bytes: await Vl(e.raw[0].file)
        }] : f.value ? P = [await nt(o.value, e.raw[0].file)] : P = await Promise.all(e.raw.map((B) => nt(B.path, B.file))), a("confirm", P, n.value), a("update:modelValue", !1);
      } finally {
        r.value = !1;
      }
    }
    return () => i(ue, b({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (P) => a("update:modelValue", P)
    }, {
      maxWidth: "520"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => [f.value ? t.value.uploadFile : we(t.value.uploadNFiles, e.raw.length)]
        }), i(re, null, {
          default: () => [f.value ? i(K, b({
            modelValue: o.value
          }, {
            "onUpdate:modelValue": (P) => o.value = P
          }, {
            label: t.value.destinationName,
            density: "compact",
            variant: "outlined",
            hideDetails: !0,
            class: "mb-2"
          }), null) : i("div", {
            class: "text-caption mb-2"
          }, [e.raw.slice(0, 6).map((P) => i("div", {
            class: "pnl-ellipsis",
            key: P.path
          }, [P.path])), e.raw.length > 6 && i("div", {
            class: "text-medium-emphasis"
          }, [S("…and "), e.raw.length - 6, S(" more")])]), f.value && I.value && i(Pt, b({
            modelValue: s.value
          }, {
            "onUpdate:modelValue": (P) => s.value = !!P
          }, {
            label: we(t.value.extractArchiveOf, I.value.toUpperCase()),
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
          }, null), i(y, {
            size: "small",
            variant: "text",
            icon: "mdi-folder-search-outline",
            title: t.value.chooseFolder,
            onClick: () => u.value = !u.value
          }, null)]), u.value && i("div", {
            class: "dirtree-box mt-1"
          }, [i(Da, {
            root: l.tree.value,
            selected: n.value,
            onSelect: (P) => {
              n.value = P, u.value = !1;
            }
          }, null)]), G.value.length > 0 && i(Ge, b({
            modelValue: p.value
          }, {
            "onUpdate:modelValue": (P) => p.value = !!P
          }, {
            label: G.value.length === 1 ? we(t.value.replaceOne, G.value[0]) : we(t.value.replaceMany, G.value.length),
            density: "compact",
            hideDetails: !0,
            color: "error",
            class: "mt-2"
          }), null)]
        }), i(de, null, {
          default: () => [i(ce, null, null), i(y, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [t.value.cancel]
          }), i(y, {
            color: "primary",
            loading: r.value,
            disabled: W.value || f.value && !o.value.trim(),
            onClick: M
          }, {
            default: () => [t.value.upload]
          })]
        })]
      })]
    });
  }
}), on = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjRDk3NzA2OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNGRUYzQzc7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+Cjwvc3ZnPgo=", dn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjMDZCNkQ0OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNFMEY3RkE7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAuYmFkZ2UtcmVkICAgeyBmaWxsOiAjRTUzOTM1OyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBnbHlwaCAqLwogICAgICAgICAgICAuYmFkZ2Utd2hpdGUgeyBmaWxsOiAjRkZGRkZGOyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBvdXRsaW5lL2dhcCAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CiAgPCEtLSBHQURUICh0ZW1wbGF0ZSkgYmFkZ2U6IHJlZCAieyIgKyB3aGl0ZSBib3JkZXIvZ2FwICgxcHg7IDJweCBsZWZ0KSwgYm90dG9tLXJpZ2h0LiAtLT4KICA8cmVjdCB4PSIxMiIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMiIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEyIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTQiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTUiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTUiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNSIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTQiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEzIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMSIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjExIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxNSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjE1IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgPHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxNCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEzIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+Cjwvc3ZnPgo=", rn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjMDZCNkQ0OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNFMEY3RkE7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAuYmFkZ2UtcmVkICAgeyBmaWxsOiAjRTUzOTM1OyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBnbHlwaCAqLwogICAgICAgICAgICAuYmFkZ2Utd2hpdGUgeyBmaWxsOiAjRkZGRkZGOyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBvdXRsaW5lL2dhcCAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CiAgICA8IS0tIEdBRFggKHB1ZykgYmFkZ2U6IDFweCByZWQgQCArIDFweCB3aGl0ZSBib3JkZXIvZ2FwLCBib3R0b20tcmlnaHQuIC0tPgogICAgPHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTQiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNSIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTUiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNSIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjE0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTQiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgo8L3N2Zz4K", sn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjRDk3NzA2OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNGRUYzQzc7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAudGVzdC1yZWQgICB7IGZpbGw6ICNEQjU4NjA7IH0gLyogdGVzdCBiYWRnZSBsZWZ0ICovCiAgICAgICAgICAgIC50ZXN0LWdyZWVuIHsgZmlsbDogIzU5QTg2OTsgfSAvKiB0ZXN0IGJhZGdlIHJpZ2h0ICovCiAgICAgICAgICAgIC50ZXN0LXdoaXRlIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiB0ZXN0IGJhZGdlIGRpYW1vbmQvZ2FwICovCiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KCiAgICA8IS0tIENISUZSRVMgKHRvcG8sIHk9MCkgLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMyIgY2xhc3M9Imhvcm4tc2lsdmVyIiAvPgoKICAgIDxyZWN0IHg9IjkiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjQiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMyIgY2xhc3M9Imhvcm4tc2lsdmVyIiAvPgoKICAgIDwhLS0gT1JFTEhBUyBMQVRFUkFJUyAtLT4KICAgIDxyZWN0IHg9IjEiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIyIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjMiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8IS0tIENBQkXDh0EgQUZVTklMQURBIFBBUkEgQkFJWE8gKGZvY2luaG8gZGUgZ2F6ZWxhLCB5PTQgLT4gMTYpIC0tPgogICAgPHJlY3QgeD0iMyIgeT0iNCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjciIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIHRvcG8gbGFyZ28gKG9saG9zKSAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjExIiB3aWR0aD0iOCIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSBhZnVuaWxhIDEgLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIxMyIgd2lkdGg9IjYiIGhlaWdodD0iMyIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gZm9jaW5obyAtLT4KCiAgICA8cmVjdCB4PSI0IiB5PSI1IiB3aWR0aD0iOCIgaGVpZ2h0PSI2IiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjExIiB3aWR0aD0iNiIgaGVpZ2h0PSIyIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KICAgIDxyZWN0IHg9IjYiIHk9IjEzIiB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8IS0tIExJU1RSQSBGQUNJQUwgQ0VOVFJBTCAtLT4KICAgIDxyZWN0IHg9IjciIHk9IjUiIHdpZHRoPSIyIiBoZWlnaHQ9IjEwIiBjbGFzcz0iZnVyLWxpZ2h0IiAvPgogICAgPHJlY3QgeD0iNyIgeT0iMTQiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYXNlLWRhcmsiIC8+IDwhLS0gTmFyaXogLS0+CgogICAgPCEtLSBPTEhPUyBHSUdBTlRFUyAoRXN0aWxvIE1hc2NvdGUgZG8gR28pIC0tPgogICAgPCEtLSBPbGhvIEVzcXVlcmRvIC0tPgogICAgPHJlY3QgeD0iNCIgeT0iNiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIFB1cGlsYSAtLT4KCiAgICA8IS0tIE9saG8gRGlyZWl0byAtLT4KICAgIDxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgY2xhc3M9ImV5ZS13aGl0ZSIgLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIFB1cGlsYSAtLT4KICAgIDwhLS0gVGVzdCBiYWRnZTogY3Jpc3AgcGl4ZWwgZGlhbW9uZCAocmVkIHw8IC8gZ3JlZW4gPnwpLCAxcHggd2hpdGUgYm9yZGVyK2dhcC4gLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjYiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjciIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI3IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI4IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iNiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjYiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjciIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iNyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iNyIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtcmVkIi8+CiAgICA8cmVjdCB4PSI4IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iOSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtcmVkIi8+CiAgICA8cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjExIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1ncmVlbiIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1ncmVlbiIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KPC9zdmc+Cg==";
function rt(e) {
  const a = e.toLowerCase();
  if (a.endsWith("_test.gad")) return sn;
  if (a.endsWith(".gadx")) return rn;
  if (a.endsWith(".gadt")) return dn;
  if (a.endsWith(".gad")) return on;
}
const un = /* @__PURE__ */ H({
  name: "PanelExplorer",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = v(), t = v(null), n = v(!1), o = v([]), s = v(""), p = (I) => {
      const h = I.lastIndexOf("/");
      return h === -1 ? "" : I.slice(0, h);
    };
    function u(I, h) {
      I.length && (o.value = I, s.value = h, n.value = !0);
    }
    async function r(I, h) {
      t.value = null, !(!e.canUpload.value || !I.dataTransfer) && u(await wl(I.dataTransfer), h);
    }
    async function f(I) {
      const h = I.target, G = Ct(h.files);
      h.value = "", u(G, "");
    }
    return () => i("div", {
      class: "pnl"
    }, [i("div", {
      class: "pnl-head"
    }, [i("span", {
      class: "text-caption font-weight-medium"
    }, [a.value.explorer.toUpperCase()]), i("div", null, [e.canCreate.value && i(Se, null, [i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-file-plus-outline",
      title: a.value.newFile,
      onClick: () => e.newFile()
    }, null), i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-folder-plus-outline",
      title: a.value.newFolder,
      onClick: () => e.newDir()
    }, null)]), e.canUpload.value && i(Se, null, [i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-upload-outline",
      title: a.value.uploadFiles,
      onClick: () => {
        var I;
        return (I = l.value) == null ? void 0 : I.click();
      }
    }, null), i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-link-variant",
      title: a.value.importFromUrl,
      onClick: () => e.urlDialog.value = !0
    }, null)]), e.canRename.value && i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-rename-outline",
      title: a.value.renameOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.renameOpen()
    }, null), e.canMove.value && i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-file-move-outline",
      title: a.value.moveOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.moveOpen()
    }, null), e.canDelete.value && i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-delete-outline",
      title: a.value.deleteOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.removeOpen()
    }, null), i(y, {
      size: "x-small",
      variant: "text",
      icon: e.showHidden.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
      title: e.showHidden.value ? a.value.hideHidden : a.value.showHidden,
      onClick: () => e.toggleHidden()
    }, null), e.canReset.value && e.canEdit.value && i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-backup-restore",
      title: a.value.resetChanges,
      onClick: () => e.reset()
    }, null)])]), i("div", {
      class: ["pnl-body", {
        "pnl-body--drop": e.canUpload.value && t.value === ""
      }],
      onDragover: e.canUpload.value ? (I) => {
        I.preventDefault(), t.value = "";
      } : void 0,
      onDragleave: e.canUpload.value ? () => t.value = null : void 0,
      onDrop: e.canUpload.value ? (I) => {
        I.preventDefault(), r(I, "");
      } : void 0
    }, [e.rows.value.map((I) => {
      const h = I.node.dir ? I.node.path : p(I.node.path);
      return i("div", {
        key: I.node.path,
        class: ["pnl-row", {
          "pnl-row--active": I.node.path === e.openPath.value,
          "pnl-row--drop": e.canUpload.value && t.value === h
        }],
        style: {
          paddingLeft: 6 + I.depth * 14 + "px"
        },
        onClick: () => I.node.dir ? e.toggleDir(I.node.path) : e.openFile(I.node.path),
        onDragover: e.canUpload.value ? (G) => {
          G.preventDefault(), G.stopPropagation(), t.value = h;
        } : void 0,
        onDrop: e.canUpload.value ? (G) => {
          G.preventDefault(), G.stopPropagation(), r(G, h);
        } : void 0
      }, [!I.node.dir && rt(I.node.path) ? i("img", {
        src: rt(I.node.path),
        alt: "",
        width: "16",
        height: "16",
        class: "mr-1",
        style: {
          imageRendering: "pixelated",
          verticalAlign: "-3px"
        }
      }, null) : i(ne, {
        size: "16",
        class: "mr-1"
      }, {
        default: () => [I.node.dir ? e.isExpanded(I.node.path) ? "mdi-folder-open-outline" : "mdi-folder-outline" : e.iconFor(I.node.path)]
      }), i("span", {
        class: "pnl-ellipsis"
      }, [I.node.name])]);
    }), e.canUpload.value && t.value !== null && i("div", {
      class: "pnl-drop-hint"
    }, [S("Drop into "), t.value || "/ (root)"])]), i("input", {
      ref: l,
      type: "file",
      multiple: !0,
      style: {
        display: "none"
      },
      onChange: f
    }, null), i(nn, b({
      modelValue: n.value
    }, {
      "onUpdate:modelValue": (I) => n.value = I
    }, {
      raw: o.value,
      initialDir: s.value,
      onConfirm: (I, h) => e.upload(I, h)
    }), null)]);
  }
}), za = /* @__PURE__ */ H({
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
    const o = () => e.language ?? ft(e.path);
    return Me(() => {
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
          var p;
          return (p = e.onBreakpointContext) == null ? void 0 : p.call(e, s);
        },
        breakpoints: e.breakpointGutter
      }), e.breakpoints.length && t.setBreakpoints(e.breakpoints), e.debugLine && t.setDebugLine(e.debugLine, e.debugColumn), a("ready", t);
    }), Re(() => t == null ? void 0 : t.destroy()), R(() => e.modelValue, (s) => {
      t && !n && s !== t.getValue() && t.setValue(s);
    }), R([() => e.path, () => e.language, () => e.customExtension], () => t == null ? void 0 : t.setLanguage(o(), e.diagnose, e.customExtension)), R(() => e.dark, (s) => t == null ? void 0 : t.setDark(s)), R(() => e.readonly, (s) => t == null ? void 0 : t.setReadonly(s)), R(() => e.fontSize, (s) => t == null ? void 0 : t.setFontSize(s)), R(() => e.breakpoints, (s) => t == null ? void 0 : t.setBreakpoints(s ?? [])), R([() => e.debugLine, () => e.debugColumn], ([s, p]) => t == null ? void 0 : t.setDebugLine(s ?? 0, p ?? 1)), R(() => e.gotoSeq, () => {
      e.gotoLine && (t == null || t.gotoLine(e.gotoLine));
    }), () => i("div", {
      ref: l,
      class: "gad-editor"
    }, null);
  }
}), st = (e) => e.slice(e.lastIndexOf("/") + 1), cn = (e, a) => e.length > a ? e.slice(0, a - 1) + "…" : e, In = /* @__PURE__ */ H({
  name: "PanelEditor",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = () => !!e.openPath.value, t = (n, o, s, p = {}) => i(y, {
      size: "small",
      variant: "text",
      icon: n,
      title: o,
      disabled: p.disabled,
      color: p.color,
      onClick: s
    }, null);
    return () => {
      var n;
      return i("div", {
        class: "pnl"
      }, [e.tabs.value.length > 0 && i("div", {
        class: "editor-tabs"
      }, [e.tabs.value.map((o, s) => {
        const p = e.isDirty(o.path);
        return i("div", {
          key: o.path,
          class: ["editor-tab", {
            "editor-tab--active": s === e.active.value,
            "editor-tab--dirty": p
          }],
          title: st(o.path) + (p ? " • modified" : ""),
          onClick: () => e.activateTab(s),
          onMousedown: (u) => {
            u.button === 1 && (u.preventDefault(), e.closeTab(s));
          }
        }, [i("span", {
          class: "editor-tab-name"
        }, [cn(st(o.path), e.tabNameMax.value)]), i("span", {
          class: ["editor-tab-close", {
            "editor-tab-close--dirty": p
          }],
          title: a.value.close,
          onClick: (u) => {
            u.stopPropagation(), e.closeTab(s);
          }
        }, null)]);
      })]), i("div", {
        class: "pnl-toolbar"
      }, [e.canEdit.value && i(Se, null, [t("mdi-content-save-outline", a.value.save, () => e.save(), {
        disabled: !l() || e.isImage.value
      }), t("mdi-auto-fix", a.value.format, () => e.format(), {
        disabled: !l() || e.isImage.value
      })]), t("mdi-refresh", a.value.reloadFromDisk, () => e.reload(), {
        disabled: !l()
      }), e.canEdit.value && i(Se, null, [t("mdi-undo", a.value.undo, () => e.undo(), {
        disabled: !l() || e.isImage.value
      }), t("mdi-redo", a.value.redo, () => e.redo(), {
        disabled: !l() || e.isImage.value
      })]), e.canRun.value && i(ot, {
        vertical: !0,
        class: "mx-1"
      }, null), e.canRun.value && t("mdi-play", a.value.run, () => e.runActive(), {
        disabled: !l(),
        color: "success"
      }), e.canDebug.value && t(e.session.value ? "mdi-restart" : "mdi-bug", e.session.value ? a.value.restart : a.value.debug, () => e.debugActive(), {
        disabled: !l(),
        color: "warning"
      }), e.canRun.value && i(en, {
        location: "bottom start"
      }, {
        activator: ({
          props: o
        }) => i(y, b({
          size: "small",
          variant: "text",
          class: "text-none",
          appendIcon: "mdi-chevron-down",
          disabled: !e.canRun.value
        }, o), {
          default: () => [e.runLabel.value]
        }),
        default: () => i(ql, {
          density: "compact",
          minWidth: "220"
        }, {
          default: () => [i(Pa, {
            title: a.value.currentFile,
            active: e.activeProfile.value === null,
            onClick: () => e.activeProfile.value = null
          }, null), e.runProfiles.value.length > 0 && i($l, null, {
            default: () => [a.value.profiles]
          }), e.runProfiles.value.map((o) => i(Pa, {
            key: o.name,
            title: o.name,
            subtitle: o.path + (o.args.length ? " " + o.args.join(" ") : ""),
            active: e.activeProfile.value === o.name,
            onClick: () => e.activeProfile.value = o.name
          }, {
            append: () => i(y, {
              size: "x-small",
              variant: "text",
              icon: "mdi-delete-outline",
              title: a.value.deleteProfile,
              onClick: (s) => {
                s.stopPropagation(), e.deleteProfile(o.name);
              }
            }, null)
          })), i(Pa, {
            title: a.value.newProfile,
            prependIcon: "mdi-plus",
            onClick: () => e.profileDialog.value = !0
          }, null)]
        })
      }), e.stopped.value && i(Se, null, [i(ot, {
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
      ) : l() ? i(za, b({
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
      }, [S("A−")]), i("span", {
        class: "fs-val"
      }, [e.fontSize.value, S("px")]), i("button", {
        class: "fs-btn",
        title: a.value.increaseFont,
        onClick: () => e.incFont()
      }, [S("A+")])])])]);
    };
  }
}), gn = /* @__PURE__ */ H({
  name: "PanelCallStack",
  setup() {
    const e = D(_);
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
}), Zt = /* @__PURE__ */ H({
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
    async function p() {
      l.value = !0;
      const r = await e.inspect(e.expr);
      if (l.value = !1, !r) {
        t.value = [];
        return;
      }
      n.value = r.type, o.value = r.value, s.value = r.expandable, t.value = r.entries ?? [];
    }
    async function u() {
      s.value && (t.value === null && await p(), a.value = !a.value);
    }
    return Me(() => {
      e.root && p();
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
    }, [S("…")])]), a.value && t.value ? t.value.map((r) => i(Zt, {
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
}), pn = /* @__PURE__ */ H({
  name: "PanelLocals",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = v(!1), t = v(""), n = v(""), o = (s, p) => {
      s.trim() && (t.value = s, n.value = p, l.value = !0);
    };
    return () => {
      var s, p, u;
      return i("div", {
        class: "pnl"
      }, [i("div", {
        class: "pnl-body"
      }, [i("div", {
        class: "d-flex align-center",
        style: {
          gap: "4px"
        }
      }, [i(K, b({
        modelValue: e.evalExpr.value
      }, {
        "onUpdate:modelValue": (r) => e.evalExpr.value = r
      }, {
        label: a.value.evaluate,
        density: "compact",
        variant: "outlined",
        hideDetails: !0,
        onKeyup: (r) => r.key === "Enter" && e.doEval()
      }), null), i(y, {
        size: "small",
        variant: "tonal",
        disabled: !e.stopped.value,
        onClick: () => e.doEval()
      }, {
        default: () => [S("Eval")]
      }), i(y, {
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
      }, [(((s = e.snap.value) == null ? void 0 : s.locals) ?? []).map((r, f) => i("li", {
        key: f,
        class: "pnl-local"
      }, [i("span", {
        class: "pnl-ellipsis"
      }, [r.name, S(" = "), r.value, S(" "), i("span", {
        class: "text-medium-emphasis"
      }, [S("("), r.type, S(")")])]), i(y, {
        size: "x-small",
        variant: "text",
        icon: "mdi-file-tree-outline",
        title: a.value.inspectValue,
        onClick: () => o(r.name, r.name)
      }, null)])), !((u = (p = e.snap.value) == null ? void 0 : p.locals) != null && u.length) && i("li", {
        class: "text-medium-emphasis"
      }, [S("(none)")])])]), i(ue, b({
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
            default: () => [l.value && i(Zt, {
              key: t.value,
              inspect: e.inspectFn,
              label: n.value,
              expr: t.value,
              root: !0
            }, null)]
          }), i(de, null, {
            default: () => [i(ce, null, null), i(y, {
              onClick: () => l.value = !1
            }, {
              default: () => [a.value.close]
            })]
          })]
        })]
      })]);
    };
  }
}), mn = /* @__PURE__ */ H({
  name: "PanelOutput",
  setup() {
    const e = D(_), a = D(Q, x(() => X));
    return () => {
      var t;
      const l = e.runRes.value;
      return i("div", {
        class: "pnl"
      }, [i("div", {
        class: "pnl-body"
      }, [l && i(Se, null, [l.stdout && i("pre", {
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
function vn(e) {
  const a = e.replace(/^\/+/, ""), l = a.lastIndexOf("/");
  return l === -1 ? "" : a.slice(0, l);
}
function Ba(e, a) {
  const l = e.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, ""), t = /^([a-z][a-z0-9+.-]*:\/\/|\/\/|\/)/i.exec(l), n = t ? t[1] : "", o = [];
  for (const s of l.slice(n.length).split("/"))
    s === "" || s === "." || (s === ".." ? o.pop() : o.push(s));
  return n + o.join("/");
}
function fn(e, a, l) {
  return !e || e.startsWith("#") || e.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(e) ? null : e.startsWith("/") ? Ba(a, e) : Ba(l, e);
}
function oa(e, a, l) {
  if (!e || typeof DOMParser > "u") return e;
  const t = l ? l(a) : "doc", n = vn(a), o = n ? Ba(t, n) : t, s = new DOMParser().parseFromString(e, "text/html");
  for (const p of ["src", "href"])
    s.querySelectorAll(`[${p}]`).forEach((u) => {
      const r = fn(u.getAttribute(p) ?? "", t, o);
      r !== null && u.setAttribute(p, r);
    });
  return s.body.innerHTML;
}
function hn(e) {
  return e.endsWith(".gadx") ? "gadx" : e.endsWith(".gadt") ? "gadTemplate" : "gad";
}
const Cn = {
  gad: "DOCS",
  html: "HTML",
  markdown: "MARKDOWN",
  image: "IMAGE",
  none: "PREVIEW"
}, Sn = /* @__PURE__ */ H({
  name: "PanelDocs",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = v(""), t = v(""), n = v(!1);
    let o;
    async function s() {
      if (!(e.docKind.value !== "gad" || !e.openPath.value)) {
        n.value = !0;
        try {
          const r = await e.api.docGen(e.source.value, hn(e.openPath.value), "render-html");
          l.value = r.ok ? r.html ?? "" : "", t.value = r.ok ? "" : r.error ?? "";
        } catch (r) {
          l.value = "", t.value = r instanceof Error ? r.message : String(r);
        } finally {
          n.value = !1;
        }
      }
    }
    const p = async () => {
      await e.refreshDoc(), await s();
    };
    Me(p), Re(() => clearTimeout(o)), R(() => e.openPath.value, p), R(() => e.source.value, () => {
      e.docKind.value === "gad" && (clearTimeout(o), o = setTimeout(s, 500));
    });
    const u = (r) => {
      var h;
      const f = (h = r.target.closest("[data-src-pos]")) == null ? void 0 : h.getAttribute("data-src-pos");
      if (!f) return;
      const [I] = f.split(",").map(Number);
      I && e.goto(I);
    };
    return () => i("div", {
      class: "pnl"
    }, [i("div", {
      class: "pnl-head"
    }, [i("span", {
      class: "text-caption font-weight-medium"
    }, [Cn[e.docKind.value]]), i(y, {
      size: "x-small",
      variant: "text",
      icon: "mdi-refresh",
      title: a.value.refresh,
      loading: n.value,
      onClick: p
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
      innerHTML: oa(l.value, e.openPath.value)
    }, null) : i("span", {
      class: "text-medium-emphasis"
    }, [a.value.noDocumentation])]) : i("div", {
      class: "pnl-body gad-ide__doc",
      innerHTML: oa(e.docHtml.value, e.openPath.value)
    }, null)]);
  }
}), xn = {
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
function yn(e) {
  return xn[e] ?? { icon: "mdi-tag-outline", color: "currentColor" };
}
const Pn = H({
  name: "StructureTree",
  props: {
    symbols: { type: Array, default: () => [] },
    /** Called with the declaration clicked. */
    onNavigate: { type: Function, default: void 0 },
    /** What it says when there is nothing. */
    emptyText: { type: String, default: "No declarations." }
  },
  setup(e) {
    const a = Ce({}), l = (t, n, o) => {
      const s = t.children ?? [], p = !a[n], { icon: u, color: r } = yn(t.kind), f = te(
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
            var I;
            return (I = e.onNavigate) == null ? void 0 : I.call(e, t);
          }
        },
        [
          te(
            "span",
            {
              style: { width: "16px", display: "inline-flex", justifyContent: "center", flex: "0 0 16px" },
              onClick: (I) => {
                s.length && (I.stopPropagation(), a[n] = p);
              }
            },
            s.length > 0 ? [te(ne, { size: "16" }, () => p ? "mdi-chevron-down" : "mdi-chevron-right")] : []
          ),
          te(ne, { size: "16", style: { color: r } }, () => u),
          te("span", t.name),
          t.detail ? te("span", { class: "text-medium-emphasis", style: { overflow: "hidden", textOverflow: "ellipsis" } }, t.detail) : null
        ]
      );
      return te("div", { key: n }, [f, ...p ? s.map((I, h) => l(I, `${n}/${h}:${I.name}`, o + 1)) : []]);
    };
    return () => te(
      "div",
      { class: "gad-structure", style: { overflow: "auto", paddingBlock: "4px" } },
      e.symbols.length === 0 ? [te("div", { class: "text-medium-emphasis", style: { padding: "8px", fontSize: "13px" } }, e.emptyText)] : e.symbols.map((t, n) => l(t, `${n}:${t.name}`, 0))
    );
  }
}), bn = /* @__PURE__ */ H({
  name: "PanelStructure",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = v([]), t = v("");
    let n;
    async function o() {
      const p = e.api.symbols;
      if (!p || !e.openPath.value) {
        l.value = [];
        return;
      }
      try {
        l.value = await p(e.source.value, e.openPath.value), t.value = "";
      } catch (u) {
        t.value = u instanceof Error ? u.message : String(u);
      }
    }
    const s = () => {
      clearTimeout(n), n = setTimeout(o, 400);
    };
    return Me(o), Re(() => clearTimeout(n)), R(() => e.openPath.value, o), R(() => e.source.value, s), () => i("div", {
      class: "pnl"
    }, [i("div", {
      class: "pnl-head"
    }, [i("span", {
      class: "text-caption font-weight-medium"
    }, [a.value.structure.toUpperCase()]), i(y, {
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
    }, [e.api.symbols ? i(Pn, {
      symbols: l.value,
      emptyText: t.value || a.value.noDeclarations,
      onNavigate: (p) => e.goto(p.line)
    }, null) : i("div", {
      class: "text-medium-emphasis",
      style: {
        padding: "8px"
      }
    }, [a.value.noStructure])])]);
  }
}), Gn = /* @__PURE__ */ H({
  name: "PanelBreakpoints",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = v("current"), t = (n, o) => {
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
      }, [i(ne, {
        size: "14",
        color: "error",
        class: "mr-1"
      }, {
        default: () => [S("mdi-circle")]
      }), l.value === "all" ? n + ":" + o : "line " + o, s.condition ? i("em", {
        class: "bp-cond"
      }, [S(" if "), s.condition]) : null]), i("span", {
        class: "bp-actions"
      }, [i(y, {
        size: "x-small",
        variant: "text",
        icon: "mdi-pencil-outline",
        title: a.value.editCondition,
        onClick: () => e.openBpCondition(n, o)
      }, null), i(y, {
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
      }, [i(bt, b({
        modelValue: l.value
      }, {
        "onUpdate:modelValue": (s) => l.value = s
      }, {
        density: "compact"
      }), {
        default: () => [i(Ze, {
          value: "current"
        }, {
          default: () => [a.value.currentFile]
        }), i(Ze, {
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
      }, [a.value.noFileOpen]) : Object.keys(o).length ? Object.entries(o).flatMap(([s, p]) => p.map((u) => t(s, u))) : i("div", {
        class: "text-medium-emphasis"
      }, [a.value.noBreakpoints])])]);
    };
  }
}), Zn = /* @__PURE__ */ H({
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
    const l = D(Q, x(() => X)), t = v(e.initial.condition ?? ""), n = v(!!e.initial.disabled);
    R(() => e.modelValue, (s) => {
      s && (t.value = e.initial.condition ?? "", n.value = !!e.initial.disabled);
    });
    function o() {
      a("save", {
        condition: t.value.trim() || void 0,
        disabled: n.value
      }), a("update:modelValue", !1);
    }
    return () => i(ue, b({
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
          default: () => [i(K, b({
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
          }), null), i(Ge, b({
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
          default: () => [i(ce, null, null), i(y, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [l.value.cancel]
          }), i(y, {
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
function An(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !bi(e);
}
const ba = [["array-item-in-new-line", "arrayItemNewLine"], ["dict-item-in-new-line", "dictItemNewLine"], ["call-params-in-new-line", "callParamsNewLine"]], Mn = /* @__PURE__ */ H({
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
    const l = D(Q, x(() => X)), t = v("panels"), n = (A) => e.config[A] || {}, o = n("fmt"), s = n("transpile"), p = n("template"), u = Ce(Object.fromEntries(ba.map(([A]) => [A, o[A] === !0]))), r = v(o.format === !0), f = v(String(o["max-columns"] ?? "")), I = v(o.backup === !0), h = v(String(s.writeFunc ?? "")), G = v(String(s.rawStrFuncStart ?? "")), W = v(String(s.rawStrFuncEnd ?? "")), M = v(String(p.start_delimiter ?? "")), P = v(String(p.end_delimiter ?? ""));
    function B() {
      const A = {
        ...o
      };
      for (const [F] of ba)
        u[F] ? A[F] = !0 : delete A[F];
      r.value ? A.format = !0 : delete A.format;
      const j = parseInt(f.value, 10);
      Number.isFinite(j) && j > 0 ? A["max-columns"] = j : delete A["max-columns"], I.value ? A.backup = !0 : delete A.backup;
      const T = {
        ...s
      }, N = (F, ye, ee) => {
        ee.trim() === "" ? delete F[ye] : F[ye] = ee;
      };
      N(T, "writeFunc", h.value), N(T, "rawStrFuncStart", G.value), N(T, "rawStrFuncEnd", W.value);
      const w = {
        ...p
      };
      M.value === "" ? delete w.start_delimiter : w.start_delimiter = M.value, P.value === "" ? delete w.end_delimiter : w.end_delimiter = P.value;
      const V = {
        ...e.config,
        fmt: A
      };
      Object.keys(T).length > 0 ? V.transpile = T : delete V.transpile, Object.keys(w).length > 0 ? V.template = w : delete V.template, a("save", V), a("update:modelValue", !1);
    }
    const z = (A) => ({
      modelValue: A.value,
      "onUpdate:modelValue": (j) => A.value = j
    });
    return () => {
      let A;
      return i(ue, b({
        modelValue: e.modelValue
      }, {
        "onUpdate:modelValue": (j) => a("update:modelValue", j)
      }, {
        maxWidth: "560"
      }), {
        default: () => [i(oe, null, {
          default: () => [i(se, null, {
            default: () => [l.value.settings]
          }), i(bt, b({
            modelValue: t.value
          }, {
            "onUpdate:modelValue": (j) => t.value = j
          }), {
            default: () => [i(Ze, {
              value: "panels"
            }, {
              default: () => [l.value.panels]
            }), i(Ze, {
              value: "formatter"
            }, {
              default: () => [l.value.formatter]
            }), i(Ze, {
              value: "transpile"
            }, {
              default: () => [l.value.transpile]
            }), i(Ze, {
              value: "template"
            }, {
              default: () => [l.value.template]
            })]
          }), i(re, null, {
            default: () => [i(tn, b({
              modelValue: t.value
            }, {
              "onUpdate:modelValue": (j) => t.value = j
            }), {
              default: () => [i($e, {
                value: "panels"
              }, An(A = e.panels.map((j) => i(Ge, b({
                key: j.id,
                modelValue: j.visible
              }, {
                "onUpdate:modelValue": (T) => e.onTogglePanel(j.id, !!T)
              }, {
                label: j.label,
                density: "compact",
                hideDetails: !0
              }), null))) ? A : {
                default: () => [A]
              }), i($e, {
                value: "formatter"
              }, {
                default: () => [i(Ge, b({
                  modelValue: r.value
                }, {
                  "onUpdate:modelValue": (j) => r.value = !!j
                }, {
                  label: l.value.forceMultiline,
                  density: "compact",
                  hideDetails: !0
                }), null), i(K, b({
                  modelValue: f.value
                }, {
                  "onUpdate:modelValue": (j) => f.value = j
                }, {
                  label: l.value.maxColumns,
                  type: "number",
                  density: "compact",
                  hideDetails: !0
                }), null), ba.map(([j, T]) => i(Ge, b({
                  key: j,
                  modelValue: u[j]
                }, {
                  "onUpdate:modelValue": (N) => u[j] = !!N
                }, {
                  label: l.value[T],
                  density: "compact",
                  hideDetails: !0
                }), null)), i(Ge, b({
                  modelValue: I.value
                }, {
                  "onUpdate:modelValue": (j) => I.value = !!j
                }, {
                  label: l.value.keepBackup,
                  density: "compact",
                  hideDetails: !0
                }), null)]
              }), i($e, {
                value: "transpile"
              }, {
                default: () => [i(K, b(z(h), {
                  label: "writeFunc",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), i(K, b(z(G), {
                  label: "rawStrFuncStart",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), i(K, b(z(W), {
                  label: "rawStrFuncEnd",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0
                }), null)]
              }), i($e, {
                value: "template"
              }, {
                default: () => [i(K, b(z(M), {
                  label: "start_delimiter",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), i(K, b(z(P), {
                  label: "end_delimiter",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0
                }), null)]
              })]
            })]
          }), i(de, null, {
            default: () => [i(ce, null, null), i(y, {
              onClick: () => a("update:modelValue", !1)
            }, {
              default: () => [l.value.cancel]
            }), i(y, {
              color: "primary",
              onClick: B
            }, {
              default: () => [l.value.save]
            })]
          })]
        })]
      });
    };
  }
}), Bn = /* @__PURE__ */ H({
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
    const l = D(Q, x(() => X)), t = v(""), n = v(e.defaultPath), o = v([]), s = v(""), p = () => /\.gadx$/i.test(n.value);
    R(() => e.modelValue, (r) => {
      r && (n.value = e.defaultPath, t.value || (t.value = e.defaultPath.split("/").pop() ?? "profile"));
    });
    function u() {
      const r = {
        name: t.value.trim() || (n.value.split("/").pop() ?? "profile"),
        path: n.value,
        args: [...o.value]
      };
      p() && s.value && (r.tagEncode = s.value), a("create", r), a("update:modelValue", !1), t.value = "", o.value = [], s.value = "";
    }
    return () => i(ue, b({
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
          default: () => [i(K, b({
            modelValue: t.value
          }, {
            "onUpdate:modelValue": (r) => t.value = r
          }, {
            label: l.value.name,
            density: "compact",
            variant: "outlined",
            class: "mb-2",
            hideDetails: !0
          }), null), i(K, b({
            modelValue: n.value
          }, {
            "onUpdate:modelValue": (r) => n.value = r
          }, {
            label: l.value.file,
            density: "compact",
            variant: "outlined",
            class: "mb-2",
            hideDetails: !0
          }), null), i(_l, b({
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
          }), null), p() && i(Ve, b({
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
          default: () => [i(ce, null, null), i(y, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [l.value.cancel]
          }), i(y, {
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
}), kn = /* @__PURE__ */ H({
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
    const l = D(Q, x(() => X)), t = v("");
    R(() => e.request, (o) => {
      o && (t.value = o.initial);
    });
    const n = (o) => {
      var s;
      (s = e.request) == null || s.resolve(o ? t.value.trim() : null), a("done");
    };
    return () => i(ue, b({
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
            return [i(K, b({
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
          default: () => [i(ce, null, null), i(y, {
            onClick: () => n(!1)
          }, {
            default: () => [l.value.cancel]
          }), i(y, {
            color: "primary",
            onClick: () => n(!0)
          }, {
            default: () => [l.value.ok]
          })]
        })]
      })]
    });
  }
}), jn = /* @__PURE__ */ H({
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
    const l = D(Q, x(() => X)), t = (n) => {
      var o;
      (o = e.request) == null || o.resolve(n), a("done");
    };
    return () => i(ue, b({
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
        }), i(re, null, {
          default: () => {
            var n;
            return [(n = e.request) == null ? void 0 : n.message];
          }
        }), i(de, null, {
          default: () => [i(ce, null, null), i(y, {
            onClick: () => t(!1)
          }, {
            default: () => [l.value.cancel]
          }), i(y, {
            color: "primary",
            onClick: () => t(!0)
          }, {
            default: () => [l.value.ok]
          })]
        })]
      })]
    });
  }
}), Hn = /* @__PURE__ */ H({
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
    const l = D(_), t = D(Q, x(() => X)), n = v(""), o = v(!0), s = v(!1), p = v(""), u = v(""), r = v(!1), f = x(() => /\.(zip|tar|tar\.gz|tgz)(\?|#|$)/i.test(n.value));
    async function I() {
      if (n.value.trim()) {
        s.value = !0, p.value = "";
        try {
          await a("import", n.value.trim(), f.value && o.value && l.canExtract.value, u.value), a("update:modelValue", !1), n.value = "";
        } catch (h) {
          p.value = String(h);
        } finally {
          s.value = !1;
        }
      }
    }
    return () => i(ue, b({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (h) => a("update:modelValue", h)
    }, {
      maxWidth: "520"
    }), {
      default: () => [i(oe, null, {
        default: () => [i(se, null, {
          default: () => [t.value.importFromUrl]
        }), i(re, null, {
          default: () => [i(K, b({
            modelValue: n.value
          }, {
            "onUpdate:modelValue": (h) => n.value = h
          }, {
            label: t.value.url,
            placeholder: "https://example.com/file.gad",
            density: "compact",
            variant: "outlined",
            autofocus: !0,
            hideDetails: !0,
            onKeyup: (h) => h.key === "Enter" && I()
          }), null), f.value && l.canExtract.value && i(Pt, b({
            modelValue: o.value
          }, {
            "onUpdate:modelValue": (h) => o.value = !!h
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
          }, null), i(y, {
            size: "small",
            variant: "text",
            icon: "mdi-folder-search-outline",
            title: t.value.chooseFolder,
            onClick: () => r.value = !r.value
          }, null)]), r.value && i("div", {
            class: "dirtree-box mt-1"
          }, [i(Da, {
            root: l.tree.value,
            selected: u.value,
            onSelect: (h) => {
              u.value = h, r.value = !1;
            }
          }, null)]), s.value && i("div", {
            class: "mt-3"
          }, [i(an, {
            modelValue: e.progress < 0 ? void 0 : e.progress,
            indeterminate: e.progress < 0,
            color: "primary",
            height: "6",
            rounded: !0
          }, null), e.progress >= 0 && i("div", {
            class: "text-caption text-center mt-1"
          }, [e.progress, S("%")])]), p.value && i("div", {
            class: "pnl-diag mt-2"
          }, [p.value])]
        }), i(de, null, {
          default: () => [i(ce, null, null), i(y, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [t.value.cancel]
          }), i(y, {
            color: "primary",
            loading: s.value,
            disabled: !n.value.trim(),
            onClick: I
          }, {
            default: () => [t.value.importAction]
          })]
        })]
      })]
    });
  }
}), Dn = /* @__PURE__ */ H({
  name: "MoveDialog",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = v("");
    R(() => e.moveReq.value, (n) => {
      n && (l.value = n.path.includes("/") ? n.path.slice(0, n.path.lastIndexOf("/")) : "");
    });
    const t = (n) => {
      var o;
      return (o = e.moveReq.value) == null ? void 0 : o.resolve(n);
    };
    return () => i(ue, b({
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
          }, [i(Da, {
            root: e.tree.value,
            selected: l.value,
            onSelect: (n) => l.value = n
          }, null)])]
        }), i(de, null, {
          default: () => [i(ce, null, null), i(y, {
            variant: "text",
            onClick: () => t(null)
          }, {
            default: () => [a.value.cancel]
          }), i(y, {
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
}), zn = Symbol("gad-ide-extra-panels"), At = Symbol("gad-ide-extra-panel-expand");
function Nn(e) {
  return /* @__PURE__ */ H({
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
      return Me(() => {
        t(), n = a.params.containerApi.onDidMaximizedGroupChange(t);
      }), Re(() => n == null ? void 0 : n.dispose()), aa(At, {
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
      }, [te(e.component, e.props ?? {})]), !e.headerExpand && i(Na, {
        class: "gad-ide__extra-expand",
        variant: "tonal"
      }, null)]);
    }
  });
}
const Na = /* @__PURE__ */ H({
  name: "ExpandButton",
  props: {
    variant: {
      type: String,
      default: "text"
    }
  },
  setup(e) {
    const a = D(At, null);
    return () => a && i(y, {
      size: "x-small",
      variant: e.variant,
      icon: a.maximized.value ? "mdi-arrow-collapse" : "mdi-arrow-expand",
      title: a.maximized.value ? a.collapseTitle : a.expandTitle,
      "data-extra-expand": a.maximized.value ? "collapse" : "expand",
      onClick: a.toggle
    }, null);
  }
});
function Wn(e, a) {
  let l;
  for (const t of e)
    (t === "" ? l === void 0 : a === t || a.startsWith(t + "/")) && (l === void 0 || t.length > l.length) && (l = t);
  return l;
}
function Mt(e) {
  const a = Aa([""]), l = v(null);
  e.api.gitRepos && e.api.gitRepos().then((p) => {
    p.length && (a.value = p);
  }).catch(() => {
  }), R(() => e.openPath.value, () => {
    l.value = null;
  });
  const t = x(() => l.value !== null && a.value.includes(l.value) ? l.value : Wn(a.value, e.openPath.value) ?? a.value[0] ?? ""), n = x(() => e.api.gitFor ? e.api.gitFor(t.value) : e.api.git);
  return { repos: a, repo: t, choose: (p) => {
    l.value = p;
  }, api: n, rel: (p) => {
    const u = t.value;
    return u ? p.startsWith(u + "/") ? p.slice(u.length + 1) : "" : p;
  }, abs: (p) => t.value ? t.value + "/" + p : p };
}
const Bt = /* @__PURE__ */ H({
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
    return () => e.git.repos.value.length > 1 ? i(Ve, b({
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
}), wn = /* @__PURE__ */ H({
  name: "PanelChanges",
  setup() {
    var n;
    const e = D(_), a = D(Q, x(() => X)), l = ((n = e.workspace.actions) == null ? void 0 : n.edit) ?? !0, t = Mt(e);
    return () => i(ji, {
      key: t.repo.value,
      api: t.api.value,
      dark: e.dark.value,
      readonly: !l || e.readonly.value,
      canCommit: !!e.workspace.gitCommit && l && !e.readonly.value,
      writes: e.writes.value,
      messages: a.value,
      onSaved: (o) => void e.refreshFile(t.abs(o))
    }, {
      actions: () => [i(Bt, {
        git: t,
        label: a.value.repository,
        workspace: a.value.workspaceRepository
      }, null), i(Na, null, null)]
    });
  }
}), En = /* @__PURE__ */ H({
  name: "PanelGit",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = Mt(e);
    return () => i(Hi, {
      key: l.repo.value,
      api: l.api.value,
      dark: e.dark.value,
      openPath: l.rel(e.openPath.value),
      messages: a.value
    }, {
      actions: () => [i(Bt, {
        git: l,
        label: a.value.repository,
        workspace: a.value.workspaceRepository
      }, null), i(Na, null, null)]
    });
  }
}), Ga = [
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
  {
    id: "editor",
    label: "Editor",
    word: "editor",
    add: (e) => e.addPanel({
      id: "editor",
      component: "editor",
      title: "Editor",
      position: {
        referencePanel: "explorer",
        direction: "right"
      }
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
], Rn = {
  explorer: un,
  editor: In,
  docs: Sn,
  structure: bn,
  callstack: gn,
  locals: pn,
  breakpoints: Gn,
  output: mn
}, So = /* @__PURE__ */ H({
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
    const l = x(() => e.dark), t = xl(() => e.messages), n = Kl(e.api, e.workspace, l, {
      onReset: e.onReset,
      onUpload: e.onUpload,
      getRunProfiles: () => e.runProfiles,
      getRunMode: () => e.runMode,
      emitRunProfiles: (g) => a("update:runProfiles", g),
      getReadonly: () => e.readonly,
      getAutosave: () => e.autosave,
      getTabNameMax: () => e.tabNameMax,
      initialFontSize: e.fontSize,
      onFontSize: (g) => a("update:fontSize", g),
      fileTypes: e.fileTypes,
      getWords: () => t.value
    });
    aa(_, n), aa(Q, t), R(() => e.fontSize, (g) => {
      g !== n.fontSize.value && n.setFontSize(g);
    });
    let o = null, s = null, p = !1, u = "";
    const r = Ce(/* @__PURE__ */ new Set()), I = [...e.workspace.git && e.api.git ? [{
      id: "changes",
      label: t.value.changes,
      icon: "mdi-file-compare",
      component: wn,
      toolbarButton: !0,
      buttonAlign: "right",
      headerExpand: !0,
      expandTitle: t.value.expand,
      collapseTitle: t.value.restore
    }, {
      id: "git",
      label: t.value.git,
      icon: "mdi-source-branch",
      component: En,
      toolbarButton: !0,
      headerExpand: !0,
      expandTitle: t.value.expand,
      collapseTitle: t.value.restore
    }] : [], ...e.extraPanels], h = x(() => I.map((g) => ({
      id: g.id,
      label: g.label,
      add: (m) => {
        var pe;
        const Z = g.placement ?? "bottom", L = I.find((He) => He.id !== g.id && (He.placement ?? "bottom") === Z && m.getPanel(He.id)), J = Z === "right" ? "right" : Z === "left" ? "left" : "below", U = L ? {
          referencePanel: L.id,
          direction: "within"
        } : m.panels.length ? {
          direction: J
        } : void 0;
        m.addPanel({
          id: g.id,
          component: g.id,
          title: g.label,
          ...U ? {
            position: U
          } : {}
        }), !L && Z === "bottom" && ((pe = m.getPanel(g.id)) == null || pe.api.setSize({
          height: ye(m)
        }));
      }
    }))), G = {
      ...Rn
    };
    for (const g of I) G[g.id] = Nn(g);
    const W = (g) => g.word ? t.value[g.word] : g.label, M = x(() => [...(e.panels ? Ga.filter((g) => e.panels.includes(g.id)) : Ga).map((g) => ({
      ...g,
      label: W(g)
    })), ...h.value]), P = (g) => M.value.some((m) => m.id === g);
    function B(g, m) {
      try {
        m.add(g);
      } catch {
        g.addPanel({
          id: m.id,
          component: m.id,
          title: m.label
        });
      }
      const Z = g.getPanel(m.id);
      Z && Z.title !== m.label && Z.api.setTitle(m.label);
    }
    function z(g) {
      for (const m of M.value) m.id !== "docs" && m.id !== "structure" && !h.value.some((Z) => Z.id === m.id) && B(g, m);
    }
    function A(g) {
      for (const m of [...g.panels]) P(m.id) || g.removePanel(m);
    }
    const j = v("");
    function T() {
      var g;
      if (o) {
        r.clear();
        for (const m of o.panels) r.add(m.id);
        j.value = ((g = o.panels.find((m) => m.api.isMaximized())) == null ? void 0 : g.id) ?? "";
      }
    }
    function N(g) {
      const m = o == null ? void 0 : o.getPanel(g);
      m && (m.api.isMaximized() ? m.api.exitMaximized() : m.api.maximize(), T());
    }
    function w(g) {
      for (const m of Ga) {
        const Z = g.getPanel(m.id);
        Z && Z.title !== W(m) && Z.api.setTitle(W(m));
      }
    }
    R(t, () => o && w(o));
    function V(g) {
      o = g.api;
      const m = e.layoutConfig;
      try {
        m && m.grid ? (o.fromJSON(m), A(o), w(o), o.panels.length || z(o)) : z(o);
      } catch {
        o.clear(), z(o);
      }
      T(), u = JSON.stringify(o.toJSON());
      const Z = o.onDidMaximizedGroupChange(() => T()), L = o.onDidLayoutChange(() => {
        if (!o || (T(), p)) return;
        const J = o.toJSON(), U = JSON.stringify(J);
        U !== u && (u = U, a("update:layoutConfig", J));
      });
      s = {
        dispose: () => {
          Z.dispose(), L.dispose();
        }
      };
    }
    R(() => e.layoutConfig, (g) => {
      if (!(!o || !g || JSON.stringify(g) === u)) {
        p = !0;
        try {
          o.fromJSON(g), A(o), w(o), u = JSON.stringify(o.toJSON());
        } catch {
        } finally {
          p = !1, T();
        }
      }
    });
    const F = "gad-ide.bottom.height";
    function ye(g) {
      let m = 0;
      try {
        m = Number(localStorage.getItem(F)) || 0;
      } catch {
      }
      const Z = Math.max(160, g.height - 120);
      return Math.min(Z, Math.max(160, m || Math.round(g.height / 3)));
    }
    const ee = "gad-ide.preview.width";
    function q(g) {
      let m = 0;
      try {
        m = Number(localStorage.getItem(ee)) || 0;
      } catch {
      }
      return Math.min(Math.max(240, g.width - 300), Math.max(240, m || Math.round(g.width / 3)));
    }
    const Le = "gad-ide.left.width";
    function ie(g) {
      var L, J;
      if (!o) return;
      const m = M.value.find((U) => U.id === g);
      if (!m || o.getPanel(g)) return;
      const Z = !o.getPanel(g === "explorer" ? "structure" : "explorer");
      if (B(o, m), Z) {
        let U = 0;
        try {
          U = Number(localStorage.getItem(Le)) || 0;
        } catch {
        }
        (L = o.getPanel(g)) == null || L.api.setSize({
          width: Math.min(Math.max(160, o.width - 300), Math.max(160, U || 260))
        });
      }
      (J = o.getPanel(g)) == null || J.api.setActive();
    }
    function da(g) {
      var L, J;
      if (g === "docs" || g === "explorer" || g === "structure") {
        const U = (L = o == null ? void 0 : o.getPanel(g)) == null ? void 0 : L.api.width, pe = g === "docs" ? ee : Le;
        if (U) try {
          localStorage.setItem(pe, String(Math.round(U)));
        } catch {
        }
        return;
      }
      const m = I.find((U) => U.id === g), Z = (J = o == null ? void 0 : o.getPanel(g)) == null ? void 0 : J.api.height;
      if (!(!m || (m.placement ?? "bottom") !== "bottom" || !Z))
        try {
          localStorage.setItem(F, String(Math.round(Z)));
        } catch {
        }
    }
    function Ye(g, m) {
      if (o)
        if (m) {
          const Z = M.value.find((L) => L.id === g);
          Z && !o.getPanel(g) && B(o, Z);
        } else {
          const Z = o.getPanel(g);
          Z && (da(g), o.removePanel(Z));
        }
    }
    const ae = {
      buttons: x(() => I.filter((g) => g.toolbarButton).map((g) => ({
        id: g.id,
        label: g.label,
        icon: g.icon ?? "mdi-view-split-horizontal",
        align: g.buttonAlign ?? "left",
        bottom: (g.placement ?? "bottom") === "bottom"
      }))),
      open: (g) => {
        var Z;
        if (!o) return;
        const m = M.value.find((L) => L.id === g);
        m && !o.getPanel(g) && B(o, m), (Z = o.getPanel(g)) == null || Z.api.setActive();
      }
    };
    aa(zn, ae);
    const Te = (g, m, Z = !1) => i(y, {
      key: g.id,
      size: "small",
      variant: r.has(g.id) ? "tonal" : "text",
      prependIcon: g.icon,
      class: "text-none",
      disabled: Z,
      "data-extra-open": g.id,
      onClick: m
    }, {
      default: () => [g.label]
    }), Be = x(() => ae.buttons.value.filter((g) => g.bottom)), Ie = (g, m = "bottom", Z = () => ae.open(g.id), L = !1) => {
      const J = r.has(g.id), U = j.value === g.id, pe = m === "right" ? J ? "mdi-chevron-right" : "mdi-chevron-left" : m === "left" ? J ? "mdi-chevron-left" : "mdi-chevron-right" : J ? "mdi-chevron-down" : "mdi-chevron-up";
      return i("span", {
        key: g.id,
        class: "gad-ide__strip-item"
      }, [i("button", {
        type: "button",
        class: ["gad-ide__strip-btn", {
          "gad-ide__strip-btn--open": J
        }],
        title: g.label,
        disabled: L,
        "data-extra-open": g.id,
        "data-open": J ? "true" : "false",
        onClick: () => J ? Ye(g.id, !1) : Z()
      }, [i(ne, {
        size: "16",
        icon: g.icon
      }, null), i("span", {
        class: "gad-ide__strip-label"
      }, [g.label]), i(ne, {
        size: "14",
        icon: pe
      }, null)]), J && i("button", {
        type: "button",
        class: "gad-ide__strip-btn gad-ide__strip-expand",
        title: U ? t.value.restore : t.value.expand,
        "data-strip-expand": g.id,
        "data-maximized": U ? "true" : "false",
        onClick: () => N(g.id)
      }, [i(ne, {
        size: "14",
        icon: U ? "mdi-arrow-collapse" : "mdi-arrow-expand"
      }, null)])]);
    }, ra = {
      id: "docs",
      label: t.value.preview,
      icon: "mdi-file-eye-outline"
    }, Fe = x(() => [{
      id: "explorer",
      label: t.value.explorer,
      icon: "mdi-file-tree-outline"
    }, {
      id: "structure",
      label: t.value.structure,
      icon: "mdi-file-tree"
    }].filter((g) => P(g.id))), ge = x(() => M.value.map((g) => ({
      id: g.id,
      label: g.label,
      visible: r.has(g.id)
    })));
    R(() => n.docRequest.value, () => {
      var m, Z;
      const g = M.value.find((L) => L.id === "docs");
      o && g && !o.getPanel("docs") && (B(o, g), (m = o.getPanel("docs")) == null || m.api.setSize({
        width: q(o)
      })), (Z = o == null ? void 0 : o.getPanel("docs")) == null || Z.api.setActive();
    });
    function ke(g) {
      a("update:config", g);
    }
    Me(() => void n.init()), Re(() => s == null ? void 0 : s.dispose());
    const je = x(() => e.dark ? Gi : Zi);
    return () => {
      var g;
      return i("div", {
        class: "gad-ide"
      }, [i("div", {
        class: "gad-ide__header",
        "data-ide-header": !0
      }, [ae.buttons.value.filter((m) => !m.bottom && m.align === "left").map((m) => Te(m, () => ae.open(m.id))), i(y, {
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
      }, null), ae.buttons.value.filter((m) => !m.bottom && m.align === "right").map((m) => Te(m, () => ae.open(m.id))), e.headerActions.map((m) => (
        // with a label, its text beside the icon; else an icon button
        // (no children: a default slot, even empty, hides the icon)
        m.label ? i(y, {
          key: "action-" + m.id,
          size: "small",
          variant: "text",
          class: "text-none",
          prependIcon: m.icon,
          title: m.title ?? m.label,
          "data-ide-action": m.id,
          onClick: m.onClick
        }, {
          default: () => [m.label]
        }) : i(y, {
          key: "action-" + m.id,
          size: "small",
          variant: "text",
          density: "comfortable",
          icon: m.icon,
          title: m.title,
          "data-ide-action": m.id,
          onClick: m.onClick
        }, null)
      ))]), i("div", {
        class: "gad-ide__main"
      }, [Fe.value.length > 0 && i("div", {
        class: "gad-ide__strip gad-ide__strip--side gad-ide__strip--left",
        "data-ide-strip-left": !0
      }, [Fe.value.map((m) => Ie(m, "left", () => ie(m.id)))]), i("div", {
        class: "gad-ide__dock"
      }, [i(Ai, {
        style: {
          height: "100%"
        },
        theme: je.value,
        components: G,
        onReady: V
      }, null)]), P("docs") && i("div", {
        class: "gad-ide__strip gad-ide__strip--side gad-ide__strip--right",
        "data-ide-strip-right": !0
      }, [Ie(ra, "right", () => n.requestDocs(), !n.openPath.value && !r.has("docs"))])]), Be.value.length > 0 && i("div", {
        class: "gad-ide__strip",
        "data-ide-strip": !0
      }, [Be.value.filter((m) => m.align === "left").map((m) => Ie(m)), i("span", {
        class: "gad-ide__header-spacer"
      }, null), Be.value.filter((m) => m.align === "right").map((m) => Ie(m))]), i(Mn, b({
        modelValue: n.settingsOpen.value
      }, {
        "onUpdate:modelValue": (m) => n.settingsOpen.value = m
      }, {
        config: e.config,
        panels: ge.value,
        onTogglePanel: Ye,
        onSave: ke
      }), null), i(Bn, b({
        modelValue: n.profileDialog.value
      }, {
        "onUpdate:modelValue": (m) => n.profileDialog.value = m
      }, {
        defaultPath: n.openPath.value,
        onCreate: n.addProfile
      }), null), i(Zn, b({
        modelValue: !!n.bpDialog.value
      }, {
        "onUpdate:modelValue": (m) => {
          m || (n.bpDialog.value = null);
        }
      }, {
        line: ((g = n.bpDialog.value) == null ? void 0 : g.line) ?? 0,
        initial: n.bpDialog.value ? n.bpMetaFor(n.bpDialog.value.path)[n.bpDialog.value.line] ?? {} : {},
        onSave: (m) => {
          n.bpDialog.value && n.setBpMeta(n.bpDialog.value.path, n.bpDialog.value.line, m);
        }
      }), null), i(kn, {
        request: n.promptReq.value,
        onDone: () => n.promptReq.value = null
      }, null), i(Dn, null, null), i(jn, {
        request: n.confirmReq.value,
        onDone: () => n.confirmReq.value = null
      }, null), i(Hn, b({
        modelValue: n.urlDialog.value
      }, {
        "onUpdate:modelValue": (m) => n.urlDialog.value = m
      }, {
        progress: n.uploadProgress.value,
        onImport: (m, Z, L) => n.uploadUrl(m, Z, L)
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
  function s(p, u) {
    u = (u || "").replace(/m/g, "") + "m";
    var r = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
      return t;
    }).replace(/<<value>>/g, function() {
      return p;
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
  function l(f) {
    return f = f.replace(/<inner>/g, function() {
      return a;
    }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + f + ")");
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
  }), ["url", "bold", "italic", "strike"].forEach(function(f) {
    ["url", "bold", "italic", "strike", "code-snippet"].forEach(function(I) {
      f !== I && (e.languages.markdown[f].inside.content.inside[I] = e.languages.markdown[I]);
    });
  }), e.hooks.add("after-tokenize", function(f) {
    if (f.language !== "markdown" && f.language !== "md")
      return;
    function I(h) {
      if (!(!h || typeof h == "string"))
        for (var G = 0, W = h.length; G < W; G++) {
          var M = h[G];
          if (M.type !== "code") {
            I(M.content);
            continue;
          }
          var P = M.content[1], B = M.content[3];
          if (P && B && P.type === "code-language" && B.type === "code-block" && typeof P.content == "string") {
            var z = P.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            z = (/[a-z][\w-]*/i.exec(z) || [""])[0].toLowerCase();
            var A = "language-" + z;
            B.alias ? typeof B.alias == "string" ? B.alias = [B.alias, A] : B.alias.push(A) : B.alias = [A];
          }
        }
    }
    I(f.tokens);
  }), e.hooks.add("wrap", function(f) {
    if (f.type === "code-block") {
      for (var I = "", h = 0, G = f.classes.length; h < G; h++) {
        var W = f.classes[h], M = /language-(.+)/.exec(W);
        if (M) {
          I = M[1];
          break;
        }
      }
      var P = e.languages[I];
      if (P)
        f.content = e.highlight(r(f.content), P, I);
      else if (I && I !== "none" && e.plugins.autoloader) {
        var B = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
        f.attributes.id = B, e.plugins.autoloader.loadLanguages(I, function() {
          var z = document.getElementById(B);
          z && (z.innerHTML = e.highlight(z.textContent, e.languages[I], I));
        });
      }
    }
  });
  var s = RegExp(e.languages.markup.tag.pattern.source, "gi"), p = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"'
  }, u = String.fromCodePoint || String.fromCharCode;
  function r(f) {
    var I = f.replace(s, "");
    return I = I.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function(h, G) {
      if (G = G.toLowerCase(), G[0] === "#") {
        var W;
        return G[1] === "x" ? W = parseInt(G.slice(2), 16) : W = Number(G.slice(1)), u(W);
      } else {
        var M = p[G];
        return M || h;
      }
    }), I;
  }
  e.languages.md = e.languages.markdown;
})(Prism);
const Vn = [{
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
function Ln(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const Yn = (e) => e.replace(/\s*\{data-src-pos="\d+,\d+"\}/g, "");
function ea(e, a) {
  const l = xe.languages[a];
  return l ? xe.highlight(e, l, a) : Ln(e);
}
const kt = /* @__PURE__ */ H({
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
    async function p() {
      const r = ++o;
      n.value = !0;
      try {
        const f = await e.doc(e.source(), e.sourceType, l.value);
        r === o && (t.value = f);
      } finally {
        r === o && (n.value = !1);
      }
    }
    R([l, () => e.sourceType], p, {
      immediate: !0
    }), R(() => e.revision, () => {
      clearTimeout(s), s = setTimeout(p, 250);
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
            innerHTML: oa(Ha(r.markdown ?? ""), e.docPath, e.docRootFor)
          }, null);
        case "render-html":
          return i("div", {
            class: "gp-doc-rendered",
            innerHTML: oa(r.html ?? "", e.docPath, e.docRootFor)
          }, null);
        case "md":
          return i("pre", {
            class: "gp-doc-src language-markdown",
            innerHTML: ea(Yn(r.markdown ?? ""), "markdown")
          }, null);
        case "html":
          return i("pre", {
            class: "gp-doc-src language-markup",
            innerHTML: ea(r.html ?? "", "markup")
          }, null);
        case "json":
          return i("pre", {
            class: "gp-doc-src language-json",
            innerHTML: ea(r.text ?? "", "json")
          }, null);
        case "yaml":
          return i("pre", {
            class: "gp-doc-src language-yaml",
            innerHTML: ea(r.text ?? "", "yaml")
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
      }, [i(Ve, b({
        class: "gp-doc-ctl",
        modelValue: l.value
      }, {
        "onUpdate:modelValue": (f) => l.value = f ?? "render-md"
      }, {
        items: Vn,
        density: "compact",
        variant: "outlined",
        hideDetails: !0,
        disabled: n.value,
        style: {
          maxWidth: "180px"
        }
      }), null), i(y, {
        class: "gp-doc-ctl",
        size: "small",
        height: "32",
        variant: "tonal",
        loading: n.value,
        title: "Reload documentation",
        onClick: p
      }, {
        default: () => [S("↻")]
      }), (r = a.default) == null ? void 0 : r.call(a)])]), i("div", {
        class: "gp-doc-body",
        onClick: (f) => {
          if (!e.onNavigate) return;
          const I = f.target.closest("[data-src-pos]"), h = I == null ? void 0 : I.getAttribute("data-src-pos");
          if (h) {
            const [G, W] = h.split(",").map((M) => parseInt(M, 10));
            G && e.onNavigate(G, W || 1);
          }
        }
      }, [u()])]);
    };
  }
}), Tn = {
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
}, Fn = {
  gad: "gad",
  gadt: "gadt",
  gadx: "gadx"
}, Un = {
  gad: "",
  gadt: "gadTemplate",
  gadx: "gadx"
}, xo = /* @__PURE__ */ H({
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
    const a = v("gad"), l = Ce({
      ...Tn
    }), t = x({
      get: () => l[a.value],
      set: (B) => l[a.value] = B
    }), n = x(() => Un[a.value]), o = v(!1), s = v(""), p = v(!1), u = v(0), r = v(0), f = v(0), I = v(null), h = e.runner.diagnose ? (B) => e.runner.diagnose(B, n.value) : void 0;
    async function G(B) {
      o.value = !0;
      try {
        const z = await e.runner.format(t.value, n.value);
        I.value = {
          kind: "format",
          fmt: z
        }, B && z.ok && (t.value = z.source);
      } finally {
        o.value = !1;
      }
    }
    async function W() {
      o.value = !0;
      try {
        const B = a.value === "gadx" ? s.value : "";
        I.value = {
          kind: "run",
          run: await e.runner.run(t.value, n.value, B)
        };
      } finally {
        o.value = !1;
      }
    }
    const M = ta("gad-ide.playground.editor", 560, 200, 4e3), P = ta("gad-ide.playground.doc", 420, 160, 4e3);
    return () => {
      var B, z;
      return i("div", {
        class: "gp-split"
      }, [i("section", {
        class: "gp-pane",
        style: {
          flex: `0 0 ${M.size.value}px`
        }
      }, [i("div", {
        class: "gp-pane-head"
      }, [i(yt, b({
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
        default: () => [i(y, {
          size: "small",
          value: "gad"
        }, {
          default: () => [S("GAD")]
        }), i(y, {
          size: "small",
          value: "gadt"
        }, {
          default: () => [S("GAD Template")]
        }), i(y, {
          size: "small",
          value: "gadx"
        }, {
          default: () => [S("GADx")]
        })]
      }), i("span", {
        class: "gp-actions"
      }, [a.value === "gadx" && i(Ve, b({
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
      }), null), i(y, {
        size: "small",
        variant: "tonal",
        loading: o.value,
        onClick: () => G(!1)
      }, {
        default: () => [S("Format")]
      }), i(y, {
        size: "small",
        variant: "tonal",
        loading: o.value,
        onClick: () => G(!0)
      }, {
        default: () => [S("Format & apply")]
      }), i(y, {
        size: "small",
        color: "primary",
        prependIcon: "mdi-play",
        loading: o.value,
        onClick: W
      }, {
        default: () => [S("Run")]
      }), e.runner.doc && i(y, {
        size: "small",
        variant: p.value ? "flat" : "tonal",
        color: p.value ? "primary" : void 0,
        onClick: () => p.value = !p.value,
        title: "Toggle the documentation panel"
      }, {
        default: () => [S("Doc")]
      })])]), i("div", {
        class: "gp-editor"
      }, [i(za, b({
        key: a.value,
        modelValue: t.value
      }, {
        "onUpdate:modelValue": (A) => {
          t.value = A, p.value && u.value++;
        }
      }, {
        language: Fn[a.value],
        dark: e.dark,
        diagnose: h,
        gotoLine: r.value,
        gotoSeq: f.value
      }), null)])]), i(ia, {
        onStart: M.begin,
        onDrag: (A) => M.drag(A),
        onReset: M.reset
      }, null), i("section", {
        class: "gp-pane",
        style: {
          flex: "1 1 auto"
        }
      }, [i("div", {
        class: "gp-pane-head"
      }, [S("Output")]), i("div", {
        class: "gp-pane-body"
      }, [!I.value && i("p", {
        class: "text-medium-emphasis"
      }, [S("Format or run the source on the left.")]), ((B = I.value) == null ? void 0 : B.kind) === "format" && i(Jn, {
        fmt: I.value.fmt
      }, null), ((z = I.value) == null ? void 0 : z.kind) === "run" && i(Xn, {
        run: I.value.run
      }, null)])]), e.runner.doc && p.value && i(ia, {
        onStart: P.begin,
        onDrag: (A) => P.drag(A, -1),
        onReset: P.reset
      }, null), e.runner.doc && p.value && i("section", {
        class: "gp-pane gp-pane--doc",
        style: {
          flex: `0 0 ${P.size.value}px`
        }
      }, [i(kt, {
        doc: e.runner.doc,
        source: () => t.value,
        sourceType: n.value,
        revision: u.value,
        onNavigate: (A) => {
          r.value = A, f.value++;
        }
      }, {
        default: () => [i(y, {
          class: "gp-doc-ctl",
          size: "small",
          height: "32",
          variant: "tonal",
          title: "Close the doc panel",
          onClick: () => p.value = !1
        }, {
          default: () => [S("✕")]
        })]
      })])]);
    };
  }
}), Jn = /* @__PURE__ */ H({
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
}), Xn = /* @__PURE__ */ H({
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
}), Qn = {
  gad: "gad",
  gadt: "gadt",
  gadx: "gadx"
}, Za = {
  gad: "",
  gadt: "gadTemplate",
  gadx: "gadx"
};
let On = 1;
const ut = (e = "", a = "gad") => ({
  id: On++,
  source: e,
  dialect: a,
  tagEncode: "",
  result: null,
  running: !1,
  showDoc: !1,
  docRev: 0,
  gotoLine: 0,
  gotoSeq: 0
}), Kn = [{
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
}], yo = /* @__PURE__ */ H({
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
    const a = v(Kn.map((u) => ut(u.source, u.dialect)));
    async function l(u) {
      u.running = !0;
      try {
        const r = u.dialect === "gadx" ? u.tagEncode : "";
        u.result = await e.runner.run(u.source, Za[u.dialect], r);
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
    const t = () => a.value.push(ut()), n = (u) => {
      a.value.length > 1 && (a.value = a.value.filter((r) => r.id !== u));
    }, o = (u) => e.runner.diagnose ? (r) => e.runner.diagnose(r, Za[u.dialect]) : void 0, s = ta("gad-ide.notebook.editor", 220, 80, 4e3), p = ta("gad-ide.notebook.doc", 420, 160, 4e3);
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
    }, [i(za, b({
      key: u.id + ":" + u.dialect,
      modelValue: u.source
    }, {
      "onUpdate:modelValue": (r) => {
        u.source = r, u.showDoc && u.docRev++;
      }
    }, {
      language: Qn[u.dialect],
      dark: e.dark,
      diagnose: o(u),
      gotoLine: u.gotoLine,
      gotoSeq: u.gotoSeq
    }), null)]), e.runner.doc && u.showDoc && i(ia, {
      onStart: p.begin,
      onDrag: (r) => p.drag(r, -1),
      onReset: p.reset
    }, null), e.runner.doc && u.showDoc && i("div", {
      class: "gnb-doc",
      style: {
        flex: `0 0 ${p.size.value}px`,
        height: `${s.size.value}px`
      }
    }, [i(kt, {
      doc: e.runner.doc,
      source: () => u.source,
      sourceType: Za[u.dialect],
      revision: u.docRev,
      onNavigate: (r) => {
        u.gotoLine = r, u.gotoSeq++;
      }
    }, {
      default: () => [i(y, {
        class: "gp-doc-ctl",
        size: "small",
        height: "32",
        variant: "tonal",
        title: "Close the doc panel",
        onClick: () => u.showDoc = !1
      }, {
        default: () => [S("✕")]
      })]
    })])]), i(ia, {
      direction: "row",
      onStart: s.begin,
      onDrag: (r) => s.drag(r),
      onReset: s.reset
    }, null), i("div", {
      class: "gnb-bar"
    }, [i(yt, b({
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
      default: () => [i(y, {
        size: "small",
        value: "gad"
      }, {
        default: () => [S("GAD")]
      }), i(y, {
        size: "small",
        value: "gadt"
      }, {
        default: () => [S("GAD Template")]
      }), i(y, {
        size: "small",
        value: "gadx"
      }, {
        default: () => [S("GADx")]
      })]
    }), u.dialect === "gadx" && i(Ve, b({
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
    }), null), i(y, {
      size: "small",
      color: "primary",
      prependIcon: "mdi-play",
      loading: u.running,
      onClick: () => l(u)
    }, {
      default: () => [S("Run")]
    }), e.runner.doc && i(y, {
      size: "small",
      variant: u.showDoc ? "flat" : "tonal",
      color: u.showDoc ? "primary" : void 0,
      title: "Toggle the documentation panel for this cell",
      onClick: () => {
        u.showDoc = !u.showDoc, u.docRev++;
      }
    }, {
      default: () => [S("Doc")]
    }), i(y, {
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
    }, [S("↩ "), u.result.result]), (u.result.diagnostics ?? []).map((r, f) => i("div", {
      class: "gad-ide__diag",
      key: f
    }, [r.line, S(":"), r.column, S(" "), r.message]))])])), i(y, {
      size: "small",
      variant: "tonal",
      prependIcon: "mdi-plus",
      onClick: t
    }, {
      default: () => [S("Add cell")]
    })]);
  }
});
async function E(e, a, l) {
  const t = await fetch(a, {
    method: e,
    headers: l ? { "Content-Type": "application/json" } : void 0,
    body: l ? JSON.stringify(l) : void 0
  }), n = await t.json().catch(() => ({}));
  if (!t.ok) throw new Error(n.error || t.statusText);
  return n;
}
function _n(e = "") {
  const a = (t) => e + t, l = $a(a("api/ide/"));
  return {
    /** the workspace's repository (Workspace.git) */
    git: l,
    /** gitFor is the repository of a folder of the workspace (one of
     * gitRepos): the Changes and Git panels on it. */
    gitFor: (t) => t ? $a(a("api/ide/"), t) : l,
    /** gitRepos are the repositories of the workspace: "" when it is in
     * one, then its folders that are one. */
    gitRepos: () => E("GET", a("api/ide/git/repos")).then((t) => t.repos || []),
    workspace: () => E("GET", a("api/ide/workspace")),
    tree: (t = !1) => E("GET", a("api/ide/tree") + (t ? "?hidden=true" : "")),
    read: (t) => E(
      "GET",
      a("api/ide/file?path=") + encodeURIComponent(t)
    ),
    /** rawUrl is the URL of the file's bytes as they are (an image to show). */
    rawUrl: (t) => a("api/ide/file?raw=1&path=") + encodeURIComponent(t),
    write: (t, n) => E("PUT", a("api/ide/file"), { path: t, content: n }),
    mkfile: (t) => E("PUT", a("api/ide/file"), { path: t, content: "" }),
    del: (t) => E("POST", a("api/ide/delete"), { path: t }),
    rename: (t, n) => E("POST", a("api/ide/rename"), { path: t, to: n }),
    mkdir: (t) => E("POST", a("api/ide/mkdir"), { path: t }),
    /** upload writes files uploaded — text, or bytes (base64) — at their paths. */
    upload: (t) => E("POST", a("api/ide/upload"), {
      files: t.map((n) => n.bytes ? { path: n.path, bytes: n.bytes } : { path: n.path, content: n.content })
    }),
    fetchUrl: (t, n) => E("POST", a("api/ide/fetch"), { url: t, path: n }),
    config: () => E("GET", a("api/ide/config")),
    saveConfig: (t) => E("PUT", a("api/ide/config"), t),
    modules: () => E("GET", a("api/ide/modules")),
    format: (t) => E("POST", a("api/ide/format"), { source: t }),
    /** symbols is the structure of source (`gad symbols`): its declarations as
     * a tree; path (or sourceType) says its dialect. */
    symbols: (t, n, o) => E("POST", a("api/ide/symbols"), { source: t, path: n, sourceType: o }),
    transpile: (t, n) => E("POST", a("api/ide/transpile"), { source: t, path: n }),
    doc: (t) => E("POST", a("api/ide/doc"), { source: t }).then((n) => n.docs || []),
    /** docGen generates documentation for source in the requested mode. */
    docGen: (t, n, o) => E("POST", a("api/ide/doc-gen"), { source: t, sourceType: n, mode: o }),
    eval: (t) => E("POST", a("api/ide/eval"), t),
    inspect: (t) => E("POST", a("api/ide/inspect"), t),
    diagnose: (t, n) => E("POST", a("api/ide/diagnose"), { source: t, sourceType: n }).then(
      (o) => o.diagnostics || []
    ),
    run: (t) => E("POST", a("api/ide/run"), t),
    dbgStart: (t) => E("POST", a("api/ide/debug/start"), t),
    dbgCmd: (t, n) => E("POST", a("api/ide/debug/command"), { session: t, command: n }),
    dbgEval: (t, n, o) => E("POST", a("api/ide/debug/eval"), {
      session: t,
      expr: n,
      repr: o
    })
  };
}
const jt = _n(), Po = jt;
async function bo() {
  try {
    return await jt.workspace();
  } catch {
    return null;
  }
}
export {
  Ao as ChangesPanel,
  Fl as DEFAULT_FILE_TYPES,
  ja as DEFAULT_IDE_OWN_MESSAGES,
  X as DEFAULT_MESSAGES,
  Mo as DiffBrowser,
  Bo as DiffMergeView,
  kt as DocPanel,
  Xl as FileTypeRegistry,
  ko as GIT_I18N_MESSAGES,
  jo as GIT_I18N_NAMESPACE,
  Ho as GIT_MESSAGES_PT_BR,
  za as GadEditor,
  Hl as GadEditorView,
  So as GadIde,
  yo as GadNotebook,
  xo as GadPlayground,
  Do as GitPanel,
  Co as IDE_I18N_MESSAGES,
  Sl as IDE_I18N_NAMESPACE,
  It as IDE_OWN_MESSAGES_PT_BR,
  _ as IdeControllerKey,
  Zt as InspectorNode,
  xn as KIND_ICONS,
  zo as LANGUAGES,
  No as ResizeHandle,
  Pn as StructureTree,
  Kl as createController,
  Wo as createHttpGitApi,
  _n as createHttpIdeApi,
  Po as httpIdeApi,
  jt as ideApi,
  yn as kindIcon,
  tt as langExtension,
  ft as langOf,
  wo as languageExtensions,
  Eo as languageOf,
  bo as probeIde,
  Ro as renamedTo,
  Ha as renderDocMarkdown,
  Vo as statusColor,
  Lo as treePath,
  Yo as unchangedContent,
  xl as useIdeMessages,
  To as useStoredSize
};
