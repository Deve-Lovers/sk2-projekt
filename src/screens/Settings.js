import { Button, Text, View } from 'react-native';
import { userLogout } from 'petCare/store/Auth/actions';
import { connect } from 'react-redux';
import * as React from 'react';

function Settings(props) {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
      <Button onPress={() => navigation.navigate('Home')} title="Go to Home" />
      <Button onPress={() => props.userLogout()} title="Logout" />
    </View>
  );
}

const mapDispatchToProps = (dispatch) => ({
  userLogout: () => dispatch(userLogout()),
});

export default connect(null, mapDispatchToProps)(Settings);
