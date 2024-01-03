import React, { useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import Screen from 'sk/src/components/baseComponents/Screen';
import ScreenHeader from 'sk/src/components/baseComponents/ScreenHeader';
import { getMessages, getUserFriendsList, sendMessage } from 'sk/store/Friends/actions';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

function Chat({
  navigation,
  route,
  chatMessages,
  accessToken,
  getMessages: _getMessages,
  sendMessage: _sendMessage,
  getUserFriendsList: _getUserFriendsList,
}) {
  const { user } = route.params;
  const [currentMessages, setCurrentMessages] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      _getMessages(user.id, `${user.name} ${user.surname}`);
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      _getMessages(user.id, `${user.name} ${user.surname}`);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setCurrentMessages(chatMessages);
  }, [JSON.stringify(chatMessages)]);

  const onSend = (mess) => {
    _sendMessage(user.id, mess[0].text);
    _getMessages(user.id, `${user.name} ${user.surname}`);
  };

  return (
    <Screen>
      <ScreenHeader
        title={`${user.name} ${user.surname}`}
        navigation={navigation}
        isButtonVisible
        onClose={() => _getUserFriendsList()}
      />
      <GiftedChat
        placeholder="Napisz wiadomość"
        messages={currentMessages}
        onSend={(messages) => {
          onSend(messages);
        }}
        user={{
          _id: Number(accessToken),
        }}
        showUserAvatar
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
  getMessages: (id, name) => dispatch(getMessages(id, name)),
  sendMessage: (id, message) => dispatch(sendMessage(id, message)),
  getUserFriendsList: () => dispatch(getUserFriendsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
