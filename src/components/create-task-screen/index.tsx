import {zodResolver} from '@hookform/resolvers/zod';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Button, Portal, Snackbar} from 'react-native-paper';
import {createTaskSchema} from '../../domain/schemas';
import {CreateTaskRequest, ResponseStatus} from '../../domain/types';
import {RootStackScreenProps} from '../../router/types';
import {useCreateTaskMutation} from '../../store/api';
import Layout from '../ui/layout';
import TextInput from '../ui/TextInput';

interface CreateTaskScreenProps extends RootStackScreenProps<'Create'> {}

export default function CreateTaskScreen({navigation}: CreateTaskScreenProps) {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const {control, handleSubmit} = useForm<CreateTaskRequest>({
    resolver: zodResolver(createTaskSchema),
  });
  const [create, {isSuccess, isLoading, data}] = useCreateTaskMutation();

  useEffect(() => {
    if (isSuccess && data?.status === ResponseStatus.OK) {
      navigation.navigate('Home');
    }
  }, [isSuccess]);

  const onDismiss = () => setIsNotificationVisible(false);

  return (
    <Layout title="Новая задача">
      <View style={{marginTop: 32}}>
        <TextInput
          control={control}
          name="username"
          placeholder="Имя пользователя"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          control={control}
          name="email"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          control={control}
          name="text"
          placeholder="Текст задачи"
          multiline
          numberOfLines={4}
        />
        <Button
          disabled={isLoading}
          loading={isLoading}
          mode="contained"
          onPress={handleSubmit(create)}>
          Создать
        </Button>
      </View>
      <Portal>
        <Snackbar visible={isNotificationVisible} onDismiss={onDismiss}>
          Задача успешно создана
        </Snackbar>
      </Portal>
    </Layout>
  );
}
