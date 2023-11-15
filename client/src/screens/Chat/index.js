import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import Screen from 'sk/src/components/baseComponents/Screen';
import ScreenHeader from 'sk/src/components/baseComponents/ScreenHeader';
import { chatMessages } from 'sk/src/helpers/mocks/chatMock';

function Chat({ navigation, route }) {
  const { user } = route.params;

  const onSend = (mess) => {
    console.log(mess);
  };

  return (
    <Screen>
      <ScreenHeader
        title={`${user.name} ${user.surname}`}
        navigation={navigation}
        isButtonVisible
      />
      <GiftedChat
        placeholder="Napisz wiadomość"
        messages={chatMessages}
        onSend={(messages) => {
          onSend(messages);
        }}
        user={{
          _id: 0,
        }}
      />
    </Screen>
  );
}

export default Chat;
