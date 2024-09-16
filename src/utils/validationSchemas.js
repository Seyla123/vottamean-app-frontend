import * as Yup from 'yup';

/**
 * Validation Schemas
 *
 * How to define:
 * 1. Create individual field schemas (e.g., nameSchema, emailSchema)
 * 2. Use createFormSchema to combine field schemas
 *
 * How to use:
 * 1. Import desired schema: import { schemaName } from './validationSchemas'
 * 2. Use with react-hook-form:
 *    const { control, handleSubmit, formState: { errors } } = useForm({
 *      resolver: yupResolver(schemaName)
 *    });
 * 3.
 *    <Box
 *      component="form"
 *      onSubmit={handleSubmit(onSubmit)}
 *    >
 *      <Controller
 *        name="name"
 *        control={control}
 *        render={({ field }) => (
 *          <TextField
 *            {...field}
 *            margin="normal"
 *            required
 *            fullWidth
 *            id="signup-name"
 *            label="Name"
 *            autoComplete="name"
 *            error={!!errors.name}
 *            helperText={errors.name?.message}
 *          />
 *        )}
 *      />
 *      ...
 *      <Button
 *        type="submit"
 *      >
 *        Sign Up
 *      </Button>
 *    </Box>
 *
 *
 * Example:
 * export const customFormSchema = createFormSchema(['name', 'email', 'age']);
 */

// Name validator for admin, teacher, and student
export const nameSchema = Yup.string()
  .required('Name is required')
  .min(3, 'Name must be at least 3 characters')
  .max(40, 'Name must be less than 40 characters');

// Email validator for admin, teacher, student, guardian email
export const emailSchema = Yup.string()
  .required('Email is required')
  .email('Invalid email format');

// Password validator for admin and teacher
export const passwordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  .matches(/[0-9]/, 'Password must contain at least one number');

// Signup validator for admin and teacher
export const signupSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});

// Phone number validator
export const phoneSchema = Yup.string().matches(
  /^\d{10}$/,
  'Phone number must be 10 digits',
);

// Age validator
const ageSchema = Yup.number()
  .required('Age is required')
  .positive('Age must be a positive number')
  .integer('Age must be an integer')
  .min(18, 'You must be at least 18 years old')
  .max(120, 'Age must be less than 120');

// Gender validator
export const genderSchema = Yup.string()
  .required('Gender is required')
  .oneOf(['male', 'female', 'other'], 'Invalid gender option');

// Dynamic form schema generator
export const createFormSchema = (fields) => {
  const schemaFields = {
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    age: ageSchema,
    gender: genderSchema,
    // More schemas can be added here...
  };

  return Yup.object().shape(
    Object.fromEntries(fields.map((field) => [field, schemaFields[field]])),
  );
};

// Define your Signup Schema and pass fields as array when calling.
export const signupFormSchema = createFormSchema([
  'name',
  'email',
  'password',
  'passwordConfirm',
  'age',
  'gender',
]);
