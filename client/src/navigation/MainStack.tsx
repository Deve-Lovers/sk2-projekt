import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsList from 'sk/src/screens/FriendsList';
import AddFriendList from 'sk/src/screens/AddFriendList';
import Profile from 'sk/src/screens/Profile';
import Chat from 'sk/src/screens/Chat';
import { theme } from 'sk/src/helpers/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabStack(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="FriendsList"
      screenOptions={{ headerShown: false, tabBarActiveTintColor: theme.colors.actionPrimary }}
    >
      <Tab.Screen name="FriendsList" component={FriendsList} options={{ title: 'Znajomi' }} />
      <Tab.Screen
        name="AddFriendList"
        component={AddFriendList}
        options={{ title: 'Dodaj znajomych' }}
      />
      <Tab.Screen name="Profile" component={Profile} options={{ title: 'Twój profil' }} />
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
