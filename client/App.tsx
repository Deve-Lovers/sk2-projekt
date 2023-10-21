import * as React from 'react';
import { Provider } from 'react-redux';
import AppStack from 'sk/src/navigation';
import { store } from 'sk/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
}

export default App;
