// Output dockview panel: STDOUT/STDERR from Run and the debugger, plus errors.
import { computed, defineComponent, inject } from "vue";
import { IdeControllerKey } from "../controller";
import { DEFAULT_MESSAGES, IdeMessagesKey } from "../messages";

export default defineComponent({
  name: "PanelOutput",
  setup() {
    const ctx = inject(IdeControllerKey)!;
    const w = inject(IdeMessagesKey, computed(() => DEFAULT_MESSAGES));
    return () => {
      const run = ctx.runRes.value;
      return (
        <div class="pnl">
          <div class="pnl-body">
            {run && (
              <>
                {run.stdout && <pre class="pnl-out">{run.stdout}</pre>}
                {run.stderr && <pre class="pnl-out pnl-out--err">{run.stderr}</pre>}
                {run.ok && run.result && <div class="pnl-return">↩ {run.result}</div>}
                {(run.diagnostics ?? []).map((d, i) => (
                  <div key={i} class="pnl-diag">{d.line}:{d.column} {d.message}</div>
                ))}
              </>
            )}
            {ctx.dbgOutput.value && <pre class="pnl-out">{ctx.dbgOutput.value}</pre>}
            {(ctx.snap.value?.diagnostics ?? []).map((d, i) => (
              <div key={"s" + i} class="pnl-diag">{d.line}:{d.column} {d.message}</div>
            ))}
            {!run && !ctx.dbgOutput.value && <div class="text-medium-emphasis">{w.value.runToSeeOutput}</div>}
          </div>
        </div>
      );
    };
  },
});
