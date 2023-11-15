import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from 'sk/src/helpers/theme';

function Screen({ children }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.screen}>{children}</View>
    </SafeAreaView>
  );
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
