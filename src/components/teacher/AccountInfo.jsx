// // import React from 'react';
// // import { Box, Button, Typography, TextField } from '@mui/material';
// // import SubHeader from './SubHeader';
// // import { useForm } from 'react-hook-form';
// // import { useSignUpTeacherMutation } from '../../services/teacherApi';
// // import * as yup from 'yup';
// // import { yupResolver } from '@hookform/resolvers/yup'; 
// // import { createFormSchema } from '../../validators/validationSchemas';
// // // Validation schema
// // // const schema = yup.object().shape({
// // //   email: yup.string().email('Invalid email format').required('Email is required'),
// // //   password: yup.string().min(8).required('Password is required'),
// // //   passwordConfirm: yup
// // //     .string()
// // //     .oneOf([yup.ref('password'), null], 'Passwords must match')
// // //     .required('Password confirmation is required'),
// // // });
// // const AccountInfo = ({ handleBack }) => {
// //   const [signUpTeacher, { isLoading, error }] = useSignUpTeacherMutation();

// //   // Form validation rules
// //   const { register, handleSubmit, formState: { errors } } = useForm({
// //     resolver: yupResolver(createFormSchema)
// //   });

// //   // Form submission
// //   const onSubmit = async (data) => {
// //     try {
// //       const response = await signUpTeacher(data).unwrap(); // Send data to backend
// //       if (response) {
// //         console.log("Teacher signed up successfully", response);
// //         // You can add navigation to another page or show a success message
// //       }
// //     } catch (err) {
// //       console.error('Signup failed:', err);
// //     }
// //   };

// //   return (
// //     <Box sx={profileBox}>
// //       <Box
// //         onSubmit={handleSubmit(onSubmit)}
// //         component="form"
// //         width={'100%'}
// //         display={'flex'}
// //         flexDirection={'column'}
// //         sx={{ gap: { xs: '12px', sm: 3 } }}
// //       >
// //         {/* Your form fields for email, password, confirm password */}
// //         <Box sx={textFieldGap}>
// //           <Typography>Email</Typography>
// //           <TextField
// //             id="email"
// //             placeholder="email"
// //             variant="outlined"
// //             fullWidth
// //             {...register('email')}
// //             error={!!errors.email}
// //             helperText={errors.email?.message}
// //           />
// //         </Box>
// //          {/* Password */}
// //         <Box sx={textFieldGap}>
// //           <Typography>Password</Typography>
// //           <TextField
// //             id="password"
// //             placeholder="password"
// //             variant="outlined"
// //             fullWidth
// //             type="password"
// //             {...register('password')}
// //             error={!!errors.password}
// //             helperText={errors.password?.message}
// //           />
// //         </Box>
// //         <Box sx={textFieldGap}>
// //           <Typography>Password Confirm</Typography>
// //           <TextField
// //             id="password-confirm"
// //             placeholder="password confirm"
// //             variant="outlined"
// //             type="password"
// //             fullWidth
// //             {...register('passwordConfirm')}
// //             error={!!errors.passwordConfirm}
// //             helperText={errors.passwordConfirm?.message}
// //           />
// //         </Box>
// //         {/* Other form fields */}
// //         {/* Buttons */}
// //         <Box
// //           sx={{ width:"100%" , maxWidth: { xs: '100%', sm: '340px' } , display: 'flex', justifyContent: 'flex-end' , alignSelf:'flex-end'}}
// //           gap={2}
// //         >
// //           <Button
// //             variant="outlined"
// //             sx={{ borderColor: 'inherit', color: 'inherit' }}
// //             onClick={handleBack}
// //             fullWidth
// //           >
// //             Back
// //           </Button>
// //           <Button fullWidth variant="contained" type="submit">
// //             Add Teacher
// //           </Button>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default AccountInfo;

// // const profileBox = {
// //   border: '1px solid',
// //   borderColor: '#E0E0E0',
// //   borderRadius: '8px',
// //   bgcolor: '#ffffff',
// //   marginTop: '32px',
// //   padding: {
// //     xs: 2,
// //     sm: 3,
// //   },
// //   display: 'flex',
// //   alignItems: 'center',
// //   justifyContent: 'center',
// //   flexDirection: 'column',
// //   position: 'relative',
// // };

// // const textFieldGap = {
// //   display: 'flex',
// //   gap: 0.5,
// //   flexDirection: 'column',
// // };

// import React from 'react';
// import { Box, Button, Typography, TextField } from '@mui/material';
// import SubHeader from './SubHeader';
// import { useForm } from 'react-hook-form';
// import { useSignUpTeacherMutation } from '../../services/teacherApi';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup'; 
// import { createFormSchema } from '../../validators/validationSchemas';

// // Validation schema
// // const schema = yup.object().shape({
// //   email: yup.string().email('Invalid email format').required('Email is required'),
// //   password: yup.string().min(8).required('Password is required'),
// //   passwordConfirm: yup
// //     .string()
// //     .oneOf([yup.ref('password'), null], 'Passwords must match')
// //     .required('Password confirmation is required'),
// // });

