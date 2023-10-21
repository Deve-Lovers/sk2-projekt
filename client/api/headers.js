import { store } from 'petCare/store';

export const defaultHeaders = (headers = {}) => ({
  ...headers,
  'Content-Type': 'application/json',
});

export const authorizationHeaders = (headers = {}) => ({
  ...defaultHeaders(headers),
  Authorization: store.getState().auth.accessToken,
});
