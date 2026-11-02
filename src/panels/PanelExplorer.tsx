// Explorer dockview panel: the workspace file tree with create/upload/delete/
// reset. When the host provides an onUpload handler, files (and directories) can
// be uploaded via a dialog (with a target-folder picker) or dragged and dropped
// onto a folder row (or the panel background = root). Without onUpload, the
// upload button, URL import and drag-drop are all omitted.
// A file or folder of the tree dragged onto a folder (or the background: the
// root) is moved there (canMove): the folder under the drag lit, a closed one
// opened after a moment, the move confirmed (from, to) when dropped.
import { computed, defineComponent, inject, ref } from "vue";
import { VBtn, VIcon } from "../vuetify";
import { IdeControllerKey } from "../controller";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "../messages";
import UploadReviewDialog from "../UploadReviewDialog";
import { rawFromDataTransfer, rawFromInput, type RawFile } from "../upload";
import { gadFileIconFor } from "../gadFileIcons";
import type { UploadedFile } from "../api";

export default defineComponent({
  name: "PanelExplorer",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const w = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    const fileInput = ref<HTMLInputElement>();
    // The path of the directory row currently under a drag (null = none).
    const dropDir = ref<string | null>(null);
    // Review dialog: the picked/dropped raw files awaiting confirmation. onUpload
    // runs only after the user confirms (target dir / rename / extract / replace).
    const reviewOpen = ref(false);
    const rawFiles = ref<RawFile[]>([]);
    const reviewDir = ref("");

    // the move by dragging: the path dragged, the folder it would go into
    // (null: none — not there, into itself, or where it is)
    const MIME = "application/x-gad-ide-path";
    const dragSrc = ref<string | null>(null);
    const moveDir = ref<string | null>(null);
    let openTimer: ReturnType<typeof setTimeout> | undefined;
    let openFor = "";
    const movable = (src: string, dir: string) =>
      parentDir(src) !== dir && dir !== src && !dir.startsWith(src + "/");
    // overMove marks dir as where the drag would drop (a folder row: opened
    // when held over it)
    function overMove(e: DragEvent, dir: string, row?: { dir: boolean; path: string }) {
      const src = dragSrc.value;
      if (src === null) return false;
      e.stopPropagation();
      if (!movable(src, dir)) {
        moveDir.value = null;
        return true;
      }
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
      moveDir.value = dir;
      if (row?.dir && !ctx.isExpanded(row.path) && openFor !== row.path) {
        clearTimeout(openTimer);
        openFor = row.path;
        openTimer = setTimeout(() => {
          if (moveDir.value === row.path && !ctx.isExpanded(row.path)) ctx.toggleDir(row.path);
        }, 700);
      }
      return true;
    }
    function dropMove(e: DragEvent, dir: string) {
      const src = dragSrc.value;
      if (src === null) return false;
      e.preventDefault();
      e.stopPropagation();
      endDrag();
      if (movable(src, dir)) void ctx.dropMove(src, dir);
      return true;
    }
    function endDrag() {
      dragSrc.value = null;
      moveDir.value = null;
      openFor = "";
      clearTimeout(openTimer);
    }

    const parentDir = (path: string) => {
      const s = path.lastIndexOf("/");
      return s === -1 ? "" : path.slice(0, s);
    };

    function openReview(raw: RawFile[], targetDir: string) {
      if (!raw.length) return;
      rawFiles.value = raw;
      reviewDir.value = targetDir;
      reviewOpen.value = true;
    }
    async function onDrop(e: DragEvent, targetDir: string) {
      dropDir.value = null;
      if (!ctx.canUpload.value || !e.dataTransfer) return;
      openReview(await rawFromDataTransfer(e.dataTransfer), targetDir);
    }
    async function onPick(e: Event) {
      const input = e.target as HTMLInputElement;
      const raw = rawFromInput(input.files);
      input.value = "";
      openReview(raw, "");
    }

    return () => (
      <div class="pnl">
        <div class="pnl-head">
          <span class="text-caption font-weight-medium">{w.value.explorer.toUpperCase()}</span>
          <div>
            {ctx.canCreate.value && (
              <>
                <VBtn size="x-small" variant="text" icon="mdi-file-plus-outline" title={w.value.newFile} onClick={() => ctx.newFile()} />
                <VBtn size="x-small" variant="text" icon="mdi-folder-plus-outline" title={w.value.newFolder} onClick={() => ctx.newDir()} />
              </>
            )}
            {ctx.canUpload.value && (
              <>
                <VBtn size="x-small" variant="text" icon="mdi-upload-outline" title={w.value.uploadFiles} onClick={() => fileInput.value?.click()} />
                <VBtn size="x-small" variant="text" icon="mdi-link-variant" title={w.value.importFromUrl} onClick={() => (ctx.urlDialog.value = true)} />
              </>
            )}
            {ctx.canRename.value && (
              <VBtn size="x-small" variant="text" icon="mdi-rename-outline" title={w.value.renameOpenFile}
                disabled={!ctx.openPath.value} onClick={() => ctx.renameOpen()} />
            )}
            {ctx.canMove.value && (
              <VBtn size="x-small" variant="text" icon="mdi-file-move-outline" title={w.value.moveOpenFile}
                disabled={!ctx.openPath.value} onClick={() => ctx.moveOpen()} />
            )}
            {ctx.canDelete.value && (
              <VBtn size="x-small" variant="text" icon="mdi-delete-outline" title={w.value.deleteOpenFile}
                disabled={!ctx.openPath.value} onClick={() => ctx.removeOpen()} />
            )}
            <VBtn
              size="x-small"
              variant="text"
              icon={ctx.showHidden.value ? "mdi-eye-off-outline" : "mdi-eye-outline"}
              title={ctx.showHidden.value ? w.value.hideHidden : w.value.showHidden}
              onClick={() => ctx.toggleHidden()}
            />
            {ctx.canReset.value && ctx.canEdit.value && (
              <VBtn size="x-small" variant="text" icon="mdi-backup-restore" title={w.value.resetChanges} onClick={() => ctx.reset()} />
            )}
          </div>
        </div>
        <div
          class={["pnl-body", { "pnl-body--drop": (ctx.canUpload.value && dropDir.value === "") || moveDir.value === "" }]}
          onDragover={(e: DragEvent) => {
            if (overMove(e, "")) return;
            if (ctx.canUpload.value) { e.preventDefault(); dropDir.value = ""; }
          }}
          onDragleave={() => { dropDir.value = null; moveDir.value = null; }}
          onDrop={(e: DragEvent) => {
            if (dropMove(e, "")) return;
            if (ctx.canUpload.value) { e.preventDefault(); void onDrop(e, ""); }
          }}
        >
          {ctx.rows.value.map((row) => {
            const rowDir = row.node.dir ? row.node.path : parentDir(row.node.path);
            return (
              <div
                key={row.node.path}
                class={["pnl-row", {
                  "pnl-row--active": row.node.path === ctx.openPath.value,
                  "pnl-row--drop": ctx.canUpload.value && dragSrc.value === null && dropDir.value === rowDir,
                  "pnl-row--movedrop": row.node.dir && moveDir.value === row.node.path,
                  "pnl-row--dragged": dragSrc.value === row.node.path,
                }]}
                style={{ paddingLeft: 6 + row.depth * 14 + "px" }}
                data-path={row.node.path}
                draggable={ctx.canMove.value}
                onDragstart={(e: DragEvent) => {
                  if (!ctx.canMove.value || !e.dataTransfer) return;
                  e.dataTransfer.setData(MIME, row.node.path);
                  e.dataTransfer.effectAllowed = "move";
                  dragSrc.value = row.node.path;
                }}
                onDragend={endDrag}
                onClick={() => (row.node.dir ? ctx.toggleDir(row.node.path) : ctx.openFile(row.node.path))}
                onDragover={(e: DragEvent) => {
                  if (overMove(e, rowDir, { dir: row.node.dir, path: row.node.path })) return;
                  if (ctx.canUpload.value) { e.preventDefault(); e.stopPropagation(); dropDir.value = rowDir; }
                }}
                onDrop={(e: DragEvent) => {
                  if (dropMove(e, rowDir)) return;
                  if (ctx.canUpload.value) { e.preventDefault(); e.stopPropagation(); void onDrop(e, rowDir); }
                }}
              >
                {!row.node.dir && gadFileIconFor(row.node.path) ? (
                  <img
                    src={gadFileIconFor(row.node.path)}
                    alt=""
                    width="16"
                    height="16"
                    class="mr-1"
                    style={{ imageRendering: "pixelated", verticalAlign: "-3px" }}
                  />
                ) : (
                  <VIcon size="16" class="mr-1">
                    {row.node.dir
                      ? ctx.isExpanded(row.node.path)
                        ? "mdi-folder-open-outline"
                        : "mdi-folder-outline"
                      : ctx.iconFor(row.node.path)}
                  </VIcon>
                )}
                <span class="pnl-ellipsis">{row.node.name}</span>
              </div>
            );
          })}
          {ctx.canUpload.value && dragSrc.value === null && dropDir.value !== null && (
            <div class="pnl-drop-hint">Drop into {dropDir.value || "/ (root)"}</div>
          )}
          {moveDir.value !== null && (
            <div class="pnl-drop-hint" data-move-hint>{w.value.move} → /{moveDir.value}</div>
          )}
        </div>
        <input ref={fileInput} type="file" multiple style={{ display: "none" }} onChange={onPick} />

        <UploadReviewDialog
          modelValue={reviewOpen.value}
          {...{ "onUpdate:modelValue": (v: boolean) => (reviewOpen.value = v) }}
          raw={rawFiles.value}
          initialDir={reviewDir.value}
          onConfirm={(files: UploadedFile[], targetDir: string) => ctx.upload(files, targetDir)}
        />
      </div>
    );
  },
});
