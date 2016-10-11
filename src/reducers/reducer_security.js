import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actions'

const localToken = localStorage.getItem('feathers-jwt');

const INIT_STATE = {
  isFetching: false,
  isAuthenticated: localToken ? true : false,
  token: localToken
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REGISTER_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
  [REGISTER_FAILURE]: (state, action) => ({ ...state, ...action.payload }),
  [LOGIN_SUCCESS]: (state, action) => ({ ...state, ...action.payload }),
  [LOGIN_FAILURE]: (state, action) => ({ ...state, ...action.payload })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ( state = INIT_STATE, action ) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}