import { API_URL } from '@env';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
export const setUrl = (prefix, endpoint) => `${API_URL}/${prefix}/${endpoint}/`;

export const urls = {
  API: API_URL,
  LOGIN: 'users/login',
  REGISTER: 'users',
  CLINICS: 'clinics',
};

export const auth = 'castle';

export const prefix = 'api';
