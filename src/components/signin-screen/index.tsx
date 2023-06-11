import TextInput from '../ui/TextInput';
import {Button, Portal, Snackbar} from 'react-native-paper';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import {LoginRequest, ResponseStatus} from '../../domain/types';
import {zodResolver} from '@hookform/resolvers/zod';
import {loginSchema} from '../../domain/schemas';
import Layout from '../ui/layout';
import {useLoginMutation} from '../../store/api';
import {useEffect, useState} from 'react';
import {RootStackScreenProps} from '../../router/types';

interface SigninScreenProps extends RootStackScreenProps<'Signin'> {}

export default function SigninScreen({navigation}: SigninScreenProps) {
  const [notificationMessage, setNotificationMessage] = useState<string>();
  const [login, {isSuccess, data, isLoading}] = useLoginMutation();
  const {control, handleSubmit} = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!isSuccess) return;

    if (data?.status === ResponseStatus.OK) {
      navigation.navigate('Home');
    }

    if (data?.status === ResponseStatus.ERROR) {
      setNotificationMessage(
        data.message?.password || 'Что-то пошло не так :(',
      );
    }
  }, [isSuccess]);

  const onDismiss = () => setNotificationMessage(undefined);

  return (
    <Layout title="Авторизация">
      <View style={{marginTop: 24}}>
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
          name="password"
          placeholder="Пароль"
          secureTextEntry
        />
        <Button
          loading={isLoading}
          disabled={isLoading}
          mode="contained"
          onPress={handleSubmit(login)}
          style={{marginTop: 16}}>
          Войти
        </Button>
        <Portal>
          <Snackbar
            visible={!!notificationMessage}
            onDismiss={onDismiss}
            duration={3500}>
            {notificationMessage}
          </Snackbar>
        </Portal>
      </View>
    </Layout>
  );
}
