// import React from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Avatar,
// } from '@mui/material';
// import SubHeader from './SubHeader';
// import DatePickerComponent from './DatePickerComponent';
// import ButtonContainer from '../common/ButtonContainer';
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { createFormSchema } from '../../validators/validationSchemas';
// import { useSignUpTeacherMutation } from '../../services/teacherApi';

// const TeacherInfo = ({ handleNext, handleCancel, mode = 'create' }) => {
// const [signUpTeacher] = useSignUpTeacherMutation();

//   // Form schema using Yup
//   // const schema = createFormSchema([
//   //   'first_name',
//   //   'last_name',
//   //   'phone_number',
//   //   'gender',
//   //   'dob',
//   //   'address',
//   // ]);

//   // // Hook form setup
//   // const {
//   //   control,
//   //   handleSubmit,
//   //   formState: { errors },
//   // } = useForm({
//   //   resolver: yupResolver(schema),
//   //   mode: 'onSubmit',
//   // });

//   // // Form submission logic
//   // const handleSubmitNext = async (data) => {
//   //   console.log('Form data:', data);
//   //   try {
//   //     await signUpTeacher(data);
//   //     handleNext();
//   //   } catch (error) {
//   //     console.error('Teacher info submission failed', error);
//   //   }
//   // };
//   const schema = createFormSchema([
//     'first_name',
//     'last_name',
//     'phone_number',
//     'gender',
//     'dob',
//     'address',
//   ]);

//   const {
//     control,
//     handleSubmit,
//     formState: { errors, isValid },
//   } = useForm({
//     resolver: yupResolver(schema),
//     mode: 'onChange',
//   });

//   const handleSubmitNext = async (data) => {
//     console.log('Form data:', data);
//     try {
//       await signUpTeacher(data);
//       handleNext(true); // Pass true to indicate successful validation
//     } catch (error) {
//       console.error('Teacher info submission failed', error);
//       handleNext(false); // Pass false on failure
//     }
//   };
//   return (
//     <Box sx={profileBox}>
//       <Box sx={valueBoxOne}>
//         <Avatar sx={imgStyle} alt="profile picture" src="r" />
//       </Box>

//       <SubHeader title={'Teacher Information'} />

//       <Box
//         component="form"
//         onSubmit={handleSubmit(handleSubmitNext)}
//         sx={{
//           width: '100%',
//           marginTop: '16px',
//           gap: {
//             xs: '12px',
//             sm: 3,
//           },
//         }}
//       >
//         <Box display={'flex'} flexDirection={'row'} sx={boxContainer}>
//           {/* First Name */}
//           <Box sx={{ flex: 1 }}>
//             <Box sx={textFieldGap}>
//               <Typography>First Name</Typography>
//               <Controller
//                 name="first_name"
//                 control={control}
//                 defaultValue="" // Set default value
//                 render={({ field }) => (
//                   <TextField
//                     id="first-name"
//                     placeholder="First name"
//                     variant="outlined"
//                     fullWidth
//                     {...field}
//                     error={!!errors.first_name}
//                     helperText={errors.first_name?.message}
//                   />
//                 )}
//               />
//             </Box>
//           </Box>
//           {/* Last Name */}
//           <Box sx={{ flex: 1 }}>
//             <Box sx={textFieldGap}>
//               <Typography>Last Name</Typography>
//               <Controller
//                 name="last_name"
//                 control={control}
//                 defaultValue=""
//                 render={({ field }) => (
//                   <TextField
//                     id="last-name"
//                     placeholder="Last name"
//                     variant="outlined"
//                     fullWidth
//                     {...field}
//                     error={!!errors.last_name}
//                     helperText={errors.last_name?.message}
//                   />
//                 )}
//               />
//             </Box>
//           </Box>
//         </Box>

