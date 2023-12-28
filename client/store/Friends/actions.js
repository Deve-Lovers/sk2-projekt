import { authorizationHeaders } from 'sk/api/headers';
import { setProxyUrl, urls } from 'sk/api/urls';
import {
  GET_USER_FRIENDS_PENDING,
  GET_USER_FRIENDS_FULFILLED,
  GET_USER_FRIENDS_REJECTED,
  GET_OTHER_USERS_PENDING,
  GET_OTHER_USERS_FULFILLED,
  GET_OTHER_USERS_REJECTED,
} from './actionTypes';

export function getUserFriendsList() {
  return async (dispatch) => {
    const payload = {
      method: 'GET',
      endpoint: urls.FRIENDS,
      payload: {},
    };
    dispatch({ type: GET_USER_FRIENDS_PENDING });
    return await fetch(setProxyUrl(), {
      headers: authorizationHeaders(),
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (response.status === 200 || response.status === 204) {
          return await response.json();
        }
        throw await response.json();
      })
      .then((responseData) =>
        dispatch({
          type: GET_USER_FRIENDS_FULFILLED,
          payload: { data: responseData },
        })
      )
      .catch((error) =>
        dispatch({
          type: GET_USER_FRIENDS_REJECTED,
          payload: { error },
        })
      );
  };
}

export function getOtherUsersList() {
  return async (dispatch) => {
    const payload = {
      method: 'GET',
      endpoint: urls.OTHER,
      payload: {},
    };
    dispatch({ type: GET_OTHER_USERS_PENDING });
    return await fetch(setProxyUrl(), {
      headers: authorizationHeaders(),
      method: 'POST',
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        if (response.status === 200 || response.status === 204) {
          return await response.json();
        }
        throw await response.json();
      })
      .then((responseData) =>
        dispatch({
          type: GET_OTHER_USERS_FULFILLED,
          payload: { data: responseData },
        })
      )
      .catch((error) =>
        dispatch({
          type: GET_OTHER_USERS_REJECTED,
          payload: { error },
        })
      );
  };
}
