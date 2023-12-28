import {
  GET_USER_FRIENDS_PENDING,
  GET_USER_FRIENDS_FULFILLED,
  GET_USER_FRIENDS_REJECTED,
  GET_OTHER_USERS_PENDING,
  GET_OTHER_USERS_FULFILLED,
  GET_OTHER_USERS_REJECTED,
} from './actionTypes';

const initialState = {
  isPending: false,
  userFriends: [],
  otherFriends: [],
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FRIENDS_PENDING:
    case GET_OTHER_USERS_PENDING:
      return {
        ...state,
        isPending: true,
        error: '',
      };

    case GET_OTHER_USERS_FULFILLED:
      return {
        ...state,
        otherFriends: action.payload.data,
        isPending: false,
        error: '',
      };
    case GET_USER_FRIENDS_FULFILLED:
      return {
        ...state,
        userFriends: action.payload.data,
        isPending: false,
        error: '',
      };

    case GET_OTHER_USERS_REJECTED:
    case GET_USER_FRIENDS_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload.error.message,
      };

    default:
      return state;
  }
};
