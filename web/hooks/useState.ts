/**
 * @author 胡小右
 * @date 2023-05-06 19:46:46
 * @desc React中的useState完整版仿造 用法完全一致
 */
import { ref, computed, UnwrapRef, ComputedRef } from 'vue';

export default function useState<T>(defaultValue: T | (() => T)): [ComputedRef<UnwrapRef<T>>, (value: UnwrapRef<T> | ((prevValue: UnwrapRef<T>) => UnwrapRef<T>)) => void] {
    const state = ref(typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue);

    const setState = (value: UnwrapRef<T> | ((prevValue: UnwrapRef<T>) => UnwrapRef<T>)) => {
        state.value = typeof value === 'function' ? (value as (prevValue: UnwrapRef<T>) => UnwrapRef<T>)(state.value) : value;
    };

    return [computed(() => state.value), setState];
}
