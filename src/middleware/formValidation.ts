import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  price: Yup.number()
    .required('Price is required')
    .max(999.99, 'Price must be less than or equal to 999.99'),
  protein: Yup.number()
    .required('Protein is required')
    .max(0.99, 'Protein must be less than or equal to 0.99'),
  fats: Yup.number()
    .required('Fats is required')
    .max(0.99, 'Fats must be less than or equal to 0.99'),
  carbs: Yup.number()
    .required('Carbs is required')
    .max(0.99, 'Carbs must be less than or equal to 0.99'),
  unit: Yup.string()
    .required('Unit is required')
    .oneOf(['ml', 'g'], 'Unit must be either "ml" or "g"'),
});