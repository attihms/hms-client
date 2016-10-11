import axios from 'axios';
import {
  ROOT_URL, API_KEY,
  FETCH_ROOMS, CREATE_ROOM, FETCH_ROOM, DELETE_ROOM, EDIT_ROOM, CLEAR_ROOM
} from './';

function getToken() {
  const token = localStorage.getItem('feathers-jwt');
  axios.defaults.headers.common['Authorization'] = token;
}

const END_POINT = 'rooms';

export function fetchRooms() {
  getToken();
  const request = axios.get(`${ROOT_URL}/${END_POINT}${API_KEY}`);

  return {
    type: FETCH_ROOMS,
    payload: request
  }
}

export function fetchRoom(id) {
  getToken();
  const request = axios.get(`${ROOT_URL}/${END_POINT}/${id}${API_KEY}`);

  return {
    type: FETCH_ROOM,
    payload: request
  }
}

export function createRoom(props) {
  getToken();
  const request = axios.post(`${ROOT_URL}/${END_POINT}${API_KEY}`, props);

  return {
    type: CREATE_ROOM,
    payload: request
  }
}

export function editRoom(id, props) {
  getToken();
  const request = axios.put(`${ROOT_URL}/${END_POINT}/${id}${API_KEY}`, props);

  return {
    type: EDIT_ROOM,
    payload: request
  }
}

export function deleteRoom(id) {
  getToken();
  const request = axios.delete(`${ROOT_URL}/${END_POINT}/${id}${API_KEY}`);

  return {
    type: DELETE_ROOM,
    payload: request
  }
}

export function clearRoom(id) {
  return {
    type: CLEAR_ROOM
  }
}
