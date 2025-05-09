export const REGISTRATION_INPUTS = [
  {
    placeholder: 'First name',
  },
  {
    placeholder: 'Last name',
  },
  {
    placeholder: 'Email',
    type: 'email',
    attributes: {
      autocomplete: 'username',
    },
  },
  {
    placeholder: 'Birth date',
    type: 'date',
  },
  {
    placeholder: 'Password',
    type: 'password',
    attributes: {
      autocomplete: 'current-password',
    },
  },
  {
    placeholder: 'Country',
  },
  {
    placeholder: 'City',
  },
  {
    placeholder: 'Street',
  },
  {
    placeholder: 'Postal code',
  },
];

export const REGISTRATION_FIELDSET_LEGENDS = [
  'Shipping Address',
  'Billing Address',
];
