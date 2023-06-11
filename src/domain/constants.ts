import {TaskStatus} from './types';

export const STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.COMPLETED]: 'Выполнена',
  [TaskStatus.NOT_COMPLETED]: 'Не выполнена',
  [TaskStatus.COMPLETED_EDITED_BY_ADMIN]: 'Выполнена, отредактирована админом',
  [TaskStatus.NOT_COMPLETED_EDITED_BY_ADMIN]:
    'Не выполнена, отредактирована админом',
};
