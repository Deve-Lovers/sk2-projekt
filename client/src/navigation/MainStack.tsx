import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsList from 'sk/src/screens/FriendsList';
import AddFriendList from 'sk/src/screens/AddFriendList';
import Settings from 'sk/src/screens/Settings';
import Chat from 'sk/src/screens/Chat';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabStack(): JSX.Element {
  return (
    <Tab.Navigator initialRouteName="FriendsList" screenOptions={{ headerShown: false }}>
      <Tab.Screen name="FriendsList" component={FriendsList} />
      <Tab.Screen name="AddFriendList" component={AddFriendList} />
      <Tab.Screen name="Profile" component={Settings} />
    </Tab.Navigator>
  );
}

function MainStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="TabStack" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default MainStack;
