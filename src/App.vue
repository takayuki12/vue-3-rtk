<script setup lang="ts">
import { ref } from "vue";

import TodoList from "./components/TodoList.vue";
import { useDispath } from "./helpers";
import { addTask } from "./store";

const newTodo = ref("");
const dispatch = useDispath();

const update = () => {
    if (newTodo.value.length) {
        dispatch(addTask(newTodo.value));
        newTodo.value = "";
    }
};
</script>

<template>
    <div>
        <input type="text" v-model="newTodo" />
        <button @click="update">Add todo</button>
        <todo-list></todo-list>
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
