export const FIELDS_ROOM = {
  name: {
    type: 'input',
    label: 'Room Name',
    hint: 'example: 202'
  },
  type: {
    type: 'select',
    label: 'Room Type',
    options: [ 
      {id: 1, name: 'Superior Double'},
      {id: 2, name: 'Superior Twin'},
      {id: 3, name: 'Luxury Double'},
      {id: 4, name: 'Luxury Twin'},
      {id: 5, name: 'Suite'}
    ],
    hint: 'hint hint'
  },
  status: {
    type: 'select',
    label: 'Room Status',
    options: [{id: 1, name: 'Free'}, {id: 2, name: 'Occupied'}],
    hint: 'hint hint'
  },
  active: {
    type: 'toggle-active',
    label: 'Active',
    options: [{id: true, name: 'Active'}, {id: false, name: 'Inactive'}],
    hint: 'hint hint'
  }
};