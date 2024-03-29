import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import Logo from 'sk/src/assets/logotypes/WebtapLogo.png';

import Screen from 'sk/src/components/baseComponents/Screen';
import FormInput from 'sk/src/components/baseComponents/FormInput';
import Button from 'sk/src/components/baseComponents/Button';
import { styles } from 'sk/src/screens/Login/styles';
import { connect } from 'react-redux';
import { postUserLogin } from 'sk/store/Auth/actions';
import { theme } from 'sk/src/helpers/theme';
import { errorMessage } from 'sk/src/helpers/errors';

function SignIn(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const canSendRequest = email !== '' && password !== '';
  const showMissingField = showError && !canSendRequest;

  useEffect(() => {
    setShowError(false);
  }, [password, email]);

  const loginHandler = () => {
    if (canSendRequest) {
      props.postUserLogin(email, password).then((data) => {
        if (data.payload.error) {
          setShowError(true);
        }
      });
    } else {
      setShowError(true);
    }
  };

  return (
    <Screen>
      <Image source={Logo} style={styles.logotype} />
      <FormInput placeholder="Wpisz login..." onChangeText={setEmail} value={email} height={63} />
      <FormInput
        placeholder="Wpisz hasło..."
        onChangeText={setPassword}
        value={password}
        height={63}
        secured
      />
      {showMissingField && (
        <Text style={styles.validationText(theme.colors.error)}>
          {errorMessage('Missing fields')}
        </Text>
      )}
      {showError && props.error && !showMissingField && (
        <Text style={styles.validationText(theme.colors.error)}>{errorMessage(props.error)}</Text>
      )}
      <Button
        title="Zaloguj się"
        variant={canSendRequest ? 'primaryFocused' : 'disabled'}
        onPress={loginHandler}
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

const mapStateToProps = (state) => ({
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  postUserLogin: (email, pass) => dispatch(postUserLogin(email, pass)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
