import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from 'petCare/src/screens/Login/SignIn';
import SignUp from 'petCare/src/screens/Login/SignUp';

const Login = createNativeStackNavigator();

function LoginStack(): JSX.Element {
  return (
    <Login.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Login.Screen name="SignIn" component={SignIn} />
      <Login.Screen name="SignUp" component={SignUp} />
    </Login.Navigator>
  );
}

export default LoginStack;
