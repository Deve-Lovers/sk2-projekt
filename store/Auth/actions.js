import { defaultHeaders } from 'petCare/api/headers';
import {
  CLEAR_STATE,
  POST_USER_LOGIN_FULFILLED,
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_REJECTED,
  USER_LOGOUT_FULFILLED,
} from './actionTypes';

export function postUserLogin(email, password) {
  return async (dispatch) => {
    dispatch({ type: POST_USER_LOGIN_PENDING });
    return await fetch(`http://127.0.0.1:8000/castle/users/login/`, {
      headers: defaultHeaders(),
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (response.status === 200 || response.status === 204) {
          return await response.json();
        }
        throw await response.json();
      })
      .then((responseData) =>
        dispatch({
          type: POST_USER_LOGIN_FULFILLED,
          payload: { data: responseData, email },
        })
      )
      .catch((error) =>
        dispatch({
          type: POST_USER_LOGIN_REJECTED,
          payload: { error },
        })
      );
  };
}

export function userLogout() {
  return (dispatch) => {
    dispatch({
      type: USER_LOGOUT_FULFILLED,
    });
  };
}

export function clearState() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_STATE,
    });
  };
}
