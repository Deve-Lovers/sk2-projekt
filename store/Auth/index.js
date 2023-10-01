import {
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_FULFILLED,
  POST_USER_LOGIN_REJECTED,
  POST_USER_REGISTER_PENDING,
  POST_USER_REGISTER_FULFILLED,
  POST_USER_REGISTER_REJECTED,
  USER_LOGOUT_FULFILLED,
  USER_EXISTS_PENDING,
  USER_EXISTS_FULFILLED,
  USER_EXISTS_REJECTED,
} from './actionTypes';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userMail: '',
  user: {},
  isPending: false,
  error: '',
  userExists: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_LOGIN_PENDING:
    case POST_USER_REGISTER_PENDING:
    case USER_EXISTS_PENDING:
      return {
        ...state,
        isPending: true,
      };

    case POST_USER_LOGIN_FULFILLED:
      return {
        ...state,
        error: '',
        isPending: false,
        userExists: false,
        accessToken: action.payload.data.access_token,
        refreshToken: action.payload.data.refresh_token,
        user: action.payload.data.user,
        userMail: action.payload.email,
      };

    case POST_USER_REGISTER_FULFILLED:
      return {
        error: '',
        isPending: false,
        userExists: false,
        user: action.payload.data.user,
        accessToken: action.payload.data.access_token,
        userMail: action.payload.email,
      };

    case POST_USER_LOGIN_REJECTED:
    case POST_USER_REGISTER_REJECTED:
    case USER_EXISTS_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload.error.detail,
      };

    case USER_EXISTS_FULFILLED:
      return {
        ...state,
        isPending: false,
        userExists: action.payload.data.exists,
      };

    case USER_LOGOUT_FULFILLED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
