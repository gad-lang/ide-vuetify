var hi = Object.defineProperty;
var Ci = (e, a, n) => a in e ? hi(e, a, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[a] = n;
var fe = (e, a, n) => Ci(e, typeof a != "symbol" ? a + "" : a, n);
import { computed as y, ref as v, shallowRef as qa, reactive as Ce, watch as V, onScopeDispose as Si, defineComponent as D, createVNode as t, createTextVNode as S, Fragment as Se, inject as H, mergeProps as b, onMounted as Me, onBeforeUnmount as Re, h as te, isVNode as xi, provide as ea } from "vue";
import { themeDark as yi, themeLight as Pi, DockviewVue as bi } from "dockview-vue";
import { DEFAULT_GIT_MESSAGES as Gi, useWords as Zi, useGitMessages as Ai, ChangesPanel as Mi, GitPanel as Bi, useStoredSize as aa, ResizeHandle as ta, createHttpGitApi as ki } from "@gad-lang/git-vuetify";
import { ChangesPanel as bo, DiffBrowser as Go, DiffMergeView as Zo, GIT_I18N_MESSAGES as Ao, GIT_I18N_NAMESPACE as Mo, GIT_MESSAGES_PT_BR as Bo, GitPanel as ko, LANGUAGES as jo, ResizeHandle as Ho, createHttpGitApi as Do, languageExtensions as zo, languageOf as No, renamedTo as Wo, statusColor as Eo, treePath as wo, unchangedContent as Ro, useStoredSize as Vo } from "@gad-lang/git-vuetify";
import { StateField as ut, RangeSet as $a, StateEffect as Ba, Compartment as Oe, EditorState as xa } from "@codemirror/state";
import { gutter as ji, EditorView as Ae, GutterMarker as Hi, hoverTooltip as Di, Decoration as we, keymap as zi } from "@codemirror/view";
import { indentWithTab as Ni, defaultKeymap as Wi, undo as Ei, redo as wi } from "@codemirror/commands";
import { oneDark as et } from "@codemirror/theme-one-dark";
import { StreamLanguage as Ri } from "@codemirror/language";
import { basicSetup as Vi } from "codemirror";
import { gad as ya } from "@gad-lang/codemirror-gad";
import { json as Li } from "@codemirror/lang-json";
import { html as Yi } from "@codemirror/lang-html";
import { css as Ti } from "@codemirror/lang-css";
import { javascript as Ke } from "@codemirror/lang-javascript";
import { markdown as Fi } from "@codemirror/lang-markdown";
import { yaml as Ui } from "@codemirror/legacy-modes/mode/yaml";
import xe from "prismjs";
import { registerGad as Ji, registerGadTemplate as Xi } from "@gad-lang/prism-gad";
import { VSelect as Qi, VBtn as Oi, VTabs as Ki, VTab as _i, VTextField as qi, VDialog as $i, VCard as el, VCardTitle as al, VCardText as tl, VCardActions as il, VSpacer as ll, VDivider as nl, VMenu as ol, VList as dl, VListItem as rl, VListSubheader as sl, VIcon as ul, VSwitch as cl, VCheckbox as Il, VWindow as gl, VWindowItem as ml, VCombobox as pl, VProgressLinear as vl, VBtnToggle as fl } from "vuetify/components";
const ka = {
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
  replaceOne: '"%s" already exists — replace it',
  replaceMany: "%d files already exist — replace them"
}, ct = {
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
  replaceOne: '"%s" já existe — substituí-lo',
  replaceMany: "%d arquivos já existem — substituí-los"
}, X = { ...Gi, ...ka }, hl = "gadIde", vo = {
  en: { gadIde: ka },
  pt: { gadIde: ct }
}, Q = Symbol("gad-ide-messages");
function Cl(e) {
  const a = Zi(hl, { en: ka, pt: ct }, e), n = Ai(e);
  return y(() => ({ ...n.value, ...a.value }));
}
const Ee = (e, ...a) => {
  let n = 0;
  return e.replace(/%[sd]/g, () => String(a[n++] ?? ""));
}, It = Ba.define(), gt = Ba.define();
class Sl extends Hi {
  toDOM() {
    const a = document.createElement("span");
    return a.className = "cm-bp-dot", a.textContent = "●", a;
  }
}
const Aa = new Sl(), ia = ut.define({
  create() {
    return $a.empty;
  },
  update(e, a) {
    e = e.map(a.changes);
    for (const n of a.effects)
      if (n.is(gt))
        e = n.value.on ? e.update({ add: [Aa.range(n.value.pos)] }) : e.update({ filter: (i) => i !== n.value.pos });
      else if (n.is(It)) {
        const i = a.state.doc, l = [...new Set(n.value)].filter((o) => o >= 1 && o <= i.lines).sort((o, s) => o - s).map((o) => Aa.range(i.line(o).from));
        e = $a.of(l);
      }
    return e;
  }
});
function xl(e) {
  const a = [], n = e.state.field(ia).iter();
  for (; n.value; )
    a.push(e.state.doc.lineAt(n.from).number), n.next();
  return a.sort((i, l) => i - l);
}
function yl(e, a) {
  e.dispatch({ effects: It.of(a) });
}
function Pl(e, a) {
  let n = !1;
  return e.state.field(ia).between(a, a, () => {
    n = !0;
  }), n;
}
function bl(e, a) {
  const n = (i) => e(xl(i));
  return [
    ia,
    ji({
      class: "cm-breakpoint-gutter",
      markers: (i) => i.state.field(ia),
      initialSpacer: () => Aa,
      domEventHandlers: {
        // A single click toggles the breakpoint: it adds one on an empty line and
        // removes it when the line already has one.
        mousedown(i, l) {
          return i.dispatch({ effects: gt.of({ pos: l.from, on: !Pl(i, l.from) }) }), n(i), !0;
        },
        contextmenu(i, l, o) {
          return a ? (o.preventDefault(), a(i.state.doc.lineAt(l.from).number), !0) : !1;
        }
      }
    }),
    Ae.baseTheme({
      ".cm-breakpoint-gutter": { width: "1.1em", cursor: "pointer" },
      ".cm-breakpoint-gutter .cm-bp-dot": { color: "#e5484d", paddingLeft: "2px" }
    })
  ];
}
const mt = Ba.define(), Gl = we.line({ class: "cm-debug-line" }), Zl = we.mark({ class: "cm-debug-node" }), _e = (e) => /[A-Za-z0-9_]/.test(e);
function pt(e, a) {
  let n = Math.min(Math.max(a, 0), e.length);
  if (n >= e.length || !_e(e[n]))
    if (n > 0 && _e(e[n - 1])) n -= 1;
    else return null;
  let i = n, l = n;
  for (; i > 0 && _e(e[i - 1]); ) i--;
  for (; l < e.length && _e(e[l]); ) l++;
  return l <= i ? null : { start: i, end: l, word: e.slice(i, l) };
}
function Al(e, a) {
  if (!a || a.line < 1 || a.line > e.lines) return we.none;
  const n = e.line(a.line), i = [Gl.range(n.from)], l = pt(n.text, a.col - 1);
  return l && i.push(Zl.range(n.from + l.start, n.from + l.end)), we.set(i, !0);
}
const Ml = ut.define({
  create() {
    return we.none;
  },
  update(e, a) {
    e = e.map(a.changes);
    for (const n of a.effects) n.is(mt) && (e = Al(a.state.doc, n.value));
    return e;
  },
  provide: (e) => Ae.decorations.from(e)
});
function Bl(e, a) {
  return [
    Ml,
    Di((n, i) => {
      const l = n.state.doc.lineAt(i), o = pt(l.text, i - l.from);
      if (!o) return null;
      const s = e().get(o.word);
      return s ? {
        pos: l.from + o.start,
        end: l.from + o.end,
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
function vt(e) {
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
function at(e, a, n) {
  switch (e) {
    case "gad":
      return ya({ sourceType: "gad", diagnose: a });
    case "gadt":
      return ya({ sourceType: "template", delimiters: { start: n == null ? void 0 : n.start, end: n == null ? void 0 : n.end }, preamble: n == null ? void 0 : n.preamble });
    case "gadx":
      return ya({ sourceType: "gadx", diagnose: a });
    case "json":
      return Li();
    case "yaml":
      return Ri.define(Ui);
    case "html":
      return Yi();
    case "css":
    case "scss":
      return Ti();
    case "javascript":
      return Ke();
    case "typescript":
      return Ke({ typescript: !0 });
    case "jsx":
      return Ke({ jsx: !0 });
    case "tsx":
      return Ke({ jsx: !0, typescript: !0 });
    case "markdown":
      return Fi();
    default:
      return [];
  }
}
function tt(e) {
  return Ae.theme({ "&": { fontSize: e + "px" } });
}
class kl {
  constructor(a) {
    fe(this, "view");
    fe(this, "langComp", new Oe());
    fe(this, "themeComp", new Oe());
    fe(this, "roComp", new Oe());
    fe(this, "fontComp", new Oe());
    fe(this, "opts");
    this.opts = a;
    const n = xa.create({
      doc: a.doc,
      extensions: [
        Vi,
        zi.of([Ni, ...Wi]),
        this.langComp.of(a.customExtension ? a.customExtension() : at(a.language, a.diagnose)),
        this.themeComp.of(a.dark ? et : []),
        this.roComp.of(xa.readOnly.of(!!a.readonly)),
        this.fontComp.of(tt(a.fontSize ?? 13)),
        a.breakpoints === !1 ? [] : bl(
          (i) => {
            var l;
            return (l = a.onBreakpointsChange) == null ? void 0 : l.call(a, i);
          },
          (i) => {
            var l;
            return (l = a.onBreakpointContext) == null ? void 0 : l.call(a, i);
          }
        ),
        Bl(() => {
          var i;
          return ((i = a.getLocals) == null ? void 0 : i.call(a)) ?? /* @__PURE__ */ new Map();
        }),
        Ae.updateListener.of((i) => {
          var l;
          i.docChanged && ((l = a.onChange) == null || l.call(a, i.state.doc.toString()));
        })
      ]
    });
    this.view = new Ae({ state: n, parent: a.parent });
  }
  getValue() {
    return this.view.state.doc.toString();
  }
  setValue(a) {
    this.view.dispatch({ changes: { from: 0, to: this.view.state.doc.length, insert: a } });
  }
  setLanguage(a, n, i) {
    this.opts.language = a, this.opts.customExtension = i, this.view.dispatch({
      effects: this.langComp.reconfigure(i ? i() : at(a, n))
    });
  }
  setDark(a) {
    this.view.dispatch({ effects: this.themeComp.reconfigure(a ? et : []) });
  }
  setFontSize(a) {
    this.view.dispatch({ effects: this.fontComp.reconfigure(tt(a)) });
  }
  setReadonly(a) {
    this.view.dispatch({ effects: this.roComp.reconfigure(xa.readOnly.of(a)) });
  }
  setBreakpoints(a) {
    yl(this.view, a);
  }
  /** setDebugLine highlights the paused line (1-based), or clears it with 0. */
  setDebugLine(a, n = 1) {
    this.view.dispatch({ effects: mt.of(a >= 1 ? { line: a, col: n } : null) });
  }
  undo() {
    Ei(this.view), this.view.focus();
  }
  redo() {
    wi(this.view), this.view.focus();
  }
  /** gotoLine moves the cursor to a 1-based line and scrolls it into view. */
  gotoLine(a, n = 1) {
    const i = this.view.state.doc;
    if (a < 1 || a > i.lines) return;
    const l = i.line(a), o = Math.min(l.from + Math.max(0, n - 1), l.to);
    this.view.dispatch({ selection: { anchor: o }, scrollIntoView: !0 }), this.view.focus();
  }
  destroy() {
    this.view.destroy();
  }
}
Ji(xe);
Xi(xe);
function la(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ne(e) {
  let a = la(e);
  return a = a.replace(/`([^`]+)`/g, "<code>$1</code>"), a = a.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>"), a = a.replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>"), a;
}
function jl(e) {
  const a = e.split(`
`);
  let n = "", i = [], l = [], o = [];
  const s = (f) => f.trim().replace(/^\|/, "").replace(new RegExp("(?<!\\\\)\\|$"), "").split(new RegExp("(?<!\\\\)\\|")).map((I) => I.trim().replace(/\\\|/g, "|")), p = () => {
    if (!o.length) return;
    const f = o;
    if (o = [], f.length < 2 || !/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(f[1])) {
      i.push(...f);
      return;
    }
    const I = (h, G) => "<tr>" + s(h).map((W) => `<${G}>${Ne(W)}</${G}>`).join("") + "</tr>";
    n += "<table><thead>" + I(f[0], "th") + "</thead><tbody>" + f.slice(2).map((h) => I(h, "td")).join("") + "</tbody></table>";
  }, u = () => {
    i.length && (n += "<p>" + Ne(i.join(" ")) + "</p>", i = []);
  }, r = () => {
    l.length && (n += "<ul>" + l.map((f) => "<li>" + Ne(f) + "</li>").join("") + "</ul>", l = []);
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
      z && (B = ` data-src-pos="${z[1]}"`, P = P.slice(0, z.index)), n += `<h${M}${B}>${Ne(P)}</h${M}>`;
    } else G ? (u(), l.push(G[1])) : l.length && /^\s+\S/.test(f) ? l[l.length - 1] += " " + I.trim() : W ? (u(), r(), n += "<blockquote>" + Ne(W[1]) + "</blockquote>") : (r(), i.push(I));
  }
  return p(), u(), r(), n;
}
function ja(e) {
  const a = e.split("```");
  let n = "";
  for (let i = 0; i < a.length; i++)
    if (i % 2 === 1) {
      let l = a[i], o = "gad";
      const s = l.indexOf(`
`);
      if (s >= 0) {
        const h = l.slice(0, s).trim();
        /^[a-zA-Z][\w-]*$/.test(h) && (o = h.toLowerCase(), l = l.slice(s + 1));
      }
      l = l.replace(/\n$/, "");
      const p = xe.languages[o] || xe.languages.gad, u = l.split(`
`);
      let r = "", f = [];
      const I = () => {
        if (!f.length) return;
        const h = f.join(`
`);
        r += p ? xe.highlight(h, p, o) : la(h), r && !r.endsWith(`
`) && (r += `
`), f = [];
      };
      for (const h of u)
        h.startsWith(">>> ") ? (I(), r += `<span class="doc-result">${la(h)}</span>
`) : f.push(h);
      I(), r = r.replace(/\n$/, ""), n += `<pre class="doc-code language-${o}"><code>${r}</code></pre>`;
    } else
      n += jl(a[i]);
  return n;
}
function it(e) {
  return e.length ? e.map((a) => (a.kind === "root" ? "" : `<h4>${la(a.title || a.kind)}</h4>`) + ja(a.content)).join(`
`) : '<p class="text-medium-emphasis">No documentation comments in this file.</p>';
}
const Hl = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp", "ico"];
function ft(e) {
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
      return a && Hl.includes(a[1]) ? "image" : "none";
  }
}
const We = (e) => ft(e) === "image", Dl = '<p class="text-medium-emphasis">No documentation for this kind of file.</p>';
function zl(e, a) {
  switch (e) {
    case "html":
      return a;
    case "markdown":
      return ja(a);
    case "image":
      return "";
    default:
      return Dl;
  }
}
function ht(e) {
  return Array.from(e ?? []).map((a) => ({
    path: a.webkitRelativePath || a.name,
    file: a
  }));
}
async function Nl(e) {
  var i;
  const a = [];
  for (const l of Array.from(e.items)) {
    const o = (i = l.webkitGetAsEntry) == null ? void 0 : i.call(l);
    o && a.push(o);
  }
  if (!a.length) return ht(e.files);
  const n = [];
  return await Promise.all(a.map((l) => Ct(l, "", n))), n;
}
async function Ct(e, a, n) {
  if (e.isFile) {
    n.push({ path: a + e.name, file: await Rl(e) });
    return;
  }
  const i = await Ll(e);
  await Promise.all(i.map((l) => Ct(l, a + e.name + "/", n)));
}
function Wl(e) {
  if (e.includes(0)) return !1;
  try {
    return new TextDecoder("utf-8", { fatal: !0 }).decode(e), !0;
  } catch {
    return !1;
  }
}
function El(e) {
  let a = "";
  for (let n = 0; n < e.length; n += 32768) a += String.fromCharCode(...e.subarray(n, n + 32768));
  return btoa(a);
}
function St(e, a) {
  return Wl(a) ? { path: e, content: new TextDecoder().decode(a) } : { path: e, content: "", bytes: El(a) };
}
async function lt(e, a) {
  return St(e, new Uint8Array(await a.arrayBuffer()));
}
async function wl(e) {
  const a = new Uint8Array(await e.arrayBuffer());
  let n = "";
  for (let i = 0; i < a.length; i++) n += String.fromCharCode(a[i]);
  return btoa(n);
}
function Rl(e) {
  return new Promise((a, n) => e.file(a, n));
}
async function Vl(e, a) {
  const n = Number(e.headers.get("Content-Length") || 0);
  if (!e.body)
    return a(n ? 100 : -1), new Uint8Array(await e.arrayBuffer());
  const i = e.body.getReader(), l = [];
  let o = 0;
  for (a(n ? 0 : -1); ; ) {
    const { done: u, value: r } = await i.read();
    if (u) break;
    r && (l.push(r), o += r.length, n && a(Math.min(100, Math.round(o / n * 100))));
  }
  const s = new Uint8Array(o);
  let p = 0;
  for (const u of l)
    s.set(u, p), p += u.length;
  return a(100), s;
}
function Ll(e) {
  const a = e.createReader(), n = [];
  return new Promise((i, l) => {
    const o = () => a.readEntries((s) => {
      if (!s.length) return i(n);
      n.push(...s), o();
    }, l);
    o();
  });
}
const Yl = [
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
], Tl = "mdi-file-outline";
function Fl(e) {
  const a = e.lastIndexOf("/"), n = a === -1 ? e : e.slice(a + 1), i = n.lastIndexOf(".");
  return i === -1 ? "" : n.slice(i + 1).toLowerCase();
}
class Ul {
  constructor(a = []) {
    fe(this, "byExt", /* @__PURE__ */ new Map());
    for (const n of [...Yl, ...a])
      for (const i of n.extensions) this.byExt.set(i.toLowerCase(), n);
  }
  handlerFor(a) {
    return this.byExt.get(Fl(a));
  }
  iconFor(a) {
    var n;
    return ((n = this.handlerFor(a)) == null ? void 0 : n.icon) ?? Tl;
  }
  /** languageFor returns the built-in EditorLanguage for a path, or "text" when
   * the handler has none / a custom extension factory (see extensionFor). */
  languageFor(a) {
    var i;
    const n = (i = this.handlerFor(a)) == null ? void 0 : i.language;
    return typeof n == "string" ? n : "text";
  }
  /** extensionFor returns a custom CodeMirror Extension factory when the handler
   * provides one, else undefined (use languageFor instead). */
  extensionFor(a) {
    var i;
    const n = (i = this.handlerFor(a)) == null ? void 0 : i.language;
    return typeof n == "function" ? n : void 0;
  }
}
const _ = Symbol("gad-ide-controller"), Jl = /* @__PURE__ */ new Set(["write", "mkfile", "mkdir", "del", "rename", "upload", "fetchUrl"]);
function Xl(e, a) {
  return new Proxy(e, {
    get(n, i, l) {
      const o = Reflect.get(n, i, l);
      return typeof o != "function" || !Jl.has(String(i)) ? o : (...s) => {
        const p = o.apply(n, s);
        return Promise.resolve(p).then(a, a), p;
      };
    }
  });
}
function Ql(e, a, n, i = {}) {
  const l = v(0), o = Xl(e, () => l.value++), s = i.onReset, p = () => {
    var d;
    return ((d = i.getWords) == null ? void 0 : d.call(i)) ?? X;
  }, u = y(() => {
    var d;
    return ((d = i.getReadonly) == null ? void 0 : d.call(i)) ?? !1;
  }), r = (d) => y(() => {
    var c;
    return !u.value && (((c = a.actions) == null ? void 0 : c[d]) ?? !0);
  }), f = r("create"), I = r("edit"), h = r("rename"), G = r("move"), W = r("delete"), M = y(() => r("import").value && !!o.upload), P = new Ul(i.fileTypes), B = (d) => P.iconFor(d), z = y(() => {
    const d = /* @__PURE__ */ new Set(), c = (C) => {
      for (const k of (C == null ? void 0 : C.children) ?? [])
        k.dir ? c(k) : d.add(k.path);
    };
    return c(j.value), d;
  });
  function A(d) {
    return z.value.has(d);
  }
  const j = qa(null), T = Ce(/* @__PURE__ */ new Set()), N = v([]), E = v(-1), w = y(() => {
    var d;
    return ((d = N.value[E.value]) == null ? void 0 : d.path) ?? "";
  }), F = y({
    get: () => {
      var d;
      return ((d = N.value[E.value]) == null ? void 0 : d.content) ?? "";
    },
    set: (d) => {
      const c = N.value[E.value];
      c && (c.content = d);
    }
  }), ye = y(() => {
    const d = [], c = (C, k) => {
      for (const Y of C.children ?? [])
        d.push({ node: Y, depth: k }), Y.dir && T.has(Y.path) && c(Y, k + 1);
    };
    return j.value && c(j.value, 0), d;
  }), ee = v(!1);
  async function q() {
    j.value = await o.tree(ee.value);
    const d = w.value.split("/");
    for (let c = 1; c < d.length; c++) T.add(d.slice(0, c).join("/"));
  }
  async function Ve() {
    ee.value = !ee.value, await q();
  }
  async function ie(d) {
    const c = N.value.findIndex((k) => k.path === d);
    if (c >= 0) {
      E.value = c;
      return;
    }
    const C = We(d) ? "" : (await o.read(d)).content;
    N.value.push({ path: d, content: C, saved: C }), E.value = N.value.length - 1;
  }
  const da = (d) => {
    const c = N.value.find((C) => C.path === d);
    return !!c && c.content !== c.saved;
  };
  function Le(d) {
    d >= 0 && d < N.value.length && (E.value = d);
  }
  function ae(d) {
    d < 0 || d >= N.value.length || (N.value.splice(d, 1), E.value >= N.value.length ? E.value = N.value.length - 1 : E.value > d && E.value--);
  }
  function Ye(d) {
    T.has(d) ? T.delete(d) : T.add(d);
  }
  function Be(d) {
    return T.has(d);
  }
  const Ie = y(() => {
    var d;
    return ((d = i.getAutosave) == null ? void 0 : d.call(i)) ?? !1;
  });
  async function ra(d) {
    !I.value || d.content === d.saved || (await o.write(d.path, d.content), d.saved = d.content);
  }
  const Te = () => Promise.all(N.value.map(ra));
  V(F, (d) => {
    if (Ie.value !== !0 || !I.value) return;
    const c = N.value[E.value];
    c && (o.write(c.path, d), c.saved = d);
  });
  let ge = null;
  V(
    Ie,
    (d) => {
      ge && (clearInterval(ge), ge = null), typeof d == "number" && d > 0 && (ge = setInterval(() => void Te(), d));
    },
    { immediate: !0 }
  ), Si(() => {
    ge && clearInterval(ge);
  });
  function ke() {
    const d = w.value.lastIndexOf("/");
    return d === -1 ? "" : w.value.slice(0, d + 1);
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
  async function me() {
    const d = w.value;
    if (!d || !await L(p().deleteFile, Ee(p().deleteConfirm, d))) return;
    await o.del(d);
    const c = N.value.findIndex((C) => C.path === d);
    c >= 0 && ae(c), await q();
  }
  async function He() {
    const d = w.value;
    if (!d) return;
    const c = d.lastIndexOf("/"), C = c === -1 ? "" : d.slice(0, c + 1), k = await Z(p().rename, p().newName, d.slice(c + 1));
    !k || C + k === d || (await o.rename(d, C + k), Na(d, C + k), await q());
  }
  const sa = v(null);
  async function Bt() {
    const d = w.value;
    if (!d) return;
    const c = await new Promise((k) => sa.value = { path: d, resolve: k });
    if (sa.value = null, c === null) return;
    const C = (c ? c.replace(/\/$/, "") + "/" : "") + d.slice(d.lastIndexOf("/") + 1);
    C !== d && (await o.rename(d, C), Na(d, C), await q());
  }
  function Na(d, c) {
    const C = N.value.find((k) => k.path === d);
    C && (C.path = c);
  }
  async function kt() {
    if (!s || !await L(p().resetWorkspace, p().resetConfirm)) return;
    await s(), N.value = [], E.value = -1, await q();
    const d = je(j.value);
    d && await ie(d);
  }
  const jt = y(() => !!s);
  async function ua(d, c) {
    if (!d.length) return;
    const C = (c ?? ke().replace(/\/$/, "")).replace(/\/$/, ""), k = C ? C + "/" : "", Y = d.map((O) => ({ ...O, path: k + O.path }));
    if (i.onUpload) await i.onUpload(Y, C);
    else if (M.value)
      for (const O of Y) O.archive || await o.upload([O]);
    else for (const O of Y) !O.archive && !O.bytes && await o.write(O.path, O.content);
    await q();
    const $ = Y.find((O) => !O.archive);
    $ && await ie($.path);
  }
  const Ht = v(!1), Pe = v(0);
  function Wa(d) {
    const c = d.toLowerCase();
    if (c.endsWith(".zip")) return "zip";
    if (c.endsWith(".tar.gz") || c.endsWith(".tgz")) return "tar.gz";
    if (c.endsWith(".tar")) return "tar";
  }
  async function Dt(d, c, C = "") {
    if (Pe.value = 0, M.value && !i.onUpload) {
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
      const Y = await Vl(k, (Qe) => Pe.value = Qe), $ = decodeURIComponent(new URL(d, location.href).pathname.split("/").pop() || "download"), O = Wa($);
      if (c && O) {
        let Qe = "";
        for (let Sa = 0; Sa < Y.length; Sa++) Qe += String.fromCharCode(Y[Sa]);
        await ua([{ path: $, content: "", archive: O, bytes: btoa(Qe) }], C);
      } else
        await ua([St($, Y)], C);
    } finally {
      Pe.value = 0;
    }
  }
  const ca = (d) => {
    const c = vt(d);
    return c === "gadx" ? "gadx" : c === "gadt" ? "gadTemplate" : "gad";
  }, zt = (d, c) => o.diagnose(d, c), le = v(!1), Fe = v(null), Ea = () => ({ source: F.value, path: w.value, args: [] });
  async function wa(d) {
    const c = d ?? Ea();
    le.value = !0;
    try {
      Fe.value = await o.run({
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
  async function Nt() {
    le.value = !0;
    try {
      const d = await o.format(F.value);
      d.ok ? F.value = d.source : Fe.value = { ok: !1, stdout: "", stderr: "", result: "", diagnostics: d.diagnostics };
    } finally {
      le.value = !1;
    }
  }
  const Ia = qa(null);
  function Wt(d) {
    Ia.value = d;
  }
  async function Et() {
    const d = N.value[E.value];
    !d || We(d.path) || !I.value || (await o.write(d.path, d.content), d.saved = d.content);
  }
  async function wt(d) {
    const c = N.value.find((k) => k.path === d);
    if (!c || c.content !== c.saved || We(d)) return;
    const C = (await o.read(d)).content;
    c.content === c.saved && (c.content = C, c.saved = C);
  }
  async function Rt() {
    const d = N.value[E.value];
    if (!d) return;
    if (We(d.path)) {
      ma.value++;
      return;
    }
    const c = (await o.read(d.path)).content;
    d.content = c, d.saved = c;
  }
  const De = v(i.initialFontSize ?? 13);
  function ga(d) {
    var c;
    De.value = Math.max(8, Math.min(32, Math.round(d))), (c = i.onFontSize) == null || c.call(i, De.value);
  }
  const Vt = () => ga(De.value + 1), Lt = () => ga(De.value - 1);
  function Yt() {
    var d;
    (d = Ia.value) == null || d.undo();
  }
  function Tt() {
    var d;
    (d = Ia.value) == null || d.redo();
  }
  const Ra = v(""), Ft = y(() => We(w.value)), ma = v(0), Ut = (d) => o.rawUrl ? o.rawUrl(d) + (ma.value ? "&v=" + ma.value : "") : "", Va = v("none");
  let La = 0;
  async function Ya() {
    const d = ++La, c = ft(w.value);
    let C;
    if (c === "gad" && F.value.trim()) {
      const k = await o.doc(F.value);
      C = it(k);
    } else c === "gad" ? C = it([]) : C = zl(c, F.value);
    d === La && (Va.value = c, Ra.value = C);
  }
  const pe = v(null), ve = v(null), pa = v(""), va = Ce({}), be = Ce({});
  function he(d) {
    return d && va[d] || [];
  }
  function Ta(d) {
    return d && be[d] || {};
  }
  function Jt() {
    const d = {};
    for (const [c, C] of Object.entries(va)) C.length && (d[c] = C);
    return d;
  }
  function Ue(d, c) {
    const C = [...new Set(c)].sort((Y, $) => Y - $);
    va[d] = C;
    const k = be[d];
    if (k)
      for (const Y of Object.keys(k)) C.includes(Number(Y)) || delete k[Number(Y)];
  }
  function Xt(d, c, C) {
    be[d] || (be[d] = {}), be[d][c] = { ...be[d][c] || {}, ...C }, he(d).includes(c) || Ue(d, [...he(d), c]);
  }
  function Qt(d, c) {
    Ue(d, he(d).filter((C) => C !== c));
  }
  function Ot(d) {
    const c = Ta(d);
    return he(d).map((C) => {
      var k, Y;
      return { line: C, disabled: (k = c[C]) == null ? void 0 : k.disabled, condition: (Y = c[C]) == null ? void 0 : Y.condition };
    });
  }
  const Kt = y({
    get: () => he(w.value),
    set: (d) => Ue(w.value, d)
  }), fa = v({ line: 0, seq: 0 });
  function Fa(d) {
    fa.value = { line: d, seq: fa.value.seq + 1 };
  }
  async function _t(d, c) {
    d && d !== w.value && await ie(d), Fa(c);
  }
  const Ua = v(null);
  function qt(d, c) {
    Ua.value = { path: d, line: c };
  }
  const $t = y(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.state) === "stopped" ? ve.value.line ?? 0 : 0;
  }), ei = y(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.column) ?? 1;
  }), ai = y(() => {
    var d;
    return ((d = ve.value) == null ? void 0 : d.state) === "stopped";
  }), ti = y(() => {
    var c;
    const d = /* @__PURE__ */ new Map();
    for (const C of ((c = ve.value) == null ? void 0 : c.locals) ?? []) d.set(C.name, C);
    return d;
  }), ii = () => ti.value;
  function Ja(d) {
    ve.value = d, d.output && (pa.value += d.output), d.state === "terminated" || d.state === "error" ? pe.value = null : d.session && (pe.value = d.session);
  }
  async function Xa(d) {
    const c = d ?? Ea();
    le.value = !0, pa.value = "", ve.value = null, Fe.value = null;
    try {
      Ja(
        await o.dbgStart({
          source: c.source,
          path: c.path,
          sourceType: ca(c.path),
          args: c.args,
          breakpoints: he(c.path),
          breakpointSpecs: Ot(c.path),
          stopOnEntry: !1
        })
      );
    } finally {
      le.value = !1;
    }
  }
  async function li(d) {
    if (pe.value) {
      le.value = !0;
      try {
        Ja(await o.dbgCmd(pe.value, d));
      } finally {
        le.value = !1;
      }
    }
  }
  const ha = v(""), Qa = v("");
  async function ni() {
    if (!pe.value || !ha.value.trim()) return;
    const d = await o.dbgEval(pe.value, ha.value, !0);
    Qa.value = d.ok ? d.value ?? "" : "error: " + (d.error ?? "");
  }
  const oi = async (d) => {
    const c = await o.inspect({
      expr: d,
      session: pe.value ?? void 0,
      source: F.value,
      path: w.value,
      sourceType: Oa.value
    });
    return c.ok ? c.inspect ?? null : null;
  }, Oa = y(() => ca(w.value)), Je = y(() => {
    var d;
    return ((d = i.getRunProfiles) == null ? void 0 : d.call(i)) ?? [];
  }), Xe = y(() => {
    var d;
    return ((d = i.getRunMode) == null ? void 0 : d.call(i)) ?? "debug";
  }), ze = v(null), di = v(!1), Ca = y(() => Je.value.find((d) => d.name === ze.value) ?? null), ri = y(() => {
    var d;
    return ((d = Ca.value) == null ? void 0 : d.name) ?? p().currentFile;
  }), si = y(() => Xe.value === "run" || Xe.value === "debug"), ui = y(() => Xe.value === "debug");
  async function Ka() {
    const d = Ca.value;
    return d ? { source: d.path === w.value ? F.value : (await o.read(d.path)).content, path: d.path, args: d.args, tagEncode: d.tagEncode } : { source: F.value, path: w.value, args: [] };
  }
  async function ci() {
    await wa(await Ka());
  }
  async function Ii() {
    await Xa(await Ka());
  }
  function gi(d) {
    var c;
    (c = i.emitRunProfiles) == null || c.call(i, [...Je.value.filter((C) => C.name !== d.name), d]), ze.value = d.name;
  }
  function mi(d) {
    var c;
    (c = i.emitRunProfiles) == null || c.call(i, Je.value.filter((C) => C.name !== d)), ze.value === d && (ze.value = null);
  }
  const _a = v(0);
  function pi() {
    Ya(), _a.value++;
  }
  const vi = v(!1);
  async function fi() {
    await q();
    const d = a.openFile || je(j.value);
    d && await ie(d);
  }
  return {
    api: o,
    dark: n,
    writes: l,
    refreshFile: wt,
    workspace: a,
    // tree
    tree: j,
    rows: ye,
    openPath: w,
    source: F,
    isExpanded: Be,
    toggleDir: Ye,
    openFile: ie,
    tabs: N,
    active: E,
    activateTab: Le,
    closeTab: ae,
    isDirty: da,
    autosave: Ie,
    tabNameMax: y(() => {
      var d;
      return ((d = i.getTabNameMax) == null ? void 0 : d.call(i)) ?? 25;
    }),
    showHidden: ee,
    toggleHidden: Ve,
    newFile: J,
    newDir: U,
    removeOpen: me,
    reset: kt,
    canReset: jt,
    upload: ua,
    uploadUrl: Dt,
    urlDialog: Ht,
    uploadProgress: Pe,
    pathExists: A,
    archiveKind: Wa,
    readonly: u,
    fileTypes: P,
    iconFor: B,
    canUpload: y(() => (!!i.onUpload || M.value) && !u.value),
    canCreate: f,
    canRename: h,
    canMove: G,
    canDelete: W,
    renameOpen: He,
    moveOpen: Bt,
    moveReq: sa,
    // an archive is extracted only by a host's onUpload
    canExtract: y(() => !!i.onUpload),
    canEdit: I,
    promptReq: g,
    confirmReq: m,
    diagnose: zt,
    // run/format/doc
    busy: le,
    runRes: Fe,
    run: wa,
    format: Nt,
    docHtml: Ra,
    docKind: Va,
    refreshDoc: Ya,
    isImage: Ft,
    imageUrl: Ut,
    // editor actions
    registerEditor: Wt,
    save: Et,
    reload: Rt,
    undo: Yt,
    redo: Tt,
    fontSize: De,
    incFont: Vt,
    decFont: Lt,
    setFontSize: ga,
    // run/debug profiles + gating
    runProfiles: Je,
    runMode: Xe,
    activeProfile: ze,
    profileDialog: di,
    activeProfileObj: Ca,
    runLabel: ri,
    canRun: si,
    canDebug: ui,
    runActive: ci,
    debugActive: Ii,
    addProfile: gi,
    deleteProfile: mi,
    docRequest: _a,
    requestDocs: pi,
    settingsOpen: vi,
    // debug
    session: pe,
    snap: ve,
    dbgOutput: pa,
    breakpoints: Kt,
    debugLine: $t,
    debugColumn: ei,
    stopped: ai,
    getLocals: ii,
    debugStart: Xa,
    debugCmd: li,
    evalExpr: ha,
    evalOut: Qa,
    doEval: ni,
    inspectFn: oi,
    dialect: Oa,
    // breakpoints
    bpFor: he,
    bpMetaFor: Ta,
    allBreakpoints: Jt,
    setFileBreakpoints: Ue,
    setBpMeta: Xt,
    removeBreakpoint: Qt,
    gotoTarget: fa,
    goto: Fa,
    gotoFileLine: _t,
    bpDialog: Ua,
    openBpCondition: qt,
    init: fi
  };
}
const x = Oi, oa = Qi, xt = fl, oe = el, de = il, re = tl, se = al, Ge = Il, Ol = pl, ue = $i, nt = nl, ne = ul, Kl = dl, Pa = rl, _l = sl, ql = ol, $l = vl, ce = ll, yt = cl, Ze = _i, Pt = Ki, K = qi, en = gl, qe = ml, bt = /* @__PURE__ */ D({
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
      const a = (e.node.children ?? []).filter((n) => n.dir);
      return t(Se, null, [t("div", {
        class: ["dirtree-row", {
          "dirtree-row--active": e.selected === e.node.path
        }],
        style: {
          paddingLeft: 6 + e.depth * 14 + "px"
        },
        onClick: () => e.onSelect(e.node.path)
      }, [t(ne, {
        size: "14",
        class: "mr-1"
      }, {
        default: () => [S("mdi-folder-outline")]
      }), t("span", {
        class: "pnl-ellipsis"
      }, [e.node.name])]), a.map((n) => t(bt, {
        key: n.path,
        node: n,
        selected: e.selected,
        depth: e.depth + 1,
        onSelect: e.onSelect
      }, null))]);
    };
  }
}), Ha = /* @__PURE__ */ D({
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
      return t("div", {
        class: "dirtree"
      }, [t("div", {
        class: ["dirtree-row", {
          "dirtree-row--active": e.selected === ""
        }],
        onClick: () => e.onSelect("")
      }, [t(ne, {
        size: "14",
        class: "mr-1"
      }, {
        default: () => [S("mdi-folder-home-outline")]
      }), t("span", null, [S("/ (root)")])]), (((a = e.root) == null ? void 0 : a.children) ?? []).filter((n) => n.dir).map((n) => t(bt, {
        key: n.path,
        node: n,
        selected: e.selected,
        depth: 1,
        onSelect: e.onSelect
      }, null))]);
    };
  }
}), an = (e) => e.slice(e.lastIndexOf("/") + 1), ot = (e, a) => e ? e + "/" + a : a, tn = /* @__PURE__ */ D({
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
    const n = H(_), i = H(Q, y(() => X)), l = v(""), o = v(""), s = v(!0), p = v(!1), u = v(!1), r = v(!1), f = y(() => e.raw.length === 1), I = y(() => f.value ? n.archiveKind(o.value) : void 0);
    V(() => e.modelValue, (P) => {
      P && (l.value = e.initialDir, o.value = f.value ? an(e.raw[0].path) : "", s.value = !0, p.value = !1, u.value = !1);
    });
    const h = y(() => f.value ? I.value && s.value ? [] : [ot(l.value, o.value)] : e.raw.map((P) => ot(l.value, P.path))), G = y(() => h.value.filter((P) => n.pathExists(P))), W = y(() => G.value.length > 0 && !p.value);
    async function M() {
      r.value = !0;
      try {
        let P;
        f.value && I.value && s.value ? P = [{
          path: o.value,
          content: "",
          archive: I.value,
          bytes: await wl(e.raw[0].file)
        }] : f.value ? P = [await lt(o.value, e.raw[0].file)] : P = await Promise.all(e.raw.map((B) => lt(B.path, B.file))), a("confirm", P, l.value), a("update:modelValue", !1);
      } finally {
        r.value = !1;
      }
    }
    return () => t(ue, b({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (P) => a("update:modelValue", P)
    }, {
      maxWidth: "520"
    }), {
      default: () => [t(oe, null, {
        default: () => [t(se, null, {
          default: () => [f.value ? i.value.uploadFile : Ee(i.value.uploadNFiles, e.raw.length)]
        }), t(re, null, {
          default: () => [f.value ? t(K, b({
            modelValue: o.value
          }, {
            "onUpdate:modelValue": (P) => o.value = P
          }, {
            label: i.value.destinationName,
            density: "compact",
            variant: "outlined",
            hideDetails: !0,
            class: "mb-2"
          }), null) : t("div", {
            class: "text-caption mb-2"
          }, [e.raw.slice(0, 6).map((P) => t("div", {
            class: "pnl-ellipsis",
            key: P.path
          }, [P.path])), e.raw.length > 6 && t("div", {
            class: "text-medium-emphasis"
          }, [S("…and "), e.raw.length - 6, S(" more")])]), f.value && I.value && t(yt, b({
            modelValue: s.value
          }, {
            "onUpdate:modelValue": (P) => s.value = !!P
          }, {
            label: Ee(i.value.extractArchiveOf, I.value.toUpperCase()),
            density: "compact",
            hideDetails: !0,
            color: "primary",
            class: "mb-1"
          }), null), t("div", {
            class: "d-flex align-center",
            style: {
              gap: "4px"
            }
          }, [t(K, {
            modelValue: l.value || "/ (root)",
            label: i.value.targetFolder,
            density: "compact",
            variant: "outlined",
            readonly: !0,
            hideDetails: !0,
            onClick: () => u.value = !u.value
          }, null), t(x, {
            size: "small",
            variant: "text",
            icon: "mdi-folder-search-outline",
            title: i.value.chooseFolder,
            onClick: () => u.value = !u.value
          }, null)]), u.value && t("div", {
            class: "dirtree-box mt-1"
          }, [t(Ha, {
            root: n.tree.value,
            selected: l.value,
            onSelect: (P) => {
              l.value = P, u.value = !1;
            }
          }, null)]), G.value.length > 0 && t(Ge, b({
            modelValue: p.value
          }, {
            "onUpdate:modelValue": (P) => p.value = !!P
          }, {
            label: G.value.length === 1 ? Ee(i.value.replaceOne, G.value[0]) : Ee(i.value.replaceMany, G.value.length),
            density: "compact",
            hideDetails: !0,
            color: "error",
            class: "mt-2"
          }), null)]
        }), t(de, null, {
          default: () => [t(ce, null, null), t(x, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [i.value.cancel]
          }), t(x, {
            color: "primary",
            loading: r.value,
            disabled: W.value || f.value && !o.value.trim(),
            onClick: M
          }, {
            default: () => [i.value.upload]
          })]
        })]
      })]
    });
  }
}), ln = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjRDk3NzA2OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNGRUYzQzc7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+Cjwvc3ZnPgo=", nn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjMDZCNkQ0OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNFMEY3RkE7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAuYmFkZ2UtcmVkICAgeyBmaWxsOiAjRTUzOTM1OyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBnbHlwaCAqLwogICAgICAgICAgICAuYmFkZ2Utd2hpdGUgeyBmaWxsOiAjRkZGRkZGOyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBvdXRsaW5lL2dhcCAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CiAgPCEtLSBHQURUICh0ZW1wbGF0ZSkgYmFkZ2U6IHJlZCAieyIgKyB3aGl0ZSBib3JkZXIvZ2FwICgxcHg7IDJweCBsZWZ0KSwgYm90dG9tLXJpZ2h0LiAtLT4KICA8cmVjdCB4PSIxMiIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEyIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMiIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEyIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTIiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTQiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTUiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTUiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNSIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjE0IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTQiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjEzIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMSIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgPHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogIDxyZWN0IHg9IjExIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxNSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjE1IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgPHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICA8cmVjdCB4PSIxNCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogIDxyZWN0IHg9IjEzIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+Cjwvc3ZnPgo=", on = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjMDZCNkQ0OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNFMEY3RkE7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAuYmFkZ2UtcmVkICAgeyBmaWxsOiAjRTUzOTM1OyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBnbHlwaCAqLwogICAgICAgICAgICAuYmFkZ2Utd2hpdGUgeyBmaWxsOiAjRkZGRkZGOyB9IC8qIEdBRFQvR0FEWCBiYWRnZSBvdXRsaW5lL2dhcCAqLwogICAgICAgIDwvc3R5bGU+CiAgICA8L2RlZnM+CgogICAgPCEtLSBDSElGUkVTICh0b3BvLCB5PTApIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMCIgd2lkdGg9IjIiIGhlaWdodD0iNCIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8cmVjdCB4PSI5IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjEiIHdpZHRoPSIxIiBoZWlnaHQ9IjMiIGNsYXNzPSJob3JuLXNpbHZlciIgLz4KCiAgICA8IS0tIE9SRUxIQVMgTEFURVJBSVMgLS0+CiAgICA8cmVjdCB4PSIxIiB5PSI1IiB3aWR0aD0iMyIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPHJlY3QgeD0iMTIiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjIiIGhlaWdodD0iMSIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBDQUJFw4dBIEFGVU5JTEFEQSBQQVJBIEJBSVhPIChmb2NpbmhvIGRlIGdhemVsYSwgeT00IC0+IDE2KSAtLT4KICAgIDxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxMCIgaGVpZ2h0PSI3IiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSB0b3BvIGxhcmdvIChvbGhvcykgLS0+CiAgICA8cmVjdCB4PSI0IiB5PSIxMSIgd2lkdGg9IjgiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gYWZ1bmlsYSAxIC0tPgogICAgPHJlY3QgeD0iNSIgeT0iMTMiIHdpZHRoPSI2IiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIGZvY2luaG8gLS0+CgogICAgPHJlY3QgeD0iNCIgeT0iNSIgd2lkdGg9IjgiIGhlaWdodD0iNiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSIxMSIgd2lkdGg9IjYiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMyIgd2lkdGg9IjQiIGhlaWdodD0iMiIgY2xhc3M9ImZ1ci1vcmFuZ2UiIC8+CgogICAgPCEtLSBMSVNUUkEgRkFDSUFMIENFTlRSQUwgLS0+CiAgICA8cmVjdCB4PSI3IiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxMCIgY2xhc3M9ImZ1ci1saWdodCIgLz4KICAgIDxyZWN0IHg9IjciIHk9IjE0IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIE5hcml6IC0tPgoKICAgIDwhLS0gT0xIT1MgR0lHQU5URVMgKEVzdGlsbyBNYXNjb3RlIGRvIEdvKSAtLT4KICAgIDwhLS0gT2xobyBFc3F1ZXJkbyAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSI0IiB5PSI2IiB3aWR0aD0iMiIgaGVpZ2h0PSIyIiBjbGFzcz0iZXllLXdoaXRlIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CgogICAgPCEtLSBPbGhvIERpcmVpdG8gLS0+CiAgICA8cmVjdCB4PSI5IiB5PSI2IiB3aWR0aD0iMyIgaGVpZ2h0PSIzIiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhc2UtZGFyayIgLz4gPCEtLSBQdXBpbGEgLS0+CiAgICA8IS0tIEdBRFggKHB1ZykgYmFkZ2U6IDFweCByZWQgQCArIDFweCB3aGl0ZSBib3JkZXIvZ2FwLCBib3R0b20tcmlnaHQuIC0tPgogICAgPHJlY3QgeD0iOSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxNSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTQiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNSIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTUiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNSIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2Utd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjE0IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgogICAgPHJlY3QgeD0iMTQiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFkZ2UtcmVkIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYWRnZS1yZWQiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9ImJhZGdlLXJlZCIvPgo8L3N2Zz4K", dn = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgogICAgPGRlZnM+CiAgICAgICAgPHN0eWxlPgogICAgICAgICAgICAuYmFzZS1kYXJrICB7IGZpbGw6ICMwRDFCMkE7IH0gLyogQ29udG9ybm9zIGdyb3Nzb3MgcGFyYSBnYXJhbnRpciBjb250cmFzdGUgKi8KICAgICAgICAgICAgLmZ1ci1vcmFuZ2UgeyBmaWxsOiAjRDk3NzA2OyB9IC8qIFBlbGUgcHJpbmNpcGFsIGRhIGdhemVsYSAqLwogICAgICAgICAgICAuZnVyLWxpZ2h0ICB7IGZpbGw6ICNGRUYzQzc7IH0gLyogRmFpeGEgY2VudHJhbCBlIG9yZWxoYXMgKi8KICAgICAgICAgICAgLmhvcm4tc2lsdmVyeyBmaWxsOiAjQkRDM0M3OyB9IC8qIENoaWZyZXMgY2xhcm9zIGUgdmlzw612ZWlzICovCiAgICAgICAgICAgIC5leWUtd2hpdGUgIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiBPbGhvcyBncmFuZGVzIGVzdGlsbyBHbyAqLwogICAgICAgICAgICAudGVzdC1yZWQgICB7IGZpbGw6ICNEQjU4NjA7IH0gLyogdGVzdCBiYWRnZSBsZWZ0ICovCiAgICAgICAgICAgIC50ZXN0LWdyZWVuIHsgZmlsbDogIzU5QTg2OTsgfSAvKiB0ZXN0IGJhZGdlIHJpZ2h0ICovCiAgICAgICAgICAgIC50ZXN0LXdoaXRlIHsgZmlsbDogI0ZGRkZGRjsgfSAvKiB0ZXN0IGJhZGdlIGRpYW1vbmQvZ2FwICovCiAgICAgICAgPC9zdHlsZT4KICAgIDwvZGVmcz4KCiAgICA8IS0tIENISUZSRVMgKHRvcG8sIHk9MCkgLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI0IiBjbGFzcz0iYmFzZS1kYXJrIiAvPgogICAgPHJlY3QgeD0iNSIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMyIgY2xhc3M9Imhvcm4tc2lsdmVyIiAvPgoKICAgIDxyZWN0IHg9IjkiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjQiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMSIgd2lkdGg9IjEiIGhlaWdodD0iMyIgY2xhc3M9Imhvcm4tc2lsdmVyIiAvPgoKICAgIDwhLS0gT1JFTEhBUyBMQVRFUkFJUyAtLT4KICAgIDxyZWN0IHg9IjEiIHk9IjUiIHdpZHRoPSIzIiBoZWlnaHQ9IjIiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIyIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8cmVjdCB4PSIxMiIgeT0iNSIgd2lkdGg9IjMiIGhlaWdodD0iMiIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI1IiB3aWR0aD0iMiIgaGVpZ2h0PSIxIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8IS0tIENBQkXDh0EgQUZVTklMQURBIFBBUkEgQkFJWE8gKGZvY2luaG8gZGUgZ2F6ZWxhLCB5PTQgLT4gMTYpIC0tPgogICAgPHJlY3QgeD0iMyIgeT0iNCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjciIGNsYXNzPSJiYXNlLWRhcmsiIC8+ICA8IS0tIHRvcG8gbGFyZ28gKG9saG9zKSAtLT4KICAgIDxyZWN0IHg9IjQiIHk9IjExIiB3aWR0aD0iOCIgaGVpZ2h0PSIyIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiAgPCEtLSBhZnVuaWxhIDEgLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIxMyIgd2lkdGg9IjYiIGhlaWdodD0iMyIgY2xhc3M9ImJhc2UtZGFyayIgLz4gIDwhLS0gZm9jaW5obyAtLT4KCiAgICA8cmVjdCB4PSI0IiB5PSI1IiB3aWR0aD0iOCIgaGVpZ2h0PSI2IiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KICAgIDxyZWN0IHg9IjUiIHk9IjExIiB3aWR0aD0iNiIgaGVpZ2h0PSIyIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KICAgIDxyZWN0IHg9IjYiIHk9IjEzIiB3aWR0aD0iNCIgaGVpZ2h0PSIyIiBjbGFzcz0iZnVyLW9yYW5nZSIgLz4KCiAgICA8IS0tIExJU1RSQSBGQUNJQUwgQ0VOVFJBTCAtLT4KICAgIDxyZWN0IHg9IjciIHk9IjUiIHdpZHRoPSIyIiBoZWlnaHQ9IjEwIiBjbGFzcz0iZnVyLWxpZ2h0IiAvPgogICAgPHJlY3QgeD0iNyIgeT0iMTQiIHdpZHRoPSIyIiBoZWlnaHQ9IjEiIGNsYXNzPSJiYXNlLWRhcmsiIC8+IDwhLS0gTmFyaXogLS0+CgogICAgPCEtLSBPTEhPUyBHSUdBTlRFUyAoRXN0aWxvIE1hc2NvdGUgZG8gR28pIC0tPgogICAgPCEtLSBPbGhvIEVzcXVlcmRvIC0tPgogICAgPHJlY3QgeD0iNCIgeT0iNiIgd2lkdGg9IjMiIGhlaWdodD0iMyIgY2xhc3M9ImJhc2UtZGFyayIgLz4KICAgIDxyZWN0IHg9IjQiIHk9IjYiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGNsYXNzPSJleWUtd2hpdGUiIC8+CiAgICA8cmVjdCB4PSI1IiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIFB1cGlsYSAtLT4KCiAgICA8IS0tIE9saG8gRGlyZWl0byAtLT4KICAgIDxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIzIiBoZWlnaHQ9IjMiIGNsYXNzPSJiYXNlLWRhcmsiIC8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgY2xhc3M9ImV5ZS13aGl0ZSIgLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0iYmFzZS1kYXJrIiAvPiA8IS0tIFB1cGlsYSAtLT4KICAgIDwhLS0gVGVzdCBiYWRnZTogY3Jpc3AgcGl4ZWwgZGlhbW9uZCAocmVkIHw8IC8gZ3JlZW4gPnwpLCAxcHggd2hpdGUgYm9yZGVyK2dhcC4gLS0+CiAgICA8cmVjdCB4PSI1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjYiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI2IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjciIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI3IiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI4IiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSI5IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI1IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjYiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iNyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEwIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTAiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTMiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTQiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMCIgeT0iMTUiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iNiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC13aGl0ZSIvPgogICAgPHJlY3QgeD0iMTMiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXdoaXRlIi8+CiAgICA8cmVjdCB4PSIxNCIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjE1IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3Qtd2hpdGUiLz4KICAgIDxyZWN0IHg9IjYiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjciIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iNyIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iNyIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtcmVkIi8+CiAgICA8cmVjdCB4PSI4IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjgiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LXJlZCIvPgogICAgPHJlY3QgeD0iOSIgeT0iOCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtcmVkIi8+CiAgICA8cmVjdCB4PSI5IiB5PSI5IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjExIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEyIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjEzIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1yZWQiLz4KICAgIDxyZWN0IHg9IjExIiB5PSI3IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1ncmVlbiIvPgogICAgPHJlY3QgeD0iMTEiIHk9IjgiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMSIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMiIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjExIiB5PSIxMyIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEyIiB5PSI4IiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBjbGFzcz0idGVzdC1ncmVlbiIvPgogICAgPHJlY3QgeD0iMTIiIHk9IjkiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTEiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMiIgeT0iMTIiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGNsYXNzPSJ0ZXN0LWdyZWVuIi8+CiAgICA8cmVjdCB4PSIxMyIgeT0iOSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjEzIiB5PSIxMSIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KICAgIDxyZWN0IHg9IjE0IiB5PSIxMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgY2xhc3M9InRlc3QtZ3JlZW4iLz4KPC9zdmc+Cg==";
function dt(e) {
  const a = e.toLowerCase();
  if (a.endsWith("_test.gad")) return dn;
  if (a.endsWith(".gadx")) return on;
  if (a.endsWith(".gadt")) return nn;
  if (a.endsWith(".gad")) return ln;
}
const rn = /* @__PURE__ */ D({
  name: "PanelExplorer",
  setup() {
    const e = H(_), a = H(Q, y(() => X)), n = v(), i = v(null), l = v(!1), o = v([]), s = v(""), p = (I) => {
      const h = I.lastIndexOf("/");
      return h === -1 ? "" : I.slice(0, h);
    };
    function u(I, h) {
      I.length && (o.value = I, s.value = h, l.value = !0);
    }
    async function r(I, h) {
      i.value = null, !(!e.canUpload.value || !I.dataTransfer) && u(await Nl(I.dataTransfer), h);
    }
    async function f(I) {
      const h = I.target, G = ht(h.files);
      h.value = "", u(G, "");
    }
    return () => t("div", {
      class: "pnl"
    }, [t("div", {
      class: "pnl-head"
    }, [t("span", {
      class: "text-caption font-weight-medium"
    }, [a.value.explorer.toUpperCase()]), t("div", null, [e.canCreate.value && t(Se, null, [t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-file-plus-outline",
      title: a.value.newFile,
      onClick: () => e.newFile()
    }, null), t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-folder-plus-outline",
      title: a.value.newFolder,
      onClick: () => e.newDir()
    }, null)]), e.canUpload.value && t(Se, null, [t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-upload-outline",
      title: a.value.uploadFiles,
      onClick: () => {
        var I;
        return (I = n.value) == null ? void 0 : I.click();
      }
    }, null), t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-link-variant",
      title: a.value.importFromUrl,
      onClick: () => e.urlDialog.value = !0
    }, null)]), e.canRename.value && t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-rename-outline",
      title: a.value.renameOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.renameOpen()
    }, null), e.canMove.value && t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-file-move-outline",
      title: a.value.moveOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.moveOpen()
    }, null), e.canDelete.value && t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-delete-outline",
      title: a.value.deleteOpenFile,
      disabled: !e.openPath.value,
      onClick: () => e.removeOpen()
    }, null), t(x, {
      size: "x-small",
      variant: "text",
      icon: e.showHidden.value ? "mdi-eye-off-outline" : "mdi-eye-outline",
      title: e.showHidden.value ? a.value.hideHidden : a.value.showHidden,
      onClick: () => e.toggleHidden()
    }, null), e.canReset.value && e.canEdit.value && t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-backup-restore",
      title: a.value.resetChanges,
      onClick: () => e.reset()
    }, null)])]), t("div", {
      class: ["pnl-body", {
        "pnl-body--drop": e.canUpload.value && i.value === ""
      }],
      onDragover: e.canUpload.value ? (I) => {
        I.preventDefault(), i.value = "";
      } : void 0,
      onDragleave: e.canUpload.value ? () => i.value = null : void 0,
      onDrop: e.canUpload.value ? (I) => {
        I.preventDefault(), r(I, "");
      } : void 0
    }, [e.rows.value.map((I) => {
      const h = I.node.dir ? I.node.path : p(I.node.path);
      return t("div", {
        key: I.node.path,
        class: ["pnl-row", {
          "pnl-row--active": I.node.path === e.openPath.value,
          "pnl-row--drop": e.canUpload.value && i.value === h
        }],
        style: {
          paddingLeft: 6 + I.depth * 14 + "px"
        },
        onClick: () => I.node.dir ? e.toggleDir(I.node.path) : e.openFile(I.node.path),
        onDragover: e.canUpload.value ? (G) => {
          G.preventDefault(), G.stopPropagation(), i.value = h;
        } : void 0,
        onDrop: e.canUpload.value ? (G) => {
          G.preventDefault(), G.stopPropagation(), r(G, h);
        } : void 0
      }, [!I.node.dir && dt(I.node.path) ? t("img", {
        src: dt(I.node.path),
        alt: "",
        width: "16",
        height: "16",
        class: "mr-1",
        style: {
          imageRendering: "pixelated",
          verticalAlign: "-3px"
        }
      }, null) : t(ne, {
        size: "16",
        class: "mr-1"
      }, {
        default: () => [I.node.dir ? e.isExpanded(I.node.path) ? "mdi-folder-open-outline" : "mdi-folder-outline" : e.iconFor(I.node.path)]
      }), t("span", {
        class: "pnl-ellipsis"
      }, [I.node.name])]);
    }), e.canUpload.value && i.value !== null && t("div", {
      class: "pnl-drop-hint"
    }, [S("Drop into "), i.value || "/ (root)"])]), t("input", {
      ref: n,
      type: "file",
      multiple: !0,
      style: {
        display: "none"
      },
      onChange: f
    }, null), t(tn, b({
      modelValue: l.value
    }, {
      "onUpdate:modelValue": (I) => l.value = I
    }, {
      raw: o.value,
      initialDir: s.value,
      onConfirm: (I, h) => e.upload(I, h)
    }), null)]);
  }
}), Da = /* @__PURE__ */ D({
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
    const n = v();
    let i = null, l = !1;
    const o = () => e.language ?? vt(e.path);
    return Me(() => {
      i = new kl({
        parent: n.value,
        doc: e.modelValue,
        language: o(),
        dark: e.dark,
        readonly: e.readonly,
        fontSize: e.fontSize,
        diagnose: e.diagnose,
        getLocals: e.getLocals,
        customExtension: e.customExtension,
        onChange: (s) => {
          l = !0, a("update:modelValue", s), l = !1;
        },
        onBreakpointsChange: (s) => a("update:breakpoints", s),
        onBreakpointContext: (s) => {
          var p;
          return (p = e.onBreakpointContext) == null ? void 0 : p.call(e, s);
        },
        breakpoints: e.breakpointGutter
      }), e.breakpoints.length && i.setBreakpoints(e.breakpoints), e.debugLine && i.setDebugLine(e.debugLine, e.debugColumn), a("ready", i);
    }), Re(() => i == null ? void 0 : i.destroy()), V(() => e.modelValue, (s) => {
      i && !l && s !== i.getValue() && i.setValue(s);
    }), V([() => e.path, () => e.language, () => e.customExtension], () => i == null ? void 0 : i.setLanguage(o(), e.diagnose, e.customExtension)), V(() => e.dark, (s) => i == null ? void 0 : i.setDark(s)), V(() => e.readonly, (s) => i == null ? void 0 : i.setReadonly(s)), V(() => e.fontSize, (s) => i == null ? void 0 : i.setFontSize(s)), V(() => e.breakpoints, (s) => i == null ? void 0 : i.setBreakpoints(s ?? [])), V([() => e.debugLine, () => e.debugColumn], ([s, p]) => i == null ? void 0 : i.setDebugLine(s ?? 0, p ?? 1)), V(() => e.gotoSeq, () => {
      e.gotoLine && (i == null || i.gotoLine(e.gotoLine));
    }), () => t("div", {
      ref: n,
      class: "gad-editor"
    }, null);
  }
}), rt = (e) => e.slice(e.lastIndexOf("/") + 1), sn = (e, a) => e.length > a ? e.slice(0, a - 1) + "…" : e, un = /* @__PURE__ */ D({
  name: "PanelEditor",
  setup() {
    const e = H(_), a = H(Q, y(() => X)), n = () => !!e.openPath.value, i = (l, o, s, p = {}) => t(x, {
      size: "small",
      variant: "text",
      icon: l,
      title: o,
      disabled: p.disabled,
      color: p.color,
      onClick: s
    }, null);
    return () => {
      var l;
      return t("div", {
        class: "pnl"
      }, [e.tabs.value.length > 0 && t("div", {
        class: "editor-tabs"
      }, [e.tabs.value.map((o, s) => {
        const p = e.isDirty(o.path);
        return t("div", {
          key: o.path,
          class: ["editor-tab", {
            "editor-tab--active": s === e.active.value,
            "editor-tab--dirty": p
          }],
          title: rt(o.path) + (p ? " • modified" : ""),
          onClick: () => e.activateTab(s),
          onMousedown: (u) => {
            u.button === 1 && (u.preventDefault(), e.closeTab(s));
          }
        }, [t("span", {
          class: "editor-tab-name"
        }, [sn(rt(o.path), e.tabNameMax.value)]), t("span", {
          class: ["editor-tab-close", {
            "editor-tab-close--dirty": p
          }],
          title: a.value.close,
          onClick: (u) => {
            u.stopPropagation(), e.closeTab(s);
          }
        }, null)]);
      })]), t("div", {
        class: "pnl-toolbar"
      }, [e.canEdit.value && t(Se, null, [i("mdi-content-save-outline", a.value.save, () => e.save(), {
        disabled: !n() || e.isImage.value
      }), i("mdi-auto-fix", a.value.format, () => e.format(), {
        disabled: !n() || e.isImage.value
      })]), i("mdi-refresh", a.value.reloadFromDisk, () => e.reload(), {
        disabled: !n()
      }), e.canEdit.value && t(Se, null, [i("mdi-undo", a.value.undo, () => e.undo(), {
        disabled: !n() || e.isImage.value
      }), i("mdi-redo", a.value.redo, () => e.redo(), {
        disabled: !n() || e.isImage.value
      })]), e.canRun.value && t(nt, {
        vertical: !0,
        class: "mx-1"
      }, null), e.canRun.value && i("mdi-play", a.value.run, () => e.runActive(), {
        disabled: !n(),
        color: "success"
      }), e.canDebug.value && i(e.session.value ? "mdi-restart" : "mdi-bug", e.session.value ? a.value.restart : a.value.debug, () => e.debugActive(), {
        disabled: !n(),
        color: "warning"
      }), e.canRun.value && t(ql, {
        location: "bottom start"
      }, {
        activator: ({
          props: o
        }) => t(x, b({
          size: "small",
          variant: "text",
          class: "text-none",
          appendIcon: "mdi-chevron-down",
          disabled: !e.canRun.value
        }, o), {
          default: () => [e.runLabel.value]
        }),
        default: () => t(Kl, {
          density: "compact",
          minWidth: "220"
        }, {
          default: () => [t(Pa, {
            title: a.value.currentFile,
            active: e.activeProfile.value === null,
            onClick: () => e.activeProfile.value = null
          }, null), e.runProfiles.value.length > 0 && t(_l, null, {
            default: () => [a.value.profiles]
          }), e.runProfiles.value.map((o) => t(Pa, {
            key: o.name,
            title: o.name,
            subtitle: o.path + (o.args.length ? " " + o.args.join(" ") : ""),
            active: e.activeProfile.value === o.name,
            onClick: () => e.activeProfile.value = o.name
          }, {
            append: () => t(x, {
              size: "x-small",
              variant: "text",
              icon: "mdi-delete-outline",
              title: a.value.deleteProfile,
              onClick: (s) => {
                s.stopPropagation(), e.deleteProfile(o.name);
              }
            }, null)
          })), t(Pa, {
            title: a.value.newProfile,
            prependIcon: "mdi-plus",
            onClick: () => e.profileDialog.value = !0
          }, null)]
        })
      }), e.stopped.value && t(Se, null, [t(nt, {
        vertical: !0,
        class: "mx-1"
      }, null), i("mdi-play-outline", a.value.continueRun, () => e.debugCmd("continue"), {
        disabled: e.busy.value
      }), i("mdi-debug-step-over", a.value.stepOver, () => e.debugCmd("next"), {
        disabled: e.busy.value
      }), i("mdi-debug-step-into", a.value.stepIn, () => e.debugCmd("stepIn"), {
        disabled: e.busy.value
      }), i("mdi-debug-step-out", a.value.stepOut, () => e.debugCmd("stepOut"), {
        disabled: e.busy.value
      })]), ((l = e.snap.value) == null ? void 0 : l.state) === "stopped" && t("span", {
        class: "text-caption ml-2"
      }, [S("stopped ("), e.snap.value.reason, S(") @ "), e.snap.value.line, S(":"), e.snap.value.column])]), t("div", {
        class: "pnl-editor"
      }, [n() && e.isImage.value ? (
        // an image: shown whole, its aspect ratio kept
        t("div", {
          class: "gad-ide__image"
        }, [e.imageUrl(e.openPath.value) ? t("img", {
          src: e.imageUrl(e.openPath.value),
          alt: e.openPath.value
        }, null) : t("span", {
          class: "text-medium-emphasis"
        }, [a.value.noImagePreview])])
      ) : n() ? t(Da, b({
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
      }), null) : t("div", {
        class: "pa-4 text-medium-emphasis"
      }, [a.value.selectOrCreate])]), t("div", {
        class: "editor-statusbar"
      }, [t("span", {
        class: "editor-statusbar-path",
        title: e.openPath.value
      }, [e.openPath.value || a.value.noFile]), t("span", {
        class: "editor-statusbar-font"
      }, [t("button", {
        class: "fs-btn",
        title: a.value.decreaseFont,
        onClick: () => e.decFont()
      }, [S("A−")]), t("span", {
        class: "fs-val"
      }, [e.fontSize.value, S("px")]), t("button", {
        class: "fs-btn",
        title: a.value.increaseFont,
        onClick: () => e.incFont()
      }, [S("A+")])])])]);
    };
  }
}), cn = /* @__PURE__ */ D({
  name: "PanelCallStack",
  setup() {
    const e = H(_);
    return () => {
      var a, n, i;
      return t("div", {
        class: "pnl"
      }, [t("div", {
        class: "pnl-body"
      }, [t("ul", {
        class: "pnl-list"
      }, [(((a = e.snap.value) == null ? void 0 : a.frames) ?? []).map((l, o) => t("li", {
        key: o
      }, [l.name, S(" "), t("span", {
        class: "text-medium-emphasis"
      }, [S("@ "), l.line, S(":"), l.column])])), !((i = (n = e.snap.value) == null ? void 0 : n.frames) != null && i.length) && t("li", {
        class: "text-medium-emphasis"
      }, [S("(not paused)")])])])]);
    };
  }
}), Gt = /* @__PURE__ */ D({
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
    const a = v(!1), n = v(!1), i = v(null), l = v(e.type), o = v(e.value), s = v(e.expandable);
    async function p() {
      n.value = !0;
      const r = await e.inspect(e.expr);
      if (n.value = !1, !r) {
        i.value = [];
        return;
      }
      l.value = r.type, o.value = r.value, s.value = r.expandable, i.value = r.entries ?? [];
    }
    async function u() {
      s.value && (i.value === null && await p(), a.value = !a.value);
    }
    return Me(() => {
      e.root && p();
    }), () => t("div", {
      class: "ins-node"
    }, [t("div", {
      class: "ins-row",
      style: {
        paddingLeft: e.depth * 14 + "px"
      },
      onClick: u
    }, [t("span", {
      class: "ins-twist"
    }, [s.value ? a.value ? "▾" : "▸" : "·"]), t("span", {
      class: "ins-key"
    }, [e.label]), t("span", {
      class: "ins-type"
    }, [l.value]), t("span", {
      class: "ins-val"
    }, [o.value]), n.value && t("span", {
      class: "ins-load"
    }, [S("…")])]), a.value && i.value ? i.value.map((r) => t(Gt, {
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
}), In = /* @__PURE__ */ D({
  name: "PanelLocals",
  setup() {
    const e = H(_), a = H(Q, y(() => X)), n = v(!1), i = v(""), l = v(""), o = (s, p) => {
      s.trim() && (i.value = s, l.value = p, n.value = !0);
    };
    return () => {
      var s, p, u;
      return t("div", {
        class: "pnl"
      }, [t("div", {
        class: "pnl-body"
      }, [t("div", {
        class: "d-flex align-center",
        style: {
          gap: "4px"
        }
      }, [t(K, b({
        modelValue: e.evalExpr.value
      }, {
        "onUpdate:modelValue": (r) => e.evalExpr.value = r
      }, {
        label: a.value.evaluate,
        density: "compact",
        variant: "outlined",
        hideDetails: !0,
        onKeyup: (r) => r.key === "Enter" && e.doEval()
      }), null), t(x, {
        size: "small",
        variant: "tonal",
        disabled: !e.stopped.value,
        onClick: () => e.doEval()
      }, {
        default: () => [S("Eval")]
      }), t(x, {
        size: "x-small",
        variant: "text",
        icon: "mdi-file-tree-outline",
        title: a.value.inspectValue,
        disabled: !e.evalExpr.value.trim(),
        onClick: () => o(e.evalExpr.value, e.evalExpr.value)
      }, null)]), e.evalOut.value && t("pre", {
        class: "pnl-out"
      }, [e.evalOut.value]), t("div", {
        class: "text-caption text-medium-emphasis mt-2 mb-1"
      }, [a.value.locals.toUpperCase()]), t("ul", {
        class: "pnl-list"
      }, [(((s = e.snap.value) == null ? void 0 : s.locals) ?? []).map((r, f) => t("li", {
        key: f,
        class: "pnl-local"
      }, [t("span", {
        class: "pnl-ellipsis"
      }, [r.name, S(" = "), r.value, S(" "), t("span", {
        class: "text-medium-emphasis"
      }, [S("("), r.type, S(")")])]), t(x, {
        size: "x-small",
        variant: "text",
        icon: "mdi-file-tree-outline",
        title: a.value.inspectValue,
        onClick: () => o(r.name, r.name)
      }, null)])), !((u = (p = e.snap.value) == null ? void 0 : p.locals) != null && u.length) && t("li", {
        class: "text-medium-emphasis"
      }, [S("(none)")])])]), t(ue, b({
        modelValue: n.value
      }, {
        "onUpdate:modelValue": (r) => n.value = r
      }, {
        maxWidth: "720",
        scrollable: !0
      }), {
        default: () => [t(oe, null, {
          default: () => [t(se, {
            class: "text-subtitle-1"
          }, {
            default: () => [S("Inspect — "), l.value]
          }), t(re, {
            style: {
              maxHeight: "60vh",
              overflow: "auto"
            }
          }, {
            default: () => [n.value && t(Gt, {
              key: i.value,
              inspect: e.inspectFn,
              label: l.value,
              expr: i.value,
              root: !0
            }, null)]
          }), t(de, null, {
            default: () => [t(ce, null, null), t(x, {
              onClick: () => n.value = !1
            }, {
              default: () => [a.value.close]
            })]
          })]
        })]
      })]);
    };
  }
}), gn = /* @__PURE__ */ D({
  name: "PanelOutput",
  setup() {
    const e = H(_), a = H(Q, y(() => X));
    return () => {
      var i;
      const n = e.runRes.value;
      return t("div", {
        class: "pnl"
      }, [t("div", {
        class: "pnl-body"
      }, [n && t(Se, null, [n.stdout && t("pre", {
        class: "pnl-out"
      }, [n.stdout]), n.stderr && t("pre", {
        class: "pnl-out pnl-out--err"
      }, [n.stderr]), n.ok && n.result && t("div", {
        class: "pnl-return"
      }, [S("↩ "), n.result]), (n.diagnostics ?? []).map((l, o) => t("div", {
        key: o,
        class: "pnl-diag"
      }, [l.line, S(":"), l.column, S(" "), l.message]))]), e.dbgOutput.value && t("pre", {
        class: "pnl-out"
      }, [e.dbgOutput.value]), (((i = e.snap.value) == null ? void 0 : i.diagnostics) ?? []).map((l, o) => t("div", {
        key: "s" + o,
        class: "pnl-diag"
      }, [l.line, S(":"), l.column, S(" "), l.message])), !n && !e.dbgOutput.value && t("div", {
        class: "text-medium-emphasis"
      }, [a.value.runToSeeOutput])])]);
    };
  }
});
function mn(e) {
  const a = e.replace(/^\/+/, ""), n = a.lastIndexOf("/");
  return n === -1 ? "" : a.slice(0, n);
}
function Ma(e, a) {
  const n = e.replace(/\/+$/, "") + "/" + a.replace(/^\/+/, ""), i = /^([a-z][a-z0-9+.-]*:\/\/|\/\/|\/)/i.exec(n), l = i ? i[1] : "", o = [];
  for (const s of n.slice(l.length).split("/"))
    s === "" || s === "." || (s === ".." ? o.pop() : o.push(s));
  return l + o.join("/");
}
function pn(e, a, n) {
  return !e || e.startsWith("#") || e.startsWith("//") || /^[a-z][a-z0-9+.-]*:/i.test(e) ? null : e.startsWith("/") ? Ma(a, e) : Ma(n, e);
}
function na(e, a, n) {
  if (!e || typeof DOMParser > "u") return e;
  const i = n ? n(a) : "doc", l = mn(a), o = l ? Ma(i, l) : i, s = new DOMParser().parseFromString(e, "text/html");
  for (const p of ["src", "href"])
    s.querySelectorAll(`[${p}]`).forEach((u) => {
      const r = pn(u.getAttribute(p) ?? "", i, o);
      r !== null && u.setAttribute(p, r);
    });
  return s.body.innerHTML;
}
function vn(e) {
  return e.endsWith(".gadx") ? "gadx" : e.endsWith(".gadt") ? "gadTemplate" : "gad";
}
const fn = {
  gad: "DOCS",
  html: "HTML",
  markdown: "MARKDOWN",
  image: "IMAGE",
  none: "PREVIEW"
}, hn = /* @__PURE__ */ D({
  name: "PanelDocs",
  setup() {
    const e = H(_), a = H(Q, y(() => X)), n = v(""), i = v(""), l = v(!1);
    let o;
    async function s() {
      if (!(e.docKind.value !== "gad" || !e.openPath.value)) {
        l.value = !0;
        try {
          const r = await e.api.docGen(e.source.value, vn(e.openPath.value), "render-html");
          n.value = r.ok ? r.html ?? "" : "", i.value = r.ok ? "" : r.error ?? "";
        } catch (r) {
          n.value = "", i.value = r instanceof Error ? r.message : String(r);
        } finally {
          l.value = !1;
        }
      }
    }
    const p = async () => {
      await e.refreshDoc(), await s();
    };
    Me(p), Re(() => clearTimeout(o)), V(() => e.openPath.value, p), V(() => e.source.value, () => {
      e.docKind.value === "gad" && (clearTimeout(o), o = setTimeout(s, 500));
    });
    const u = (r) => {
      var h;
      const f = (h = r.target.closest("[data-src-pos]")) == null ? void 0 : h.getAttribute("data-src-pos");
      if (!f) return;
      const [I] = f.split(",").map(Number);
      I && e.goto(I);
    };
    return () => t("div", {
      class: "pnl"
    }, [t("div", {
      class: "pnl-head"
    }, [t("span", {
      class: "text-caption font-weight-medium"
    }, [fn[e.docKind.value]]), t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-refresh",
      title: a.value.refresh,
      loading: l.value,
      onClick: p
    }, null)]), e.docKind.value === "html" ? t("iframe", {
      class: "pnl-body gad-ide__preview-frame",
      sandbox: "",
      srcdoc: e.docHtml.value,
      title: e.openPath.value
    }, null) : e.docKind.value === "image" ? t("div", {
      class: "pnl-body gad-ide__image"
    }, [e.imageUrl(e.openPath.value) ? t("img", {
      src: e.imageUrl(e.openPath.value),
      alt: e.openPath.value
    }, null) : t("span", {
      class: "text-medium-emphasis"
    }, [a.value.noImagePreview])]) : e.docKind.value === "gad" ? t("div", {
      class: "pnl-body gad-ide__doc",
      "data-ide-doc-gen": !0,
      onClick: u
    }, [i.value ? t("pre", {
      class: "text-error text-caption",
      style: {
        whiteSpace: "pre-wrap"
      }
    }, [i.value]) : n.value ? t("div", {
      class: "gp-doc-rendered",
      innerHTML: na(n.value, e.openPath.value)
    }, null) : t("span", {
      class: "text-medium-emphasis"
    }, [a.value.noDocumentation])]) : t("div", {
      class: "pnl-body gad-ide__doc",
      innerHTML: na(e.docHtml.value, e.openPath.value)
    }, null)]);
  }
}), Cn = {
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
function Sn(e) {
  return Cn[e] ?? { icon: "mdi-tag-outline", color: "currentColor" };
}
const xn = D({
  name: "StructureTree",
  props: {
    symbols: { type: Array, default: () => [] },
    /** Called with the declaration clicked. */
    onNavigate: { type: Function, default: void 0 },
    /** What it says when there is nothing. */
    emptyText: { type: String, default: "No declarations." }
  },
  setup(e) {
    const a = Ce({}), n = (i, l, o) => {
      const s = i.children ?? [], p = !a[l], { icon: u, color: r } = Sn(i.kind), f = te(
        "div",
        {
          class: "gad-structure__row",
          title: `${i.kind} ${i.name}${i.detail ? " " + i.detail : ""} — ${i.line}:${i.column}`,
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
            return (I = e.onNavigate) == null ? void 0 : I.call(e, i);
          }
        },
        [
          te(
            "span",
            {
              style: { width: "16px", display: "inline-flex", justifyContent: "center", flex: "0 0 16px" },
              onClick: (I) => {
                s.length && (I.stopPropagation(), a[l] = p);
              }
            },
            s.length > 0 ? [te(ne, { size: "16" }, () => p ? "mdi-chevron-down" : "mdi-chevron-right")] : []
          ),
          te(ne, { size: "16", style: { color: r } }, () => u),
          te("span", i.name),
          i.detail ? te("span", { class: "text-medium-emphasis", style: { overflow: "hidden", textOverflow: "ellipsis" } }, i.detail) : null
        ]
      );
      return te("div", { key: l }, [f, ...p ? s.map((I, h) => n(I, `${l}/${h}:${I.name}`, o + 1)) : []]);
    };
    return () => te(
      "div",
      { class: "gad-structure", style: { overflow: "auto", paddingBlock: "4px" } },
      e.symbols.length === 0 ? [te("div", { class: "text-medium-emphasis", style: { padding: "8px", fontSize: "13px" } }, e.emptyText)] : e.symbols.map((i, l) => n(i, `${l}:${i.name}`, 0))
    );
  }
}), yn = /* @__PURE__ */ D({
  name: "PanelStructure",
  setup() {
    const e = H(_), a = H(Q, y(() => X)), n = v([]), i = v("");
    let l;
    async function o() {
      const p = e.api.symbols;
      if (!p || !e.openPath.value) {
        n.value = [];
        return;
      }
      try {
        n.value = await p(e.source.value, e.openPath.value), i.value = "";
      } catch (u) {
        i.value = u instanceof Error ? u.message : String(u);
      }
    }
    const s = () => {
      clearTimeout(l), l = setTimeout(o, 400);
    };
    return Me(o), Re(() => clearTimeout(l)), V(() => e.openPath.value, o), V(() => e.source.value, s), () => t("div", {
      class: "pnl"
    }, [t("div", {
      class: "pnl-head"
    }, [t("span", {
      class: "text-caption font-weight-medium"
    }, [a.value.structure.toUpperCase()]), t(x, {
      size: "x-small",
      variant: "text",
      icon: "mdi-refresh",
      title: a.value.refresh,
      onClick: o
    }, null)]), t("div", {
      class: "pnl-body",
      style: {
        padding: 0
      }
    }, [e.api.symbols ? t(xn, {
      symbols: n.value,
      emptyText: i.value || a.value.noDeclarations,
      onNavigate: (p) => e.goto(p.line)
    }, null) : t("div", {
      class: "text-medium-emphasis",
      style: {
        padding: "8px"
      }
    }, [a.value.noStructure])])]);
  }
}), Pn = /* @__PURE__ */ D({
  name: "PanelBreakpoints",
  setup() {
    const e = H(_), a = H(Q, y(() => X)), n = v("current"), i = (l, o) => {
      const s = e.bpMetaFor(l)[o] || {};
      return t("div", {
        key: l + ":" + o,
        class: ["bp-row", {
          "bp-row--off": s.disabled
        }]
      }, [t("span", {
        class: "bp-entry",
        title: a.value.goToLine,
        onClick: () => e.gotoFileLine(l, o)
      }, [t(ne, {
        size: "14",
        color: "error",
        class: "mr-1"
      }, {
        default: () => [S("mdi-circle")]
      }), n.value === "all" ? l + ":" + o : "line " + o, s.condition ? t("em", {
        class: "bp-cond"
      }, [S(" if "), s.condition]) : null]), t("span", {
        class: "bp-actions"
      }, [t(x, {
        size: "x-small",
        variant: "text",
        icon: "mdi-pencil-outline",
        title: a.value.editCondition,
        onClick: () => e.openBpCondition(l, o)
      }, null), t(x, {
        size: "x-small",
        variant: "text",
        icon: "mdi-close",
        title: a.value.remove,
        onClick: () => e.removeBreakpoint(l, o)
      }, null)])]);
    };
    return () => {
      const l = e.openPath.value, o = e.allBreakpoints();
      return t("div", {
        class: "pnl"
      }, [t(Pt, b({
        modelValue: n.value
      }, {
        "onUpdate:modelValue": (s) => n.value = s
      }, {
        density: "compact"
      }), {
        default: () => [t(Ze, {
          value: "current"
        }, {
          default: () => [a.value.currentFile]
        }), t(Ze, {
          value: "all"
        }, {
          default: () => [a.value.all]
        })]
      }), t("div", {
        class: "pnl-body"
      }, [n.value === "current" ? l ? e.bpFor(l).length ? e.bpFor(l).map((s) => i(l, s)) : t("div", {
        class: "text-medium-emphasis"
      }, [S("No breakpoints in "), l.split("/").pop(), S(".")]) : t("div", {
        class: "text-medium-emphasis"
      }, [a.value.noFileOpen]) : Object.keys(o).length ? Object.entries(o).flatMap(([s, p]) => p.map((u) => i(s, u))) : t("div", {
        class: "text-medium-emphasis"
      }, [a.value.noBreakpoints])])]);
    };
  }
}), bn = /* @__PURE__ */ D({
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
    const n = H(Q, y(() => X)), i = v(e.initial.condition ?? ""), l = v(!!e.initial.disabled);
    V(() => e.modelValue, (s) => {
      s && (i.value = e.initial.condition ?? "", l.value = !!e.initial.disabled);
    });
    function o() {
      a("save", {
        condition: i.value.trim() || void 0,
        disabled: l.value
      }), a("update:modelValue", !1);
    }
    return () => t(ue, b({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (s) => a("update:modelValue", s)
    }, {
      maxWidth: "440"
    }), {
      default: () => [t(oe, null, {
        default: () => [t(se, null, {
          default: () => [S("Breakpoint · line "), e.line]
        }), t(re, null, {
          default: () => [t(K, b({
            modelValue: i.value
          }, {
            "onUpdate:modelValue": (s) => i.value = s
          }, {
            label: n.value.condition,
            hint: n.value.conditionHint,
            persistentHint: !0,
            density: "compact",
            variant: "outlined",
            autofocus: !0,
            onKeyup: (s) => s.key === "Enter" && o()
          }), null), t(Ge, b({
            modelValue: l.value
          }, {
            "onUpdate:modelValue": (s) => l.value = !!s
          }, {
            label: n.value.disabled,
            density: "compact",
            hideDetails: !0,
            class: "mt-2"
          }), null)]
        }), t(de, null, {
          default: () => [t(ce, null, null), t(x, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [n.value.cancel]
          }), t(x, {
            color: "primary",
            onClick: o
          }, {
            default: () => [n.value.save]
          })]
        })]
      })]
    });
  }
});
function Gn(e) {
  return typeof e == "function" || Object.prototype.toString.call(e) === "[object Object]" && !xi(e);
}
const ba = [["array-item-in-new-line", "arrayItemNewLine"], ["dict-item-in-new-line", "dictItemNewLine"], ["call-params-in-new-line", "callParamsNewLine"]], Zn = /* @__PURE__ */ D({
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
    const n = H(Q, y(() => X)), i = v("panels"), l = (A) => e.config[A] || {}, o = l("fmt"), s = l("transpile"), p = l("template"), u = Ce(Object.fromEntries(ba.map(([A]) => [A, o[A] === !0]))), r = v(o.format === !0), f = v(String(o["max-columns"] ?? "")), I = v(o.backup === !0), h = v(String(s.writeFunc ?? "")), G = v(String(s.rawStrFuncStart ?? "")), W = v(String(s.rawStrFuncEnd ?? "")), M = v(String(p.start_delimiter ?? "")), P = v(String(p.end_delimiter ?? ""));
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
      const E = {
        ...p
      };
      M.value === "" ? delete E.start_delimiter : E.start_delimiter = M.value, P.value === "" ? delete E.end_delimiter : E.end_delimiter = P.value;
      const w = {
        ...e.config,
        fmt: A
      };
      Object.keys(T).length > 0 ? w.transpile = T : delete w.transpile, Object.keys(E).length > 0 ? w.template = E : delete w.template, a("save", w), a("update:modelValue", !1);
    }
    const z = (A) => ({
      modelValue: A.value,
      "onUpdate:modelValue": (j) => A.value = j
    });
    return () => {
      let A;
      return t(ue, b({
        modelValue: e.modelValue
      }, {
        "onUpdate:modelValue": (j) => a("update:modelValue", j)
      }, {
        maxWidth: "560"
      }), {
        default: () => [t(oe, null, {
          default: () => [t(se, null, {
            default: () => [n.value.settings]
          }), t(Pt, b({
            modelValue: i.value
          }, {
            "onUpdate:modelValue": (j) => i.value = j
          }), {
            default: () => [t(Ze, {
              value: "panels"
            }, {
              default: () => [n.value.panels]
            }), t(Ze, {
              value: "formatter"
            }, {
              default: () => [n.value.formatter]
            }), t(Ze, {
              value: "transpile"
            }, {
              default: () => [n.value.transpile]
            }), t(Ze, {
              value: "template"
            }, {
              default: () => [n.value.template]
            })]
          }), t(re, null, {
            default: () => [t(en, b({
              modelValue: i.value
            }, {
              "onUpdate:modelValue": (j) => i.value = j
            }), {
              default: () => [t(qe, {
                value: "panels"
              }, Gn(A = e.panels.map((j) => t(Ge, b({
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
              }), t(qe, {
                value: "formatter"
              }, {
                default: () => [t(Ge, b({
                  modelValue: r.value
                }, {
                  "onUpdate:modelValue": (j) => r.value = !!j
                }, {
                  label: n.value.forceMultiline,
                  density: "compact",
                  hideDetails: !0
                }), null), t(K, b({
                  modelValue: f.value
                }, {
                  "onUpdate:modelValue": (j) => f.value = j
                }, {
                  label: n.value.maxColumns,
                  type: "number",
                  density: "compact",
                  hideDetails: !0
                }), null), ba.map(([j, T]) => t(Ge, b({
                  key: j,
                  modelValue: u[j]
                }, {
                  "onUpdate:modelValue": (N) => u[j] = !!N
                }, {
                  label: n.value[T],
                  density: "compact",
                  hideDetails: !0
                }), null)), t(Ge, b({
                  modelValue: I.value
                }, {
                  "onUpdate:modelValue": (j) => I.value = !!j
                }, {
                  label: n.value.keepBackup,
                  density: "compact",
                  hideDetails: !0
                }), null)]
              }), t(qe, {
                value: "transpile"
              }, {
                default: () => [t(K, b(z(h), {
                  label: "writeFunc",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), t(K, b(z(G), {
                  label: "rawStrFuncStart",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), t(K, b(z(W), {
                  label: "rawStrFuncEnd",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0
                }), null)]
              }), t(qe, {
                value: "template"
              }, {
                default: () => [t(K, b(z(M), {
                  label: "start_delimiter",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0,
                  class: "mb-2"
                }), null), t(K, b(z(P), {
                  label: "end_delimiter",
                  density: "compact",
                  variant: "outlined",
                  hideDetails: !0
                }), null)]
              })]
            })]
          }), t(de, null, {
            default: () => [t(ce, null, null), t(x, {
              onClick: () => a("update:modelValue", !1)
            }, {
              default: () => [n.value.cancel]
            }), t(x, {
              color: "primary",
              onClick: B
            }, {
              default: () => [n.value.save]
            })]
          })]
        })]
      });
    };
  }
}), An = /* @__PURE__ */ D({
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
    const n = H(Q, y(() => X)), i = v(""), l = v(e.defaultPath), o = v([]), s = v(""), p = () => /\.gadx$/i.test(l.value);
    V(() => e.modelValue, (r) => {
      r && (l.value = e.defaultPath, i.value || (i.value = e.defaultPath.split("/").pop() ?? "profile"));
    });
    function u() {
      const r = {
        name: i.value.trim() || (l.value.split("/").pop() ?? "profile"),
        path: l.value,
        args: [...o.value]
      };
      p() && s.value && (r.tagEncode = s.value), a("create", r), a("update:modelValue", !1), i.value = "", o.value = [], s.value = "";
    }
    return () => t(ue, b({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (r) => a("update:modelValue", r)
    }, {
      maxWidth: "520"
    }), {
      default: () => [t(oe, null, {
        default: () => [t(se, null, {
          default: () => [n.value.newRunProfile]
        }), t(re, null, {
          default: () => [t(K, b({
            modelValue: i.value
          }, {
            "onUpdate:modelValue": (r) => i.value = r
          }, {
            label: n.value.name,
            density: "compact",
            variant: "outlined",
            class: "mb-2",
            hideDetails: !0
          }), null), t(K, b({
            modelValue: l.value
          }, {
            "onUpdate:modelValue": (r) => l.value = r
          }, {
            label: n.value.file,
            density: "compact",
            variant: "outlined",
            class: "mb-2",
            hideDetails: !0
          }), null), t(Ol, b({
            modelValue: o.value
          }, {
            "onUpdate:modelValue": (r) => o.value = r
          }, {
            label: n.value.arguments,
            hint: n.value.argumentsHint,
            persistentHint: !0,
            multiple: !0,
            chips: !0,
            closableChips: !0,
            density: "compact",
            variant: "outlined"
          }), null), p() && t(oa, b({
            modelValue: s.value
          }, {
            "onUpdate:modelValue": (r) => s.value = r ?? ""
          }, {
            items: [{
              title: n.value.renderHtml,
              value: ""
            }, {
              title: "JSON",
              value: "json"
            }, {
              title: "YAML",
              value: "yaml"
            }],
            label: n.value.gadxTagOutput,
            density: "compact",
            variant: "outlined",
            hideDetails: !0,
            class: "mt-2"
          }), null)]
        }), t(de, null, {
          default: () => [t(ce, null, null), t(x, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [n.value.cancel]
          }), t(x, {
            color: "primary",
            disabled: !l.value.trim(),
            onClick: u
          }, {
            default: () => [n.value.create]
          })]
        })]
      })]
    });
  }
}), Mn = /* @__PURE__ */ D({
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
    const n = H(Q, y(() => X)), i = v("");
    V(() => e.request, (o) => {
      o && (i.value = o.initial);
    });
    const l = (o) => {
      var s;
      (s = e.request) == null || s.resolve(o ? i.value.trim() : null), a("done");
    };
    return () => t(ue, b({
      modelValue: !!e.request
    }, {
      "onUpdate:modelValue": (o) => {
        o || l(!1);
      }
    }, {
      maxWidth: "420"
    }), {
      default: () => [t(oe, null, {
        default: () => [t(se, null, {
          default: () => {
            var o;
            return [(o = e.request) == null ? void 0 : o.title];
          }
        }), t(re, null, {
          default: () => {
            var o;
            return [t(K, b({
              modelValue: i.value
            }, {
              "onUpdate:modelValue": (s) => i.value = s
            }, {
              label: (o = e.request) == null ? void 0 : o.label,
              density: "compact",
              variant: "outlined",
              autofocus: !0,
              hideDetails: !0,
              onKeyup: (s) => s.key === "Enter" && l(!0)
            }), null)];
          }
        }), t(de, null, {
          default: () => [t(ce, null, null), t(x, {
            onClick: () => l(!1)
          }, {
            default: () => [n.value.cancel]
          }), t(x, {
            color: "primary",
            onClick: () => l(!0)
          }, {
            default: () => [n.value.ok]
          })]
        })]
      })]
    });
  }
}), Bn = /* @__PURE__ */ D({
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
    const n = H(Q, y(() => X)), i = (l) => {
      var o;
      (o = e.request) == null || o.resolve(l), a("done");
    };
    return () => t(ue, b({
      modelValue: !!e.request
    }, {
      "onUpdate:modelValue": (l) => {
        l || i(!1);
      }
    }, {
      maxWidth: "420"
    }), {
      default: () => [t(oe, null, {
        default: () => [t(se, null, {
          default: () => {
            var l;
            return [(l = e.request) == null ? void 0 : l.title];
          }
        }), t(re, null, {
          default: () => {
            var l;
            return [(l = e.request) == null ? void 0 : l.message];
          }
        }), t(de, null, {
          default: () => [t(ce, null, null), t(x, {
            onClick: () => i(!1)
          }, {
            default: () => [n.value.cancel]
          }), t(x, {
            color: "primary",
            onClick: () => i(!0)
          }, {
            default: () => [n.value.ok]
          })]
        })]
      })]
    });
  }
}), kn = /* @__PURE__ */ D({
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
    import: (e, a, n) => !0
  },
  setup(e, {
    emit: a
  }) {
    const n = H(_), i = H(Q, y(() => X)), l = v(""), o = v(!0), s = v(!1), p = v(""), u = v(""), r = v(!1), f = y(() => /\.(zip|tar|tar\.gz|tgz)(\?|#|$)/i.test(l.value));
    async function I() {
      if (l.value.trim()) {
        s.value = !0, p.value = "";
        try {
          await a("import", l.value.trim(), f.value && o.value && n.canExtract.value, u.value), a("update:modelValue", !1), l.value = "";
        } catch (h) {
          p.value = String(h);
        } finally {
          s.value = !1;
        }
      }
    }
    return () => t(ue, b({
      modelValue: e.modelValue
    }, {
      "onUpdate:modelValue": (h) => a("update:modelValue", h)
    }, {
      maxWidth: "520"
    }), {
      default: () => [t(oe, null, {
        default: () => [t(se, null, {
          default: () => [i.value.importFromUrl]
        }), t(re, null, {
          default: () => [t(K, b({
            modelValue: l.value
          }, {
            "onUpdate:modelValue": (h) => l.value = h
          }, {
            label: i.value.url,
            placeholder: "https://example.com/file.gad",
            density: "compact",
            variant: "outlined",
            autofocus: !0,
            hideDetails: !0,
            onKeyup: (h) => h.key === "Enter" && I()
          }), null), f.value && n.canExtract.value && t(yt, b({
            modelValue: o.value
          }, {
            "onUpdate:modelValue": (h) => o.value = !!h
          }, {
            label: i.value.extractArchive,
            density: "compact",
            hideDetails: !0,
            class: "mt-2",
            color: "primary"
          }), null), t("div", {
            class: "d-flex align-center mt-2",
            style: {
              gap: "4px"
            }
          }, [t(K, {
            modelValue: u.value || "/ (root)",
            label: i.value.targetFolder,
            density: "compact",
            variant: "outlined",
            readonly: !0,
            hideDetails: !0,
            onClick: () => r.value = !r.value
          }, null), t(x, {
            size: "small",
            variant: "text",
            icon: "mdi-folder-search-outline",
            title: i.value.chooseFolder,
            onClick: () => r.value = !r.value
          }, null)]), r.value && t("div", {
            class: "dirtree-box mt-1"
          }, [t(Ha, {
            root: n.tree.value,
            selected: u.value,
            onSelect: (h) => {
              u.value = h, r.value = !1;
            }
          }, null)]), s.value && t("div", {
            class: "mt-3"
          }, [t($l, {
            modelValue: e.progress < 0 ? void 0 : e.progress,
            indeterminate: e.progress < 0,
            color: "primary",
            height: "6",
            rounded: !0
          }, null), e.progress >= 0 && t("div", {
            class: "text-caption text-center mt-1"
          }, [e.progress, S("%")])]), p.value && t("div", {
            class: "pnl-diag mt-2"
          }, [p.value])]
        }), t(de, null, {
          default: () => [t(ce, null, null), t(x, {
            onClick: () => a("update:modelValue", !1)
          }, {
            default: () => [i.value.cancel]
          }), t(x, {
            color: "primary",
            loading: s.value,
            disabled: !l.value.trim(),
            onClick: I
          }, {
            default: () => [i.value.importAction]
          })]
        })]
      })]
    });
  }
}), jn = /* @__PURE__ */ D({
  name: "MoveDialog",
  setup() {
    const e = H(_), a = H(Q, y(() => X)), n = v("");
    V(() => e.moveReq.value, (l) => {
      l && (n.value = l.path.includes("/") ? l.path.slice(0, l.path.lastIndexOf("/")) : "");
    });
    const i = (l) => {
      var o;
      return (o = e.moveReq.value) == null ? void 0 : o.resolve(l);
    };
    return () => t(ue, b({
      modelValue: !!e.moveReq.value
    }, {
      "onUpdate:modelValue": (l) => !l && i(null)
    }, {
      maxWidth: "480"
    }), {
      default: () => [t(oe, null, {
        default: () => [t(se, null, {
          default: () => {
            var l;
            return [S("Move "), (l = e.moveReq.value) == null ? void 0 : l.path];
          }
        }), t(re, null, {
          default: () => [t("div", {
            class: "text-caption mb-1"
          }, [S("To the folder: "), n.value || "/ (root)"]), t("div", {
            class: "dirtree-box"
          }, [t(Ha, {
            root: e.tree.value,
            selected: n.value,
            onSelect: (l) => n.value = l
          }, null)])]
        }), t(de, null, {
          default: () => [t(ce, null, null), t(x, {
            variant: "text",
            onClick: () => i(null)
          }, {
            default: () => [a.value.cancel]
          }), t(x, {
            color: "primary",
            variant: "flat",
            onClick: () => i(n.value)
          }, {
            default: () => [a.value.move]
          })]
        })]
      })]
    });
  }
}), Hn = Symbol("gad-ide-extra-panels"), Zt = Symbol("gad-ide-extra-panel-expand");
function Dn(e) {
  return /* @__PURE__ */ D({
    name: "PanelExtra_" + e.id.replace(/\W/g, "_"),
    props: {
      // dockview's: { params, api, containerApi }
      params: {
        type: Object,
        required: !0
      }
    },
    setup(a) {
      const n = v(!1), i = () => n.value = a.params.api.isMaximized();
      let l;
      return Me(() => {
        i(), l = a.params.containerApi.onDidMaximizedGroupChange(i);
      }), Re(() => l == null ? void 0 : l.dispose()), ea(Zt, {
        maximized: n,
        toggle: () => {
          a.params.api.isMaximized() ? a.params.api.exitMaximized() : a.params.api.maximize(), i();
        },
        expandTitle: e.expandTitle ?? "Expand",
        collapseTitle: e.collapseTitle ?? "Restore"
      }), () => t("div", {
        class: "gad-ide__extra",
        "data-extra-panel": e.id
      }, [t("div", {
        class: "gad-ide__extra-body"
      }, [te(e.component, e.props ?? {})]), !e.headerExpand && t(za, {
        class: "gad-ide__extra-expand",
        variant: "tonal"
      }, null)]);
    }
  });
}
const za = /* @__PURE__ */ D({
  name: "ExpandButton",
  props: {
    variant: {
      type: String,
      default: "text"
    }
  },
  setup(e) {
    const a = H(Zt, null);
    return () => a && t(x, {
      size: "x-small",
      variant: e.variant,
      icon: a.maximized.value ? "mdi-arrow-collapse" : "mdi-arrow-expand",
      title: a.maximized.value ? a.collapseTitle : a.expandTitle,
      "data-extra-expand": a.maximized.value ? "collapse" : "expand",
      onClick: a.toggle
    }, null);
  }
}), zn = /* @__PURE__ */ D({
  name: "PanelChanges",
  setup() {
    var i;
    const e = H(_), a = H(Q, y(() => X)), n = ((i = e.workspace.actions) == null ? void 0 : i.edit) ?? !0;
    return () => t(Mi, {
      api: e.api.git,
      dark: e.dark.value,
      readonly: !n || e.readonly.value,
      writes: e.writes.value,
      messages: a.value,
      onSaved: (l) => void e.refreshFile(l)
    }, {
      actions: () => t(za, null, null)
    });
  }
}), Nn = /* @__PURE__ */ D({
  name: "PanelGit",
  setup() {
    const e = H(_), a = H(Q, y(() => X));
    return () => t(Bi, {
      api: e.api.git,
      dark: e.dark.value,
      openPath: e.openPath.value,
      messages: a.value
    }, {
      actions: () => t(za, null, null)
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
], Wn = {
  explorer: rn,
  editor: un,
  docs: hn,
  structure: yn,
  callstack: cn,
  locals: In,
  breakpoints: Pn,
  output: gn
}, fo = /* @__PURE__ */ D({
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
    const n = y(() => e.dark), i = Cl(() => e.messages), l = Ql(e.api, e.workspace, n, {
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
      getWords: () => i.value
    });
    ea(_, l), ea(Q, i), V(() => e.fontSize, (g) => {
      g !== l.fontSize.value && l.setFontSize(g);
    });
    let o = null, s = null, p = !1, u = "";
    const r = Ce(/* @__PURE__ */ new Set()), I = [...e.workspace.git && e.api.git ? [{
      id: "changes",
      label: i.value.changes,
      icon: "mdi-file-compare",
      component: zn,
      toolbarButton: !0,
      buttonAlign: "right",
      headerExpand: !0,
      expandTitle: i.value.expand,
      collapseTitle: i.value.restore
    }, {
      id: "git",
      label: i.value.git,
      icon: "mdi-source-branch",
      component: Nn,
      toolbarButton: !0,
      headerExpand: !0,
      expandTitle: i.value.expand,
      collapseTitle: i.value.restore
    }] : [], ...e.extraPanels], h = y(() => I.map((g) => ({
      id: g.id,
      label: g.label,
      add: (m) => {
        var me;
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
        }), !L && Z === "bottom" && ((me = m.getPanel(g.id)) == null || me.api.setSize({
          height: ye(m)
        }));
      }
    }))), G = {
      ...Wn
    };
    for (const g of I) G[g.id] = Dn(g);
    const W = (g) => g.word ? i.value[g.word] : g.label, M = y(() => [...(e.panels ? Ga.filter((g) => e.panels.includes(g.id)) : Ga).map((g) => ({
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
    function E(g) {
      for (const m of Ga) {
        const Z = g.getPanel(m.id);
        Z && Z.title !== W(m) && Z.api.setTitle(W(m));
      }
    }
    V(i, () => o && E(o));
    function w(g) {
      o = g.api;
      const m = e.layoutConfig;
      try {
        m && m.grid ? (o.fromJSON(m), A(o), E(o), o.panels.length || z(o)) : z(o);
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
    V(() => e.layoutConfig, (g) => {
      if (!(!o || !g || JSON.stringify(g) === u)) {
        p = !0;
        try {
          o.fromJSON(g), A(o), E(o), u = JSON.stringify(o.toJSON());
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
    const Ve = "gad-ide.left.width";
    function ie(g) {
      var L, J;
      if (!o) return;
      const m = M.value.find((U) => U.id === g);
      if (!m || o.getPanel(g)) return;
      const Z = !o.getPanel(g === "explorer" ? "structure" : "explorer");
      if (B(o, m), Z) {
        let U = 0;
        try {
          U = Number(localStorage.getItem(Ve)) || 0;
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
        const U = (L = o == null ? void 0 : o.getPanel(g)) == null ? void 0 : L.api.width, me = g === "docs" ? ee : Ve;
        if (U) try {
          localStorage.setItem(me, String(Math.round(U)));
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
    function Le(g, m) {
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
      buttons: y(() => I.filter((g) => g.toolbarButton).map((g) => ({
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
    ea(Hn, ae);
    const Ye = (g, m, Z = !1) => t(x, {
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
    }), Be = y(() => ae.buttons.value.filter((g) => g.bottom)), Ie = (g, m = "bottom", Z = () => ae.open(g.id), L = !1) => {
      const J = r.has(g.id), U = j.value === g.id, me = m === "right" ? J ? "mdi-chevron-right" : "mdi-chevron-left" : m === "left" ? J ? "mdi-chevron-left" : "mdi-chevron-right" : J ? "mdi-chevron-down" : "mdi-chevron-up";
      return t("span", {
        key: g.id,
        class: "gad-ide__strip-item"
      }, [t("button", {
        type: "button",
        class: ["gad-ide__strip-btn", {
          "gad-ide__strip-btn--open": J
        }],
        title: g.label,
        disabled: L,
        "data-extra-open": g.id,
        "data-open": J ? "true" : "false",
        onClick: () => J ? Le(g.id, !1) : Z()
      }, [t(ne, {
        size: "16",
        icon: g.icon
      }, null), t("span", {
        class: "gad-ide__strip-label"
      }, [g.label]), t(ne, {
        size: "14",
        icon: me
      }, null)]), J && t("button", {
        type: "button",
        class: "gad-ide__strip-btn gad-ide__strip-expand",
        title: U ? i.value.restore : i.value.expand,
        "data-strip-expand": g.id,
        "data-maximized": U ? "true" : "false",
        onClick: () => N(g.id)
      }, [t(ne, {
        size: "14",
        icon: U ? "mdi-arrow-collapse" : "mdi-arrow-expand"
      }, null)])]);
    }, ra = {
      id: "docs",
      label: i.value.preview,
      icon: "mdi-file-eye-outline"
    }, Te = y(() => [{
      id: "explorer",
      label: i.value.explorer,
      icon: "mdi-file-tree-outline"
    }, {
      id: "structure",
      label: i.value.structure,
      icon: "mdi-file-tree"
    }].filter((g) => P(g.id))), ge = y(() => M.value.map((g) => ({
      id: g.id,
      label: g.label,
      visible: r.has(g.id)
    })));
    V(() => l.docRequest.value, () => {
      var m, Z;
      const g = M.value.find((L) => L.id === "docs");
      o && g && !o.getPanel("docs") && (B(o, g), (m = o.getPanel("docs")) == null || m.api.setSize({
        width: q(o)
      })), (Z = o == null ? void 0 : o.getPanel("docs")) == null || Z.api.setActive();
    });
    function ke(g) {
      a("update:config", g);
    }
    Me(() => void l.init()), Re(() => s == null ? void 0 : s.dispose());
    const je = y(() => e.dark ? yi : Pi);
    return () => {
      var g;
      return t("div", {
        class: "gad-ide"
      }, [t("div", {
        class: "gad-ide__header",
        "data-ide-header": !0
      }, [ae.buttons.value.filter((m) => !m.bottom && m.align === "left").map((m) => Ye(m, () => ae.open(m.id))), t(x, {
        size: "small",
        variant: "text",
        prependIcon: "mdi-cog-outline",
        class: "text-none",
        "data-ide-settings": !0,
        onClick: () => l.settingsOpen.value = !0
      }, {
        default: () => [i.value.settings]
      }), t("span", {
        class: "gad-ide__header-spacer"
      }, null), ae.buttons.value.filter((m) => !m.bottom && m.align === "right").map((m) => Ye(m, () => ae.open(m.id))), e.headerActions.map((m) => (
        // with a label, its text beside the icon; else an icon button
        // (no children: a default slot, even empty, hides the icon)
        m.label ? t(x, {
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
        }) : t(x, {
          key: "action-" + m.id,
          size: "small",
          variant: "text",
          density: "comfortable",
          icon: m.icon,
          title: m.title,
          "data-ide-action": m.id,
          onClick: m.onClick
        }, null)
      ))]), t("div", {
        class: "gad-ide__main"
      }, [Te.value.length > 0 && t("div", {
        class: "gad-ide__strip gad-ide__strip--side gad-ide__strip--left",
        "data-ide-strip-left": !0
      }, [Te.value.map((m) => Ie(m, "left", () => ie(m.id)))]), t("div", {
        class: "gad-ide__dock"
      }, [t(bi, {
        style: {
          height: "100%"
        },
        theme: je.value,
        components: G,
        onReady: w
      }, null)]), P("docs") && t("div", {
        class: "gad-ide__strip gad-ide__strip--side gad-ide__strip--right",
        "data-ide-strip-right": !0
      }, [Ie(ra, "right", () => l.requestDocs(), !l.openPath.value && !r.has("docs"))])]), Be.value.length > 0 && t("div", {
        class: "gad-ide__strip",
        "data-ide-strip": !0
      }, [Be.value.filter((m) => m.align === "left").map((m) => Ie(m)), t("span", {
        class: "gad-ide__header-spacer"
      }, null), Be.value.filter((m) => m.align === "right").map((m) => Ie(m))]), t(Zn, b({
        modelValue: l.settingsOpen.value
      }, {
        "onUpdate:modelValue": (m) => l.settingsOpen.value = m
      }, {
        config: e.config,
        panels: ge.value,
        onTogglePanel: Le,
        onSave: ke
      }), null), t(An, b({
        modelValue: l.profileDialog.value
      }, {
        "onUpdate:modelValue": (m) => l.profileDialog.value = m
      }, {
        defaultPath: l.openPath.value,
        onCreate: l.addProfile
      }), null), t(bn, b({
        modelValue: !!l.bpDialog.value
      }, {
        "onUpdate:modelValue": (m) => {
          m || (l.bpDialog.value = null);
        }
      }, {
        line: ((g = l.bpDialog.value) == null ? void 0 : g.line) ?? 0,
        initial: l.bpDialog.value ? l.bpMetaFor(l.bpDialog.value.path)[l.bpDialog.value.line] ?? {} : {},
        onSave: (m) => {
          l.bpDialog.value && l.setBpMeta(l.bpDialog.value.path, l.bpDialog.value.line, m);
        }
      }), null), t(Mn, {
        request: l.promptReq.value,
        onDone: () => l.promptReq.value = null
      }, null), t(jn, null, null), t(Bn, {
        request: l.confirmReq.value,
        onDone: () => l.confirmReq.value = null
      }, null), t(kn, b({
        modelValue: l.urlDialog.value
      }, {
        "onUpdate:modelValue": (m) => l.urlDialog.value = m
      }, {
        progress: l.uploadProgress.value,
        onImport: (m, Z, L) => l.uploadUrl(m, Z, L)
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
  var a = /[*&][^\s[\]{},]+/, n = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/, i = "(?:" + n.source + "(?:[ 	]+" + a.source + ")?|" + a.source + "(?:[ 	]+" + n.source + ")?)", l = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function() {
    return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
  }), o = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;
  function s(p, u) {
    u = (u || "").replace(/m/g, "") + "m";
    var r = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function() {
      return i;
    }).replace(/<<value>>/g, function() {
      return p;
    });
    return RegExp(r, u);
  }
  e.languages.yaml = {
    scalar: {
      pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function() {
        return i;
      })),
      lookbehind: !0,
      alias: "string"
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function() {
        return i;
      }).replace(/<<key>>/g, function() {
        return "(?:" + l + "|" + o + ")";
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
    tag: n,
    important: a,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
  }, e.languages.yml = e.languages.yaml;
})(Prism);
(function(e) {
  var a = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;
  function n(f) {
    return f = f.replace(/<inner>/g, function() {
      return a;
    }), RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + "(?:" + f + ")");
  }
  var i = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source, l = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function() {
    return i;
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
      pattern: RegExp("^" + l + o + "(?:" + l + ")*", "m"),
      inside: {
        "table-data-rows": {
          pattern: RegExp("^(" + l + o + ")(?:" + l + ")*$"),
          lookbehind: !0,
          inside: {
            "table-data": {
              pattern: RegExp(i),
              inside: e.languages.markdown
            },
            punctuation: /\|/
          }
        },
        "table-line": {
          pattern: RegExp("^(" + l + ")" + o + "$"),
          lookbehind: !0,
          inside: {
            punctuation: /\||:?-{3,}:?/
          }
        },
        "table-header-row": {
          pattern: RegExp("^" + l + "$"),
          inside: {
            "table-header": {
              pattern: RegExp(i),
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
      pattern: n(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
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
      pattern: n(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
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
      pattern: n(/(~~?)(?:(?!~)<inner>)+\2/.source),
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
      pattern: n(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
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
const En = [{
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
function wn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
const Rn = (e) => e.replace(/\s*\{data-src-pos="\d+,\d+"\}/g, "");
function $e(e, a) {
  const n = xe.languages[a];
  return n ? xe.highlight(e, n, a) : wn(e);
}
const At = /* @__PURE__ */ D({
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
    const n = v("render-md"), i = v(null), l = v(!1);
    let o = 0, s;
    async function p() {
      const r = ++o;
      l.value = !0;
      try {
        const f = await e.doc(e.source(), e.sourceType, n.value);
        r === o && (i.value = f);
      } finally {
        r === o && (l.value = !1);
      }
    }
    V([n, () => e.sourceType], p, {
      immediate: !0
    }), V(() => e.revision, () => {
      clearTimeout(s), s = setTimeout(p, 250);
    });
    function u() {
      const r = i.value;
      if (!r) return t("p", {
        class: "gp-muted"
      }, [S("Generating documentation…")]);
      if (!r.ok || r.error) return t("div", {
        class: "gp-error gad-ide__diag"
      }, [r.error || "doc failed"]);
      switch (n.value) {
        case "render-md":
          return t("div", {
            class: "gp-doc-rendered",
            innerHTML: na(ja(r.markdown ?? ""), e.docPath, e.docRootFor)
          }, null);
        case "render-html":
          return t("div", {
            class: "gp-doc-rendered",
            innerHTML: na(r.html ?? "", e.docPath, e.docRootFor)
          }, null);
        case "md":
          return t("pre", {
            class: "gp-doc-src language-markdown",
            innerHTML: $e(Rn(r.markdown ?? ""), "markdown")
          }, null);
        case "html":
          return t("pre", {
            class: "gp-doc-src language-markup",
            innerHTML: $e(r.html ?? "", "markup")
          }, null);
        case "json":
          return t("pre", {
            class: "gp-doc-src language-json",
            innerHTML: $e(r.text ?? "", "json")
          }, null);
        case "yaml":
          return t("pre", {
            class: "gp-doc-src language-yaml",
            innerHTML: $e(r.text ?? "", "yaml")
          }, null);
        default:
          return null;
      }
    }
    return () => {
      var r;
      return t("div", {
        class: "gp-doc"
      }, [t("div", {
        class: "gp-pane-head"
      }, [t("span", {
        class: "gp-doc-title"
      }, [S("Doc")]), t("span", {
        class: "gp-actions gp-doc-actions"
      }, [t(oa, b({
        class: "gp-doc-ctl",
        modelValue: n.value
      }, {
        "onUpdate:modelValue": (f) => n.value = f ?? "render-md"
      }, {
        items: En,
        density: "compact",
        variant: "outlined",
        hideDetails: !0,
        disabled: l.value,
        style: {
          maxWidth: "180px"
        }
      }), null), t(x, {
        class: "gp-doc-ctl",
        size: "small",
        height: "32",
        variant: "tonal",
        loading: l.value,
        title: "Reload documentation",
        onClick: p
      }, {
        default: () => [S("↻")]
      }), (r = a.default) == null ? void 0 : r.call(a)])]), t("div", {
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
}), Vn = {
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
}, Ln = {
  gad: "gad",
  gadt: "gadt",
  gadx: "gadx"
}, Yn = {
  gad: "",
  gadt: "gadTemplate",
  gadx: "gadx"
}, ho = /* @__PURE__ */ D({
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
    const a = v("gad"), n = Ce({
      ...Vn
    }), i = y({
      get: () => n[a.value],
      set: (B) => n[a.value] = B
    }), l = y(() => Yn[a.value]), o = v(!1), s = v(""), p = v(!1), u = v(0), r = v(0), f = v(0), I = v(null), h = e.runner.diagnose ? (B) => e.runner.diagnose(B, l.value) : void 0;
    async function G(B) {
      o.value = !0;
      try {
        const z = await e.runner.format(i.value, l.value);
        I.value = {
          kind: "format",
          fmt: z
        }, B && z.ok && (i.value = z.source);
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
          run: await e.runner.run(i.value, l.value, B)
        };
      } finally {
        o.value = !1;
      }
    }
    const M = aa("gad-ide.playground.editor", 560, 200, 4e3), P = aa("gad-ide.playground.doc", 420, 160, 4e3);
    return () => {
      var B, z;
      return t("div", {
        class: "gp-split"
      }, [t("section", {
        class: "gp-pane",
        style: {
          flex: `0 0 ${M.size.value}px`
        }
      }, [t("div", {
        class: "gp-pane-head"
      }, [t(xt, b({
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
        default: () => [t(x, {
          size: "small",
          value: "gad"
        }, {
          default: () => [S("GAD")]
        }), t(x, {
          size: "small",
          value: "gadt"
        }, {
          default: () => [S("GAD Template")]
        }), t(x, {
          size: "small",
          value: "gadx"
        }, {
          default: () => [S("GADx")]
        })]
      }), t("span", {
        class: "gp-actions"
      }, [a.value === "gadx" && t(oa, b({
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
      }), null), t(x, {
        size: "small",
        variant: "tonal",
        loading: o.value,
        onClick: () => G(!1)
      }, {
        default: () => [S("Format")]
      }), t(x, {
        size: "small",
        variant: "tonal",
        loading: o.value,
        onClick: () => G(!0)
      }, {
        default: () => [S("Format & apply")]
      }), t(x, {
        size: "small",
        color: "primary",
        prependIcon: "mdi-play",
        loading: o.value,
        onClick: W
      }, {
        default: () => [S("Run")]
      }), e.runner.doc && t(x, {
        size: "small",
        variant: p.value ? "flat" : "tonal",
        color: p.value ? "primary" : void 0,
        onClick: () => p.value = !p.value,
        title: "Toggle the documentation panel"
      }, {
        default: () => [S("Doc")]
      })])]), t("div", {
        class: "gp-editor"
      }, [t(Da, b({
        key: a.value,
        modelValue: i.value
      }, {
        "onUpdate:modelValue": (A) => {
          i.value = A, p.value && u.value++;
        }
      }, {
        language: Ln[a.value],
        dark: e.dark,
        diagnose: h,
        gotoLine: r.value,
        gotoSeq: f.value
      }), null)])]), t(ta, {
        onStart: M.begin,
        onDrag: (A) => M.drag(A),
        onReset: M.reset
      }, null), t("section", {
        class: "gp-pane",
        style: {
          flex: "1 1 auto"
        }
      }, [t("div", {
        class: "gp-pane-head"
      }, [S("Output")]), t("div", {
        class: "gp-pane-body"
      }, [!I.value && t("p", {
        class: "text-medium-emphasis"
      }, [S("Format or run the source on the left.")]), ((B = I.value) == null ? void 0 : B.kind) === "format" && t(Tn, {
        fmt: I.value.fmt
      }, null), ((z = I.value) == null ? void 0 : z.kind) === "run" && t(Fn, {
        run: I.value.run
      }, null)])]), e.runner.doc && p.value && t(ta, {
        onStart: P.begin,
        onDrag: (A) => P.drag(A, -1),
        onReset: P.reset
      }, null), e.runner.doc && p.value && t("section", {
        class: "gp-pane gp-pane--doc",
        style: {
          flex: `0 0 ${P.size.value}px`
        }
      }, [t(At, {
        doc: e.runner.doc,
        source: () => i.value,
        sourceType: l.value,
        revision: u.value,
        onNavigate: (A) => {
          r.value = A, f.value++;
        }
      }, {
        default: () => [t(x, {
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
}), Tn = /* @__PURE__ */ D({
  props: {
    fmt: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return () => e.fmt.ok ? t("pre", {
      class: "gp-out"
    }, [e.fmt.source]) : t("div", null, [(e.fmt.diagnostics ?? []).map((a, n) => t("div", {
      class: "gad-ide__diag",
      key: n
    }, [a.line, S(":"), a.column, S(" "), a.message]))]);
  }
}), Fn = /* @__PURE__ */ D({
  props: {
    run: {
      type: Object,
      required: !0
    }
  },
  setup(e) {
    return () => t("div", {
      class: e.run.ok ? "" : "gp-error"
    }, [e.run.stdout && t("pre", {
      class: "gp-out"
    }, [e.run.stdout]), e.run.stderr && t("pre", {
      class: "gp-out gad-ide__diag"
    }, [e.run.stderr]), e.run.ok && e.run.result && t("div", {
      class: "pnl-return"
    }, [S("↩ "), e.run.result]), (e.run.diagnostics ?? []).map((a, n) => t("div", {
      class: "gad-ide__diag",
      key: n
    }, [a.line, S(":"), a.column, S(" "), a.message]))]);
  }
}), Un = {
  gad: "gad",
  gadt: "gadt",
  gadx: "gadx"
}, Za = {
  gad: "",
  gadt: "gadTemplate",
  gadx: "gadx"
};
let Jn = 1;
const st = (e = "", a = "gad") => ({
  id: Jn++,
  source: e,
  dialect: a,
  tagEncode: "",
  result: null,
  running: !1,
  showDoc: !1,
  docRev: 0,
  gotoLine: 0,
  gotoSeq: 0
}), Xn = [{
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
}], Co = /* @__PURE__ */ D({
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
    const a = v(Xn.map((u) => st(u.source, u.dialect)));
    async function n(u) {
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
    const i = () => a.value.push(st()), l = (u) => {
      a.value.length > 1 && (a.value = a.value.filter((r) => r.id !== u));
    }, o = (u) => e.runner.diagnose ? (r) => e.runner.diagnose(r, Za[u.dialect]) : void 0, s = aa("gad-ide.notebook.editor", 220, 80, 4e3), p = aa("gad-ide.notebook.doc", 420, 160, 4e3);
    return () => t("div", {
      class: "gnb"
    }, [t("p", {
      class: "text-medium-emphasis"
    }, [S("Each cell runs independently.")]), a.value.map((u) => t("div", {
      class: "gnb-cell",
      key: u.id
    }, [t("div", {
      class: "gnb-cell-main" + (u.showDoc ? " gnb-cell-main--doc" : "")
    }, [t("div", {
      class: "gnb-editor",
      style: {
        height: `${s.size.value}px`
      }
    }, [t(Da, b({
      key: u.id + ":" + u.dialect,
      modelValue: u.source
    }, {
      "onUpdate:modelValue": (r) => {
        u.source = r, u.showDoc && u.docRev++;
      }
    }, {
      language: Un[u.dialect],
      dark: e.dark,
      diagnose: o(u),
      gotoLine: u.gotoLine,
      gotoSeq: u.gotoSeq
    }), null)]), e.runner.doc && u.showDoc && t(ta, {
      onStart: p.begin,
      onDrag: (r) => p.drag(r, -1),
      onReset: p.reset
    }, null), e.runner.doc && u.showDoc && t("div", {
      class: "gnb-doc",
      style: {
        flex: `0 0 ${p.size.value}px`,
        height: `${s.size.value}px`
      }
    }, [t(At, {
      doc: e.runner.doc,
      source: () => u.source,
      sourceType: Za[u.dialect],
      revision: u.docRev,
      onNavigate: (r) => {
        u.gotoLine = r, u.gotoSeq++;
      }
    }, {
      default: () => [t(x, {
        class: "gp-doc-ctl",
        size: "small",
        height: "32",
        variant: "tonal",
        title: "Close the doc panel",
        onClick: () => u.showDoc = !1
      }, {
        default: () => [S("✕")]
      })]
    })])]), t(ta, {
      direction: "row",
      onStart: s.begin,
      onDrag: (r) => s.drag(r),
      onReset: s.reset
    }, null), t("div", {
      class: "gnb-bar"
    }, [t(xt, b({
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
      default: () => [t(x, {
        size: "small",
        value: "gad"
      }, {
        default: () => [S("GAD")]
      }), t(x, {
        size: "small",
        value: "gadt"
      }, {
        default: () => [S("GAD Template")]
      }), t(x, {
        size: "small",
        value: "gadx"
      }, {
        default: () => [S("GADx")]
      })]
    }), u.dialect === "gadx" && t(oa, b({
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
    }), null), t(x, {
      size: "small",
      color: "primary",
      prependIcon: "mdi-play",
      loading: u.running,
      onClick: () => n(u)
    }, {
      default: () => [S("Run")]
    }), e.runner.doc && t(x, {
      size: "small",
      variant: u.showDoc ? "flat" : "tonal",
      color: u.showDoc ? "primary" : void 0,
      title: "Toggle the documentation panel for this cell",
      onClick: () => {
        u.showDoc = !u.showDoc, u.docRev++;
      }
    }, {
      default: () => [S("Doc")]
    }), t(x, {
      size: "small",
      variant: "text",
      onClick: () => l(u.id)
    }, {
      default: () => [S("Remove")]
    })]), u.result && t("div", {
      class: "gnb-out" + (u.result.ok ? "" : " gp-error")
    }, [u.result.stdout && t("pre", {
      class: "gp-out"
    }, [u.result.stdout]), u.result.stderr && t("pre", {
      class: "gp-out gad-ide__diag"
    }, [u.result.stderr]), u.result.ok && u.result.result && t("div", {
      class: "pnl-return"
    }, [S("↩ "), u.result.result]), (u.result.diagnostics ?? []).map((r, f) => t("div", {
      class: "gad-ide__diag",
      key: f
    }, [r.line, S(":"), r.column, S(" "), r.message]))])])), t(x, {
      size: "small",
      variant: "tonal",
      prependIcon: "mdi-plus",
      onClick: i
    }, {
      default: () => [S("Add cell")]
    })]);
  }
});
async function R(e, a, n) {
  const i = await fetch(a, {
    method: e,
    headers: n ? { "Content-Type": "application/json" } : void 0,
    body: n ? JSON.stringify(n) : void 0
  }), l = await i.json().catch(() => ({}));
  if (!i.ok) throw new Error(l.error || i.statusText);
  return l;
}
function Qn(e = "") {
  const a = (i) => e + i;
  return {
    /** the workspace's repository (Workspace.git) */
    git: ki(a("api/ide/")),
    workspace: () => R("GET", a("api/ide/workspace")),
    tree: (i = !1) => R("GET", a("api/ide/tree") + (i ? "?hidden=true" : "")),
    read: (i) => R(
      "GET",
      a("api/ide/file?path=") + encodeURIComponent(i)
    ),
    /** rawUrl is the URL of the file's bytes as they are (an image to show). */
    rawUrl: (i) => a("api/ide/file?raw=1&path=") + encodeURIComponent(i),
    write: (i, l) => R("PUT", a("api/ide/file"), { path: i, content: l }),
    mkfile: (i) => R("PUT", a("api/ide/file"), { path: i, content: "" }),
    del: (i) => R("POST", a("api/ide/delete"), { path: i }),
    rename: (i, l) => R("POST", a("api/ide/rename"), { path: i, to: l }),
    mkdir: (i) => R("POST", a("api/ide/mkdir"), { path: i }),
    /** upload writes files uploaded — text, or bytes (base64) — at their paths. */
    upload: (i) => R("POST", a("api/ide/upload"), {
      files: i.map((l) => l.bytes ? { path: l.path, bytes: l.bytes } : { path: l.path, content: l.content })
    }),
    fetchUrl: (i, l) => R("POST", a("api/ide/fetch"), { url: i, path: l }),
    config: () => R("GET", a("api/ide/config")),
    saveConfig: (i) => R("PUT", a("api/ide/config"), i),
    modules: () => R("GET", a("api/ide/modules")),
    format: (i) => R("POST", a("api/ide/format"), { source: i }),
    /** symbols is the structure of source (`gad symbols`): its declarations as
     * a tree; path (or sourceType) says its dialect. */
    symbols: (i, l, o) => R("POST", a("api/ide/symbols"), { source: i, path: l, sourceType: o }),
    transpile: (i, l) => R("POST", a("api/ide/transpile"), { source: i, path: l }),
    doc: (i) => R("POST", a("api/ide/doc"), { source: i }).then((l) => l.docs || []),
    /** docGen generates documentation for source in the requested mode. */
    docGen: (i, l, o) => R("POST", a("api/ide/doc-gen"), { source: i, sourceType: l, mode: o }),
    eval: (i) => R("POST", a("api/ide/eval"), i),
    inspect: (i) => R("POST", a("api/ide/inspect"), i),
    diagnose: (i, l) => R("POST", a("api/ide/diagnose"), { source: i, sourceType: l }).then(
      (o) => o.diagnostics || []
    ),
    run: (i) => R("POST", a("api/ide/run"), i),
    dbgStart: (i) => R("POST", a("api/ide/debug/start"), i),
    dbgCmd: (i, l) => R("POST", a("api/ide/debug/command"), { session: i, command: l }),
    dbgEval: (i, l, o) => R("POST", a("api/ide/debug/eval"), {
      session: i,
      expr: l,
      repr: o
    })
  };
}
const Mt = Qn(), So = Mt;
async function xo() {
  try {
    return await Mt.workspace();
  } catch {
    return null;
  }
}
export {
  bo as ChangesPanel,
  Yl as DEFAULT_FILE_TYPES,
  ka as DEFAULT_IDE_OWN_MESSAGES,
  X as DEFAULT_MESSAGES,
  Go as DiffBrowser,
  Zo as DiffMergeView,
  At as DocPanel,
  Ul as FileTypeRegistry,
  Ao as GIT_I18N_MESSAGES,
  Mo as GIT_I18N_NAMESPACE,
  Bo as GIT_MESSAGES_PT_BR,
  Da as GadEditor,
  kl as GadEditorView,
  fo as GadIde,
  Co as GadNotebook,
  ho as GadPlayground,
  ko as GitPanel,
  vo as IDE_I18N_MESSAGES,
  hl as IDE_I18N_NAMESPACE,
  ct as IDE_OWN_MESSAGES_PT_BR,
  _ as IdeControllerKey,
  Gt as InspectorNode,
  Cn as KIND_ICONS,
  jo as LANGUAGES,
  Ho as ResizeHandle,
  xn as StructureTree,
  Ql as createController,
  Do as createHttpGitApi,
  Qn as createHttpIdeApi,
  So as httpIdeApi,
  Mt as ideApi,
  Sn as kindIcon,
  at as langExtension,
  vt as langOf,
  zo as languageExtensions,
  No as languageOf,
  xo as probeIde,
  Wo as renamedTo,
  ja as renderDocMarkdown,
  Eo as statusColor,
  wo as treePath,
  Ro as unchangedContent,
  Cl as useIdeMessages,
  Vo as useStoredSize
};
