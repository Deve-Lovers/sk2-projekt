import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from 'sk/src/helpers/theme';

export const buttonVariants = {
  primaryFocused: 'primaryFocused',
  secondaryFocused: 'secondaryFocused',
  primaryOutlined: 'primaryOutlined',
  secondaryOutlined: 'secondaryOutlined',
  disabled: 'disabled',
  disabledOutlined: 'disabledOutlined',
};

const getStyleFromVariant = (variant) => {
  const {
    primaryFocused,
    secondaryFocused,
    primaryOutlined,
    secondaryOutlined,
    disabled,
    disabledOutlined,
  } = buttonVariants;

  switch (variant) {
    case primaryFocused:
      return {
        buttonStyles: styles.primaryButton(false),
        textStyles: styles.primaryText(false),
      };
    case secondaryFocused:
      return {
        buttonStyles: styles.secondaryButton(false),
        textStyles: styles.secondaryText(false),
      };
    case primaryOutlined:
      return {
        buttonStyles: [styles.button, styles.primaryButton(true)],
        textStyles: [styles.text, styles.primaryText(true)],
      };
    case secondaryOutlined:
      return {
        buttonStyles: styles.secondaryButton(true),
        textStyles: styles.secondaryText(true),
      };
    case disabled:
      return {
        buttonStyles: styles.disabledButton(false),
        textStyles: styles.disabledText(false),
      };
    case disabledOutlined:
      return {
        buttonStyles: styles.disabledButton(true),
        textStyles: styles.disabledText(true),
      };
    default:
      return {
        buttonStyles: styles.primaryButton(false),
        textStyles: styles.primaryText(false),
      };
  }
};

function Button({ title, variant, onPress, disabled }) {
  const { buttonStyles, textStyles } = getStyleFromVariant(variant);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyles]} disabled={disabled}>
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    fontSize: 18,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 2,
    borderRadius: 30,
    minWidth: 190,
    height: 45,
    margin: 10,
  },
  primaryButton: (isOutlined) => ({
    backgroundColor: isOutlined ? theme.colors.actionPrimaryReversed : theme.colors.actionPrimary,
    borderColor: theme.colors.borderOnPrimary,
  }),
  primaryText: (isOutlined) => ({
    color: isOutlined ? theme.colors.textOnPrimaryReversed : theme.colors.textOnPrimary,
  }),
  secondaryButton: (isOutlined) => ({
    backgroundColor: isOutlined
      ? theme.colors.actionSecondaryReversed
      : theme.colors.actionSecondary,
    borderColor: theme.colors.borderOnSecondary,
  }),
  secondaryText: (isOutlined) => ({
    color: isOutlined ? theme.colors.textOnSecondaryReversed : theme.colors.textOnSecondary,
  }),
  disabledButton: (isOutlined) => ({
    backgroundColor: isOutlined ? theme.colors.textOnDisabled : theme.colors.actionDisabled,
    borderColor: theme.colors.borderOnDisabled,
  }),
  disabledText: (isOutlined) => ({
    color: isOutlined ? theme.colors.actionDisabled : theme.colors.textOnDisabled,
  }),
});

Button.propTypes = {
  title: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'primaryFocused',
    'secondaryFocused',
    'primaryOutlined',
    'secondaryOutlined',
  ]),
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  variant: 'primaryFocused',
  disabled: false,
};

export default Button;
