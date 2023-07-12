import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './store';
import {ITodo} from '../types/types';

const initialState: ITodo = {
  title: '',
  value: '',
  id: '',
  completed: false,
};

export const todoFormSlice = createSlice({
  name: 'todoForm',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<{title: string}>) => {
      state.title = action.payload.title;
    },
    setValue: (state, action: PayloadAction<{value: string}>) => {
      state.value = action.payload.value;
    },
    setItem: (state, action: PayloadAction<{item: ITodo}>) => {
      const el = action.payload.item;

      state.id = el.id;
      state.title = el.title;
      state.value = el.value;
      state.completed = el.completed;
    },
    reset: () => initialState,
  },
});

export const selectTodoForm = (state: RootState) => state.todoForm;
export const {setTitle, setValue, setItem, reset} = todoFormSlice.actions;
