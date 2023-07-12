import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import type {RootState} from './store';

interface IInitialState {
  id: number | null;
  email: string | null;
  isAuth: boolean;
  isAdmin: boolean;
  token: null | string;
}

interface IRegistration {
  email: string;
  id: number;
  role: 'USER' | 'ADMIN';
}

const initialState: IInitialState = {
  id: null,
  email: null,
  isAuth: false,
  isAdmin: false,
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{token: string}>) => {
      const {token} = action.payload;

      const user = jwtDecode(token) as IRegistration;

      localStorage.setItem('token', token);

      state.id = user.id;
      state.email = user.email;
      state.isAuth = true;
      state.isAdmin = user.role === 'ADMIN';
      state.token = token;
    },
    logout: () => {
      localStorage.removeItem('token');

      return initialState;
    },
    getToken: (state) => {
      const token = localStorage.getItem('token');

      state.token = token;
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const {login, logout, getToken} = userSlice.actions;
