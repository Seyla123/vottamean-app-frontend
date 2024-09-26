import * as Yup from 'yup';
import moment from 'moment';

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

// School name validator
export const schoolNameSchema = Yup.string()
  .trim()
  .required('School name is required')
  .min(2, 'School name must be at least 2 characters long')
  .max(50, 'School name must be less than 50 characters');

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

// Current password validator
export const currentPasswordSchema = Yup.string().required(
  'Current password is required',
);

// New Password Validator
export const newPasswordSchema = Yup.string()
  .required('New password is required')
  .min(8, 'New password must be at least 8 characters')
  .matches(/[a-zA-Z]/, 'New password must contain at least one letter')
  .matches(/[0-9]/, 'New password must contain at least one number')
  .notOneOf(
    [Yup.ref('currentPassword'), null],
    'New password cannot be the same as the old password',
  );

// New Password Confirm Validator
export const newPasswordConfirmSchema = Yup.string()
  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  .required('Confirm New Password is required');

// Phone number Validator
export const phoneSchema = Yup.string()
  .trim()
  .required('Phone number is required')
  .matches(/^\d{9,15}$/, 'Phone number must be between 09 and 15 digits')
  .test(
    'length',
    'Phone number must be between 09 and 15 digits',
    (value) => value && value.length >= 9 && value.length <= 15,
  );

// Address validator
export const addressSchema = Yup.string()
  .trim()
  .nullable()
  .notRequired()
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

//Class Valid
export const ClassValidator = Yup.object().shape({
  class_name: Yup.string().required('Class name is required'),
  description: Yup.string().optional(),
});

// Start Time & End Time Validator
export const startTimeSchema = Yup.string()
  .required('Start time is required')
  .matches(/^\d{2}:\d{2}$/, 'Start time must be in the format HH:MM');

export const endTimeSchema = Yup.string()
  .required('End time is required')
  .matches(/^\d{2}:\d{2}$/, 'End time must be in the format HH:MM')
  .test('is-greater', 'End time must be after start time', function (value) {
    const { start_time } = this.parent;
    if (start_time && value) {
      const startTimeMoment = moment(start_time, 'HH:mm');
      const endTimeMoment = moment(value, 'HH:mm');
      return endTimeMoment.isAfter(startTimeMoment);
    }
    return true;
  });

// Class validation
export const classSchema = Yup.string().required('Class is required');

export const subjectSchema = Yup.string()
  .trim()
  .required('Subject is required')
  .min(3, 'Subject name must be at least 3 characters long')
  .max(50, 'Subject name must be less than 50 characters');

export const descriptionSchema = Yup.string()
  .trim()
  .required('Description cannot be empty')
  .max(255, 'Description must be less than 255 characters');

// Dynamic form schema generator
export const createFormSchema = (fields) => {
  const schemaFields = {
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
    currentPassword: currentPasswordSchema,
    newPassword: newPasswordSchema,
    newPasswordConfirm: newPasswordConfirmSchema,
    name: nameSchema,
    first_name: firstNameSchema,
    last_name: lastNameSchema,
    gender: genderSchema,
    dob: dobSchema,
    phone_number: phoneSchema,
    address: addressSchema,
    school_name: schoolNameSchema,
    school_address: addressSchema,
    school_phone_number: phoneSchema,
    age: ageSchema,
    class_name: classSchema,
    start_time: startTimeSchema,
    end_time: endTimeSchema,
    subjectName: subjectSchema,
    description: descriptionSchema,
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

// Update Password Validator
export const ChangePasswordValidator = createFormSchema([
  'currentPassword',
  'newPassword',
  'newPasswordConfirm',
]);

// User profile information in the settings
export const UserProfileValidator = createFormSchema([
  'first_name',
  'last_name',
  'gender',
  'phone_number',
  'address',
  'dob',
]);

// User School validator
export const SchoolValidator = createFormSchema([
  'school_name',
  'school_address',
  'school_phone_number',
]);

// Account Information
export const AccountInformationValidator = createFormSchema([
  'email',
  'password',
  'passwordConfirm',
]);

// Start of Class Period Validation
export const ClassPeriodValidator = createFormSchema([
  'start_time',
  'end_time',
]);

// Update Teacher Information
export const UpdateTeacherInfo = createFormSchema([
  'first_name',
  'last_name',
  'gender',
  'phone_number',
  'address',
  'dob',
]);

// Update Subject Information
export const SubjectValidator = createFormSchema(['name', 'description']);
