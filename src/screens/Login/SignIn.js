import React, { useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import Logo from 'petCare/src/assets/logotypes/LogoPetCare.png';

import Screen from 'petCare/src/components/baseComponents/Screen';
import FormInput from 'petCare/src/components/baseComponents/FormInput';
import Button from 'petCare/src/components/baseComponents/Button';
import { styles } from 'petCare/src/screens/Login/styles';

function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen>
      <Image source={Logo} style={styles.logotype} />
      <FormInput placeholder="Wpisz login..." onChangeText={setEmail} value={email} height={63} />
      <FormInput
        placeholder="Wpisz hasło..."
        onChangeText={setPassword}
        value={password}
        height={63}
      />
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
