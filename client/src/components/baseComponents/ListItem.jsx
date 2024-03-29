import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import AddUser from 'sk/src/assets/icons/add-user.png';

import { theme } from 'sk/src/helpers/theme';

function ItemList({ name, addFriend, color, onPress, onPressIcon }) {
  const colors = ['#519259', '#F0BB62', '#064635', '#F4EEA9', '#A0D8B3'];
  const colorsAdd = ['#898121', '#F4EEA9', '#4C4B16', '#E7B10A', '#F7F1E5'];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={addFriend}>
      <View style={styles.icon(addFriend ? colorsAdd[color] : colors[color])} />
      <Text style={styles.text}>{name}</Text>
      {addFriend && (
        <TouchableOpacity onPress={onPressIcon}>
          <Image source={AddUser} style={styles.addUsr} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
    marginHorizontal: 5,
    maxHeight: 70,
    flex: 1,
  },
  addUsr: {
    marginHorizontal: 10,
    height: 35,
    width: 35,
  },
  icon: (backgroundColor) => ({
    backgroundColor,
    marginHorizontal: 10,
    borderRadius: 30,
    height: 45,
    width: 45,
  }),
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
  color: PropTypes.number.isRequired,
  onPress: PropTypes.func,
  onPressIcon: PropTypes.func,
};

ItemList.defaultProps = {
  addFriend: false,
  onPress: () => {},
  onPressIcon: () => {},
};

export default ItemList;
