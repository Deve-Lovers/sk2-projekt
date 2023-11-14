import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import AddUser from 'sk/src/assets/icons/add-user.png';

import { theme } from 'sk/src/helpers/theme';

function FormInput({ name, addFriend }) {
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
    margin: 10,
    maxHeight: 70,
    width: '95%',
  },
  addUsr: {
    marginHorizontal: 10,
    height: 40,
    width: 40,
  },
  icon: {
    backgroundColor: 'red',
    marginHorizontal: 10,
    borderRadius: 30,
    height: 50,
    width: 50,
  },
  text: {
    color: theme.colors.darkText,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    flex: 1,
  },
});

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  addFriend: PropTypes.bool,
};

FormInput.defaultProps = {
  addFriend: false,
};

export default FormInput;
