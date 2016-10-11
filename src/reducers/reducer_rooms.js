import { 
	FETCH_ROOMS,
	FETCH_ROOM,
	CLEAR_ROOM
} from '../actions';

const INIT_STATE = {
	all: [],
	room: null
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ROOM]: (state, action) => ({ ...state, room: action.payload.data }),
  [FETCH_ROOMS]: (state, action) => ({ ...state, all: action.payload.data }),
  [CLEAR_ROOM]: (state, action) => ({ ...state, room: null })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ( state = INIT_STATE, action ) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}