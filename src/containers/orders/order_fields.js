export const FIELDS_USER = {
  title: {
    type: 'select',
    label: 'Title',
    options: [{id: 'Mr', name: 'Mr'}, {id: 'Ms', name: 'Ms'}, {id: 'Mrs', name: 'Mrs'}],
    hint: 'hint hint'
  },
  firstName: {
    type: 'input',
    label: 'First Name',
    hint: 'hint hint'
  },
  lastName: {
    type: 'input',
    label: 'Last Name',
    hint: 'hint hint'
  },
  middleName: {
    type: 'input',
    label: 'Middle Name',
    hint: 'hint hint'
  },
  nationality: {
    type: 'input',
    label: 'Nationality',
    hint: 'hint hint'
  }
};

export const FIELDS_ORDER = {
  checkIn: {
    type: 'input',
    label: 'Check In Date',
    hint: 'hint hint'
  },
  checkOut: {
    type: 'input',
    label: 'Check Out Date',
    hint: 'hint hint'
  },
  bookingSource: {
    type: 'select',
    label: 'Booking Source',
    options: [
      {id: 1, name: 'Travel Agent'},
      {id: 2, name: 'Direct'},
      {id: 3, name: 'Online Travel Agent'},
      {id: 4, name: 'Hotel Booking Engine'},
      {id: 5, name: 'Corporate'}
    ],
    hint: 'hint hint'
  },
  roomType: {
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
  numberOfRoom: {
    type: 'select',
    label: 'Number Of Room',
    options: [{id: 1, name: '1'}, {id: 2, name: '2'}, {id: 3, name: '3'}, {id: 4, name: '4'}, {id: 5, name: '5'}],
    hint: 'hint hint'
  },
  numberOfPerson: {
    type: 'select',
    label: 'Number Of Person',
    options: [{id: 1, name: '1'}, {id: 2, name: '2'}, {id: 3, name: '3'}, {id: 4, name: '4'}, {id: 5, name: '5'}],
    hint: 'hint hint'
  },
  enfant: {
    type: 'input',
    label: 'Enfant',
    hint: 'hint hint'
  }
};

export const FIELDS_BILL = {
  price: {
    type: 'input',
    label: 'Final Price',
    hint: 'hint hint'
  },
  paymentMethod: {
    type: 'select',
    label: 'Payment Method',
    options: [ 
      {id: 1, name: 'Cash'},
      {id: 2, name: 'Credit Card'},
      {id: 3, name: 'Company Bill'}
    ],
    hint: 'hint hint'
  }
};