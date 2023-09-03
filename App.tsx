import * as React from 'react';
import { SafeAreaView } from 'react-native';

import AppStack from 'petCare/src/navigation';
import { theme } from 'petCare/src/helpers/theme';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <AppStack />
    </SafeAreaView>
  );
}

export default App;
