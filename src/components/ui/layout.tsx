import React, {ReactNode, useEffect} from 'react';
import {View} from 'react-native';
import {Appbar, Button, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectToken, setToken} from '../../store/slices/authSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getToken} from '../../store/api/helpers';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({children, title}: LayoutProps) {
  const token = useSelector(selectToken);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    const setupToken = async () => {
      const tokenFromStorage = await getToken();

      if (tokenFromStorage) {
        dispatch(setToken(tokenFromStorage));
      }
    };

    if (!token) {
      setupToken();
    }
  }, []);

  const onButtonPress = () => {
    if (token) {
      dispatch(logout());
      navigation.navigate('Home');
    } else {
      navigation.navigate('Signin');
    }
  };
  const onBack = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1}}>
      <Appbar.Header elevated>
        {route.name !== 'Home' ? <Appbar.BackAction onPress={onBack} /> : null}
        <Appbar.Content title={title} />
        {route.name !== 'Signin' ? (
          <Button onPress={onButtonPress}>{token ? 'Выйти' : 'Войти'}</Button>
        ) : null}
      </Appbar.Header>
      <View
        style={{
          paddingHorizontal: 8,
          flexGrow: 1,
          backgroundColor: theme.colors.background,
        }}>
        {children}
      </View>
    </View>
  );
}
