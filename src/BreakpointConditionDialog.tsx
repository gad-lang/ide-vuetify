// BreakpointConditionDialog — edit a breakpoint's condition (a Gad expression;
// the breakpoint pauses only when it is truthy) and its disabled flag.
import { inject, computed, defineComponent, ref, watch, type PropType } from "vue";
import { VBtn, VCard, VCardActions, VCardText, VCardTitle, VCheckbox, VDialog, VSpacer, VTextField } from "./vuetify";
import type { BpMeta } from "./controller";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "./messages";

export default defineComponent({
  name: "BreakpointConditionDialog",
  props: {
    modelValue: { type: Boolean, required: true },
    line: { type: Number, default: 0 },
    initial: { type: Object as PropType<BpMeta>, default: () => ({}) },
  },
  emits: {
    "update:modelValue": (_v: boolean) => true,
    save: (_m: BpMeta) => true,
  },
  setup(props, { emit }) {
    const w = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    const condition = ref(props.initial.condition ?? "");
    const disabled = ref(!!props.initial.disabled);
    watch(
      () => props.modelValue,
      (open) => {
        if (open) {
          condition.value = props.initial.condition ?? "";
          disabled.value = !!props.initial.disabled;
        }
      },
    );
    function save() {
      emit("save", { condition: condition.value.trim() || undefined, disabled: disabled.value });
      emit("update:modelValue", false);
    }
    return () => (
      <VDialog
        modelValue={props.modelValue}
        {...{ "onUpdate:modelValue": (v: boolean) => emit("update:modelValue", v) }}
        maxWidth="440"
      >
        <VCard>
          <VCardTitle>Breakpoint · line {props.line}</VCardTitle>
          <VCardText>
            <VTextField
              modelValue={condition.value}
              {...{ "onUpdate:modelValue": (v: string) => (condition.value = v) }}
              label={w.value.condition}
              hint={w.value.conditionHint}
              persistentHint
              density="compact"
              variant="outlined"
              autofocus
              onKeyup={(e: KeyboardEvent) => e.key === "Enter" && save()}
            />
            <VCheckbox
              modelValue={disabled.value}
              {...{ "onUpdate:modelValue": (v: boolean | null) => (disabled.value = !!v) }}
              label={w.value.disabled}
              density="compact"
              hideDetails
              class="mt-2"
            />
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn onClick={() => emit("update:modelValue", false)}>{w.value.cancel}</VBtn>
            <VBtn color="primary" onClick={save}>{w.value.save}</VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    );
  },
});
