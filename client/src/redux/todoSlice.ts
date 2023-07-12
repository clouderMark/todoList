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
  },
});

export const selectTodo = (state: RootState) => state.todo;
export const {setTodo} = todoSlice.actions;
