import { EnhancedStore } from "@reduxjs/toolkit";
import { App, inject, Ref, ref, reactive, toRefs, computed } from "vue";
import { store, RootState } from "./store";

export const storeKey = Symbol("Redux-Store");

export const useStore = () => {
    const store = <{ state: RootState }>inject(storeKey);
    return store;
};


export const createRedux = (store: EnhancedStore) => {
    const _store = ref(store);
    // const _state = ref({ state: store.getState() });
    const _state = reactive<{ state: RootState }>({ state: store.getState() });
    const redux = {
        install: (app: App) => {
            app.provide<{ state: RootState }>(storeKey, _state);
            // app.provide("store", _store);

            store.subscribe(() => {
                _state.state = store.getState();
            });
        },
    };
    return redux;
};
