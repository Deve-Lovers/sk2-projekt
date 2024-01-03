import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import { userLogout } from 'sk/store/Auth/actions';
import Screen from 'sk/src/components/baseComponents/Screen';
import Button from 'sk/src/components/baseComponents/Button';
import { theme } from 'sk/src/helpers/theme';

function Profile(props) {
  const welcomeText = 'Witaj w aplikacji WebTap!\n';
  const addFriendsText =
    '- W zakładce "Dodaj znajomych" możesz dodać innych użytkowników do swojej listy znajomych\n\n';
  const friendsText = '- W zakładce "Znajomi" możesz czatować z poszczególnymi znajomymi\n\n';
  const logoutText = '- Jeśli chcesz się wylogować, kliknij przycisk poniżej ⬇️';

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>{welcomeText}</Text>
        <Text style={styles.text}>
          {addFriendsText}
          {friendsText}
          {logoutText}
        </Text>
      </View>
      <Button title="Wyloguj mnie" variant="primaryFocused" onPress={() => props.userLogout()} />
    </Screen>
  );
}

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
});

export default connect(null, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    padding: 20,
    borderRadius: 30,
    width: '100%',
    height: 370,
  },
  welcomeText: {
    color: theme.colors.darkText,
    fontWeight: '700',
    fontSize: 25,
  },
  text: {
    color: theme.colors.darkText,
    fontWeight: '500',
    fontSize: 20,
  },
});
