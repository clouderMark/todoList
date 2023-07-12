import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from './store';

interface IInitialState {
  isOpen: boolean;
}

const initialState: IInitialState = {
  isOpen: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setShowLoader: (state) => {
      state.isOpen = true;
    },
    closeLoader: (state) => {
      state.isOpen = false;
    },
  },
});

export const selectLoader = (state: RootState) => state.loader;
export const {setShowLoader, closeLoader} = loaderSlice.actions;
