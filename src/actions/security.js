import axios from 'axios';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import rest from 'feathers-rest/client';
import authentication from 'feathers-authentication/client';

import {
  ROOT_URL,
  API_KEY,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from './';

function receiveLogin(user, token) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: true,
      token: token,
      user
    }
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
}

export function login(creds) {
  const host = ROOT_URL;
  const app = feathers()
    .configure(rest(host).fetch(window.fetch.bind(window)))
    .configure(hooks())
    .configure(authentication({
      storage: window.localStorage
    }));

  const request = app.authenticate({
    type: 'local',
    email: creds.email,
    password: creds.password
  }).then((result) => {
    return receiveLogin(result.data, result.token);
  }).catch((result) => {
    return loginError(result.message);
  });

  return request;
}

function signupSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      isFetching: false,
      user
    }
  }
}

function signupError(message) {
  return {
    type: REGISTER_FAILURE,
    payload: {
      isFetching: false,
      message
    }
  }
}

export function signup(props) {
  const request = axios.post(`${ROOT_URL}/users`, props)
    .then((result) => {
      return signupSuccess(result.data);
    }).catch((result) => {
      return signupError(result.data.errors);
    });

  return request;
}
