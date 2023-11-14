import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FriendsList from 'sk/src/screens/FriendsList';
import AddFriendList from 'sk/src/screens/AddFriendList';

const Tab = createBottomTabNavigator();

function MainStack(): JSX.Element {
  return (
    <Tab.Navigator initialRouteName="FriendsList">
      <Tab.Screen name="FriendsList" component={FriendsList} />
      <Tab.Screen name="AddFriendList" component={AddFriendList} />
    </Tab.Navigator>
  );
}

export default MainStack;
