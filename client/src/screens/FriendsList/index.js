import React, { useEffect, useState } from 'react';
import ListItem from 'sk/src/components/baseComponents/ListItem';
import Screen from 'sk/src/components/baseComponents/Screen';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { theme } from 'sk/src/helpers/theme';
import { connect } from 'react-redux';
import { getUserFriendsList } from 'sk/store/Friends/actions';
import Button from 'sk/src/components/baseComponents/Button';

function FriendsList(props) {
  const { userFriends, getUserFriendsList: _getUserFriendsList, isPending } = props;
  const message =
    'Brak znajomych do wyświetlenia. Poznaj nowe osoby dodając je w zakładce \n"Dodaj znajomych"';

  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    _getUserFriendsList();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  const renderNoFriends = () => (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Odśwież ↻" variant="primaryOutlined" onPress={onRefresh} />
    </View>
  );

  const goToChat = (userData) => {
    props.navigation.navigate('Chat', { user: userData });
  };

  const renderContent = () => {
    if (refreshing) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }

    if (!userFriends.length && !isPending) {
      return renderNoFriends();
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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
