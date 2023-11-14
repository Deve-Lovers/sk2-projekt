import React from 'react';
import ListItem from 'sk/src/components/baseComponents/ListItem';
import Screen from 'sk/src/components/baseComponents/Screen';
import { users } from 'sk/src/helpers/mocks/usersMock';

function AddFriendList() {
  return (
    <Screen>
      {users.map((user) => (
        <ListItem name={`${user.name} ${user.surname}`} addFriend />
      ))}
    </Screen>
  );
}

export default AddFriendList;
