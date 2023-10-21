import { StyleSheet } from 'react-native';
import { theme } from 'sk/src/helpers/theme';

const logotype = {
  resizeMode: 'contain',
  marginBottom: 40,
  marginTop: 100,
  width: '100%',
  height: 200,
};

const cornerLogo = {
  resizeMode: 'contain',
  width: 130,
  height: 80,
};

const welcomeText = {
  color: theme.colors.darkText,
  fontWeight: '700',
  fontSize: 40,
  margin: 10,
};

const formSection = {
  marginTop: 15,
  marginBottom: 40,
};

const wrapper = {
  justifyContent: 'center',
  alignItems: 'center',
  margin: 20,
};

const requirementsText = {
  color: theme.colors.darkText,
  fontWeight: '800',
};

const validationText = (color) => ({
  alignSelf: 'center',
  fontWeight: '800',
  marginTop: 15,
  color,
});

export const styles = StyleSheet.create({
  logotype,
  cornerLogo,
  welcomeText,
  formSection,
  wrapper,
  requirementsText,
  validationText,
});
