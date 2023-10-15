import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from 'petCare/src/helpers/theme';

function Screen({ children }) {
  return <View style={styles.screen}>{children}</View>;
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 20,
    flex: 1,
  },
});

Screen.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Screen;
