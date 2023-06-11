import {useSelector} from 'react-redux';
import {EditTaskRequest} from '../../domain/types';
import {useEditTaskMutation} from '../../store/api';
import {selectToken} from '../../store/slices/authSlice';

export const useEditTask = () => {
  const [edit, info] = useEditTaskMutation();
  const token = useSelector(selectToken);

  const editTask = (data: EditTaskRequest) => {
    if (!token) return;

    edit({...data, token});
  };

  return {
    editTask,
    ...info,
  };
};
