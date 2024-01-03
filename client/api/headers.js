import { store } from 'sk/store';

export const defaultHeaders = (headers = {}) => ({
  ...headers,
  'Content-Type': 'application/json',
});

export const authorizationHeaders = (headers = {}) => ({
  ...defaultHeaders(headers),
  Authorization: `CLIENT${store.getState().auth.accessToken}`,
});
