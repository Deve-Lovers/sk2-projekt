import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from 'sk/src/screens/Login/SignIn';
import SignUp from 'sk/src/screens/Login/SignUp';
import LoginForm from 'sk/src/screens/Login/LoginForm';

const Login = createNativeStackNavigator();

function LoginStack(): JSX.Element {
  return (
    <Login.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Login.Screen name="SignIn" component={SignIn} />
      <Login.Screen name="SignUp" component={SignUp} />
      <Login.Screen name="LoginForm" component={LoginForm} />
    </Login.Navigator>
  );
}

export default LoginStack;