//         {/* Gender */}
//         <Box sx={textFieldGap}>
//           <Typography>Gender</Typography>
//           <Controller
//             name="gender"
//             control={control}
//             defaultValue="" // Set default value
//             render={({ field }) => (
//               <Select
//                 {...field}
//                 fullWidth
//                 displayEmpty
//                 error={!!errors.gender}
//                 renderValue={(selected) => {
//                   if (!selected) {
//                     return (
//                       <Box
//                         component="p"
//                         variant="body2"
//                         sx={{ color: '#a7a7a7' }}
//                       >
//                         Gender
//                       </Box>
//                     );
//                   }
//                   return selected;
//                 }}
//               >
//                 <MenuItem value="Male">Male</MenuItem>
//                 <MenuItem value="Female">Female</MenuItem>
//               </Select>
//             )}
//           />
//           {errors.gender && (
//             <Typography color="error">{errors.gender.message}</Typography>
//           )}
//         </Box>

//         {/* Date of Birth */}

//         {/* Phone Number */}
//         <Box sx={textFieldGap}>
//           <Typography>Phone Number</Typography>
//           <Controller
//             name="phone_number"
//             control={control}
//             defaultValue="" // Set default value
//             render={({ field }) => (
//               <TextField
//                 id="phone-number"
//                 placeholder="Phone number"
//                 variant="outlined"
//                 fullWidth
//                 {...field}
//                 error={!!errors.phone_number}
//                 helperText={errors.phone_number?.message}
//               />
//             )}
//           />
//         </Box>

//         {/* Address */}
//         <Box sx={textFieldGap}>
//           <Typography>Address</Typography>
//           <Controller
//             name="address"
//             control={control}
//             defaultValue="" // Set default value
//             render={({ field }) => (
//               <TextField
//                 id="address"
//                 placeholder="Address"
//                 variant="outlined"
//                 fullWidth
//                 {...field}
//                 error={!!errors.address}
//                 helperText={errors.address?.message}
//               />
//             )}
//           />
//         </Box>

//         {/* Buttons */}
//         <Box
//           display={'flex'}
//           flexDirection={'row'}
//           justifyContent={'flex-end'}
//           gap={2}
//           mt={2}
//         >
//           {mode === 'create' && (
//             <ButtonContainer
//             onSubmit={handleSubmit(handleSubmitNext)}
//               leftBtnTitle="Cancel"
//               rightBtnTitle="Next"
//             />
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default TeacherInfo;

// const boxContainer = {
//   width: '100%',
//   marginTop: '16px',
//   gap: {
//     xs: '12px',
//     sm: 3,
//   },
// };

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

// const valueBoxOne = {
//   width: 100,
//   height: 100,
//   borderRadius: '50%',
//   overflow: 'hidden',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   mb: 2,
//   position: 'relative',
// };

// const textFieldGap = {
//   display: 'flex',
//   gap: 0.5,
//   flexDirection: 'column',
// };

// const imgStyle = {
//   width: {
//     xs: 120,
//     sm: 160,
//   },
//   height: {
//     xs: 120,
//     sm: 160,
//   },
// };
import React from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  gender: yup.string().required('Gender is required'),
  dob: yup.date().required('Date of birth is required'),
  address: yup.string().required('Address is required'),
});

const TeacherInfo = ({ handleNextClick }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      gender: '',
      dob: null,
      address: '',
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit(handleNextClick)}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone Number"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Gender"
              error={!!errors.gender}
              helperText={errors.gender?.message}
              fullWidth
              margin="normal"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          )}
        />
        <Controller
          name="dob"
          control={control}
          render={({ field }) => (
            <DesktopDatePicker
              {...field}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                  fullWidth
                  margin="normal"
                />
              )}
              label="Date of Birth"
              value={field.value || null} 
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              error={!!errors.address}
              helperText={errors.address?.message}
              fullWidth
              margin="normal"
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </LocalizationProvider>
  );
};

export default TeacherInfo;


const boxContainer = {
  width: '100%',
  marginTop: '16px',
  gap: {
    xs: '12px',
    sm: 3,
  },
};

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

const valueBoxOne = {
  width: 100,
  height: 100,
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
  position: 'relative',
};

const textFieldGap = {
  display: 'flex',
  gap: 0.5,
  flexDirection: 'column',
};

const imgStyle = {
  width: {
    xs: 120,
    sm: 160,
  },
  height: {
    xs: 120,
    sm: 160,
  },
};
