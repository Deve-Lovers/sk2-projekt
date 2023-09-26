import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import Logo from 'petCare/src/assets/logotypes/LogoPetCare.png';

import Screen from 'petCare/src/components/baseComponents/Screen';
import FormInput from 'petCare/src/components/baseComponents/FormInput';
import Button from 'petCare/src/components/baseComponents/Button';
import { styles } from 'petCare/src/screens/Login/styles';
import { theme } from 'petCare/src/helpers/theme';
import { errorMessage } from 'petCare/src/helpers/errors';

function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [isValidate, setIsValidate] = useState(false);
  const [showError, setShowError] = useState(false);

  const canSendRequest = email !== '';
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validate = regex.test(email);

  useEffect(() => {
    setShowError(false);

    if (validate) {
      setIsValidate(true);
    } else {
      setIsValidate(false);
    }
  }, [email, validate]);

  const registerHandler = () => {
    if (isValidate) {
      navigation.navigate('LoginForm', { email });
    } else {
      setShowError(true);
    }
  };

  return (
    <Screen>
      <Image source={Logo} style={styles.logotype} />
      <FormInput
        placeholder="Wpisz swój adres email..."
        onChangeText={setEmail}
        value={email}
        height={63}
      />
      {!isValidate && showError && (
        <Text style={styles.validationText(theme.colors.error)}>
          {errorMessage('Invalid email')}
        </Text>
      )}
      <Button
        title="Zarejestruj się"
        variant={canSendRequest ? 'secondaryFocused' : 'disabled'}
        onPress={registerHandler}
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
