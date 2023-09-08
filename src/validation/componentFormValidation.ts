import * as yup from 'yup';

const componentValidationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  category: yup
    .string()
    .required('Category is required'),
  description: yup
    .string()
    .required('Description is required'),
  ingredients: yup
    .array()
    .min(1)
    .required('Ingredients are required'),
  unit: yup
    .string()
    .matches(/^(ml|g)$/, 'Unit must be "ml" or "g"')
    .required('Unit is required')
});

export default componentValidationSchema;