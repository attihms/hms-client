import axios from 'axios';
import {
  ROOT_URL, API_KEY,
  FETCH_SCHEDULE
} from './';

function getToken() {
  const token = localStorage.getItem('feathers-jwt');
  axios.defaults.headers.common['Authorization'] = token;
}

const END_POINT = 'schedules';

export function fetchSchedule(start, end) {
  getToken();
  const request = axios.get(`${ROOT_URL}/${END_POINT}${API_KEY}?checkIn=${start}&checkOut=${end}`);

  return {
    type: FETCH_SCHEDULE,
    payload: request
  }
}