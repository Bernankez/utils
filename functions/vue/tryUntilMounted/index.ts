import { onMounted } from "vue-demi";
import { useMounted } from "@bernankez/utils/vue";

export function tryUntilMounted(fn: () => void) {
  const { mounted } = useMounted();
  if (mounted.value) {
    fn();
  } else {
    onMounted(() => {
      fn();
    });
  }
}
