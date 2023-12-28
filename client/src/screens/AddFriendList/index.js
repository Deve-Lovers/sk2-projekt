import React, { useEffect } from 'react';
import ListItem from 'sk/src/components/baseComponents/ListItem';
import Screen from 'sk/src/components/baseComponents/Screen';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { theme } from 'sk/src/helpers/theme';
import { connect } from 'react-redux';
import { getOtherUsersList } from 'sk/store/Friends/actions';

function AddFriendList({ getOtherUsersList: _getOtherUsersList, otherFriends, isPending, error }) {
  const message = 'Brak nowych osób do dodania. \nSprawdź zakładkę "Znajomi"';

  useEffect(() => {
    _getOtherUsersList();
  }, []);

  const renderNoContacts = () => (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );

  const renderContent = () => {
    if (error) {
      return renderNoContacts();
    }

    if (isPending) {
      return <Text>Loading...</Text>;
    }

    return (
      <FlatList
        data={otherFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem name={`${item.name} ${item.surname}`} addFriend color={index % 5} />
        )}
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