// const profileBox = {
//   border: '1px solid',
//   borderColor: '#E0E0E0',
//   borderRadius: '8px',
//   bgcolor: '#ffffff',
//   marginTop: '32px',
//   padding: {
//     xs: 2,
//     sm: 3,
//   },
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   flexDirection: 'column',
//   position: 'relative',
// };

// const textFieldGap = {
//   display: 'flex',
//   gap: 0.5,
//   flexDirection: 'column',
// };

// const AccountInfo = ({ handleBack }) => {
//   const [signUpTeacher, { isLoading, error }] = useSignUpTeacherMutation();
//   const schema = createFormSchema(['email', 'password', 'passwordConfirm']);

//   // Form validation rules
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema)
//   });
  

//   // Form submission
//   const onSubmit = async (data) => {
//     try {
//       const response = await signUpTeacher(data).unwrap(); 
//       if (response) {
//         console.log("Teacher signed up successfully", response);
//       }
//     } catch (err) {
//       console.error('Signup failed:', err);
//     }
//   };
//   return (
//     <Box sx={profileBox}>
//       <Box
//         onSubmit={handleSubmit(onSubmit)}
//         component="form"
//         sx={{
//           width: '100%',
//           display: 'flex',
//           flexDirection: 'column',
//           gap: {
//             xs: '12px',
//             sm: 3,
//           },
//         }}
//       >
//         <SubHeader title={'Account Information'} />
        
//         {/* Email */}
//         <Box sx={textFieldGap}>
//           <Typography>Email</Typography>
//           <TextField
//             id="email"
//             placeholder="email"
//             variant="outlined"
//             fullWidth
          
//             error={!!errors.email}   {...register('email')}
//             helperText={errors.email?.message}  
//           />
//         </Box>

//         {/* Password */}
//         <Box sx={textFieldGap}>
//           <Typography>Password</Typography>
//           <TextField
//             id="password"
//             placeholder="password"
//             variant="outlined"
//             fullWidth
//             type="password"
//             {...register('password')}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//           />
//         </Box>

//         {/* Confirm Password */}
//         <Box sx={textFieldGap}>
//           <Typography>Confirm Password</Typography>
//           <TextField
//             id="confirm-password"
//             placeholder="confirm password"
//             variant="outlined"
//             fullWidth
//             type="password"
//             {...register('passwordConfirm')}
//             error={!!errors.passwordConfirm}
//             helperText={errors.passwordConfirm?.message}
//           />
//         </Box>

//         {/* Buttons */}
//         <Box
//           display={'flex'}
//           alignSelf={'flex-end'}
//           width={'100%'}
//           sx={{ maxWidth: { xs: '100%', sm: '340px' } }}
//           justifyContent={'flex-end'}
//           gap={2}
//         >
//           <Button
//             variant="outlined"
//             sx={{ borderColor: 'inherit', color: 'inherit' }}
//             onClick={handleBack}
//             fullWidth
//           >
//             Back
//           </Button>
//           <Button fullWidth variant="contained" type="submit">
//             Add Teacher
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default AccountInfo;


import React from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import SubHeader from './SubHeader';
import { useForm } from 'react-hook-form';
import { useSignUpTeacherMutation } from '../../services/teacherApi';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'; 
import { createFormSchema } from '../../validators/validationSchemas';

const AccountInfo = ({ handleBack }) => {
  const [signUpTeacher, { isLoading, error }] = useSignUpTeacherMutation();
  const schema = createFormSchema(['email', 'password', 'passwordConfirm']);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await signUpTeacher(data).unwrap(); // Send data to backend
      if (response) {
        console.log("Teacher signed up successfully", response);
        // You can add navigation to another page or show a success message
      }
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <Box sx={profileBox}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SubHeader title={'Account Information'} />
        
        {/* Email */}
        <Box sx={textFieldGap}>
          <Typography>Email</Typography>
          <TextField
            id="email"
            placeholder="email"
            variant="outlined"
            fullWidth
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Box>

        {/* Password */}
        <Box sx={textFieldGap}>
          <Typography>Password</Typography>
          <TextField
            id="password"
            placeholder="password"
            variant="outlined"
            fullWidth
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Box>

        {/* Confirm Password */}
        <Box sx={textFieldGap}>
          <Typography>Confirm Password</Typography>
          <TextField
            id="confirm-password"
            placeholder="confirm password"
            variant="outlined"
            fullWidth
            type="password"
            {...register('passwordConfirm')}
            error={!!errors.passwordConfirm}
            helperText={errors.passwordConfirm?.message}
          />
        </Box>

        {/* Buttons */}
        <Box
          display={'flex'}
          alignSelf={'flex-end'}
          width={'100%'}
          sx={{ maxWidth: { xs: '100%', sm: '340px' } }}
          justifyContent={'flex-end'}
          gap={2}
        >
          <Button
            variant="outlined"
            sx={{ borderColor: 'inherit', color: 'inherit' }}
            onClick={handleBack}
            fullWidth
          >
            Back
          </Button>
          <Button fullWidth variant="contained" type="submit">
            Add Teacher
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AccountInfo;

const profileBox = {
  border: '1px solid',
  borderColor: '#E0E0E0',
  borderRadius: '8px',
  bgcolor: '#ffffff',
  marginTop: '32px',
  padding: {
    xs: 2,
    sm: 3,
  },
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
};

const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
};
