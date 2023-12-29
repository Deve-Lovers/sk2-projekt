import React, { useEffect } from 'react';
import ListItem from 'sk/src/components/baseComponents/ListItem';
import Screen from 'sk/src/components/baseComponents/Screen';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { theme } from 'sk/src/helpers/theme';
import { connect } from 'react-redux';
import { getUserFriendsList } from 'sk/store/Friends/actions';

function FriendsList(props) {
  const { userFriends, getUserFriendsList: _getUserFriendsList, isPending } = props;
  const message =
    'Brak znajomych do wyświetlenia. Poznaj nowe osoby dodając je w zakładce \n"Dodaj znajomych"';

  useEffect(() => {
    _getUserFriendsList();
  }, []);

  const renderNoFriends = () => (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );

  const goToChat = (userData) => {
    props.navigation.navigate('Chat', { user: userData });
  };

  const renderContent = () => {
    if (!userFriends.length) {
      return renderNoFriends();
    }

    if (isPending) {
      return <Text>Loading...</Text>;
    }

    return (
      <FlatList
        data={userFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ListItem
            name={`${item.name} ${item.surname}`}
            color={index % 5}
            onPress={() => {
              goToChat(item);
            }}
          />
        )}
      />
    );
  };

  return <Screen>{renderContent()}</Screen>;
}

const mapStateToProps = (state) => ({
  userFriends: state.friends.userFriends,
  isPending: state.friends.isPending,
  error: state.friends.error,
});

const mapDispatchToProps = (dispatch) => ({
  getUserFriendsList: () => dispatch(getUserFriendsList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);

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
