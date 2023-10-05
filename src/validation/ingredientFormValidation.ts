import * as yup from 'yup';

const ingredientValidationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  category: yup
    .string()
    .required('Category is required'),
  description: yup
    .string()
    .required('Description is required'),
  price: yup
    .number()
    .min(0)
    .max(0.999, 'Price cannot exceed 999.99')
    .required('Price is required'),
  protein: yup
    .number()
    .min(0)
    .max(0.999, 'Protein cannot exceed 0.99')
    .required('Protein is required'),
  fats: yup
    .number()
    .min(0)
    .max(0.999, 'Fats cannot exceed 0.99')
    .required('Fats is required'),
  carbs: yup
    .number()
    .min(0)
    .max(0.999, 'Carbs cannot exceed 0.99')
    .required('Carbs is required'),
  unit: yup
    .string()
    .matches(/^(ml|g)$/, 'Unit must be "ml" or "g"')
    .required('Unit is required')
});

export default ingredientValidationSchema;