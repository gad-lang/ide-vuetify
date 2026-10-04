// MoveDialog — pick the folder the open file is moved to (ctx.moveReq).
import { defineComponent, inject, ref, watch } from "vue";
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSpacer } from "./vuetify";
import DirTree from "./DirTree";
import { IdeControllerKey } from "./controller";

export default defineComponent({
  name: "MoveDialog",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const dir = ref("");
    // starts at the file's own folder
    watch(
      () => ctx.moveReq.value,
      (req) => {
        if (req) dir.value = req.path.includes("/") ? req.path.slice(0, req.path.lastIndexOf("/")) : "";
      },
    );
    const done = (v: string | null) => ctx.moveReq.value?.resolve(v);
    return () => (
      <VDialog modelValue={!!ctx.moveReq.value} {...{ "onUpdate:modelValue": (v: boolean) => !v && done(null) }} maxWidth="480">
        <VCard>
          <VCardTitle>Move {ctx.moveReq.value?.path}</VCardTitle>
          <VCardText>
            <div class="text-caption mb-1">To the folder: {dir.value || "/ (root)"}</div>
            <div class="dirtree-box">
              <DirTree root={ctx.tree.value} selected={dir.value} onSelect={(p: string) => (dir.value = p)} />
            </div>
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn variant="text" onClick={() => done(null)}>Cancel</VBtn>
            <VBtn color="primary" variant="flat" onClick={() => done(dir.value)}>Move</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    );
  },
});
