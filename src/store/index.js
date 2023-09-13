import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer from './Auth';

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['accessToken'],
};

const rootPersistedReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STATE') {
    return {
      auth: state.auth,
    };
  }

  return rootPersistedReducer(state, action);
};

const initialState = {};
const middlewares = [thunk];

middlewares.push(logger);

const store = createStore(rootReducer, initialState, applyMiddleware(...middlewares));
const persistor = persistStore(store);

export { store, persistor };
