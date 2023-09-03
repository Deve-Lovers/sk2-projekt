import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from 'petCare/src/helpers/theme';

function FormInput({ width, height }) {
  return (
    <View style={styles.container(width, height)}>
      <TextInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: (width, height) => ({
    backgroundColor: theme.colors.surface,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
    borderRadius: 30,
    width,
    height,
  }),
});

FormInput.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FormInput.defaultProps = {
  width: '100%',
  height: 50,
};

export default FormInput;
