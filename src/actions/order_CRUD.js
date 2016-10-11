import axios from 'axios';
import {
  ROOT_URL, API_KEY,
  FETCH_ORDERS, CREATE_ORDER, FETCH_ORDER, DELETE_ORDER, EDIT_ORDER, CLEAR_ORDER
} from './';

function getToken() {
  const token = localStorage.getItem('feathers-jwt');
  axios.defaults.headers.common['Authorization'] = token;
}

const END_POINT = 'reservations';

export function fetchOrders() {
  getToken();
  const request = axios.get(`${ROOT_URL}/${END_POINT}${API_KEY}`);

  return {
    type: FETCH_ORDERS,
    payload: request
  }
}

export function fetchOrder(id) {
  getToken();
  const request = axios.get(`${ROOT_URL}/${END_POINT}/${id}${API_KEY}`);

  return {
    type: FETCH_ORDER,
    payload: request
  }
}

export function createOrder(props) {
  getToken();
  const request = axios.post(`${ROOT_URL}/${END_POINT}${API_KEY}`, props);

  return {
    type: CREATE_ORDER,
    payload: request
  }
}

export function editOrder(id, props) {
  getToken();
  const request = axios.put(`${ROOT_URL}/${END_POINT}/${id}${API_KEY}`, props);

  return {
    type: EDIT_ORDER,
    payload: request
  }
}

export function deleteOrder(id) {
  getToken();
  const request = axios.delete(`${ROOT_URL}/${END_POINT}/${id}${API_KEY}`);

  return {
    type: DELETE_ORDER,
    payload: request
  }
}

export function clearOrder(id) {
  return {
    type: CLEAR_ORDER
  }
}
