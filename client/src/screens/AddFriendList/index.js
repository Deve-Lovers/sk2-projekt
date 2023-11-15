import React from 'react';
import ListItem from 'sk/src/components/baseComponents/ListItem';
import Screen from 'sk/src/components/baseComponents/Screen';
import { users } from 'sk/src/helpers/mocks/usersMock';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from 'sk/src/helpers/theme';

function AddFriendList() {
  const message = 'Brak nowych osób do dodania. \nSprawdź zakładkę "Znajomi"';

  const renderNoContacts = () => (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );

  return (
    <Screen>
      {users.map((user, index) => (
        <ListItem name={`${user.name} ${user.surname}`} addFriend color={index % 5} />
      ))}
      {!users && renderNoContacts()}
    </Screen>
  );
}

export default AddFriendList;

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
