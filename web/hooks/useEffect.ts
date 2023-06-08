/**
 * @author 胡小右
 * @date 2023-05-09 21:37:30
 * @desc React中的useEffect完整版仿造 用法完全一致
 */
import { Ref, watch, onUnmounted, nextTick } from 'vue';

type Effect = () => void | (() => void | Promise<void>);

export default function useEffect(effect: Effect, deps?: Ref<any>[]): (() => void) | void {
    let cleanup: void | (() => void | Promise<void>);
    let watchStop: void | (() => void);
    if (deps) {
        void nextTick(() => {
            cleanup = effect();
        });

        // 监听deps变化
        watchStop = watch(
            deps,
            () => {
                cleanup && cleanup();
                cleanup = effect();
            },
            { deep: true }
        );

        onUnmounted(() => {
            cleanup && cleanup();
            watchStop && watchStop();
        });
    } else {
        void nextTick(() => {
            cleanup = effect();
        });
        onUnmounted(() => {
            cleanup && cleanup();
        });
    }
    return cleanup || undefined;
}
