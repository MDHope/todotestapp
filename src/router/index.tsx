import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackParamList} from './types';
import HomeScreen from '../components/home-screen';
import SigninScreen from '../components/signin-screen';
import CreateTaskScreen from '../components/create-task-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="Signin"
        options={{headerShown: false}}
        component={SigninScreen}
      />
      <Stack.Screen
        name="Create"
        options={{headerShown: false}}
        component={CreateTaskScreen}
      />
    </Stack.Navigator>
  );
}
