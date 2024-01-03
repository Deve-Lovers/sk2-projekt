import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddUser from 'sk/src/assets/icons/add-user.png';
import Friends from 'sk/src/assets/icons/friends.png';
import UserProfile from 'sk/src/assets/icons/user.png';

import FriendsList from 'sk/src/screens/FriendsList';
import AddFriendList from 'sk/src/screens/AddFriendList';
import Profile from 'sk/src/screens/Profile';
import Chat from 'sk/src/screens/Chat';
import { theme } from 'sk/src/helpers/theme';
import { Image, StyleSheet, type ImageStyle } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabStack(): JSX.Element {
  return (
    <Tab.Navigator
      initialRouteName="FriendsList"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.actionPrimary,
        tabBarInactiveTintColor: theme.colors.actionDisabled,
      }}
    >
      <Tab.Screen
        name="FriendsList"
        component={FriendsList}
        options={{
          title: 'Znajomi',
          tabBarIcon: ({ focused }) => <Image source={Friends} style={styles.icon(focused)} />,
        }}
      />
      <Tab.Screen
        name="AddFriendList"
        component={AddFriendList}
        options={{
          title: 'Dodaj znajomych',
          tabBarIcon: ({ focused }) => <Image source={AddUser} style={styles.icon(focused)} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'Twój profil',
          tabBarIcon: ({ focused }) => <Image source={UserProfile} style={styles.icon(focused)} />,
        }}
      />
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

interface Style {
  icon: ImageStyle;
}

const styles = StyleSheet.create<Style>({
  icon: (focused: boolean): Style =>
    ({
      width: 25,
      height: 25,
      resizeMode: 'contain',
      tintColor: focused ? theme.colors.actionPrimary : theme.colors.actionDisabled,
    } as any),
});
