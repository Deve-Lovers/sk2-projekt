import React from 'react';
import ListItem from 'sk/src/components/baseComponents/ListItem';
import Screen from 'sk/src/components/baseComponents/Screen';
import { users } from 'sk/src/helpers/mocks/usersMock';

function FriendsList() {
  return (
    <Screen>
      {users.map((user, index) => (
        <ListItem name={`${user.name} ${user.surname}`} color={index % 5} />
      ))}
    </Screen>
  );
}

export default FriendsList;
