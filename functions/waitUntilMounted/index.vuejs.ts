import { onMounted } from "vue-demi";
import { useMounted } from "@bernankez/utils/vue";

export function waitUntilMounted() {
  const { mounted } = useMounted();

  if (mounted) {
    return Promise.resolve();
  }
  return new Promise<void>((resolve) => {
    onMounted(resolve);
  });
}
