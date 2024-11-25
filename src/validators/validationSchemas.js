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
 *      <StyledButton size="small" type="submit">Sign Up</StyledButton>
 *    </Box>
 */

// School name validator
export const schoolNameSchema = Yup.string()
  .trim()
  .required('School name is required')
  .min(2, 'School name must be at least 2 characters long')
  .max(50, 'School name must be less than 50 characters');

// First name validator
export const firstNameSchema = Yup.string()
  .label('First name')
  .required('First name is required')
  .min(2, 'First name must be at least 2 characters long')
  .max(20, 'First name must be less than 20 characters')
  .matches(
    /^[a-zA-Z]+( [a-zA-Z]+)?$/,
    'First name must contain only alphabetic characters and may contain a single space',
  );

// Last name validator
export const lastNameSchema = Yup.string()
  .label('Last name')
  .required('Last name is required')
  .min(2, 'Last name must be at least 2 characters long')
  .max(20, 'Last name must be less than 20 characters')
  .matches(
    /^[a-zA-Z]+( [a-zA-Z]+)?$/,
    'Last name must contain only alphabetic characters and may contain a single space',
  );

// Date of birth validator
export const dobSchema = Yup.string()
  .required('Date of birth is required')
  .matches(
    /^\d{4}-\d{2}-\d{2}$/,
    'Date of birth must be in the format YYYY-MM-DD'
  )
  .test(
    'is-past-date',
    'Date of birth cannot be in the future',
    (value) => {
      return value ? new Date(value) <= new Date() : false;
    }
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
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(
    /[!@#$%^&*_+\-]/,
    'Password must contain at least one valid special character',
  );

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
  .matches(/[\W_]/, 'Password must contain at least one special character')
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
  .matches(
    /^\+\d{1,3}\s\d{1,3}.*$/,
    'Phone number must start with a country code and area code (e.g., +855 23 ...)',
  )
  .matches(
    /^\+\d{1,3}\s(?!0)/,
    'Phone number should not start with a zero after the country code',
  )
  .test(
    'length',
    'Phone number must be between 8 and 15 digits (excluding country code)',
    (value) => {
      const numberPart =
        value &&
        value
          .split(' ')
          .slice(1)
          .join('')
          .replace(/[^0-9]/g, '');
      return numberPart && numberPart.length >= 8 && numberPart.length <= 15;
    },
  );

// Address validator
export const addressSchema = Yup.string()
  .trim()
  .nullable()
  .notRequired()
  .max(225, 'Address must be less than 225 characters');

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
  .oneOf(['Male', 'Female'], 'Please select a valid gender');

//Class Valid
export const ClassValidator = Yup.object().shape({
  class_name: Yup.string()
    .required('Class name is required')
    .max(50, 'Class name must be less than 50 characters')
    .matches(
      /^[A-Za-z\d\s]+$/,
      'Class name can contain only letters, numbers, and spaces',
    ),
  description: Yup.string()
    .trim()
    .max(255, 'Description must be less than 255 characters')
    .optional(),
});

//Subject Valid
export const SubjectValidator = Yup.object().shape({
  subject_name: Yup.string()
    .required('Subject name is required')
    .min(3, 'Subject name must be 3 characters up')
    .max(50, 'Subject must be less than 50 characters')
    .matches(
      /^[A-Za-z\d\s]+$/,
      'Subject name can contain only letters, numbers, and spaces',
    ),
  description: Yup.string()
    .trim()
    .max(255, 'Description must be less than 255 characters')
    .optional(),
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

export const subjectSchema = Yup.string().required('Subject is required');

export const createSessionSchema = Yup.string().required(
  'This field is required',
);

// Guardian Relationship validation
export const relationshipSchema = Yup.string()
  .required('Relationship is required')
  .matches(/^[a-zA-Z\s]+$/, 'Only alphabets and spaces are allowed');


// Dynamic form schema generator
export const createFormSchema = (fields) => {
  const schemaFields = {
    email: emailSchema,
    password: passwordSchema,
    passwordConfirm: passwordConfirmSchema,
    currentPassword: currentPasswordSchema,
    newPassword: newPasswordSchema,
    newPasswordConfirm: newPasswordConfirmSchema,
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
    teacherId: createSessionSchema,
    classId: createSessionSchema,
    periodId: createSessionSchema,
    subjectId: createSessionSchema,
    dayId: createSessionSchema,
    subject_name: subjectSchema,
    guardianFirstName: firstNameSchema,
    guardianLastName: lastNameSchema,
    guardianEmail: emailSchema,
    guardianRelationship: relationshipSchema,
    guardianPhoneNumber: phoneSchema,

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
  'school_name',
  'school_address',
  'school_phone_number',
]);

// Login Validator :
export const LoginValidator = createFormSchema(['email']);

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
export const SessionValidator = createFormSchema([
  'teacherId',
  'classId',
  'periodId',
  'dayId',
  'subjectId',
]);

// Student Validations for Creating Student
export const StudentValidator = createFormSchema([
  'photo',
  'first_name',
  'last_name',
  'dob',
  'gender',
  'phone_number',
  'address',
  'class_id',
]);

export const GuardianValidator = createFormSchema([
  'guardianFirstName',
  'guardianLastName',
  'guardianEmail',
  'guardianRelationship',
  'guardianPhoneNumber',
]);

// Send Teacher Invitation
export const SendTeacherInvitationValidator = createFormSchema([
  'email',
  'first_name',
  'last_name',
  'gender',
  'phone_number',
  'address',
  'dob',
]);

// Completed registration
export const CompletedRegistrationValidator = createFormSchema([
  'password',
  'passwordConfirm',
]);

export const CombinedStudentGuardianValidator =
  StudentValidator.concat(GuardianValidator);
