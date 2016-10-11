import { 
	FETCH_SCHEDULE
} from '../actions';

const INIT_STATE = {
	all: []
};

const fakeData = {
	total: 2,
	limit: 100,
	skip: 0,
	data: [
		{
			id: 8,
			firstName: "Cade",
			middleName: null,
			lastName: "Legros",
			title: "Mr",
			checkIn: "2016-10-07T20:06:15.975Z",
			checkOut: "2016-10-08T06:53:37.699Z",
			bookingSourceId: 9,
			bookingSourceName: "Online Travel Agent",
			roomId: 2,
			roomTypeId: null,
			roomType: "Luxury Double",
			created_at: "2016-09-01T11:47:09.183Z",
			updated_at: "2016-09-01T11:47:09.183Z",
			deleted_at: null
		},
		{
			id: 9,
			firstName: "Cade",
			middleName: null,
			lastName: "Legros",
			title: "Mr",
			checkIn: "2016-10-06T07:06:15.975Z",
			checkOut: "2016-10-09T06:53:37.699Z",
			bookingSourceId: 9,
			bookingSourceName: "Online Travel Agent",
			roomId: 1,
			roomTypeId: null,
			roomType: "Luxury Double",
			created_at: "2016-09-01T11:47:09.183Z",
			updated_at: "2016-09-01T11:47:09.183Z",
			deleted_at: null
		},
		{
			id: 10,
			firstName: "Cade",
			middleName: null,
			lastName: "Legros",
			title: "Mr",
			checkIn: "2016-10-02T07:06:15.975Z",
			checkOut: "2016-10-04T06:53:37.699Z",
			bookingSourceId: 9,
			bookingSourceName: "Online Travel Agent",
			roomId: 1,
			roomTypeId: null,
			roomType: "Luxury Double",
			created_at: "2016-09-01T11:47:09.183Z",
			updated_at: "2016-09-01T11:47:09.183Z",
			deleted_at: null
		},
		{
			id: 11,
			firstName: "Cade",
			middleName: null,
			lastName: "Legros",
			title: "Mr",
			checkIn: "2016-10-03T07:06:15.975Z",
			checkOut: "2016-10-06T06:53:37.699Z",
			bookingSourceId: 9,
			bookingSourceName: "Online Travel Agent",
			roomId: 2,
			roomTypeId: null,
			roomType: "Luxury Double",
			created_at: "2016-09-01T11:47:09.183Z",
			updated_at: "2016-09-01T11:47:09.183Z",
			deleted_at: null
		}
	]
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_SCHEDULE]: (state, action) => ({ ...state, all: fakeData /*action.payload.data*/ })
};

// ------------------------------------
// Reducer
// ------------------------------------
export default function ( state = INIT_STATE, action ) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}