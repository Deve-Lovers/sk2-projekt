import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Logo from 'petCare/src/assets/logotypes/LogoPetCare.png';

import Screen from 'petCare/src/components/baseComponents/Screen';
import FormInput from 'petCare/src/components/baseComponents/FormInput';
import Button from 'petCare/src/components/baseComponents/Button';
import { styles } from 'petCare/src/screens/Login/styles';
import { theme } from 'petCare/src/helpers/theme';

function LoginForm({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const requirements =
    'Hasło musi zawierać co najmniej:\n- 8 znaków\n- jedną małą literę\n- jedną wielką literę\n- jedną cyfrę\n- znak specjalny';

  useEffect(() => {
    passwordValidation();
  });

  const passwordValidation = () => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[?!@#$%&,+-.^*])(?=.{8,})/;

    const validate = regex.test(password);
    if (validate && password === passwordRepeat) {
      setSuccess(true);
      setError('');
    } else if (validate && passwordRepeat === '') {
      setError('');
      setSuccess(false);
    } else if (validate && password !== passwordRepeat) {
      setError('Hasła nie pokrywają się');
      setSuccess(false);
    } else if (password !== '') {
      setError('Hasło nie spełnia wymagań');
      setSuccess(false);
    } else {
      setError('');
      setSuccess(false);
    }
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.welcomeText}>Witaj!</Text>
        <Image source={Logo} style={styles.cornerLogo} />
      </View>
      <View style={styles.formSection}>
        <FormInput placeholder="Imię" onChangeText={setName} value={name} />
        <FormInput placeholder="Nazwisko" onChangeText={setSurname} value={surname} />
      </View>
      <FormInput placeholder="Hasło" onChangeText={setPassword} value={password} secured />
      <FormInput
        placeholder="Powtórz hasło"
        onChangeText={setPasswordRepeat}
        value={passwordRepeat}
        secured
      />
      {error && <Text style={styles.validationText(theme.colors.error)}>{error}</Text>}
      {success && (
        <Text style={styles.validationText(theme.colors.success)}>Hasła są w porządku</Text>
      )}
      <View style={styles.wrapper}>
        <Text style={styles.requirementsText}>{requirements}</Text>
      </View>
      <Button
        title="Zarejestruj się"
        variant="secondaryFocused"
        onPress={() => navigation.navigate('Main')}
      />
      <Button title="Cofnij" variant="primaryOutlined" onPress={() => navigation.goBack()} />
    </Screen>
  );
}

LoginForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginForm;
