// Git dockview panel: the branches of the workspace's repository, browsed —
// read only. A branch chosen shows its commits, as a graph (gitGraph); a
// commit chosen shows its full message and the files it changed, in the diff
// browser: the tree of the files, each compared with the commit before (its
// first parent). Each file's toolbar downloads its content in the commit and
// its patch; the commit's bar, the patch of the whole commit.
import { computed, defineComponent, h, inject, onMounted, ref, watch } from "vue";
import { VBtn, VProgressCircular } from "../vuetify";
import { IdeControllerKey } from "../controller";
import { ExpandButton } from "./PanelExtra";
import { DEFAULT_MESSAGES, diffLabels, IdeMessagesKey } from "../messages";
import DiffBrowser from "../diff/DiffBrowser.vue";
import type { Content, DiffFile } from "../diff/diffBrowserContext";
import type { GitBranch, GitCommit, GitCommitDetail } from "../api";
import { graphRows, type GraphRow } from "../gitGraph";

const message = (e: unknown) => String((e as { message?: string })?.message || e);
const PAGE = 100;
const LANE = 12; // a lane's width, px
const ROW = 24; // a commit's row's height, px
const COLORS = ["#1e88e5", "#43a047", "#e53935", "#fb8c00", "#8e24aa", "#00acc1", "#6d4c41", "#d81b60"];
const color = (lane: number) => COLORS[lane % COLORS.length];

const shortDate = (iso: string) => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
};

// Graph is a commit's row of the graph: the lanes through it, into its node
// and out of it, the node.
function Graph(props: { row: GraphRow }) {
  const r = props.row;
  const x = (lane: number) => lane * LANE + LANE / 2;
  const mid = ROW / 2;
  return (
    <svg class="gad-ide__git-graph" width={r.width * LANE} height={ROW}>
      {r.through.map(([a, b]) => (
        <line x1={x(a)} y1={0} x2={x(b)} y2={ROW} stroke={color(a)} stroke-width={2} />
      ))}
      {r.into.map((j) => (
        <path d={`M${x(j)} 0 C ${x(j)} ${mid / 2}, ${x(r.col)} ${mid / 2}, ${x(r.col)} ${mid}`} stroke={color(j)} stroke-width={2} fill="none" />
      ))}
      {r.out.map((j) => (
        <path d={`M${x(r.col)} ${mid} C ${x(r.col)} ${mid + mid / 2}, ${x(j)} ${mid + mid / 2}, ${x(j)} ${ROW}`} stroke={color(j)} stroke-width={2} fill="none" />
      ))}
      <circle cx={x(r.col)} cy={mid} r={4} fill={color(r.col)} />
    </svg>
  );
}

