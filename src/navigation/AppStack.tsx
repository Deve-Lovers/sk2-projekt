import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginStack from 'petCare/src/navigation/LoginStack';
import MainStack from 'petCare/src/navigation/MainStack';

const Stack = createNativeStackNavigator();

function AppStack(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        <Stack.Screen name="Login" component={LoginStack} />
        <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
