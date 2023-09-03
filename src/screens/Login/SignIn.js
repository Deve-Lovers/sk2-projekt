import React from 'react';
import { Image, View } from 'react-native';
import Logo from 'petCare/src/assets/logotypes/LogoPetCare.png';
import Screen from 'petCare/src/components/baseComponents/Screen';
import { styles } from 'petCare/src/screens/Login/styles';
import FormInput from 'petCare/src/components/baseComponents/FormInput';
import Button from 'petCare/src/components/baseComponents/Button';
import PropTypes from 'prop-types';

function SignIn({ navigation }) {
  return (
    <Screen>
      <Image source={Logo} style={styles.logotype} />
      <FormInput height={63} />
      <FormInput height={63} />
      <View style={{ justifyContent: 'center' }}>
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
      </View>
    </Screen>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default SignIn;
