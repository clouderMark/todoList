import {configureStore} from '@reduxjs/toolkit';
import {userApi} from './userApi';
import {userSlice} from './userSlice';
import {alertSlice} from './alertSlice';
import {todoApi} from './todoApi';
import {loaderSlice} from './loaderSlice';
import {todoSlice} from './todoSlice';
import {todoFormSlice} from './todoFormSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    alert: alertSlice.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    todo: todoSlice.reducer,
    loader: loaderSlice.reducer,
    todoForm: todoFormSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
