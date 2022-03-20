<script setup lang="ts">
import { useSelector } from "../helpers";

const todos = useSelector((state) => state.todos);
</script>

<template>
    <h4>Todo List</h4>
    <ul>
        <li v-for="(todo, i) in todos.todoList" :key="i">{{ todo }}</li>
    </ul>
</template>

<style scoped>
ul {
    list-style: none;
padding: 0;
}
</style>
