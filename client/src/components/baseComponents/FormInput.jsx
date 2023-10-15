import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from 'petCare/src/helpers/theme';

function FormInput({ width, height, placeholder, onChangeText, value, secured, colored }) {
  return (
    <View style={styles.container(width, height)}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={styles.textInput}
        secureTextEntry={secured}
        autoCapitalize="none"
        placeholderTextColor={colored && theme.colors.textOnPrimaryReversed}
      />
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
  textInput: {
    marginHorizontal: 20,
    marginVertical: 12,
    flex: 1,
  },
});

FormInput.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secured: PropTypes.bool,
  colored: PropTypes.bool,
};

FormInput.defaultProps = {
  width: '100%',
  height: 50,
  placeholder: '',
  secured: false,
  colored: false,
};

export default FormInput;
