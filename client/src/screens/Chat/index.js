import React, { useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import Screen from 'sk/src/components/baseComponents/Screen';
import ScreenHeader from 'sk/src/components/baseComponents/ScreenHeader';
import { getMessages } from 'sk/store/Friends/actions';
import { connect } from 'react-redux';

function Chat({ navigation, route, getMessages: _getMessages, chatMessages, accessToken }) {
  const { user } = route.params;

  useEffect(() => {
    _getMessages(user.id);
  }, []);

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
          _id: Number(accessToken),
        }}
      />
    </Screen>
  );
}

const mapStateToProps = (state) => ({
  chatMessages: state.friends.chatMessages,
  isPending: state.friends.isPending,
  error: state.friends.error,
  accessToken: state.auth.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
  getMessages: (id) => dispatch(getMessages(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
