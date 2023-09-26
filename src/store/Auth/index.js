import {
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_FULFILLED,
  POST_USER_LOGIN_REJECTED,
  POST_USER_REGISTER_PENDING,
  POST_USER_REGISTER_FULFILLED,
  POST_USER_REGISTER_REJECTED,
  USER_LOGOUT_FULFILLED,
} from './actionTypes';

const initialState = {
  accessToken: null,
  refreshToken: null,
  userMail: '',
  user: {},
  isPending: false,
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_LOGIN_PENDING:
    case POST_USER_REGISTER_PENDING:
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

    case POST_USER_REGISTER_FULFILLED:
      return {
        isPending: false,
        user: action.payload.data,
        userMail: action.payload.email,
      };

    case POST_USER_LOGIN_REJECTED:
    case POST_USER_REGISTER_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload.error.detail,
      };

    case USER_LOGOUT_FULFILLED:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
