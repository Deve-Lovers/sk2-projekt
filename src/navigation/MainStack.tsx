import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function Home({ navigation }): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate('Settings')} title="Go to Settings" />
    </View>
  );
}

function Settings({ navigation }): JSX.Element {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button onPress={() => navigation.navigate('Home')} title="Go to Home" />
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainStack(): JSX.Element {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default MainStack;
