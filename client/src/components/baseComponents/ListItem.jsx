import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import AddUser from 'sk/src/assets/icons/add-user.png';

import { theme } from 'sk/src/helpers/theme';

function ItemList({ name, addFriend }) {
  return (
    <View style={styles.container}>
      <View style={styles.icon} />
      <Text style={styles.text}>{name}</Text>
      {addFriend && (
        <TouchableOpacity>
          <Image source={AddUser} style={styles.addUsr} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    shadowOffset: { width: 0, height: 2 },
    shadowColor: theme.colors.shadow,
    alignItems: 'center',
    shadowOpacity: 0.3,
    borderRadius: 30,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
    marginTop: 15,
    maxHeight: 70,
    width: '100%',
  },
  addUsr: {
    marginHorizontal: 10,
    height: 35,
    width: 35,
  },
  icon: {
    backgroundColor: 'red',
    marginHorizontal: 10,
    borderRadius: 30,
    height: 45,
    width: 45,
  },
  text: {
    color: theme.colors.darkText,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    flex: 1,
  },
});

ItemList.propTypes = {
  name: PropTypes.string.isRequired,
  addFriend: PropTypes.bool,
};

ItemList.defaultProps = {
  addFriend: false,
};

export default ItemList;
