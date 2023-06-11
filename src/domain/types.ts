export enum ResponseStatus {
  ERROR = 'error',
  OK = 'ok',
}

export enum TaskStatus {
  NOT_COMPLETED = 0,
  NOT_COMPLETED_EDITED_BY_ADMIN = 1,
  COMPLETED = 10,
  COMPLETED_EDITED_BY_ADMIN = 11,
}

export interface GetTasksParams {
  sort_field?: 'id' | 'username' | 'email' | 'status';
  sort_direction?: 'asc' | 'desc';
  page?: number;
}

export interface Task {
  id: number;
  username: string;
  email: string;
  text: string;
  status: TaskStatus;
}

export interface GetTasksResponse {
  status: ResponseStatus;
  message: {
    tasks: Array<Task>;
    total_task_count: string;
  };
}

export interface CreateTaskRequest {
  username: string;
  email: string;
  text: string;
}

export interface CreateTaskResponse {
  status: ResponseStatus;
  message: Task;
}

export interface EditTaskRequest {
  text?: string;
  status?: TaskStatus;
  id: number;
}

export interface EditTaskResponse {
  status: ResponseStatus;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: ResponseStatus;
  message: {
    token: string;
    password?: string;
  };
}
