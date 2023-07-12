import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {ICompletedTodo} from '../types/types';

interface IInitialState {
  todos: ICompletedTodo[];
}

const initialState: IInitialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<{todos: ICompletedTodo[]}>) => {
      state.todos = [...state.todos, ...action.payload.todos];
    },
    removeTodo: (state, action: PayloadAction<{id: string}>) => {
      state.todos = [...state.todos.filter((item) => item.id !== action.payload.id)];
    },
  },
});

export const selectTodo = (state: RootState) => state.todo;
export const {setTodo, removeTodo} = todoSlice.actions;
