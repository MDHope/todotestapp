import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {
  CreateTaskResponse,
  CreateTaskRequest,
  GetTasksResponse,
  LoginRequest,
  LoginResponse,
  GetTasksParams,
  EditTaskResponse,
  EditTaskRequest,
} from '../../domain/types';

const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2';

const convertToFormdata = (data: Record<string, any>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));

  return formData;
};

export const rootApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: build => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: '/login',
        method: 'POST',
        params: {
          developer: 'Ruslan',
        },
        body: convertToFormdata(body),
      }),
    }),
    getTasks: build.query<GetTasksResponse, GetTasksParams>({
      providesTags: res =>
        res?.message?.tasks?.length
          ? [
              ...res.message.tasks.map(
                task => ({type: 'TASK', id: task.id} as const),
              ),
            ]
          : ['TASK'],
      query: params => ({
        url: '/',
        params: {
          ...params,
          developer: 'Ruslan',
        },
      }),
    }),
    createTask: build.mutation<CreateTaskResponse, CreateTaskRequest>({
      invalidatesTags: ['TASK'],
      query: body => ({
        url: '/create',
        method: 'POST',
        body: convertToFormdata(body),
        params: {
          developer: 'Ruslan',
        },
      }),
    }),
    editTask: build.mutation<
      EditTaskResponse,
      EditTaskRequest & {token: string}
    >({
      invalidatesTags: (_r, _e, args) => [{type: 'TASK', id: args.id}],
      query: ({id, ...body}) => ({
        url: `/edit/${id}`,
        body: convertToFormdata(body),
        method: 'POST',
        params: {
          developer: 'Ruslan',
        },
      }),
    }),
  }),
  tagTypes: ['TASK'],
});

export const {
  useGetTasksQuery,
  useLoginMutation,
  useEditTaskMutation,
  useCreateTaskMutation,
} = rootApi;
