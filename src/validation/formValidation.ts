import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  category: yup
    .string(),
  description: yup
    .string(),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be a positive number')
    .max(999.99, 'Price cannot exceed 999.99'),
  protein: yup
    .number()
    .required('Protein is required')
    .positive('Protein must be a positive number')
    .max(0.99, 'Protein cannot exceed 0.99'),
  fats: yup
    .number()
    .required('Fats is required')
    .positive('Fats must be a positive number')
    .max(0.99, 'Fats cannot exceed 0.99'),
  carbs: yup
    .number()
    .required('Carbs is required')
    .positive('Carbs must be a positive number')
    .max(0.99, 'Carbs cannot exceed 0.99'),
  unit: yup.string().required('Unit is required').matches(/^(ml|g)$/, 'Unit must be "ml" or "g"'),
});

export default validationSchema;