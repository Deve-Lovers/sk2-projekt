import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginStack from 'petCare/src/navigation/LoginStack';
import MainStack from 'petCare/src/navigation/MainStack';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

function AppStack(props: { accessToken: string }): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false, gestureEnabled: false }}
      >
        {props.accessToken ? (
          <Stack.Screen name="Main" component={MainStack} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Login" component={LoginStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
});
export default connect(mapStateToProps)(AppStack);
