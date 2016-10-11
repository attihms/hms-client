import { 
	FETCH_ORDERS,
	FETCH_ORDER,
	CLEAR_ORDER
} from '../actions';

const INIT_STATE = {
	all: [],
	order: null
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_ORDER]: (state, action) => ({ ...state, order: action.payload.data }),
  [FETCH_ORDERS]: (state, action) => ({ ...state, all: action.payload.data }),
  [CLEAR_ORDER]: (state, action) => ({ ...state, order: null })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ( state = INIT_STATE, action ) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}