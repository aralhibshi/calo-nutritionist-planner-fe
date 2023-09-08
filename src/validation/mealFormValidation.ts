import * as yup from 'yup';

const mealValidationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  description: yup
    .string()
    .required("Description is required"),
  components: yup
    .array()
    .min(1)
    .required('Components are required'),
  unit: yup
    .string()
    .matches(/^(ml|g)$/, 'Unit must be "ml" or "g"')
    .required('Unit is required')
});

export default mealValidationSchema;