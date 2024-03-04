import { type MaybeRefOrGetter, type Ref, computed, isRef, toValue, watch } from "vue-demi";

export function useMergedState<T>(controlledRef: MaybeRefOrGetter<T | undefined>, uncontrolledRef: Ref<T>, onSet?: (value: T) => void) {
  watch(() => toValue(controlledRef), (value) => {
    if (value !== undefined) {
      uncontrolledRef.value = value;
    }
  });

  return computed({
    get() {
      const value = toValue(controlledRef);
      if (value === undefined) {
        return uncontrolledRef.value;
      }
      return value;
    },
    set(value) {
      if (isRef(controlledRef)) {
        controlledRef.value = value;
      }
      onSet?.(value);
      uncontrolledRef.value = value;
    },
  });
}
