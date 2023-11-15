import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';

import Close from 'sk/src/assets/icons/close.png';

import { theme } from 'sk/src/helpers/theme';

function ScreenHeader({ title, navigation }) {
  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity onPress={handleClose}>
        <Image source={Close} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: -20,
    flexDirection: 'row',
    height: 70,
  },
  text: {
    color: theme.colors.darkText,
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 28,
    flex: 1,
  },
  icon: {
    marginRight: 20,
    borderRadius: 30,
    height: 30,
    width: 30,
  },
});

ScreenHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ScreenHeader;
