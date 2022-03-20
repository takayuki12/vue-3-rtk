import { computed, inject } from "vue";
import { RootState, store } from "./store";
import { storeKey } from "./storePlugin";

export const useDispath = () => store.dispatch;

export const useSelector = <State extends RootState = RootState>(
    fn: (state: State) => State[keyof State]
) => {
    const _state = inject(storeKey) as { state: RootState };

    return computed(() => fn(_state.state as State));
};
