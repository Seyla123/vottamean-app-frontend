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
 * 3. <Box component="form" onSubmit={handleSubmit(onSubmit)}>
 *      <Controller name="name" control={control} render={({ field }) => (
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
 *      <Button type="submit">Sign Up</Button>
 *    </Box>
 */

// Common name validation schema
const nameSchema = Yup.string()
  .trim()
  .required('This field is required')
  .matches(
    /^[A-Za-z]+( [A-Za-z]+)*$/,
    'Name must contain only alphabetic characters and single spaces between words',
  )
  .min(2, 'Name must be at least 2 characters long')
  .max(40, 'Name must be less than 40 characters');

// First name validator
export const firstNameSchema = nameSchema
  .label('First name')
  .required('First name is required');

// Last name validator
export const lastNameSchema = nameSchema
  .label('Last name')
  .required('Last name is required');

// Date of birth validator
export const dobSchema = Yup.string()
  .required('Date of birth is required')
  .matches(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date of birth must be in the format YYYY-MM-DD',
  );

// Email validator for admin, teacher, student, and guardian
export const emailSchema = Yup.string()
  .required('Email is required')
  .email('Please enter a valid email address');

// Password validator for admin and teacher
export const passwordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
  .matches(/[0-9]/, 'Password must contain at least one number');

// Confirm password validator
export const passwordConfirmSchema = Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm Password is required');

// Phone number validator
export const phoneSchema = Yup.string()
  .trim() // Remove leading and trailing spaces
  .required('Phone number is required')
  .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits');

// Address validator
export const addressSchema = Yup.string()
  .required('Address is required')
  .min(10, 'Address must be at least 10 characters long')
  .max(200, 'Address must be less than 200 characters');

// Age validator
export const ageSchema = Yup.number()
  .required('Age is required')
  .positive('Age must be a positive number')
  .integer('Age must be an integer')
  .min(18, 'You must be at least 18 years old')
  .max(120, 'Age must be less than 120');

// Gender validator
export const genderSchema = Yup.string()
  .required('Gender is required')
  .oneOf(['Male', 'Female', 'Other'], 'Please select a valid gender');

// Dynamic form schema generator
export const createFormSchema = (fields) => {
  const schemaFields = {
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
    name: nameSchema,
    first_name: firstNameSchema,
    last_name: lastNameSchema,
    gender: genderSchema,
    dob: dobSchema,
    phone_number: phoneSchema,
    address: addressSchema,
    age: ageSchema,
    // Add more schemas as needed
  };

  return Yup.object().shape(
    Object.fromEntries(fields.map((field) => [field, schemaFields[field]])),
  );
};

// Example Signup Schema using the dynamic generator
export const signupFormSchema = createFormSchema([
  'name',
  'email',
  'password',
  'passwordConfirm',
  'age',
  'gender',
]);

// Singup Step 1 :
export const getStartSignupValidator = createFormSchema([
  'email',
  'password',
  'passwordConfirm',
]);

// Signup Step 2 :
export const PersonalInformationValidator = createFormSchema([
  'first_name',
  'last_name',
  'gender',
  'dob',
]);

// Signup Step 3 :
export const ContactInformationValidator = createFormSchema([
  'phone_number',
  'address',
]);

// Signup Step 4 :
export const RegisterSchoolValidator = createFormSchema([
  'name',
  'phone_number',
  'address',
]);

// Login Validator :
export const LoginValidator = createFormSchema(['email', 'password']);

// Forgot Password Validator :
export const ForgotPasswordValidator = createFormSchema(['email']);

// Reset Password Validator :
export const ResetPasswordValidator = createFormSchema([
  'password',
  'passwordConfirm',
]);
