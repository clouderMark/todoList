import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

interface IUser {
  token: string;
}

interface IRequest {
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}user`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    signupUser: builder.mutation<IUser, IRequest>({
      query: (data) => ({
        url: '/signup',
        method: 'POST',
        body: {...data, role: 'USER'},
      }),
    }),
    loginUser: builder.mutation<IUser, IRequest>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: {...data, role: 'USER'},
      }),
    }),
    checkUser: builder.mutation<IUser, string>({
      query: (token) => ({
        url: '/check',
        method: 'GET',
        headers: {authorization: `Bearer ${token}`},
      }),
    }),
  }),
});

export const {useSignupUserMutation, useLoginUserMutation, useCheckUserMutation} = userApi;
