import { getCurrentInstance, onMounted, ref } from "vue-demi";

export function useMounted() {
  const mounted = ref(false);

  if (getCurrentInstance()) {
    onMounted(() => {
      mounted.value = true;
    });
  }

  return { mounted };
}
