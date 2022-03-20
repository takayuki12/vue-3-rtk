I've been recently working a lot with vue 3 and composition api and i was wondering if i could use it with redux-toolkit. Even though vue has store libraries like pinia and vuex, i wanted to know if was possible to combine both together.

## Setup

First of all we're gonna create a vue 3 project using vitejs.
In our terminal, we're gonna write the following command:

```
yarn create vite
```

Write down your project's name and select vue as your template. I'll be using typescript in this tutorial.

Open the created project in your editor of choice such as vscode and then install your node dependencies.

```
yarn install # for yarn users
```

Once your dependencies have been install, we're gonna add redux toolkit to our project.

```
yarn add @reduxjs/toolkit
```

Once the installion is done, it's time to get our hands dirty.

## Create a vue plugin to add the store globally

I wanted to create an npm package that people could install and use but i was too lazy (i know 😂), so i'm gonna share the code with you.

First, create a new file in your src folder and name it 'storePlugin'.

Add the following code.

```typescript
// storePlugin.ts
import { App, inject, reactive, computed } from "vue";
import { EnhancedStore } from "@reduxjs/toolkit";

export const storeKey = Symbol("Redux-Store");

export const createRedux = (store: EnhancedStore) => {
    const rootStore = reactive<{ state: RootState }>({
        state: store.getState(),
    });
    const plugin = {
        install: (app: App) => {
            app.provide<{ state: RootState }>(storeKey, rootStore);

            store.subscribe(() => {
                rootStore.state = store.getState();
            });
        },
    };
    return plugin;
};
```

I think the code is pretty explanatory, you don't really to userstand what i did but if you're still curious, you check on how to create a vue plugin on Google.

So once our plugin is done, we are gonna create our store.

create a new file in your src folder and name it 'store'.
Inside our store file, we're gonna create our first slice and store.

```typescript
// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todoList: [] as string[],
    },
    reducers: {
        addTask: (state, action) => {
            state.todoList.push(action.payload);
        },
        removeTodo: (state) => {
            state.todoList.pop();
        },
    },
});

export const { addTask, removeTodo } = todoSlice.actions;

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Once our store created, we're gonna attach it to our vue app.

Open your main.js or main.ts in your src folder. import your store and your createRedux function and write as follow to attach the store our app

```typescript
// main.ts
import { createApp } from "vue";
import App from "./App.vue";

import { createRedux } from "./storePlugin";
import { store } from "./store";

createApp(App).use(createRedux(store)).mount("#app");
```

And bang, our store is now attached to the app but we're not done yet. In react we have some helper function such as useDispath or useSelector that are pretty handfull, but since we are not using react here, we're gonna create these functions;

Create a new file called 'helpers' and add the following code.

```typescript
// helpers.ts
import { inject, computed } from "vue";
import { store, RootState } from "./store";
import { storeKey } from "storePlugin";

export const useDispath = () => store.dispatch;

export const useSelector = <State extends RootState = RootState>(
    fn: (state: State) => State[keyof State]
) => {
    const rootStore = inject(storeKey) as { state: RootState };
    return computed(() => fn(rootStore.state as State));
};
```

Done!, we can now test it.

Open your App.vue file try it.

```vue
<script setup lang="ts">
import { addTask, removeTodo } from "./store";
import { useDispath, useSelector } from "./helpers";

import HelloWorld from "./components/HelloWorld.vue";

const dispatch = useDispath();
const todos = useSelector((state) => state.todos);

const update = () => {
    dispatch(addTask("Hello world"));
};
</script>

<template>
    <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <button @click="update">update state</button>
        <ul>
            <li v-for="(item, idx) in todos.todoList" :key="idx">{{ item }}</li>
        </ul>
        <hello-world msg="ldldl"></hello-world>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
```
