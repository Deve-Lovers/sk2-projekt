import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function LoginScreen1({ navigation }): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen 1</Text>
      <Button onPress={() => navigation.navigate('Login2')} title="Go to second Login screen" />
    </View>
  );
}

function LoginScreen2({ navigation }): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen 2</Text>
      <Button onPress={() => navigation.navigate('Main')} title="Go to Home" />
    </View>
  );
}

const Tab = createNativeStackNavigator();

function LoginStack(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="Login1"
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Tab.Screen name="Login1" component={LoginScreen1} />
      <Tab.Screen name="Login2" component={LoginScreen2} />
    </Tab.Navigator>
  );
}

export default LoginStack;
