import { API_URL } from '@env';

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
export const setUrl = (prefix, endpoint) => `${API_URL}/${prefix}/${endpoint}/`;
export const setProxyUrl = () => API_URL;

export const urls = {
  API: API_URL,
  LOGIN: 'login',
  EXIST: 'user-exists',
  REGISTER: 'register',
  FRIENDS: 'list-my-friends',
  OTHER: 'list-others',
  ADD: 'add-friend',
  CHAT: 'chat',
  MESSAGE: 'message',
};

export const auth = 'castle';

export const prefix = 'api';
