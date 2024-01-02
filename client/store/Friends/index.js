import {
  GET_USER_FRIENDS_PENDING,
  GET_USER_FRIENDS_FULFILLED,
  GET_USER_FRIENDS_REJECTED,
  GET_OTHER_USERS_PENDING,
  GET_OTHER_USERS_FULFILLED,
  GET_OTHER_USERS_REJECTED,
  ADD_FRIEND_PENDING,
  ADD_FRIEND_FULFILLED,
  ADD_FRIEND_REJECTED,
  GET_MESSAGES_PENDING,
  GET_MESSAGES_FULFILLED,
  GET_MESSAGES_REJECTED,
  SEND_MESSAGE_PENDING,
  SEND_MESSAGE_FULFILLED,
  SEND_MESSAGE_REJECTED,
} from './actionTypes';

const initialState = {
  isPending: false,
  userFriends: [],
  otherFriends: [],
  chatMessages: [],
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_FRIENDS_PENDING:
    case GET_OTHER_USERS_PENDING:
    case GET_MESSAGES_PENDING:
      return {
        ...state,
        isPending: true,
        error: '',
      };

    case GET_MESSAGES_FULFILLED:
      return {
        ...state,
        chatMessages: action.payload.data.map((item) => {
          if (item.user._id !== Number(action.payload.userId)) {
            return { ...item, user: { ...item.user, name: 'T Y' } };
          }
          return { ...item, user: { ...item.user, name: action.payload.userName } };
        }),
        isPending: false,
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
    case GET_MESSAGES_REJECTED:
    case SEND_MESSAGE_REJECTED:
      return {
        ...state,
        isPending: false,
        error: action.payload.error.message,
      };

    case ADD_FRIEND_PENDING:
    case ADD_FRIEND_FULFILLED:
    case ADD_FRIEND_REJECTED:
    case SEND_MESSAGE_PENDING:
    case SEND_MESSAGE_FULFILLED:
    default:
      return state;
  }
};
