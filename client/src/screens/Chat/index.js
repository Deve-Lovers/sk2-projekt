import React from 'react';
import Screen from 'sk/src/components/baseComponents/Screen';
import { StyleSheet } from 'react-native';
import ScreenHeader from 'sk/src/components/baseComponents/ScreenHeader';

function Chat({ navigation, route }) {
  const { user } = route.params;

  return (
    <Screen>
      <ScreenHeader
        {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
        title={`${user.name} ${user.surname}`}
        navigation={navigation}
        isButtonVisible
      />
    </Screen>
  );
}

export default Chat;

const styles = StyleSheet.create({});
