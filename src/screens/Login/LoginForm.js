import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import Logo from 'petCare/src/assets/logotypes/LogoPetCare.png';

import Screen from 'petCare/src/components/baseComponents/Screen';
import FormInput from 'petCare/src/components/baseComponents/FormInput';
import Button from 'petCare/src/components/baseComponents/Button';
import { styles } from 'petCare/src/screens/Login/styles';
import { theme } from 'petCare/src/helpers/theme';
import { postUserRegister } from 'petCare/src/store/Auth/actions';
import { connect } from 'react-redux';
import { errorMessage } from 'petCare/src/helpers/errors';

function LoginForm(props) {
  const { navigation, route } = props;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const { email } = route.params;

  const requirements =
    'Hasło musi zawierać co najmniej:\n- 8 znaków\n- jedną małą literę\n- jedną wielką literę\n- jedną cyfrę\n- znak specjalny';
  const canSendRequest = name !== '' && surname !== '' && success;

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

  const handleRegisterNewUser = () => {
    if (canSendRequest) {
      props.postUserRegister(email, name, surname, password);
    } else {
      Alert.alert('Uzupełnij brakujące informacje');
    }
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.welcomeText}>Witaj!</Text>
        <Image source={Logo} style={styles.cornerLogo} />
      </View>
      <View style={styles.formSection}>
        <FormInput placeholder="Imię" onChangeText={setName} value={name} colored />
        <FormInput placeholder="Nazwisko" onChangeText={setSurname} value={surname} colored />
      </View>
      <FormInput placeholder="Hasło" onChangeText={setPassword} value={password} secured colored />
      <FormInput
        placeholder="Powtórz hasło"
        onChangeText={setPasswordRepeat}
        value={passwordRepeat}
        secured
        colored
      />
      {error && <Text style={styles.validationText(theme.colors.error)}>{error}</Text>}
      {success && (
        <Text style={styles.validationText(theme.colors.success)}>Hasła są w porządku</Text>
      )}
      <View style={styles.wrapper}>
        <Text style={styles.requirementsText}>{requirements}</Text>
      </View>
      {/* TODO add proper error description */}
      {props.error && (
        <Text style={styles.validationText(theme.colors.error)}>{errorMessage(props.error)}</Text>
      )}
      <Button
        title="Zarejestruj się"
        variant={canSendRequest ? 'secondaryFocused' : 'disabled'}
        onPress={handleRegisterNewUser}
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

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  postUserRegister: (email, name, surname, pass) =>
    dispatch(postUserRegister(email, name, surname, pass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
