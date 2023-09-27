import * as React from 'react';
import { Provider } from 'react-redux';
import AppStack from 'petCare/src/navigation';
import { store } from './store/index';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
}

export default App;
