import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import Logo from 'petCare/src/assets/logotypes/LogoPetCare.png';

import Screen from 'petCare/src/components/baseComponents/Screen';
import FormInput from 'petCare/src/components/baseComponents/FormInput';
import Button from 'petCare/src/components/baseComponents/Button';
import { styles } from 'petCare/src/screens/Login/styles';

function SignIn({ navigation }) {
  return (
    <Screen>
      <Image source={Logo} style={styles.logotype} />
      <FormInput height={63} />
      <FormInput height={63} />
      <Button
        title="Zaloguj się"
        variant="primaryFocused"
        onPress={() => navigation.navigate('Main')}
      />
      <Button
        title="Rejestracja"
        variant="secondaryOutlined"
        onPress={() => navigation.navigate('SignUp')}
      />
    </Screen>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
