import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Toast from 'react-native-root-toast';
import {useSelector} from 'react-redux';
import {Task} from '../../domain/types';
import {RootStackScreenProps} from '../../router/types';
import {useGetTasksQuery} from '../../store/api';
import {selectToken} from '../../store/slices/authSlice';
import Layout from '../ui/layout';
import Loader from '../ui/Loader';
import EditTaskModal from './edit-task-modal';
import Filters from './filters';
import {useFilters} from './filters/useFilters';
import Pagination from './pagination';
import TodoItem from './todo-item';
import {useEditTask} from './useEditTask';

interface HomeScreenProps extends RootStackScreenProps<'Home'> {}

export default function HomeScreen({navigation}: HomeScreenProps) {
  const token = useSelector(selectToken);
  const {filters, onFilterClick, onPageClick} = useFilters();
  const {
    data: tasksData,
    isLoading: isTasksLoading,
    isFetching: isTasksFetching,
  } = useGetTasksQuery(filters);
  const {
    editTask,
    isSuccess: isEditSuccess,
    isLoading: isEditLoading,
  } = useEditTask();

  const [taskToEdit, setTaskToEdit] = useState<Task>();

  useEffect(() => {
    if (isEditSuccess) {
      Toast.show('Задача успешно обновлена', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        hideOnPress: true,
      });
      onModalClose();
    }
  }, [isEditSuccess]);

  const onModalClose = () => setTaskToEdit(undefined);
  const onEditClick = (task: Task) => setTaskToEdit(task);
  const onCreateClick = () => navigation.navigate('Create');

  return (
    <Layout title="Список задач">
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Button
            onPress={onCreateClick}
            mode="contained"
            style={{marginBottom: 12}}>
            Создать задачу
          </Button>
          <View>
            <Filters
              selectedField={filters.sort_field}
              selectedSort={filters.sort_direction}
              onFilterClick={onFilterClick}
            />
            <View>
              <View style={{marginTop: 16, gap: 8, minHeight: 150}}>
                {isTasksLoading || isTasksFetching ? <Loader /> : null}
                {tasksData?.message?.tasks?.map(task => (
                  <TodoItem
                    key={task.id}
                    isEditable={!!token}
                    item={task}
                    onEditClick={() => onEditClick(task)}
                  />
                ))}
              </View>
              {tasksData?.message?.total_task_count ? (
                <Pagination
                  totalItems={+tasksData.message.total_task_count}
                  activePage={filters.page}
                  onPageClick={onPageClick}
                />
              ) : null}
            </View>
          </View>
          <EditTaskModal
            isVisible={!!taskToEdit}
            defaultValues={taskToEdit}
            onClose={onModalClose}
            onSubmitEdit={editTask}
            isSubmitLoading={isEditLoading}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
  },
  content: {
    flex: 1,
    paddingVertical: 20,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});
