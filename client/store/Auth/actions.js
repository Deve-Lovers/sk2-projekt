import { defaultHeaders } from 'sk/api/headers';
import { auth, setUrl, urls } from 'sk/api/urls';
import {
  CLEAR_STATE,
  POST_USER_LOGIN_FULFILLED,
  POST_USER_LOGIN_PENDING,
  POST_USER_LOGIN_REJECTED,
  POST_USER_REGISTER_PENDING,
  POST_USER_REGISTER_FULFILLED,
  POST_USER_REGISTER_REJECTED,
  USER_LOGOUT_FULFILLED,
  USER_EXISTS_PENDING,
  USER_EXISTS_FULFILLED,
  USER_EXISTS_REJECTED,
} from './actionTypes';

export function postUserLogin(email, password) {
  return async (dispatch) => {
    dispatch({ type: POST_USER_LOGIN_PENDING });
    return await fetch(setUrl(auth, urls.LOGIN), {
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

export function postUserRegister(email, name, surname, password) {
  return async (dispatch) => {
    dispatch({ type: POST_USER_REGISTER_PENDING });
    return await fetch(setUrl(auth, urls.REGISTER), {
      headers: defaultHeaders(),
      method: 'POST',
      body: JSON.stringify({ username: email, email, name, surname, password }),
    })
      .then(async (response) => {
        if (response.status === 201) {
          return await response.json();
        }
        throw await response.json();
      })
      .then((responseData) =>
        dispatch({
          type: POST_USER_REGISTER_FULFILLED,
          payload: { data: responseData, email },
        })
      )
      .catch((error) =>
        dispatch({
          type: POST_USER_REGISTER_REJECTED,
          payload: { error },
        })
      );
  };
}

export function checkUserExistence(email, password) {
  return async (dispatch) => {
    dispatch({ type: USER_EXISTS_PENDING });
    return await fetch(setUrl(auth, urls.EXIST), {
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
          type: USER_EXISTS_FULFILLED,
          payload: { data: responseData },
        })
      )
      .catch((error) =>
        dispatch({
          type: USER_EXISTS_REJECTED,
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
