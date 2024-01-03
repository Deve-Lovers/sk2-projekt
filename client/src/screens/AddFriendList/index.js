import React, { useEffect, useState } from 'react';
import ListItem from 'sk/src/components/baseComponents/ListItem';
import Screen from 'sk/src/components/baseComponents/Screen';
import Button from 'sk/src/components/baseComponents/Button';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { theme } from 'sk/src/helpers/theme';
import { connect } from 'react-redux';
import { addFriend, getOtherUsersList, getUserFriendsList } from 'sk/store/Friends/actions';

function AddFriendList({
  getOtherUsersList: _getOtherUsersList,
  getUserFriendsList: _getUserFriendsList,
  addFriend: _addFriend,
  otherFriends,
  isPending,
}) {
  const message = 'Brak nowych osób do dodania. \nSprawdź zakładkę "Znajomi"';

  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      _getOtherUsersList();
      setRefreshing(false);
    }, 500);
  };

  const renderNoContacts = () => (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Odśwież ↻" variant="primaryOutlined" onPress={onRefresh} />
    </View>
  );

  const reloadFriendLists = () => {
    _getOtherUsersList();
    _getUserFriendsList();
  };

  const renderContent = () => {
    if (refreshing && !otherFriends.length) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (!otherFriends.length && !isPending) {
      return renderNoContacts();
    }

    return (
      <FlatList
        data={otherFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            name={`${item.name} ${item.surname}`}
            addFriend
            color={index % 5}
            onPressIcon={() => _addFriend(item.id).then(reloadFriendLists)}
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    );
  };

  return <Screen>{renderContent()}</Screen>;
}
const mapStateToProps = (state) => ({
  otherFriends: state.friends.otherFriends,
  isPending: state.friends.isPending,
  error: state.friends.error,
});

const mapDispatchToProps = (dispatch) => ({
  getOtherUsersList: () => dispatch(getOtherUsersList()),
  getUserFriendsList: () => dispatch(getUserFriendsList()),
  addFriend: (id) => dispatch(addFriend(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendList);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    flex: 1,
  },
  text: {
    color: theme.colors.darkText,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
