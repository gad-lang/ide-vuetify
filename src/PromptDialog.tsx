// PromptDialog / ConfirmDialog — in-app replacements for window.prompt /
// window.confirm, driven by the controller's PromptRequest / ConfirmRequest.
import { inject, computed, defineComponent, ref, watch, type PropType } from "vue";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "./messages";
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VDialog, VSpacer, VTextField } from "./vuetify";
import type { ConfirmRequest, PromptRequest } from "./controller";

export const PromptDialog = defineComponent({
  name: "PromptDialog",
  props: { request: { type: Object as PropType<PromptRequest | null>, default: null } },
  emits: { done: () => true },
  setup(props, { emit }) {
    const w = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    const value = ref("");
    watch(
      () => props.request,
      (r) => { if (r) value.value = r.initial; },
    );
    const submit = (ok: boolean) => {
      props.request?.resolve(ok ? value.value.trim() : null);
      emit("done");
    };
    return () => (
      <VDialog
        modelValue={!!props.request}
        {...{ "onUpdate:modelValue": (v: boolean) => { if (!v) submit(false); } }}
        maxWidth="420"
      >
        <VCard>
          <VCardTitle>{props.request?.title}</VCardTitle>
          <VCardText>
            <VTextField
              modelValue={value.value}
              {...{ "onUpdate:modelValue": (v: string) => (value.value = v) }}
              label={props.request?.label}
              density="compact"
              variant="outlined"
              autofocus
              hideDetails
              onKeyup={(e: KeyboardEvent) => e.key === "Enter" && submit(true)}
            />
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn onClick={() => submit(false)}>{w.value.cancel}</VBtn>
            <VBtn color="primary" onClick={() => submit(true)}>{w.value.ok}</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    );
  },
});

export const ConfirmDialog = defineComponent({
  name: "ConfirmDialog",
  props: { request: { type: Object as PropType<ConfirmRequest | null>, default: null } },
  emits: { done: () => true },
  setup(props, { emit }) {
    const w = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    const answer = (ok: boolean) => {
      props.request?.resolve(ok);
      emit("done");
    };
    return () => (
      <VDialog
        modelValue={!!props.request}
        {...{ "onUpdate:modelValue": (v: boolean) => { if (!v) answer(false); } }}
        maxWidth="420"
      >
        <VCard>
          <VCardTitle>{props.request?.title}</VCardTitle>
          <VCardText>{props.request?.message}</VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn onClick={() => answer(false)}>{w.value.cancel}</VBtn>
            <VBtn color="primary" onClick={() => answer(true)}>{w.value.ok}</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    );
  },
});
