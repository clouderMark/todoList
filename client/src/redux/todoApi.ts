import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, ITodoWithEmail, ICompletedTodo} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}todo`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    createTodo: builder.mutation<ICompletedTodo, ITodoWithEmail>({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: {...data},
      }),
    }),
    getAllTodo: builder.query<ICompletedTodo[], {email: string}>({
      query: (data) => ({
        url: '/getall',
        method: 'POST',
        body: {...data},
      }),
    }),
  }),
});

export const {useCreateTodoMutation, useGetAllTodoQuery} = todoApi;
