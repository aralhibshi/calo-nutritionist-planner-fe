import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  category: yup
    .string()
    .required('Category is required'),
  description: yup
    .string()
    .required('Description is required'),
  unit: yup.string().required('Unit is required').matches(/^(ml|g)$/, 'Unit must be "ml" or "g"'),
});

export default validationSchema;