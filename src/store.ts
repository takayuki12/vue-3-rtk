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
