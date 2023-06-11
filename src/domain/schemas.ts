import {z} from 'zod';
import {
  CreateTaskRequest,
  EditTaskRequest,
  LoginRequest,
  TaskStatus,
} from './types';

const requiredError = 'Поле обязательно для заполнения';
const invalidEmailError = 'Email не валиден';

export const loginSchema: z.ZodSchema<LoginRequest> = z.object({
  username: z.string({required_error: requiredError}).min(1, requiredError),
  password: z.string({required_error: requiredError}).min(1, requiredError),
});

export const createTaskSchema: z.ZodSchema<CreateTaskRequest> = z.object({
  username: z.string({required_error: requiredError}).min(1, requiredError),
  email: z.string({required_error: requiredError}).email(invalidEmailError),
  text: z.string({required_error: requiredError}).min(1, requiredError),
});

export const editTaskSchema: z.ZodSchema<EditTaskRequest> = z.object({
  text: z.string().optional(),
  status: z.nativeEnum(TaskStatus).optional(),
  id: z.number(),
});
