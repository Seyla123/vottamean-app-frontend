import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import SomethingWentWrong from './SomethingWentWrong';
import LoadingCircle from '../loading/LoadingCircle';

// - Material UI Components
import {
  MenuItem,
  Box,
  Typography,
  Select,
  Button,
  Stack,
} from '@mui/material';
import { UserRoundPen } from 'lucide-react';

// - Custom Components
import DOBPicker from './DOBPicker';
import PhoneInputField from './PhoneInputField';
import InputField from './InputField';
import GenderSelect from './GenderSelect';
import StyledButton from './StyledMuiButton';
import SubHeader from '../teacher/SubHeader';

// - Redux Slices and APIs
import { useGetClassesDataQuery } from '../../services/classApi';
import { updateFormData } from '../../store/slices/studentSlice';

// - Validation Schema
import { StudentValidator } from '../../validators/validationSchemas';

const CreateStudentPanel = ({ handleFormChange }) => {
  const dispatch = useDispatch();

  const studentData = useSelector((state) => state.student);

  // - API Class
  const {
    data: classData,
    isLoading: isClassDataLoading,
    error: classDataError,
  } = useGetClassesDataQuery();

  // - Local State
  const [dob, setDob] = useState(
    studentData.dob ? dayjs(studentData.dob) : null,
  );

  // - Class Rows State
  const [rows, setRows] = useState([]);
  const [isRowsLoading, setIsRowsLoading] = useState(true);

  // - Image Upload States
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // - Loading Class IDs
  useEffect(() => {
    if (classData && Array.isArray(classData.data)) {
      setRows(
        classData.data.map((classItem) => ({
          value: String(classItem.class_id),
          label: classItem.class_name,
        })),
      );
      setIsRowsLoading(false);
    }
  }, [classData]);

  // - Form Handlers
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(StudentValidator),
    defaultValues: {
      photo: studentData.photo || '',
      first_name: studentData.first_name || '',
      last_name: studentData.last_name || '',
      gender: studentData.gender || '',
      class_id: studentData.class_id ? String(studentData.class_id) : '',
      phone_number: studentData.phone_number || '',
      address: studentData.address || '',
      dob: studentData.dob || '',
    },
  });

  // - Image Upload Handlers
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Invalid image file',
          severity: 'error',
        }),
      );
    }
  };

  // - Form Data Handlers tracking input changes
  useEffect(() => {
    if (studentData) {
      setValue('photo', studentData.photo || '');
      setValue('first_name', studentData.first_name || '');
      setValue('last_name', studentData.last_name || '');
      setValue('gender', studentData.gender || '');
      const classId = String(studentData.class_id);
      const isClassIdValid = rows.some((row) => row.value === classId);
      setValue('class_id', isClassIdValid ? classId : '');
      setValue('phone_number', studentData.phone_number || '');
      setValue('address', studentData.address || '');
      setDob(studentData.dob ? dayjs(studentData.dob) : null);
    }
  }, [studentData, setValue, rows]);

  // - Handle form submission
  const onSubmit = (data) => {
    const formattedDob = dob ? dayjs(dob).format('YYYY-MM-DD') : null;

    // - Create form data for submission
    const formData = new FormData();

    // - Append all fields from the data object to formData
    Object.entries({ ...data, dob: formattedDob }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // - Append the file separately if selected
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }

    // - Dispatch only serializable data to Redux
    const updatedData = {
      ...data,
      dob: formattedDob,
      photoUrl: previewUrl,
    };

    // - Update the form data in Redux
    dispatch(updateFormData(updatedData));
    handleFormChange(updatedData);

    // - Reset form
    reset();
    setSelectedFile(null);
    setPreviewUrl(null);
    handleNext();
  };

  // - Show loading circle while fetching class data
  if (isClassDataLoading || isRowsLoading) {
    return <LoadingCircle />;
  }

  // if there is an error fetching class data
  if (classDataError) {
    return <SomethingWentWrong customStyles={{ minHeight: '70vh' }} />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={'column'} gap={2}>
          <Stack direction={'row'} gap={2}>
            <InputField
              name="first_name"
              control={control}
              label="First Name"
              placeholder="First Name"
              errors={errors}
              icon={UserRoundPen}
            />
            <InputField
              name="last_name"
              control={control}
              label="Last Name"
              placeholder="Last Name"
              errors={errors}
              icon={UserRoundPen}
            />
          </Stack>

          <Stack direction={'row'} gap={2}>
            <GenderSelect
              control={control}
              errors={errors}
              name="gender"
              label="Gender"
              defaultValue={studentData.gender || ''}
            />
            <DOBPicker
              control={control}
              errors={errors}
              name="dob"
              dob={dob}
              setDob={setDob}
            />
          </Stack>

          <Stack direction={'column'} gap={2}>
            <PhoneInputField
              name="phone_number"
              control={control}
              label="Contact Number"
              errors={errors}
            />
            <InputField
              name="address"
              control={control}
              label="Street Address"
              placeholder="Phnom Penh, Street 210, ..."
              errors={errors}
              required={false}
              multiline
              minRows={5}
            />
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default CreateStudentPanel;
