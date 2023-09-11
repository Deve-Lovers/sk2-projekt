import React, { useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import Logo from 'petCare/src/assets/logotypes/LogoPetCare.png';

import Screen from 'petCare/src/components/baseComponents/Screen';
import FormInput from 'petCare/src/components/baseComponents/FormInput';
import Button from 'petCare/src/components/baseComponents/Button';
import { styles } from 'petCare/src/screens/Login/styles';

function SignUp({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <Screen>
      <Image source={Logo} style={styles.logotype} />
      <FormInput
        placeholder="Wpisz swój adres email..."
        onChangeText={setEmail}
        value={email}
        height={63}
      />
      <Button
        title="Zarejestruj się"
        variant="secondaryFocused"
        onPress={() => navigation.navigate('LoginForm')}
      />
      <Button
        title="Logowanie"
        variant="primaryOutlined"
        onPress={() => navigation.navigate('SignIn')}
      />
    </Screen>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignUp;
