import React from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {Modal, Text, Portal, Button, useTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {editTaskSchema} from '../../../domain/schemas';
import {EditTaskRequest} from '../../../domain/types';
import TextInput from '../../ui/TextInput';
import RadioButtons from '../../ui/RadioButtons';
import {STATUS_LABELS} from '../../../domain/constants';
import {useEffect} from 'react';

interface EditTaskModalProps {
  isVisible: boolean;
  onClose: () => void;
  defaultValues?: EditTaskRequest;
  onSubmitEdit: (values: EditTaskRequest) => void;
  isSubmitLoading: boolean;
}

const statusRadioOptions = Object.entries(STATUS_LABELS).map(
  ([value, label]) => ({value, label}),
);

export default function EditTaskModal({
  isVisible,
  onClose,
  defaultValues,
  onSubmitEdit,
  isSubmitLoading,
}: EditTaskModalProps) {
  const theme = useTheme();
  const {control, handleSubmit, reset} = useForm<EditTaskRequest>({
    defaultValues,
    resolver: zodResolver(editTaskSchema),
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues]);

  return (
    <Portal>
      <Modal
        onDismiss={onClose}
        visible={isVisible}
        contentContainerStyle={{
          ...styles.modalContent,
          backgroundColor: theme.colors.background,
        }}>
        <Text style={styles.title} variant="headlineSmall">
          Редактирование
        </Text>
        <View>
          <TextInput control={control} name="text" placeholder="Текст задачи" />
          <Text>Выберите статус:</Text>
          <RadioButtons
            items={statusRadioOptions}
            control={control}
            name="status"
          />
          <Button
            disabled={isSubmitLoading}
            loading={isSubmitLoading}
            onPress={handleSubmit(onSubmitEdit)}
            mode="contained">
            Готово
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
  },
  title: {
    marginBottom: 16,
  },
});
