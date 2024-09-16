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
 *    const { control, handleSubmit, errors } = useForm({
 *      resolver: yupResolver(schemaName)
 *    });
 * 3. 
 *    <Box
 *      component="form"
 *      onSubmit={handleSignupSubmit(onSignupSubmit)}
 *    >
 *      <Controller
 *        name="name"
 *        control={signupControl}
 *        render={({ field }) => (
 *          <TextField
 *            {...field}
 *            margin="normal"
 *            required
 *            fullWidth
 *            id="signup-name"
 *            label="Name"
 *            autoComplete="name"
 *            error={!!signupErrors.name}
 *            helperText={signupErrors.name?.message}
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

export const nameSchema = Yup.string()
  .required('Name is required')
  .min(3, 'Name must be at least 3 characters')
  .max(40, 'Name must be less than 40 characters');

export const emailSchema = Yup.string()
  .required('Email is required')
  .email('Invalid email format');

export const passwordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  .matches(/[0-9]/, 'Password must contain at least one number');

export const phoneSchema = Yup.string().matches(
  /^\d{10}$/,
  'Phone number must be 10 digits',
);

const ageSchema = Yup.number()
  .required('Age is required')
  .positive('Age must be a positive number')
  .integer('Age must be an integer')
  .min(18, 'You must be at least 18 years old')
  .max(120, 'Age must be less than 120');

export const sexSchema = Yup.string()
  .required('Sex is required')
  .oneOf(['male', 'female', 'other'], 'Invalid sex option');

export const createFormSchema = (fields) => {
  const schemaFields = {
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    age: ageSchema,
    sex: sexSchema,
    // More schemas...
  };

  return Yup.object().shape(
    Object.fromEntries(fields.map((field) => [field, schemaFields[field]])),
  );
};

// Define your SchemaForm name and paste the fields as array when calling.
export const signupFormSchema = createFormSchema(['name', 'email', 'password']);