export default defineComponent({
  name: "PanelGit",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const git = ctx.api.git!;
    const m = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));

    const branches = ref<GitBranch[]>([]);
    const branch = ref("");
    const commits = ref<GitCommit[]>([]);
    const more = ref(false);
    const selected = ref("");
    const detail = ref<GitCommitDetail>();
    const error = ref("");
    const loading = ref(0);

    // busy runs f, its error shown
    async function busy<T>(f: () => Promise<T>): Promise<T | undefined> {
      loading.value++;
      try {
        const v = await f();
        error.value = "";
        return v;
      } catch (e) {
        error.value = message(e);
      } finally {
        loading.value--;
      }
    }

    async function loadBranches() {
      const bs = await busy(() => git.branches());
      if (!bs) return;
      branches.value = bs;
      if (!bs.some((b) => b.name === branch.value)) branch.value = (bs.find((b) => b.current) ?? bs[0])?.name ?? "HEAD";
    }

    // the log of the branch: its first page, or the next (more)
    let logSeq = 0;
    async function loadLog(next = false) {
      const n = ++logSeq;
      const ref_ = branch.value || "HEAD";
      const skip = next ? commits.value.length : 0;
      const cs = await busy(() => git.log(ref_, skip, PAGE));
      if (!cs || n !== logSeq) return;
      commits.value = next ? [...commits.value, ...cs] : cs;
      more.value = cs.length === PAGE;
    }
    watch(branch, () => {
      selected.value = "";
      detail.value = undefined;
      void loadLog();
    });

    let commitSeq = 0;
    async function select(hash: string) {
      if (selected.value === hash) return;
      selected.value = hash;
      const n = ++commitSeq;
      const d = await busy(() => git.commit(hash));
      if (d && n === commitSeq) detail.value = { ...d, files: d.files.map((f) => ({ ...f, readOnly: true })) };
    }

    // the branch chosen (the current) loads its log (watch branch)
    onMounted(loadBranches);
    const refresh = async () => {
      await loadBranches();
      await loadLog();
    };

    const rows = computed(() => graphRows(commits.value));
    const local = computed(() => branches.value.filter((b) => !b.remote));
    const remote = computed(() => branches.value.filter((b) => b.remote));

    const load = (c: Content) => {
      const hash = detail.value?.hash ?? "";
      return git.commitDiff(hash, c.file.path, c.file.from).then(
        (v) => {
          c.value = { ...v, readOnly: true };
          c.error = undefined;
        },
        (e) => (c.error = message(e)),
      );
    };

    // the downloads of a file of the commit: its content there (not of one
    // deleted), its patch
    const fileButtons = (f: DiffFile) => {
      const d = detail.value;
      if (!d) return null;
      const deleted = (f.status || "").trim().startsWith("D");
      return [
        git.fileUrl && !deleted && (
          <VBtn size="small" variant="text" icon="mdi-file-download-outline" density="comfortable" title={m.value.downloadFile}
            href={git.fileUrl(d.hash, f.path)} download={f.path.slice(f.path.lastIndexOf("/") + 1)} data-git-download-file />
        ),
        git.patchUrl && (
          <VBtn size="small" variant="text" icon="mdi-file-compare" density="comfortable" title={m.value.downloadPatch}
            href={git.patchUrl(d.hash, f.path)} download data-git-download-patch />
        ),
      ];
    };

    const branchItem = (b: GitBranch) => (
      <div
        key={b.name}
        class={["gad-ide__git-branch", { "gad-ide__git-branch--active": b.name === branch.value }]}
        title={b.subject ? `${b.name}: ${b.subject}` : b.name}
        data-git-branch={b.name}
        onClick={() => (branch.value = b.name)}
      >
        <i class={["mdi", b.current ? "mdi-check-circle" : b.remote ? "mdi-cloud-outline" : "mdi-source-branch"]} />
        <span class="gad-ide__git-ellipsis">{b.name}</span>
      </div>
    );

    return () => {
      const d = detail.value;
      return (
        <div class="gad-ide__git" data-git-panel>
          <div class="gad-ide__git-bar">
            <span class="gad-ide__git-title">{m.value.git}</span>
            <VBtn size="x-small" variant="text" icon="mdi-refresh" title={m.value.refresh} data-git-refresh onClick={refresh} />
            {loading.value > 0 && <VProgressCircular indeterminate size={14} width={2} color="primary" />}
            {error.value && <span class="text-error text-body-2 ms-2" data-git-error>{error.value}</span>}
          <span class="gad-ide__git-spacer" />
          <ExpandButton />
          </div>
          <div class="gad-ide__git-cols">
            <div class="gad-ide__git-branches">
              <div class="gad-ide__git-head">{m.value.branches}</div>
              {local.value.map(branchItem)}
              {remote.value.length > 0 && <div class="gad-ide__git-head">{m.value.remoteBranches}</div>}
              {remote.value.map(branchItem)}
            </div>
            <div class="gad-ide__git-log">
              {commits.value.map((c, i) => (
                <div
                  key={c.hash}
                  class={["gad-ide__git-commit", { "gad-ide__git-commit--active": c.hash === selected.value }]}
                  title={`${c.hash.slice(0, 10)} — ${c.author}, ${shortDate(c.date)}`}
                  data-git-commit={c.hash}
                  onClick={() => select(c.hash)}
                >
                  <Graph row={rows.value[i]} />
                  {(c.refs ?? []).map((r) => (
                    <span class="gad-ide__git-ref">{r}</span>
                  ))}
                  <span class="gad-ide__git-ellipsis gad-ide__git-subject">{c.subject}</span>
                  <span class="gad-ide__git-meta">{c.author}</span>
                  <span class="gad-ide__git-meta">{shortDate(c.date)}</span>
                </div>
              ))}
              {more.value && (
                <VBtn size="small" variant="text" block data-git-more onClick={() => loadLog(true)}>
                  {m.value.more}
                </VBtn>
              )}
            </div>
            <div class="gad-ide__git-detail">
              {!d ? (
                <div class="pa-4 text-medium-emphasis">{m.value.chooseCommit}</div>
              ) : (
                <>
                  <div class="gad-ide__git-message" data-git-message>
                    <div class="gad-ide__git-message-head">
                      <code>{d.hash.slice(0, 10)}</code>
                      <span>{d.author} &lt;{d.email}&gt;</span>
                      <span>{shortDate(d.date)}</span>
                      {git.patchUrl && (
                        <VBtn size="x-small" variant="tonal" prependIcon="mdi-download" href={git.patchUrl(d.hash)} download title={m.value.downloadCommitPatch} data-git-download-commit-patch>
                          {m.value.patch}
                        </VBtn>
                      )}
                    </div>
                    <pre>{d.message}</pre>
                  </div>
                  <div class="gad-ide__git-fill">
                    {h(
                      DiffBrowser,
                      {
                        ...diffLabels(m.value),
                        key: d.hash,
                        files: d.files,
                        load,
                        dark: ctx.dark.value,
                        height: "100%",
                        oldLabel: d.parents[0] ? d.parents[0].slice(0, 10) : m.value.noParent,
                        newLabel: d.hash.slice(0, 10),
                      },
                      { toolbar: ({ file }: { file: DiffFile }) => fileButtons(file) },
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      );
    };
  },
});
