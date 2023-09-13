import {
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_FULFILLED,
  POST_USER_LOGIN_REJECTED,
} from './actionTypes';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userMail: '',
  user: {},
  isPending: false,
  error: '',
};

export default (action, state = initialState) => {
  switch (action.type) {
    case POST_USER_LOGIN_PENDING:
      return {
        ...state,
        isPending: true,
      };

    case POST_USER_LOGIN_FULFILLED:
      return {
        ...state,
        isPending: false,
        accessToken: action.payload.data.access_token,
        refreshToken: action.payload.data.refresh_token,
        user: action.payload.data.user,
        userMail: action.payload.email,
      };

    case POST_USER_LOGIN_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
};
