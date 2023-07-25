import * as yup from 'yup';

export const schema = yup
  .object({
    type_of_marchandise: yup.string().required('Veuillez renseigner ce champ'),
    quantity: yup
      .number('Veuillez entrer un nombre')
      .positive('Veuillez entrer un nombre > 0')
      .integer()
      .required('Veuillez entrer un nombre'),
    weight: yup
      .number('Veuillez entrer un nombre')
      .min(0.1, 'Veuillez entrer un nombre > 0')
      .required('Veuillez entrer un nombre'),
    length: yup
      .number('Veuillez entrer un nombre')
      .positive('Veuillez entrer un nombre > 0')
      .integer()
      .required('Veuillez entrer un nombre'),
    width: yup
      .number('Veuillez entrer un nombre')
      .positive('Veuillez entrer un nombre > 0')
      .integer()
      .required('Veuillez entrer un nombre'),
    height: yup
      .number('Veuillez entrer un nombre')
      .positive('Veuillez entrer un nombre > 0')
      .integer()
      .required('Veuillez entrer un nombre'),
    departure_address: yup.string().required('Veuillez renseigner ce champ'),
    departure_phone_number: yup
      .string()
      .matches(
        /^(\+33|0)[1-9](\d{2}){4}$/,
        'Veuillez entrer un numéro de téléphone valide'
      )
      .required('Veuillez renseigner ce champ'),
    arrival_address: yup.string().required('Veuillez renseigner ce champ'),
    arrival_phone_number: yup
      .string()
      .matches(
        /^(\+33|0)[1-9](\d{2}){4}$/,
        'Veuillez entrer un numéro de téléphone valide'
      )
      .required('Veuillez renseigner ce champ'),
    departure_date: yup.string().required('Veuillez renseigner ce champ'),
    arrival_date: yup.string().required('Veuillez renseigner ce champ'),
    price: yup
      .number('Veuillez entrer un nombre')
      .positive('Veuillez entrer un nombre > 0')
      .required('Veuillez renseigner ce champ'),
  })
  .required();
