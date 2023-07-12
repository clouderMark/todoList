import {createApi, fetchBaseQuery, BaseQueryFn, FetchArgs} from '@reduxjs/toolkit/query/react';
import {ICustomError, ITodoWithEmail, ITodo} from '../types/types';

const BASE_URL = process.env.REACT_APP_API_URL;

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}todo`,
    credentials: 'include',
  }) as BaseQueryFn<string | FetchArgs, unknown, ICustomError, {}>,
  endpoints: (builder) => ({
    createTodo: builder.mutation<ITodo, ITodoWithEmail>({
      query: (data) => ({
        url: '/create',
        method: 'POST',
        body: {...data},
      }),
    }),
    getAllTodo: builder.query<ITodo[], {email: string}>({
      query: (data) => ({
        url: '/getall',
        method: 'POST',
        body: {...data},
      }),
    }),
    updateTodo: builder.mutation<ITodo, ITodoWithEmail>({
      query: (data) => ({
        url: '/update',
        method: 'PUT',
        body: {...data},
      }),
    }),
    deleteTodo: builder.mutation({
      query: (data: {email: string; id: string}) => ({
        url: '/delete',
        method: 'DELETE',
        body: {...data},
      }),
    }),
  }),
});

export const {useCreateTodoMutation, useGetAllTodoQuery, useUpdateTodoMutation, useDeleteTodoMutation} = todoApi;
