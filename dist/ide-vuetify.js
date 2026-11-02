var Si = Object.defineProperty;
var xi = (e, a, l) => a in e ? Si(e, a, { enumerable: !0, configurable: !0, writable: !0, value: l }) : e[a] = l;
var fe = (e, a, l) => xi(e, typeof a != "symbol" ? a + "" : a, l);
import { computed as x, ref as v, shallowRef as Ba, reactive as Se, watch as R, onScopeDispose as yi, defineComponent as H, createVNode as i, createTextVNode as S, Fragment as xe, inject as D, mergeProps as b, onMounted as He, onBeforeUnmount as De, h as ie, isVNode as Pi, provide as na } from "vue";
import { themeDark as bi, themeLight as Gi, DockviewVue as Zi } from "dockview-vue";
import { DEFAULT_GIT_MESSAGES as Ai, useWords as Mi, useGitMessages as Bi, ChangesPanel as ki, GitPanel as ji, useStoredSize as oa, ResizeHandle as da, createHttpGitApi as $a } from "@gad-lang/git-vuetify";
import { ChangesPanel as Mo, DiffBrowser as Bo, DiffMergeView as ko, GIT_I18N_MESSAGES as jo, GIT_I18N_NAMESPACE as Ho, GIT_MESSAGES_PT_BR as Do, GitPanel as zo, LANGUAGES as No, ResizeHandle as Wo, createHttpGitApi as wo, languageExtensions as Eo, languageOf as Ro, renamedTo as Vo, statusColor as Lo, treePath as Yo, unchangedContent as To, useStoredSize as Fo } from "@gad-lang/git-vuetify";
import { StateField as ct, RangeSet as et, StateEffect as Ha, Compartment as ea, EditorState as Pa } from "@codemirror/state";
import { gutter as Hi, EditorView as je, GutterMarker as Di, hoverTooltip as zi, Decoration as Le, keymap as Ni } from "@codemirror/view";
import { indentWithTab as Wi, defaultKeymap as wi, undo as Ei, redo as Ri } from "@codemirror/commands";
import { oneDark as at } from "@codemirror/theme-one-dark";
import { StreamLanguage as Vi } from "@codemirror/language";
import { basicSetup as Li } from "codemirror";
import { gad as ba } from "@gad-lang/codemirror-gad";
import { json as Yi } from "@codemirror/lang-json";
import { html as Ti } from "@codemirror/lang-html";
import { css as Fi } from "@codemirror/lang-css";
import { javascript as aa } from "@codemirror/lang-javascript";
import { markdown as Ui } from "@codemirror/lang-markdown";
import { yaml as Ji } from "@codemirror/legacy-modes/mode/yaml";
import ye from "prismjs";
import { registerGad as Xi, registerGadTemplate as Qi } from "@gad-lang/prism-gad";
import { VSelect as Oi, VBtn as Ki, VTabs as _i, VTab as qi, VTextField as $i, VDialog as el, VCard as al, VCardTitle as tl, VCardText as il, VCardActions as ll, VSpacer as nl, VDivider as ol, VMenu as dl, VList as rl, VListItem as sl, VListSubheader as ul, VIcon as cl, VSwitch as Il, VCheckbox as gl, VWindow as pl, VWindowItem as ml, VCombobox as vl, VProgressLinear as fl, VBtnToggle as hl } from "vuetify/components";
const Da = {
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
}, X = { ...Ai, ...Da }, Cl = "gadIde", So = {
  en: { gadIde: Da },
  pt: { gadIde: It }
}, Q = Symbol("gad-ide-messages");
function Sl(e) {
  const a = Mi(Cl, { en: Da, pt: It }, e), l = Bi(e);
  return x(() => ({ ...l.value, ...a.value }));
}
const Ve = (e, ...a) => {
  let l = 0;
  return e.replace(/%[sd]/g, () => String(a[l++] ?? ""));
}, gt = Ha.define(), pt = Ha.define();
class xl extends Di {
  toDOM() {
    const a = document.createElement("span");
    return a.className = "cm-bp-dot", a.textContent = "●", a;
  }
}
const ka = new xl(), ra = ct.define({
  create() {
    return et.empty;
  },
  update(e, a) {
    e = e.map(a.changes);
    for (const l of a.effects)
      if (l.is(pt))
        e = l.value.on ? e.update({ add: [ka.range(l.value.pos)] }) : e.update({ filter: (t) => t !== l.value.pos });
      else if (l.is(gt)) {
        const t = a.state.doc, n = [...new Set(l.value)].filter((o) => o >= 1 && o <= t.lines).sort((o, s) => o - s).map((o) => ka.range(t.line(o).from));
        e = et.of(n);
      }
    return e;
  }
});
function yl(e) {
  const a = [], l = e.state.field(ra).iter();
  for (; l.value; )
    a.push(e.state.doc.lineAt(l.from).number), l.next();
  return a.sort((t, n) => t - n);
}
function Pl(e, a) {
  e.dispatch({ effects: gt.of(a) });
}
function bl(e, a) {
  let l = !1;
  return e.state.field(ra).between(a, a, () => {
    l = !0;
  }), l;
}
function Gl(e, a) {
  const l = (t) => e(yl(t));
  return [
    ra,
    Hi({
      class: "cm-breakpoint-gutter",
      markers: (t) => t.state.field(ra),
      initialSpacer: () => ka,
      domEventHandlers: {
        // A single click toggles the breakpoint: it adds one on an empty line and
        // removes it when the line already has one.
        mousedown(t, n) {
          return t.dispatch({ effects: pt.of({ pos: n.from, on: !bl(t, n.from) }) }), l(t), !0;
        },
        contextmenu(t, n, o) {
          return a ? (o.preventDefault(), a(t.state.doc.lineAt(n.from).number), !0) : !1;
        }
      }
    }),
    je.baseTheme({
      ".cm-breakpoint-gutter": { width: "1.1em", cursor: "pointer" },
      ".cm-breakpoint-gutter .cm-bp-dot": { color: "#e5484d", paddingLeft: "2px" }
    })
  ];
}
const mt = Ha.define(), Zl = Le.line({ class: "cm-debug-line" }), Al = Le.mark({ class: "cm-debug-node" }), ta = (e) => /[A-Za-z0-9_]/.test(e);
function vt(e, a) {
  let l = Math.min(Math.max(a, 0), e.length);
  if (l >= e.length || !ta(e[l]))
    if (l > 0 && ta(e[l - 1])) l -= 1;
    else return null;
  let t = l, n = l;
  for (; t > 0 && ta(e[t - 1]); ) t--;
  for (; n < e.length && ta(e[n]); ) n++;
  return n <= t ? null : { start: t, end: n, word: e.slice(t, n) };
}
function Ml(e, a) {
  if (!a || a.line < 1 || a.line > e.lines) return Le.none;
  const l = e.line(a.line), t = [Zl.range(l.from)], n = vt(l.text, a.col - 1);
  return n && t.push(Al.range(l.from + n.start, l.from + n.end)), Le.set(t, !0);
}
const Bl = ct.define({
  create() {
    return Le.none;
  },
  update(e, a) {
    e = e.map(a.changes);
    for (const l of a.effects) l.is(mt) && (e = Ml(a.state.doc, l.value));
    return e;
  },
  provide: (e) => je.decorations.from(e)
});
function kl(e, a) {
  return [
    Bl,
    zi((l, t) => {
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
    je.baseTheme({
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
      return ba({ sourceType: "gad", diagnose: a });
    case "gadt":
      return ba({ sourceType: "template", delimiters: { start: l == null ? void 0 : l.start, end: l == null ? void 0 : l.end }, preamble: l == null ? void 0 : l.preamble });
    case "gadx":
      return ba({ sourceType: "gadx", diagnose: a });
    case "json":
      return Yi();
    case "yaml":
      return Vi.define(Ji);
    case "html":
      return Ti();
    case "css":
    case "scss":
      return Fi();
    case "javascript":
      return aa();
    case "typescript":
      return aa({ typescript: !0 });
    case "jsx":
      return aa({ jsx: !0 });
    case "tsx":
      return aa({ jsx: !0, typescript: !0 });
    case "markdown":
      return Ui();
    default:
      return [];
  }
}
function it(e) {
  return je.theme({ "&": { fontSize: e + "px" } });
}
class jl {
  constructor(a) {
    fe(this, "view");
    fe(this, "langComp", new ea());
    fe(this, "themeComp", new ea());
    fe(this, "roComp", new ea());
    fe(this, "fontComp", new ea());
    fe(this, "opts");
    this.opts = a;
    const l = Pa.create({
      doc: a.doc,
      extensions: [
        Li,
        Ni.of([Wi, ...wi]),
        this.langComp.of(a.customExtension ? a.customExtension() : tt(a.language, a.diagnose)),
        this.themeComp.of(a.dark ? at : []),
        this.roComp.of(Pa.readOnly.of(!!a.readonly)),
        this.fontComp.of(it(a.fontSize ?? 13)),
        a.breakpoints === !1 ? [] : Gl(
          (t) => {
            var n;
            return (n = a.onBreakpointsChange) == null ? void 0 : n.call(a, t);
          },
          (t) => {
            var n;
            return (n = a.onBreakpointContext) == null ? void 0 : n.call(a, t);
          }
        ),
        kl(() => {
          var t;
          return ((t = a.getLocals) == null ? void 0 : t.call(a)) ?? /* @__PURE__ */ new Map();
        }),
        je.updateListener.of((t) => {
          var n;
          t.docChanged && ((n = a.onChange) == null || n.call(a, t.state.doc.toString()));
        })
      ]
    });
    this.view = new je({ state: l, parent: a.parent });
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
    this.view.dispatch({ effects: this.roComp.reconfigure(Pa.readOnly.of(a)) });
  }
  setBreakpoints(a) {
    Pl(this.view, a);
  }
  /** setDebugLine highlights the paused line (1-based), or clears it with 0. */
  setDebugLine(a, l = 1) {
    this.view.dispatch({ effects: mt.of(a >= 1 ? { line: a, col: l } : null) });
  }
  undo() {
    Ei(this.view), this.view.focus();
  }
  redo() {
    Ri(this.view), this.view.focus();
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
Xi(ye);
Qi(ye);
function sa(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ee(e) {
  let a = sa(e);
  return a = a.replace(/`([^`]+)`/g, "<code>$1</code>"), a = a.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), a = a.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>"), a;
}
function Hl(e) {
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
    const I = (h, G) => "<tr>" + s(h).map((w) => `<${G}>${Ee(w)}</${G}>`).join("") + "</tr>";
    l += "<table><thead>" + I(f[0], "th") + "</thead><tbody>" + f.slice(2).map((h) => I(h, "td")).join("") + "</tbody></table>";
  }, u = () => {
    t.length && (l += "<p>" + Ee(t.join(" ")) + "</p>", t = []);
  }, r = () => {
    n.length && (l += "<ul>" + n.map((f) => "<li>" + Ee(f) + "</li>").join("") + "</ul>", n = []);
  };
  for (const f of a) {
    const I = f.trimEnd(), h = /^(#{1,6})\s+(.*)$/.exec(I), G = /^\s*[-*]\s+(.*)$/.exec(I), w = /^\s*>\s?(.*)$/.exec(I);
    if (/^\s*\|/.test(I)) {
      u(), r(), o.push(I);
      continue;
    }
    if (p(), I.trim() === "")
      u(), r();
    else if (h) {
      u(), r();
      const j = h[1].length;
      let P = h[2], M = "";
      const z = /\s*\{data-src-pos="(\d+,\d+)"\}\s*$/.exec(P);
      z && (M = ` data-src-pos="${z[1]}"`, P = P.slice(0, z.index)), l += `<h${j}${M}>${Ee(P)}</h${j}>`;
    } else G ? (u(), n.push(G[1])) : n.length && /^\s+\S/.test(f) ? n[n.length - 1] += " " + I.trim() : w ? (u(), r(), l += "<blockquote>" + Ee(w[1]) + "</blockquote>") : (r(), t.push(I));
  }
  return p(), u(), r(), l;
}
function za(e) {
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
      const p = ye.languages[o] || ye.languages.gad, u = n.split(`
`);
      let r = "", f = [];
      const I = () => {
        if (!f.length) return;
        const h = f.join(`
`);
        r += p ? ye.highlight(h, p, o) : sa(h), r && !r.endsWith(`
`) && (r += `
`), f = [];
      };
      for (const h of u)
        h.startsWith(">>> ") ? (I(), r += `<span class="doc-result">${sa(h)}</span>
`) : f.push(h);
      I(), r = r.replace(/\n$/, ""), l += `<pre class="doc-code language-${o}"><code>${r}</code></pre>`;
    } else
      l += Hl(a[t]);
  return l;
}
function lt(e) {
  return e.length ? e.map((a) => (a.kind === "root" ? "" : `<h4>${sa(a.title || a.kind)}</h4>`) + za(a.content)).join(`
`) : '<p class="text-medium-emphasis">No documentation comments in this file.</p>';
}
const Dl = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp", "ico"];
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
      return a && Dl.includes(a[1]) ? "image" : "none";
  }
}
const Re = (e) => ht(e) === "image", zl = '<p class="text-medium-emphasis">No documentation for this kind of file.</p>';
function Nl(e, a) {
  switch (e) {
    case "html":
      return a;
    case "markdown":
      return za(a);
    case "image":
      return "";
    default:
      return zl;
  }
}
function Ct(e) {
  return Array.from(e ?? []).map((a) => ({
    path: a.webkitRelativePath || a.name,
    file: a
  }));
}
async function Wl(e) {
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
    l.push({ path: a + e.name, file: await Vl(e) });
    return;
  }
  const t = await Yl(e);
  await Promise.all(t.map((n) => St(n, a + e.name + "/", l)));
}
function wl(e) {
  if (e.includes(0)) return !1;
  try {
    return new TextDecoder("utf-8", { fatal: !0 }).decode(e), !0;
  } catch {
    return !1;
  }
}
function El(e) {
  let a = "";
  for (let l = 0; l < e.length; l += 32768) a += String.fromCharCode(...e.subarray(l, l + 32768));
  return btoa(a);
}
function xt(e, a) {
  return wl(a) ? { path: e, content: new TextDecoder().decode(a) } : { path: e, content: "", bytes: El(a) };
}
async function nt(e, a) {
  return xt(e, new Uint8Array(await a.arrayBuffer()));
}
async function Rl(e) {
  const a = new Uint8Array(await e.arrayBuffer());
  let l = "";
  for (let t = 0; t < a.length; t++) l += String.fromCharCode(a[t]);
  return btoa(l);
}
function Vl(e) {
  return new Promise((a, l) => e.file(a, l));
}
async function Ll(e, a) {
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
function Yl(e) {
  const a = e.createReader(), l = [];
  return new Promise((t, n) => {
    const o = () => a.readEntries((s) => {
      if (!s.length) return t(l);
      l.push(...s), o();
    }, n);
    o();
  });
}
const Tl = [
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
], Fl = "mdi-file-outline";
function Ul(e) {
  const a = e.lastIndexOf("/"), l = a === -1 ? e : e.slice(a + 1), t = l.lastIndexOf(".");
  return t === -1 ? "" : l.slice(t + 1).toLowerCase();
}
class Jl {
  constructor(a = []) {
    fe(this, "byExt", /* @__PURE__ */ new Map());
    for (const l of [...Tl, ...a])
      for (const t of l.extensions) this.byExt.set(t.toLowerCase(), l);
  }
  handlerFor(a) {
    return this.byExt.get(Ul(a));
  }
  iconFor(a) {
    var l;
    return ((l = this.handlerFor(a)) == null ? void 0 : l.icon) ?? Fl;
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
const _ = Symbol("gad-ide-controller"), Xl = /* @__PURE__ */ new Set(["write", "mkfile", "mkdir", "del", "rename", "upload", "fetchUrl"]);
function Ql(e, a) {
  return new Proxy(e, {
    get(l, t, n) {
      const o = Reflect.get(l, t, n);
      return typeof o != "function" || !Xl.has(String(t)) ? o : (...s) => {
        const p = o.apply(l, s);
        return Promise.resolve(p).then(a, a), p;
      };
    }
  });
}
function Ol(e, a, l, t = {}) {
  const n = v(0), o = Ql(e, () => n.value++), s = t.onReset, p = () => {
    var d;
    return ((d = t.getWords) == null ? void 0 : d.call(t)) ?? X;
  }, u = x(() => {
    var d;
    return ((d = t.getReadonly) == null ? void 0 : d.call(t)) ?? !1;
  }), r = (d) => x(() => {
    var g;
    return !u.value && (((g = a.actions) == null ? void 0 : g[d]) ?? !0);
  }), f = r("create"), I = r("edit"), h = r("rename"), G = r("move"), w = r("delete"), j = x(() => r("import").value && !!o.upload), P = new Jl(t.fileTypes), M = (d) => P.iconFor(d), z = x(() => {
    const d = /* @__PURE__ */ new Set(), g = (C) => {
      for (const k of (C == null ? void 0 : C.children) ?? [])
        k.dir ? g(k) : d.add(k.path);
    };
    return g(B.value), d;
  });
  function Z(d) {
    return z.value.has(d);
  }
  const B = Ba(null), J = Se(/* @__PURE__ */ new Set()), N = v([]), W = v(-1), V = x(() => {
    var d;
    return ((d = N.value[W.value]) == null ? void 0 : d.path) ?? "";
  }), F = x({
    get: () => {
      var d;
      return ((d = N.value[W.value]) == null ? void 0 : d.content) ?? "";
    },
    set: (d) => {
      const g = N.value[W.value];
      g && (g.content = d);
    }
  }), Pe = x(() => {
    const d = [], g = (C, k) => {
      for (const L of C.children ?? [])
        d.push({ node: L, depth: k }), L.dir && J.has(L.path) && g(L, k + 1);
    };
    return B.value && g(B.value, 0), d;
  }), ae = v(!1);
  async function q() {
    B.value = await o.tree(ae.value);
    const d = V.value.split("/");
    for (let g = 1; g < d.length; g++) J.add(d.slice(0, g).join("/"));
  }
  async function Te() {
    ae.value = !ae.value, await q();
  }
  async function le(d) {
    const g = N.value.findIndex((k) => k.path === d);
    if (g >= 0) {
      W.value = g;
      return;
    }
    const C = Re(d) ? "" : (await o.read(d)).content;
    N.value.push({ path: d, content: C, saved: C }), W.value = N.value.length - 1;
  }
  const Fe = (d) => {
    const g = N.value.find((C) => C.path === d);
    return !!g && g.content !== g.saved;
  };
  function ca(d) {
    d >= 0 && d < N.value.length && (W.value = d);
  }
  function Ue(d) {
    d < 0 || d >= N.value.length || (N.value.splice(d, 1), W.value >= N.value.length ? W.value = N.value.length - 1 : W.value > d && W.value--);
  }
  function Je(d) {
    J.has(d) ? J.delete(d) : J.add(d);
  }
  function te(d) {
    return J.has(d);
  }
  const be = x(() => {
    var d;
    return ((d = t.getAutosave) == null ? void 0 : d.call(t)) ?? !1;
  });
  async function ze(d) {
    !I.value || d.content === d.saved || (await o.write(d.path, d.content), d.saved = d.content);
  }
  const he = () => Promise.all(N.value.map(ze));
  R(F, (d) => {
    if (be.value !== !0 || !I.value) return;
    const g = N.value[W.value];
    g && (o.write(g.path, d), g.saved = d);
  });
  let Ie = null;
  R(
    be,
    (d) => {
      Ie && (clearInterval(Ie), Ie = null), typeof d == "number" && d > 0 && (Ie = setInterval(() => void he(), d));
    },
    { immediate: !0 }
  ), yi(() => {
    Ie && clearInterval(Ie);
  });
  function Ge() {
    const d = V.value.lastIndexOf("/");
    return d === -1 ? "" : V.value.slice(0, d + 1);
  }
  function Ze(d) {
    for (const g of (d == null ? void 0 : d.children) ?? []) {
      if (!g.dir) return g.path;
      const C = Ze(g);
      if (C) return C;
    }
    return null;
  }
  const Xe = v(null), Qe = v(null);
  function Ne(d, g, C = "") {
    return new Promise((k) => Xe.value = { title: d, label: g, initial: C, resolve: k });
  }
  function c(d, g) {
    return new Promise((C) => Qe.value = { title: d, message: g, resolve: C });
  }
  async function m() {
    const d = await Ne(p().newFile, p().fileNamePrompt, "untitled.gad");
    if (!d) return;
    const g = Ge() + d;
    await o.mkfile(g), await q(), await le(g);
  }
  async function A() {
    const d = await Ne(p().newFolder, p().folderName, "folder");
    d && (await o.mkdir(Ge() + d), await q());
  }
  async function Y() {
    const d = V.value;
    if (!d || !await c(p().deleteFile, Ve(p().deleteConfirm, d))) return;
    await o.del(d);
    const g = N.value.findIndex((C) => C.path === d);
    g >= 0 && Ue(g), await q();
  }
  async function U() {
    const d = V.value;
    if (!d) return;
    const g = d.lastIndexOf("/"), C = g === -1 ? "" : d.slice(0, g + 1), k = await Ne(p().rename, p().newName, d.slice(g + 1));
    !k || C + k === d || (await o.rename(d, C + k), pe(d, C + k), await q());
  }
  const T = v(null);
  async function ge() {
    const d = V.value;
    if (!d) return;
    const g = await new Promise((k) => T.value = { path: d, resolve: k });
    if (T.value = null, g === null) return;
    const C = (g ? g.replace(/\/$/, "") + "/" : "") + d.slice(d.lastIndexOf("/") + 1);
    C !== d && (await o.rename(d, C), pe(d, C), await q());
  }
  function pe(d, g) {
    const C = N.value.find((k) => k.path === d);
    C && (C.path = g);
  }
  async function Ht() {
    if (!s || !await c(p().resetWorkspace, p().resetConfirm)) return;
    await s(), N.value = [], W.value = -1, await q();
    const d = Ze(B.value);
    d && await le(d);
  }
  const Dt = x(() => !!s);
  async function Ia(d, g) {
    if (!d.length) return;
    const C = (g ?? Ge().replace(/\/$/, "")).replace(/\/$/, ""), k = C ? C + "/" : "", L = d.map((O) => ({ ...O, path: k + O.path }));
    if (t.onUpload) await t.onUpload(L, C);
    else if (j.value)
      for (const O of L) O.archive || await o.upload([O]);
    else for (const O of L) !O.archive && !O.bytes && await o.write(O.path, O.content);
    await q();
    const $ = L.find((O) => !O.archive);
    $ && await le($.path);
  }
  const zt = v(!1), Ae = v(0);
  function wa(d) {
    const g = d.toLowerCase();
    if (g.endsWith(".zip")) return "zip";
    if (g.endsWith(".tar.gz") || g.endsWith(".tgz")) return "tar.gz";
    if (g.endsWith(".tar")) return "tar";
  }
  async function Nt(d, g, C = "") {
    if (Ae.value = 0, j.value && !t.onUpload) {
      Ae.value = -1;
      try {
        const k = decodeURIComponent(new URL(d, location.href).pathname.split("/").pop() || "download"), L = C.replace(/\/$/, ""), $ = (L ? L + "/" : "") + k;
        await o.fetchUrl(d, $), await q(), await le($);
      } finally {
        Ae.value = 0;
      }
      return;
    }
    try {
      const k = await fetch(d);
      if (!k.ok) throw new Error(`${d}: HTTP ${k.status}`);
      const L = await Ll(k, ($e) => Ae.value = $e), $ = decodeURIComponent(new URL(d, location.href).pathname.split("/").pop() || "download"), O = wa($);
      if (g && O) {
        let $e = "";
        for (let ya = 0; ya < L.length; ya++) $e += String.fromCharCode(L[ya]);
        await Ia([{ path: $, content: "", archive: O, bytes: btoa($e) }], C);
      } else
        await Ia([xt($, L)], C);
    } finally {
      Ae.value = 0;
    }
  }
  const ga = (d) => {
    const g = ft(d);
    return g === "gadx" ? "gadx" : g === "gadt" ? "gadTemplate" : "gad";
  }, Wt = (d, g) => o.diagnose(d, g), ne = v(!1), Oe = v(null), Ea = () => ({ source: F.value, path: V.value, args: [] });
  async function Ra(d) {
    const g = d ?? Ea();
    ne.value = !0;
    try {
      Oe.value = await o.run({
        source: g.source,
        path: g.path,
        sourceType: ga(g.path),
        args: g.args,
        tagEncode: g.tagEncode || void 0
      });
    } finally {
      ne.value = !1;
    }
  }
  async function wt() {
    ne.value = !0;
    try {
      const d = await o.format(F.value);
      d.ok ? F.value = d.source : Oe.value = { ok: !1, stdout: "", stderr: "", result: "", diagnostics: d.diagnostics };
    } finally {
      ne.value = !1;
    }
  }
  const pa = Ba(null);
  function Et(d) {
    pa.value = d;
  }
  async function Rt() {
    const d = N.value[W.value];
    !d || Re(d.path) || !I.value || (await o.write(d.path, d.content), d.saved = d.content);
  }
  async function Vt(d) {
    const g = N.value.find((k) => k.path === d);
    if (!g || g.content !== g.saved || Re(d)) return;
    const C = (await o.read(d)).content;
    g.content === g.saved && (g.content = C, g.saved = C);
  }
  async function Lt() {
    const d = N.value[W.value];
    if (!d) return;
    if (Re(d.path)) {
      va.value++;
      return;
    }
    const g = (await o.read(d.path)).content;
    d.content = g, d.saved = g;
  }
  const We = v(t.initialFontSize ?? 13);
  function ma(d) {
    var g;
    We.value = Math.max(8, Math.min(32, Math.round(d))), (g = t.onFontSize) == null || g.call(t, We.value);
  }
  const Yt = () => ma(We.value + 1), Tt = () => ma(We.value - 1);
  function Ft() {
    var d;
    (d = pa.value) == null || d.undo();
  }
  function Ut() {
    var d;
    (d = pa.value) == null || d.redo();
  }
  const Va = v(""), Jt = x(() => Re(V.value)), va = v(0), Xt = (d) => o.rawUrl ? o.rawUrl(d) + (va.value ? "&v=" + va.value : "") : "", La = v("none");
  let Ya = 0;
  async function Ta() {
    const d = ++Ya, g = ht(V.value);
    let C;
    if (g === "gad" && F.value.trim()) {
      const k = await o.doc(F.value);
      C = lt(k);
    } else g === "gad" ? C = lt([]) : C = Nl(g, F.value);
    d === Ya && (La.value = g, Va.value = C);
  }
  const me = v(null), ve = v(null), fa = v(""), ha = Se({}), Me = Se({});
  function Ce(d) {
    return d && ha[d] || [];
  }
  function Fa(d) {
    return d && Me[d] || {};
  }
  function Qt() {
    const d = {};
    for (const [g, C] of Object.entries(ha)) C.length && (d[g] = C);
    return d;
  }
  function Ke(d, g) {
    const C = [...new Set(g)].sort((L, $) => L - $);
    ha[d] = C;
    const k = Me[d];
    if (k)
      for (const L of Object.keys(k)) C.includes(Number(L)) || delete k[Number(L)];
  }
  function Ot(d, g, C) {
    Me[d] || (Me[d] = {}), Me[d][g] = { ...Me[d][g] || {}, ...C }, Ce(d).includes(g) || Ke(d, [...Ce(d), g]);
  }
  function Kt(d, g) {
    Ke(d, Ce(d).filter((C) => C !== g));
  }
  function _t(d) {
    const g = Fa(d);
    return Ce(d).map((C) => {
      var k, L;
      return { line: C, disabled: (k = g[C]) == null ? void 0 : k.disabled, condition: (L = g[C]) == null ? void 0 : L.condition };
    });
  }
  const qt = x({
    get: () => Ce(V.value),
    set: (d) => Ke(V.value, d)
  }), Ca = v({ line: 0, seq: 0 });
  function Ua(d) {
    Ca.value = { line: d, seq: Ca.value.seq + 1 };
  }
  async function $t(d, g) {
    d && d !== V.value && await le(d), Ua(g);
  }
  const Ja = v(null);
  function ei(d, g) {
    Ja.value = { path: d, line: g };
  }
  const ai = x(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.state) === "stopped" ? ve.value.line ?? 0 : 0;
  }), ti = x(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.column) ?? 1;
  }), ii = x(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.state) === "stopped";
  }), li = x(() => {
    var g;
    const d = /* @__PURE__ */ new Map();
    for (const C of ((g = ve.value) == null ? void 0 : g.locals) ?? []) d.set(C.name, C);
    return d;
  }), ni = () => li.value;
  function Xa(d) {
    ve.value = d, d.output && (fa.value += d.output), d.state === "terminated" || d.state === "error" ? me.value = null : d.session && (me.value = d.session);
  }
  async function Qa(d) {
    const g = d ?? Ea();
    ne.value = !0, fa.value = "", ve.value = null, Oe.value = null;
    try {
      Xa(
        await o.dbgStart({
          source: g.source,
          path: g.path,
          sourceType: ga(g.path),
          args: g.args,
          breakpoints: Ce(g.path),
          breakpointSpecs: _t(g.path),
          stopOnEntry: !1
        })
      );
    } finally {
      ne.value = !1;
    }
  }
  async function oi(d) {
    if (me.value) {
      ne.value = !0;
      try {
        Xa(await o.dbgCmd(me.value, d));
      } finally {
        ne.value = !1;
      }
    }
  }
  const Sa = v(""), Oa = v("");
  async function di() {
    if (!me.value || !Sa.value.trim()) return;
    const d = await o.dbgEval(me.value, Sa.value, !0);
    Oa.value = d.ok ? d.value ?? "" : "error: " + (d.error ?? "");
  }
  const ri = async (d) => {
    const g = await o.inspect({
      expr: d,
      session: me.value ?? void 0,
      source: F.value,
      path: V.value,
      sourceType: Ka.value
    });
    return g.ok ? g.inspect ?? null : null;
  }, Ka = x(() => ga(V.value)), _e = x(() => {
    var d;
    return ((d = t.getRunProfiles) == null ? void 0 : d.call(t)) ?? [];
  }), qe = x(() => {
    var d;
    return ((d = t.getRunMode) == null ? void 0 : d.call(t)) ?? "debug";
  }), we = v(null), si = v(!1), xa = x(() => _e.value.find((d) => d.name === we.value) ?? null), ui = x(() => {
    var d;
    return ((d = xa.value) == null ? void 0 : d.name) ?? p().currentFile;
  }), ci = x(() => qe.value === "run" || qe.value === "debug"), Ii = x(() => qe.value === "debug");
  async function _a() {
    const d = xa.value;
    return d ? { source: d.path === V.value ? F.value : (await o.read(d.path)).content, path: d.path, args: d.args, tagEncode: d.tagEncode } : { source: F.value, path: V.value, args: [] };
  }
  async function gi() {
    await Ra(await _a());
  }
  async function pi() {
    await Qa(await _a());
  }
  function mi(d) {
    var g;
    (g = t.emitRunProfiles) == null || g.call(t, [..._e.value.filter((C) => C.name !== d.name), d]), we.value = d.name;
  }
  function vi(d) {
    var g;
    (g = t.emitRunProfiles) == null || g.call(t, _e.value.filter((C) => C.name !== d)), we.value === d && (we.value = null);
  }
  const qa = v(0);
  function fi() {
    Ta(), qa.value++;
  }
  const hi = v(!1);
  async function Ci() {
    await q();
    const d = a.openFile || Ze(B.value);
    d && await le(d);
  }
  return {
    api: o,
    dark: l,
    writes: n,
    refreshFile: Vt,
    workspace: a,
    // tree
    tree: B,
    rows: Pe,
    openPath: V,
    source: F,
    isExpanded: te,
    toggleDir: Je,
    openFile: le,
    tabs: N,
    active: W,
    activateTab: ca,
    closeTab: Ue,
    isDirty: Fe,
    autosave: be,
    tabNameMax: x(() => {
      var d;
      return ((d = t.getTabNameMax) == null ? void 0 : d.call(t)) ?? 25;
    }),
    showHidden: ae,
    toggleHidden: Te,
    newFile: m,
    newDir: A,
    removeOpen: Y,
    reset: Ht,
    canReset: Dt,
    upload: Ia,
    uploadUrl: Nt,
    urlDialog: zt,
    uploadProgress: Ae,
    pathExists: Z,
    archiveKind: wa,
    readonly: u,
    fileTypes: P,
    iconFor: M,
    canUpload: x(() => (!!t.onUpload || j.value) && !u.value),
    canCreate: f,
    canRename: h,
    canMove: G,
    canDelete: w,
    renameOpen: U,
    moveOpen: ge,
    moveReq: T,
    // an archive is extracted only by a host's onUpload
    canExtract: x(() => !!t.onUpload),
    canEdit: I,
    promptReq: Xe,
    confirmReq: Qe,
    diagnose: Wt,
    // run/format/doc
    busy: ne,
    runRes: Oe,
    run: Ra,
    format: wt,
    docHtml: Va,
    docKind: La,
    refreshDoc: Ta,
    isImage: Jt,
    imageUrl: Xt,
    // editor actions
    registerEditor: Et,
    save: Rt,
    reload: Lt,
    undo: Ft,
    redo: Ut,
    fontSize: We,
    incFont: Yt,
    decFont: Tt,
    setFontSize: ma,
    // run/debug profiles + gating
    runProfiles: _e,
    runMode: qe,
    activeProfile: we,
    profileDialog: si,
    activeProfileObj: xa,
    runLabel: ui,
    canRun: ci,
    canDebug: Ii,
    runActive: gi,
    debugActive: pi,
    addProfile: mi,
    deleteProfile: vi,
    docRequest: qa,
    requestDocs: fi,
    settingsOpen: hi,
    // debug
    session: me,
    snap: ve,
    dbgOutput: fa,
    breakpoints: qt,
    debugLine: ai,
    debugColumn: ti,
    stopped: ii,
    getLocals: ni,
    debugStart: Qa,
    debugCmd: oi,
    evalExpr: Sa,
    evalOut: Oa,
    doEval: di,
    inspectFn: ri,
    dialect: Ka,
    // breakpoints
    bpFor: Ce,
    bpMetaFor: Fa,
    allBreakpoints: Qt,
    setFileBreakpoints: Ke,
    setBpMeta: Ot,
    removeBreakpoint: Kt,
    gotoTarget: Ca,
    goto: Ua,
    gotoFileLine: $t,
    bpDialog: Ja,
    openBpCondition: ei,
    init: Ci
  };
}
const y = Ki, Ye = Oi, yt = hl, oe = al, de = ll, re = il, se = tl, Be = gl, Kl = vl, ue = el, ot = ol, ee = cl, _l = rl, Ga = sl, ql = ul, $l = dl, en = fl, ce = nl, Pt = Il, ke = qi, bt = _i, K = $i, an = pl, ia = ml, Gt = /* @__PURE__ */ H({
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
      }, [i(ee, {
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
}), Na = /* @__PURE__ */ H({
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
      }, [i(ee, {
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
}), tn = (e) => e.slice(e.lastIndexOf("/") + 1), dt = (e, a) => e ? e + "/" + a : a, ln = /* @__PURE__ */ H({
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
      P && (n.value = e.initialDir, o.value = f.value ? tn(e.raw[0].path) : "", s.value = !0, p.value = !1, u.value = !1);
    });
    const h = x(() => f.value ? I.value && s.value ? [] : [dt(n.value, o.value)] : e.raw.map((P) => dt(n.value, P.path))), G = x(() => h.value.filter((P) => l.pathExists(P))), w = x(() => G.value.length > 0 && !p.value);
    async function j() {
      r.value = !0;
      try {
        let P;
        f.value && I.value && s.value ? P = [{
          path: o.value,
          content: "",
          archive: I.value,
          bytes: await Rl(e.raw[0].file)
        }] : f.value ? P = [await nt(o.value, e.raw[0].file)] : P = await Promise.all(e.raw.map((M) => nt(M.path, M.file))), a("confirm", P, n.value), a("update:modelValue", !1);
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
          default: () => [f.value ? t.value.uploadFile : Ve(t.value.uploadNFiles, e.raw.length)]
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
            label: Ve(t.value.extractArchiveOf, I.value.toUpperCase()),
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
          }, [i(Na, {
            root: l.tree.value,
            selected: n.value,
            onSelect: (P) => {
              n.value = P, u.value = !1;
            }
          }, null)]), G.value.length > 0 && i(Be, b({
            modelValue: p.value
          }, {
            "onUpdate:modelValue": (P) => p.value = !!P
          }, {
            label: G.value.length === 1 ? Ve(t.value.replaceOne, G.value[0]) : Ve(t.value.replaceMany, G.value.length),
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
            disabled: w.value || f.value && !o.value.trim(),
            onClick: j
          }, {
            default: () => [t.value.upload]
          })]
        })]
      })]
    });
  }
}), nn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjRDk3NzA2OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNGRUYzQzc7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+Cjwvc3ZnPgo=", on = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjMDZCNkQ0OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNFMEY3RkE7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAuYmFkZ2UtcmVkICAgeyBmaWxsOiAjRTUzOTM1OyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBnbHlwaCAqLwogICAgICAgICAgICAuYmFkZ2Utd2hpdGUgeyBmaWxsOiAjRkZGRkZGOyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBvdXRsaW5lL2dhcCAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CiAgPCEtLSBHQURUICh0ZW1wbGF0ZSkgYmFkZ2U6IHJlZCAieyIgKyB3aGl0ZSBib3JkZXIvZ2FwICgxcHg7IDJweCBsZWZ0KSwgYm90dG9tLXJpZ2h0LiAtLT4KICA8cmVjdCB4PSIxMiIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMiIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEyIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTQiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTUiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTUiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNSIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTQiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEzIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMSIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjExIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxNSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjE1IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgPHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxNCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEzIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+Cjwvc3ZnPgo=", dn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjMDZCNkQ0OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNFMEY3RkE7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAuYmFkZ2UtcmVkICAgeyBmaWxsOiAjRTUzOTM1OyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBnbHlwaCAqLwogICAgICAgICAgICAuYmFkZ2Utd2hpdGUgeyBmaWxsOiAjRkZGRkZGOyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBvdXRsaW5lL2dhcCAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CiAgICA8IS0tIEdBRFggKHB1ZykgYmFkZ2U6IDFweCByZWQgQCArIDFweCB3aGl0ZSBib3JkZXIvZ2FwLCBib3R0b20tcmlnaHQuIC0tPgogICAgPHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTQiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNSIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTUiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNSIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjE0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTQiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgo8L3N2Zz4K", rn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjRDk3NzA2OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNGRUYzQzc7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAudGVzdC1yZWQgICB7IGZpbGw6ICNEQjU4NjA7IH0gLyogdGVzdCBiYWRnZSBsZWZ0ICovCiAgICAgICAgICAgIC50ZXN0LWdyZWVuIHsgZmlsbDogIzU5QTg2OTsgfSAvKiB0ZXN0IGJhZGdlIHJpZ2h0ICovCiAgICAgICAgICAgIC50ZXN0LXdoaXRlIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiB0ZXN0IGJhZGdlIGRpYW1vbmQvZ2FwICovCiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KCiAgICA8IS0tIENISUZSRVMgKHRvcG8sIHk9MCkgLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMyIgY2xhc3M9Imhvcm4tc2lsdmVyIiAvPgoKICAgIDxyZWN0IHg9IjkiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjQiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMyIgY2xhc3M9Imhvcm4tc2lsdmVyIiAvPgoKICAgIDwhLS0gT1JFTEhBUyBMQVRFUkFJUyAtLT4KICAgIDxyZWN0IHg9IjEiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIyIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjMiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8IS0tIENBQkXDh0EgQUZVTklMQURBIFBBUkEgQkFJWE8gKGZvY2luaG8gZGUgZ2F6ZWxhLCB5PTQgLT4gMTYpIC0tPgogICAgPHJlY3QgeD0iMyIgeT0iNCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjciIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIHRvcG8gbGFyZ28gKG9saG9zKSAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjExIiB3aWR0aD0iOCIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSBhZnVuaWxhIDEgLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIxMyIgd2lkdGg9IjYiIGhlaWdodD0iMyIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gZm9jaW5obyAtLT4KCiAgICA8cmVjdCB4PSI0IiB5PSI1IiB3aWR0aD0iOCIgaGVpZ2h0PSI2IiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjExIiB3aWR0aD0iNiIgaGVpZ2h0PSIyIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KICAgIDxyZWN0IHg9IjYiIHk9IjEzIiB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8IS0tIExJU1RSQSBGQUNJQUwgQ0VOVFJBTCAtLT4KICAgIDxyZWN0IHg9IjciIHk9IjUiIHdpZHRoPSIyIiBoZWlnaHQ9IjEwIiBjbGFzcz0iZnVyLWxpZ2h0IiAvPgogICAgPHJlY3QgeD0iNyIgeT0iMTQiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYXNlLWRhcmsiIC8+IDwhLS0gTmFyaXogLS0+CgogICAgPCEtLSBPTEhPUyBHSUdBTlRFUyAoRXN0aWxvIE1hc2NvdGUgZG8gR28pIC0tPgogICAgPCEtLSBPbGhvIEVzcXVlcmRvIC0tPgogICAgPHJlY3QgeD0iNCIgeT0iNiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIFB1cGlsYSAtLT4KCiAgICA8IS0tIE9saG8gRGlyZWl0byAtLT4KICAgIDxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgY2xhc3M9ImV5ZS13aGl0ZSIgLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIFB1cGlsYSAtLT4KICAgIDwhLS0gVGVzdCBiYWRnZTogY3Jpc3AgcGl4ZWwgZGlhbW9uZCAocmVkIHw8IC8gZ3JlZW4gPnwpLCAxcHggd2hpdGUgYm9yZGVyK2dhcC4gLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjYiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjciIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI3IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI4IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iNiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjYiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjciIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iNyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iNyIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtcmVkIi8+CiAgICA8cmVjdCB4PSI4IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iOSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtcmVkIi8+CiAgICA8cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjExIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1ncmVlbiIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1ncmVlbiIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KPC9zdmc+Cg==";
function rt(e) {
  const a = e.toLowerCase();
  if (a.endsWith("_test.gad")) return rn;
  if (a.endsWith(".gadx")) return dn;
  if (a.endsWith(".gadt")) return on;
  if (a.endsWith(".gad")) return nn;
}
const sn = /* @__PURE__ */ H({
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
      t.value = null, !(!e.canUpload.value || !I.dataTransfer) && u(await Wl(I.dataTransfer), h);
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
    }, [a.value.explorer.toUpperCase()]), i("div", null, [e.canCreate.value && i(xe, null, [i(y, {
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
    }, null)]), e.canUpload.value && i(xe, null, [i(y, {
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
      }, null) : i(ee, {
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
    }, null), i(ln, b({
      modelValue: n.value
    }, {
      "onUpdate:modelValue": (I) => n.value = I
    }, {
      raw: o.value,
      initialDir: s.value,
      onConfirm: (I, h) => e.upload(I, h)
    }), null)]);
  }
}), Wa = /* @__PURE__ */ H({
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
    return He(() => {
      t = new jl({
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
    }), De(() => t == null ? void 0 : t.destroy()), R(() => e.modelValue, (s) => {
      t && !n && s !== t.getValue() && t.setValue(s);
    }), R([() => e.path, () => e.language, () => e.customExtension], () => t == null ? void 0 : t.setLanguage(o(), e.diagnose, e.customExtension)), R(() => e.dark, (s) => t == null ? void 0 : t.setDark(s)), R(() => e.readonly, (s) => t == null ? void 0 : t.setReadonly(s)), R(() => e.fontSize, (s) => t == null ? void 0 : t.setFontSize(s)), R(() => e.breakpoints, (s) => t == null ? void 0 : t.setBreakpoints(s ?? [])), R([() => e.debugLine, () => e.debugColumn], ([s, p]) => t == null ? void 0 : t.setDebugLine(s ?? 0, p ?? 1)), R(() => e.gotoSeq, () => {
      e.gotoLine && (t == null || t.gotoLine(e.gotoLine));
    }), () => i("div", {
      ref: l,
      class: "gad-editor"
    }, null);
  }
}), st = (e) => e.slice(e.lastIndexOf("/") + 1), un = (e, a) => e.length > a ? e.slice(0, a - 1) + "…" : e, cn = /* @__PURE__ */ H({
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
        }, [un(st(o.path), e.tabNameMax.value)]), i("span", {
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
      })]), e.canRun.value && i(ot, {
        vertical: !0,
        class: "mx-1"
      }, null), e.canRun.value && t("mdi-play", a.value.run, () => e.runActive(), {
        disabled: !l(),
        color: "success"
      }), e.canDebug.value && t(e.session.value ? "mdi-restart" : "mdi-bug", e.session.value ? a.value.restart : a.value.debug, () => e.debugActive(), {
        disabled: !l(),
        color: "warning"
      }), e.canRun.value && i($l, {
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
        default: () => i(_l, {
          density: "compact",
          minWidth: "220"
        }, {
          default: () => [i(Ga, {
            title: a.value.currentFile,
            active: e.activeProfile.value === null,
            onClick: () => e.activeProfile.value = null
          }, null), e.runProfiles.value.length > 0 && i(ql, null, {
            default: () => [a.value.profiles]
          }), e.runProfiles.value.map((o) => i(Ga, {
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
          })), i(Ga, {
            title: a.value.newProfile,
            prependIcon: "mdi-plus",
            onClick: () => e.profileDialog.value = !0
          }, null)]
        })
      }), e.stopped.value && i(xe, null, [i(ot, {
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
      ) : l() ? i(Wa, b({
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
}), In = /* @__PURE__ */ H({
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
    return He(() => {
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
}), gn = /* @__PURE__ */ H({
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
}), pn = /* @__PURE__ */ H({
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
function mn(e) {
  const a = e.replace(/^\/+/, ""), l = a.lastIndexOf("/");
  return l === -1 ? "" : a.slice(0, l);
}
function ja(e, a) {
  const l = e.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, ""), t = /^([a-z][a-z0-9+.-]*:\/\/|\/\/|\/)/i.exec(l), n = t ? t[1] : "", o = [];
  for (const s of l.slice(n.length).split("/"))
    s === "" || s === "." || (s === ".." ? o.pop() : o.push(s));
  return n + o.join("/");
}
function vn(e, a, l) {
  return !e || e.startsWith("#") || e.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(e) ? null : e.startsWith("/") ? ja(a, e) : ja(l, e);
}
function ua(e, a, l) {
  if (!e || typeof DOMParser > "u") return e;
  const t = l ? l(a) : "doc", n = mn(a), o = n ? ja(t, n) : t, s = new DOMParser().parseFromString(e, "text/html");
  for (const p of ["src", "href"])
    s.querySelectorAll(`[${p}]`).forEach((u) => {
      const r = vn(u.getAttribute(p) ?? "", t, o);
      r !== null && u.setAttribute(p, r);
    });
  return s.body.innerHTML;
}
function fn(e) {
  return e.endsWith(".gadx") ? "gadx" : e.endsWith(".gadt") ? "gadTemplate" : "gad";
}
const hn = {
  gad: "DOCS",
  html: "HTML",
  markdown: "MARKDOWN",
  image: "IMAGE",
  none: "PREVIEW"
}, Cn = /* @__PURE__ */ H({
  name: "PanelDocs",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = v(""), t = v(""), n = v(!1);
    let o;
    async function s() {
      if (!(e.docKind.value !== "gad" || !e.openPath.value)) {
        n.value = !0;
        try {
          const r = await e.api.docGen(e.source.value, fn(e.openPath.value), "render-html");
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
    He(p), De(() => clearTimeout(o)), R(() => e.openPath.value, p), R(() => e.source.value, () => {
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
    }, [hn[e.docKind.value]]), i(y, {
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
      innerHTML: ua(l.value, e.openPath.value)
    }, null) : i("span", {
      class: "text-medium-emphasis"
    }, [a.value.noDocumentation])]) : i("div", {
      class: "pnl-body gad-ide__doc",
      innerHTML: ua(e.docHtml.value, e.openPath.value)
    }, null)]);
  }
}), Sn = {
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
function xn(e) {
  return Sn[e] ?? { icon: "mdi-tag-outline", color: "currentColor" };
}
const yn = H({
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
      const s = t.children ?? [], p = !a[n], { icon: u, color: r } = xn(t.kind), f = ie(
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
          ie(
            "span",
            {
              style: { width: "16px", display: "inline-flex", justifyContent: "center", flex: "0 0 16px" },
              onClick: (I) => {
                s.length && (I.stopPropagation(), a[n] = p);
              }
            },
            s.length > 0 ? [ie(ee, { size: "16" }, () => p ? "mdi-chevron-down" : "mdi-chevron-right")] : []
          ),
          ie(ee, { size: "16", style: { color: r } }, () => u),
          ie("span", t.name),
          t.detail ? ie("span", { class: "text-medium-emphasis", style: { overflow: "hidden", textOverflow: "ellipsis" } }, t.detail) : null
        ]
      );
      return ie("div", { key: n }, [f, ...p ? s.map((I, h) => l(I, `${n}/${h}:${I.name}`, o + 1)) : []]);
    };
    return () => ie(
      "div",
      { class: "gad-structure", style: { overflow: "auto", paddingBlock: "4px" } },
      e.symbols.length === 0 ? [ie("div", { class: "text-medium-emphasis", style: { padding: "8px", fontSize: "13px" } }, e.emptyText)] : e.symbols.map((t, n) => l(t, `${n}:${t.name}`, 0))
    );
  }
}), Pn = /* @__PURE__ */ H({
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
    return He(o), De(() => clearTimeout(n)), R(() => e.openPath.value, o), R(() => e.source.value, s), () => i("div", {
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
    }, [e.api.symbols ? i(yn, {
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
}), bn = /* @__PURE__ */ H({
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
      }, [i(ee, {
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
        default: () => [i(ke, {
          value: "current"
        }, {
          default: () => [a.value.currentFile]
        }), i(ke, {
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
}), Gn = /* @__PURE__ */ H({
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
          }), null), i(Be, b({
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
function Zn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !Pi(e);
}
const Za = [["array-item-in-new-line", "arrayItemNewLine"], ["dict-item-in-new-line", "dictItemNewLine"], ["call-params-in-new-line", "callParamsNewLine"]], An = /* @__PURE__ */ H({
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
    const l = D(Q, x(() => X)), t = v("panels"), n = (Z) => e.config[Z] || {}, o = n("fmt"), s = n("transpile"), p = n("template"), u = Se(Object.fromEntries(Za.map(([Z]) => [Z, o[Z] === !0]))), r = v(o.format === !0), f = v(String(o["max-columns"] ?? "")), I = v(o.backup === !0), h = v(String(s.writeFunc ?? "")), G = v(String(s.rawStrFuncStart ?? "")), w = v(String(s.rawStrFuncEnd ?? "")), j = v(String(p.start_delimiter ?? "")), P = v(String(p.end_delimiter ?? ""));
    function M() {
      const Z = {
        ...o
      };
      for (const [F] of Za)
        u[F] ? Z[F] = !0 : delete Z[F];
      r.value ? Z.format = !0 : delete Z.format;
      const B = parseInt(f.value, 10);
      Number.isFinite(B) && B > 0 ? Z["max-columns"] = B : delete Z["max-columns"], I.value ? Z.backup = !0 : delete Z.backup;
      const J = {
        ...s
      }, N = (F, Pe, ae) => {
        ae.trim() === "" ? delete F[Pe] : F[Pe] = ae;
      };
      N(J, "writeFunc", h.value), N(J, "rawStrFuncStart", G.value), N(J, "rawStrFuncEnd", w.value);
      const W = {
        ...p
      };
      j.value === "" ? delete W.start_delimiter : W.start_delimiter = j.value, P.value === "" ? delete W.end_delimiter : W.end_delimiter = P.value;
      const V = {
        ...e.config,
        fmt: Z
      };
      Object.keys(J).length > 0 ? V.transpile = J : delete V.transpile, Object.keys(W).length > 0 ? V.template = W : delete V.template, a("save", V), a("update:modelValue", !1);
    }
    const z = (Z) => ({
      modelValue: Z.value,
      "onUpdate:modelValue": (B) => Z.value = B
    });
    return () => {
      let Z;
      return i(ue, b({
        modelValue: e.modelValue
      }, {
        "onUpdate:modelValue": (B) => a("update:modelValue", B)
      }, {
        maxWidth: "560"
      }), {
        default: () => [i(oe, null, {
          default: () => [i(se, null, {
            default: () => [l.value.settings]
          }), i(bt, b({
            modelValue: t.value
          }, {
            "onUpdate:modelValue": (B) => t.value = B
          }), {
            default: () => [i(ke, {
              value: "panels"
            }, {
              default: () => [l.value.panels]
            }), i(ke, {
              value: "formatter"
            }, {
              default: () => [l.value.formatter]
            }), i(ke, {
              value: "transpile"
            }, {
              default: () => [l.value.transpile]
            }), i(ke, {
              value: "template"
            }, {
              default: () => [l.value.template]
            })]
          }), i(re, null, {
            default: () => [i(an, b({
              modelValue: t.value
            }, {
              "onUpdate:modelValue": (B) => t.value = B
            }), {
              default: () => [i(ia, {
                value: "panels"
              }, Zn(Z = e.panels.map((B) => i(Be, b({
                key: B.id,
                modelValue: B.visible
              }, {
                "onUpdate:modelValue": (J) => e.onTogglePanel(B.id, !!J)
              }, {
                label: B.label,
                density: "compact",
                hideDetails: !0
              }), null))) ? Z : {
                default: () => [Z]
              }), i(ia, {
                value: "formatter"
              }, {
                default: () => [i(Be, b({
                  modelValue: r.value
                }, {
                  "onUpdate:modelValue": (B) => r.value = !!B
                }, {
                  label: l.value.forceMultiline,
                  density: "compact",
                  hideDetails: !0
                }), null), i(K, b({
                  modelValue: f.value
                }, {
                  "onUpdate:modelValue": (B) => f.value = B
                }, {
                  label: l.value.maxColumns,
                  type: "number",
                  density: "compact",
                  hideDetails: !0
                }), null), Za.map(([B, J]) => i(Be, b({
                  key: B,
                  modelValue: u[B]
                }, {
                  "onUpdate:modelValue": (N) => u[B] = !!N
                }, {
                  label: l.value[J],
                  density: "compact",
                  hideDetails: !0
                }), null)), i(Be, b({
                  modelValue: I.value
                }, {
                  "onUpdate:modelValue": (B) => I.value = !!B
                }, {
                  label: l.value.keepBackup,
                  density: "compact",
                  hideDetails: !0
                }), null)]
              }), i(ia, {
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
                }), null), i(K, b(z(w), {
                  label: "rawStrFuncEnd",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0
                }), null)]
              }), i(ia, {
                value: "template"
              }, {
                default: () => [i(K, b(z(j), {
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
              onClick: M
            }, {
              default: () => [l.value.save]
            })]
          })]
        })]
      });
    };
  }
}), Mn = /* @__PURE__ */ H({
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
          }), null), i(Kl, b({
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
          }), null), p() && i(Ye, b({
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
}), Bn = /* @__PURE__ */ H({
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
}), kn = /* @__PURE__ */ H({
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
}), jn = /* @__PURE__ */ H({
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
          }, [i(Na, {
            root: l.tree.value,
            selected: u.value,
            onSelect: (h) => {
              u.value = h, r.value = !1;
            }
          }, null)]), s.value && i("div", {
            class: "mt-3"
          }, [i(en, {
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
}), Hn = /* @__PURE__ */ H({
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
          }, [i(Na, {
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
}), Dn = Symbol("gad-ide-extra-panels"), At = Symbol("gad-ide-extra-panel-expand");
function zn(e) {
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
      return He(() => {
        t(), n = a.params.containerApi.onDidMaximizedGroupChange(t);
      }), De(() => n == null ? void 0 : n.dispose()), na(At, {
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
      }, [ie(e.component, e.props ?? {})]), !e.headerExpand && !e.tabExpand && i(Nn, {
        class: "gad-ide__extra-expand",
        variant: "tonal"
      }, null)]);
    }
  });
}
const Nn = /* @__PURE__ */ H({
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
  return /* @__PURE__ */ H({
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
      De(() => s.forEach((r) => r.dispose()));
      const p = (r) => ({
        onPointerdown: (f) => f.preventDefault(),
        onClick: (f) => {
          f.preventDefault(), f.stopPropagation(), r();
        }
      }), u = () => {
        t.isMaximized() ? t.exitMaximized() : t.maximize(), o.value = t.isMaximized();
      };
      return () => i("div", {
        class: "dv-default-tab",
        "data-tab": t.id
      }, [i("div", {
        class: "dv-default-tab-content"
      }, [n.value]), e.has(t.id) && i("div", b({
        class: "dv-default-tab-action gad-ide__tab-expand",
        title: o.value ? a().restore : a().expand,
        "data-tab-expand": t.id,
        "data-maximized": o.value ? "true" : "false"
      }, p(u)), [i(ee, {
        size: "14",
        icon: o.value ? "mdi-arrow-collapse" : "mdi-arrow-expand"
      }, null)]), i("div", b({
        class: "dv-default-tab-action",
        "data-tab-close": t.id
      }, p(() => t.close())), [i(ee, {
        size: "14",
        icon: "mdi-close"
      }, null)])]);
    }
  });
}
function wn(e, a) {
  let l;
  for (const t of e)
    (t === "" ? l === void 0 : a === t || a.startsWith(t + "/")) && (l === void 0 || t.length > l.length) && (l = t);
  return l;
}
function Mt(e) {
  const a = Ba([""]), l = v(null);
  e.api.gitRepos && e.api.gitRepos().then((p) => {
    p.length && (a.value = p);
  }).catch(() => {
  }), R(() => e.openPath.value, () => {
    l.value = null;
  });
  const t = x(() => l.value !== null && a.value.includes(l.value) ? l.value : wn(a.value, e.openPath.value) ?? a.value[0] ?? ""), n = x(() => e.api.gitFor ? e.api.gitFor(t.value) : e.api.git);
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
    return () => e.git.repos.value.length > 1 ? i(Ye, b({
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
}), En = /* @__PURE__ */ H({
  name: "PanelChanges",
  setup() {
    var n;
    const e = D(_), a = D(Q, x(() => X)), l = ((n = e.workspace.actions) == null ? void 0 : n.edit) ?? !0, t = Mt(e);
    return () => i(ki, {
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
      }, null)]
    });
  }
}), Rn = /* @__PURE__ */ H({
  name: "PanelGit",
  setup() {
    const e = D(_), a = D(Q, x(() => X)), l = Mt(e);
    return () => i(ji, {
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
      }, null)]
    });
  }
}), Aa = [
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
], Vn = {
  explorer: sn,
  editor: cn,
  docs: Cn,
  structure: Pn,
  callstack: In,
  locals: gn,
  breakpoints: bn,
  output: pn
}, xo = /* @__PURE__ */ H({
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
    const l = x(() => e.dark), t = Sl(() => e.messages), n = Ol(e.api, e.workspace, l, {
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
    na(_, n), na(Q, t), R(() => e.fontSize, (c) => {
      c !== n.fontSize.value && n.setFontSize(c);
    });
    let o = null, s = null, p = !1, u = "";
    const r = Se(/* @__PURE__ */ new Set()), I = [...e.workspace.git && e.api.git ? [
      // Changes: its button in the left strip, below the Structure
      {
        id: "changes",
        label: t.value.changes,
        icon: "mdi-file-compare",
        component: En,
        toolbarButton: !0,
        strip: "left",
        tabExpand: !0
      },
      {
        id: "git",
        label: t.value.git,
        icon: "mdi-source-branch",
        component: Rn,
        toolbarButton: !0,
        tabExpand: !0
      }
    ] : [], ...e.extraPanels], h = /* @__PURE__ */ new Set(["docs", ...I.filter((c) => c.tabExpand).map((c) => c.id)]), G = Wn(h, () => ({
      expand: t.value.expand,
      restore: t.value.restore
    })), w = x(() => I.map((c) => ({
      id: c.id,
      label: c.label,
      add: (m) => {
        var ge;
        const A = c.placement ?? "bottom", Y = I.find((pe) => pe.id !== c.id && (pe.placement ?? "bottom") === A && m.getPanel(pe.id)), U = A === "right" ? "right" : A === "left" ? "left" : "below", T = Y ? {
          referencePanel: Y.id,
          direction: "within"
        } : m.panels.length ? {
          direction: U
        } : void 0;
        m.addPanel({
          id: c.id,
          component: c.id,
          title: c.label,
          ...T ? {
            position: T
          } : {}
        }), !Y && A === "bottom" && ((ge = m.getPanel(c.id)) == null || ge.api.setSize({
          height: q(m)
        }));
      }
    }))), j = {
      ...Vn
    };
    for (const c of I) j[c.id] = zn(c);
    const P = (c) => c.word ? t.value[c.word] : c.label, M = x(() => [...(e.panels ? Aa.filter((c) => e.panels.includes(c.id)) : Aa).map((c) => ({
      ...c,
      label: P(c)
    })), ...w.value]), z = (c) => M.value.some((m) => m.id === c);
    function Z(c, m) {
      try {
        m.add(c);
      } catch {
        c.addPanel({
          id: m.id,
          component: m.id,
          title: m.label
        });
      }
      const A = c.getPanel(m.id);
      A && A.title !== m.label && A.api.setTitle(m.label);
    }
    function B(c) {
      for (const m of M.value) m.id !== "docs" && m.id !== "structure" && !w.value.some((A) => A.id === m.id) && Z(c, m);
    }
    function J(c) {
      for (const m of [...c.panels]) z(m.id) || c.removePanel(m);
    }
    const N = v("");
    function W() {
      var c;
      if (o) {
        r.clear();
        for (const m of o.panels) r.add(m.id);
        N.value = ((c = o.panels.find((m) => m.api.isMaximized())) == null ? void 0 : c.id) ?? "";
      }
    }
    function V(c) {
      const m = o == null ? void 0 : o.getPanel(c);
      m && (m.api.isMaximized() ? m.api.exitMaximized() : m.api.maximize(), W());
    }
    function F(c) {
      for (const m of Aa) {
        const A = c.getPanel(m.id);
        A && A.title !== P(m) && A.api.setTitle(P(m));
      }
    }
    R(t, () => o && F(o));
    function Pe(c) {
      o = c.api;
      const m = e.layoutConfig;
      try {
        m && m.grid ? (o.fromJSON(m), J(o), F(o), o.panels.length || B(o)) : B(o);
      } catch {
        o.clear(), B(o);
      }
      W(), u = JSON.stringify(o.toJSON());
      const A = o.onDidMaximizedGroupChange(() => W()), Y = o.onDidLayoutChange(() => {
        if (!o || (W(), p)) return;
        const U = o.toJSON(), T = JSON.stringify(U);
        T !== u && (u = T, a("update:layoutConfig", U));
      });
      s = {
        dispose: () => {
          A.dispose(), Y.dispose();
        }
      };
    }
    R(() => e.layoutConfig, (c) => {
      if (!(!o || !c || JSON.stringify(c) === u)) {
        p = !0;
        try {
          o.fromJSON(c), J(o), F(o), u = JSON.stringify(o.toJSON());
        } catch {
        } finally {
          p = !1, W();
        }
      }
    });
    const ae = "gad-ide.bottom.height";
    function q(c) {
      let m = 0;
      try {
        m = Number(localStorage.getItem(ae)) || 0;
      } catch {
      }
      const A = Math.max(160, c.height - 120);
      return Math.min(A, Math.max(160, m || Math.round(c.height / 3)));
    }
    const Te = "gad-ide.preview.width";
    function le(c) {
      let m = 0;
      try {
        m = Number(localStorage.getItem(Te)) || 0;
      } catch {
      }
      return Math.min(Math.max(240, c.width - 300), Math.max(240, m || Math.round(c.width / 3)));
    }
    const Fe = "gad-ide.left.width";
    function ca(c) {
      var Y, U;
      if (!o) return;
      const m = M.value.find((T) => T.id === c);
      if (!m || o.getPanel(c)) return;
      const A = !o.getPanel(c === "explorer" ? "structure" : "explorer");
      if (Z(o, m), A) {
        let T = 0;
        try {
          T = Number(localStorage.getItem(Fe)) || 0;
        } catch {
        }
        (Y = o.getPanel(c)) == null || Y.api.setSize({
          width: Math.min(Math.max(160, o.width - 300), Math.max(160, T || 260))
        });
      }
      (U = o.getPanel(c)) == null || U.api.setActive();
    }
    function Ue(c) {
      var Y, U;
      if (c === "docs" || c === "explorer" || c === "structure") {
        const T = (Y = o == null ? void 0 : o.getPanel(c)) == null ? void 0 : Y.api.width, ge = c === "docs" ? Te : Fe;
        if (T) try {
          localStorage.setItem(ge, String(Math.round(T)));
        } catch {
        }
        return;
      }
      const m = I.find((T) => T.id === c), A = (U = o == null ? void 0 : o.getPanel(c)) == null ? void 0 : U.api.height;
      if (!(!m || (m.placement ?? "bottom") !== "bottom" || !A))
        try {
          localStorage.setItem(ae, String(Math.round(A)));
        } catch {
        }
    }
    function Je(c, m) {
      if (o)
        if (m) {
          const A = M.value.find((Y) => Y.id === c);
          A && !o.getPanel(c) && Z(o, A);
        } else {
          const A = o.getPanel(c);
          A && (Ue(c), o.removePanel(A));
        }
    }
    const te = {
      buttons: x(() => I.filter((c) => c.toolbarButton).map((c) => ({
        id: c.id,
        label: c.label,
        icon: c.icon ?? "mdi-view-split-horizontal",
        align: c.buttonAlign ?? "left",
        bottom: (c.placement ?? "bottom") === "bottom",
        strip: c.strip ?? "bottom"
      }))),
      open: (c) => {
        var A;
        if (!o) return;
        const m = M.value.find((Y) => Y.id === c);
        m && !o.getPanel(c) && Z(o, m), (A = o.getPanel(c)) == null || A.api.setActive();
      }
    };
    na(Dn, te);
    const be = (c, m, A = !1) => i(y, {
      key: c.id,
      size: "small",
      variant: r.has(c.id) ? "tonal" : "text",
      prependIcon: c.icon,
      class: "text-none",
      disabled: A,
      "data-extra-open": c.id,
      onClick: m
    }, {
      default: () => [c.label]
    }), ze = x(() => te.buttons.value.filter((c) => c.bottom && c.strip === "bottom")), he = (c, m = "bottom", A = () => te.open(c.id), Y = !1) => {
      const U = r.has(c.id), T = N.value === c.id, ge = U && !h.has(c.id), pe = m === "right" ? U ? "mdi-chevron-right" : "mdi-chevron-left" : m === "left" ? U ? "mdi-chevron-left" : "mdi-chevron-right" : U ? "mdi-chevron-down" : "mdi-chevron-up";
      return i("span", {
        key: c.id,
        class: "gad-ide__strip-item"
      }, [i("button", {
        type: "button",
        class: ["gad-ide__strip-btn", {
          "gad-ide__strip-btn--open": U
        }],
        title: c.label,
        disabled: Y,
        "data-extra-open": c.id,
        "data-open": U ? "true" : "false",
        onClick: () => U ? Je(c.id, !1) : A()
      }, [i(ee, {
        size: "16",
        icon: c.icon
      }, null), i("span", {
        class: "gad-ide__strip-label"
      }, [c.label]), i(ee, {
        size: "14",
        icon: pe
      }, null)]), ge && i("button", {
        type: "button",
        class: "gad-ide__strip-btn gad-ide__strip-expand",
        title: T ? t.value.restore : t.value.expand,
        "data-strip-expand": c.id,
        "data-maximized": T ? "true" : "false",
        onClick: () => V(c.id)
      }, [i(ee, {
        size: "14",
        icon: T ? "mdi-arrow-collapse" : "mdi-arrow-expand"
      }, null)])]);
    }, Ie = {
      id: "docs",
      label: t.value.preview,
      icon: "mdi-file-eye-outline"
    }, Ge = x(() => [{
      id: "explorer",
      label: t.value.explorer,
      icon: "mdi-file-tree-outline"
    }, {
      id: "structure",
      label: t.value.structure,
      icon: "mdi-file-tree"
    }].filter((c) => z(c.id))), Ze = x(() => te.buttons.value.filter((c) => c.bottom && c.strip === "left")), Xe = x(() => M.value.map((c) => ({
      id: c.id,
      label: c.label,
      visible: r.has(c.id)
    })));
    R(() => n.docRequest.value, () => {
      var m, A;
      const c = M.value.find((Y) => Y.id === "docs");
      o && c && !o.getPanel("docs") && (Z(o, c), (m = o.getPanel("docs")) == null || m.api.setSize({
        width: le(o)
      })), (A = o == null ? void 0 : o.getPanel("docs")) == null || A.api.setActive();
    });
    function Qe(c) {
      a("update:config", c);
    }
    He(() => void n.init()), De(() => s == null ? void 0 : s.dispose());
    const Ne = x(() => e.dark ? bi : Gi);
    return () => {
      var c;
      return i("div", {
        class: "gad-ide"
      }, [i("div", {
        class: "gad-ide__header",
        "data-ide-header": !0
      }, [te.buttons.value.filter((m) => !m.bottom && m.align === "left").map((m) => be(m, () => te.open(m.id))), i(y, {
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
      }, null), te.buttons.value.filter((m) => !m.bottom && m.align === "right").map((m) => be(m, () => te.open(m.id))), e.headerActions.map((m) => (
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
      }, [Ge.value.length + Ze.value.length > 0 && i("div", {
        class: "gad-ide__strip gad-ide__strip--side gad-ide__strip--left",
        "data-ide-strip-left": !0
      }, [Ge.value.map((m) => he(m, "left", () => ca(m.id))), Ze.value.map((m) => he(m, "left"))]), i("div", {
        class: "gad-ide__dock"
      }, [i(Zi, {
        style: {
          height: "100%"
        },
        theme: Ne.value,
        components: j,
        defaultTabComponent: G,
        onReady: Pe
      }, null)]), z("docs") && i("div", {
        class: "gad-ide__strip gad-ide__strip--side gad-ide__strip--right",
        "data-ide-strip-right": !0
      }, [he(Ie, "right", () => n.requestDocs(), !n.openPath.value && !r.has("docs"))])]), ze.value.length > 0 && i("div", {
        class: "gad-ide__strip",
        "data-ide-strip": !0
      }, [ze.value.filter((m) => m.align === "left").map((m) => he(m)), i("span", {
        class: "gad-ide__header-spacer"
      }, null), ze.value.filter((m) => m.align === "right").map((m) => he(m))]), i(An, b({
        modelValue: n.settingsOpen.value
      }, {
        "onUpdate:modelValue": (m) => n.settingsOpen.value = m
      }, {
        config: e.config,
        panels: Xe.value,
        onTogglePanel: Je,
        onSave: Qe
      }), null), i(Mn, b({
        modelValue: n.profileDialog.value
      }, {
        "onUpdate:modelValue": (m) => n.profileDialog.value = m
      }, {
        defaultPath: n.openPath.value,
        onCreate: n.addProfile
      }), null), i(Gn, b({
        modelValue: !!n.bpDialog.value
      }, {
        "onUpdate:modelValue": (m) => {
          m || (n.bpDialog.value = null);
        }
      }, {
        line: ((c = n.bpDialog.value) == null ? void 0 : c.line) ?? 0,
        initial: n.bpDialog.value ? n.bpMetaFor(n.bpDialog.value.path)[n.bpDialog.value.line] ?? {} : {},
        onSave: (m) => {
          n.bpDialog.value && n.setBpMeta(n.bpDialog.value.path, n.bpDialog.value.line, m);
        }
      }), null), i(Bn, {
        request: n.promptReq.value,
        onDone: () => n.promptReq.value = null
      }, null), i(Hn, null, null), i(kn, {
        request: n.confirmReq.value,
        onDone: () => n.confirmReq.value = null
      }, null), i(jn, b({
        modelValue: n.urlDialog.value
      }, {
        "onUpdate:modelValue": (m) => n.urlDialog.value = m
      }, {
        progress: n.uploadProgress.value,
        onImport: (m, A, Y) => n.uploadUrl(m, A, Y)
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
        for (var G = 0, w = h.length; G < w; G++) {
          var j = h[G];
          if (j.type !== "code") {
            I(j.content);
            continue;
          }
          var P = j.content[1], M = j.content[3];
          if (P && M && P.type === "code-language" && M.type === "code-block" && typeof P.content == "string") {
            var z = P.content.replace(/\b#/g, "sharp").replace(/\b\+\+/g, "pp");
            z = (/[a-z][\w-]*/i.exec(z) || [""])[0].toLowerCase();
            var Z = "language-" + z;
            M.alias ? typeof M.alias == "string" ? M.alias = [M.alias, Z] : M.alias.push(Z) : M.alias = [Z];
          }
        }
    }
    I(f.tokens);
  }), e.hooks.add("wrap", function(f) {
    if (f.type === "code-block") {
      for (var I = "", h = 0, G = f.classes.length; h < G; h++) {
        var w = f.classes[h], j = /language-(.+)/.exec(w);
        if (j) {
          I = j[1];
          break;
        }
      }
      var P = e.languages[I];
      if (P)
        f.content = e.highlight(r(f.content), P, I);
      else if (I && I !== "none" && e.plugins.autoloader) {
        var M = "md-" + (/* @__PURE__ */ new Date()).valueOf() + "-" + Math.floor(Math.random() * 1e16);
        f.attributes.id = M, e.plugins.autoloader.loadLanguages(I, function() {
          var z = document.getElementById(M);
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
        var w;
        return G[1] === "x" ? w = parseInt(G.slice(2), 16) : w = Number(G.slice(1)), u(w);
      } else {
        var j = p[G];
        return j || h;
      }
    }), I;
  }
  e.languages.md = e.languages.markdown;
})(Prism);
const Ln = [{
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
function Yn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const Tn = (e) => e.replace(/\s*\{data-src-pos="\d+,\d+"\}/g, "");
function la(e, a) {
  const l = ye.languages[a];
  return l ? ye.highlight(e, l, a) : Yn(e);
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
            innerHTML: ua(za(r.markdown ?? ""), e.docPath, e.docRootFor)
          }, null);
        case "render-html":
          return i("div", {
            class: "gp-doc-rendered",
            innerHTML: ua(r.html ?? "", e.docPath, e.docRootFor)
          }, null);
        case "md":
          return i("pre", {
            class: "gp-doc-src language-markdown",
            innerHTML: la(Tn(r.markdown ?? ""), "markdown")
          }, null);
        case "html":
          return i("pre", {
            class: "gp-doc-src language-markup",
            innerHTML: la(r.html ?? "", "markup")
          }, null);
        case "json":
          return i("pre", {
            class: "gp-doc-src language-json",
            innerHTML: la(r.text ?? "", "json")
          }, null);
        case "yaml":
          return i("pre", {
            class: "gp-doc-src language-yaml",
            innerHTML: la(r.text ?? "", "yaml")
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
      }, [i(Ye, b({
        class: "gp-doc-ctl",
        modelValue: l.value
      }, {
        "onUpdate:modelValue": (f) => l.value = f ?? "render-md"
      }, {
        items: Ln,
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
            const [G, w] = h.split(",").map((j) => parseInt(j, 10));
            G && e.onNavigate(G, w || 1);
          }
        }
      }, [u()])]);
    };
  }
}), Fn = {
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
}, Un = {
  gad: "gad",
  gadt: "gadt",
  gadx: "gadx"
}, Jn = {
  gad: "",
  gadt: "gadTemplate",
  gadx: "gadx"
}, yo = /* @__PURE__ */ H({
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
      ...Fn
    }), t = x({
      get: () => l[a.value],
      set: (M) => l[a.value] = M
    }), n = x(() => Jn[a.value]), o = v(!1), s = v(""), p = v(!1), u = v(0), r = v(0), f = v(0), I = v(null), h = e.runner.diagnose ? (M) => e.runner.diagnose(M, n.value) : void 0;
    async function G(M) {
      o.value = !0;
      try {
        const z = await e.runner.format(t.value, n.value);
        I.value = {
          kind: "format",
          fmt: z
        }, M && z.ok && (t.value = z.source);
      } finally {
        o.value = !1;
      }
    }
    async function w() {
      o.value = !0;
      try {
        const M = a.value === "gadx" ? s.value : "";
        I.value = {
          kind: "run",
          run: await e.runner.run(t.value, n.value, M)
        };
      } finally {
        o.value = !1;
      }
    }
    const j = oa("gad-ide.playground.editor", 560, 200, 4e3), P = oa("gad-ide.playground.doc", 420, 160, 4e3);
    return () => {
      var M, z;
      return i("div", {
        class: "gp-split"
      }, [i("section", {
        class: "gp-pane",
        style: {
          flex: `0 0 ${j.size.value}px`
        }
      }, [i("div", {
        class: "gp-pane-head"
      }, [i(yt, b({
        modelValue: a.value
      }, {
        "onUpdate:modelValue": (Z) => {
          Z && (a.value = Z);
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
      }, [a.value === "gadx" && i(Ye, b({
        modelValue: s.value
      }, {
        "onUpdate:modelValue": (Z) => s.value = Z ?? ""
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
        onClick: w
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
      }, [i(Wa, b({
        key: a.value,
        modelValue: t.value
      }, {
        "onUpdate:modelValue": (Z) => {
          t.value = Z, p.value && u.value++;
        }
      }, {
        language: Un[a.value],
        dark: e.dark,
        diagnose: h,
        gotoLine: r.value,
        gotoSeq: f.value
      }), null)])]), i(da, {
        onStart: j.begin,
        onDrag: (Z) => j.drag(Z),
        onReset: j.reset
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
      }, [S("Format or run the source on the left.")]), ((M = I.value) == null ? void 0 : M.kind) === "format" && i(Xn, {
        fmt: I.value.fmt
      }, null), ((z = I.value) == null ? void 0 : z.kind) === "run" && i(Qn, {
        run: I.value.run
      }, null)])]), e.runner.doc && p.value && i(da, {
        onStart: P.begin,
        onDrag: (Z) => P.drag(Z, -1),
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
        onNavigate: (Z) => {
          r.value = Z, f.value++;
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
}), Xn = /* @__PURE__ */ H({
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
}), Qn = /* @__PURE__ */ H({
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
}), On = {
  gad: "gad",
  gadt: "gadt",
  gadx: "gadx"
}, Ma = {
  gad: "",
  gadt: "gadTemplate",
  gadx: "gadx"
};
let Kn = 1;
const ut = (e = "", a = "gad") => ({
  id: Kn++,
  source: e,
  dialect: a,
  tagEncode: "",
  result: null,
  running: !1,
  showDoc: !1,
  docRev: 0,
  gotoLine: 0,
  gotoSeq: 0
}), _n = [{
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
}], Po = /* @__PURE__ */ H({
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
    const a = v(_n.map((u) => ut(u.source, u.dialect)));
    async function l(u) {
      u.running = !0;
      try {
        const r = u.dialect === "gadx" ? u.tagEncode : "";
        u.result = await e.runner.run(u.source, Ma[u.dialect], r);
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
    }, o = (u) => e.runner.diagnose ? (r) => e.runner.diagnose(r, Ma[u.dialect]) : void 0, s = oa("gad-ide.notebook.editor", 220, 80, 4e3), p = oa("gad-ide.notebook.doc", 420, 160, 4e3);
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
    }, [i(Wa, b({
      key: u.id + ":" + u.dialect,
      modelValue: u.source
    }, {
      "onUpdate:modelValue": (r) => {
        u.source = r, u.showDoc && u.docRev++;
      }
    }, {
      language: On[u.dialect],
      dark: e.dark,
      diagnose: o(u),
      gotoLine: u.gotoLine,
      gotoSeq: u.gotoSeq
    }), null)]), e.runner.doc && u.showDoc && i(da, {
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
      sourceType: Ma[u.dialect],
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
    })])]), i(da, {
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
    }), u.dialect === "gadx" && i(Ye, b({
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
function qn(e = "") {
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
const jt = qn(), bo = jt;
async function Go() {
  try {
    return await jt.workspace();
  } catch {
    return null;
  }
}
export {
  Mo as ChangesPanel,
  Tl as DEFAULT_FILE_TYPES,
  Da as DEFAULT_IDE_OWN_MESSAGES,
  X as DEFAULT_MESSAGES,
  Bo as DiffBrowser,
  ko as DiffMergeView,
  kt as DocPanel,
  Jl as FileTypeRegistry,
  jo as GIT_I18N_MESSAGES,
  Ho as GIT_I18N_NAMESPACE,
  Do as GIT_MESSAGES_PT_BR,
  Wa as GadEditor,
  jl as GadEditorView,
  xo as GadIde,
  Po as GadNotebook,
  yo as GadPlayground,
  zo as GitPanel,
  So as IDE_I18N_MESSAGES,
  Cl as IDE_I18N_NAMESPACE,
  It as IDE_OWN_MESSAGES_PT_BR,
  _ as IdeControllerKey,
  Zt as InspectorNode,
  Sn as KIND_ICONS,
  No as LANGUAGES,
  Wo as ResizeHandle,
  yn as StructureTree,
  Ol as createController,
  wo as createHttpGitApi,
  qn as createHttpIdeApi,
  bo as httpIdeApi,
  jt as ideApi,
  xn as kindIcon,
  tt as langExtension,
  ft as langOf,
  Eo as languageExtensions,
  Ro as languageOf,
  Go as probeIde,
  Vo as renamedTo,
  za as renderDocMarkdown,
  Lo as statusColor,
  Yo as treePath,
  To as unchangedContent,
  Sl as useIdeMessages,
  Fo as useStoredSize
};
