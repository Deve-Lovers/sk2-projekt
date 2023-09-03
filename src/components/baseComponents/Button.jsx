import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { theme } from 'petCare/src/helpers/theme';

export const buttonVariants = {
  primaryFocused: 'primaryFocused',
  secondaryFocused: 'secondaryFocused',
  primaryOutlined: 'primaryOutlined',
  secondaryOutlined: 'secondaryOutlined',
};

const getStyleFromVariant = (variant) => {
  const { primaryFocused, secondaryFocused, primaryOutlined, secondaryOutlined } = buttonVariants;
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
    default:
      return {
        buttonStyles: styles.primaryButton(false),
        textStyles: styles.primaryText(false),
      };
  }
};

function Button({ title, variant }) {
  const { buttonStyles, textStyles } = getStyleFromVariant(variant);

  return (
    <TouchableOpacity style={[styles.button, buttonStyles]}>
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
    borderColor: theme.colors.actionSecondary,
  }),
  secondaryText: (isOutlined) => ({
    color: isOutlined ? theme.colors.textOnSecondaryReversed : theme.colors.textOnSecondary,
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
};

Button.defaultProps = {
  variant: 'primaryFocused',
};

export default Button;
