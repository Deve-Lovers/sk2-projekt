import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from 'sk/src/screens/Login/SignIn';
import SignUp from 'sk/src/screens/Login/SignUp';
import LoginForm from 'sk/src/screens/Login/LoginForm';
import { SafeAreaView } from 'react-native';
import { theme } from 'sk/src/helpers/theme';

const Login = createNativeStackNavigator();

function LoginStack(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Login.Navigator
        initialRouteName="SignIn"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Login.Screen name="SignIn" component={SignIn} />
        <Login.Screen name="SignUp" component={SignUp} />
        <Login.Screen name="LoginForm" component={LoginForm} />
      </Login.Navigator>
    </SafeAreaView>
  );
}

export default LoginStack;
