import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';

// MUI Components
import {
  Avatar,
  Typography,
  Grid,
  Divider,
  DialogContent,
  DialogTitle,
  Stack,
  DialogActions,
  IconButton,
} from '@mui/material';

// - Custom Components
import StyledButton from '../common/StyledMuiButton';
import InputField from '../common/InputField';
import PhoneInputField from '../common/PhoneInputField';
import GenderSelect from '../common/GenderSelect';
import DOBPicker from '../common/DOBPicker';
import SomethingWentWrong from '../common/SomethingWentWrong';
// Redux Hooks and APIs
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../services/userApi';

// Formatted Data
import { getUserProfileUpdateData } from '../../utils/formatData';

//  User Profile Validator
import { UserProfileValidator } from '../../validators/validationSchemas';

// UI Slice for snackbar
import { setSnackbar } from '../../store/slices/uiSlice';
import { ImagePlus, MapPin, Trash2, UserRoundPen, X } from 'lucide-react';
import RandomAvatar from '../common/RandomAvatar';
import { BootstrapDialog } from '../common/BootstrapDialog';

const EditAccountModal = ({
  open,
  onClose,
  profilePhoto,
  userName,
  userGender,
  checkUserRole,
  onPhotoUpdate,
}) => {
  // - Initialize dispatch and navigate hooks
  const dispatch = useDispatch();

  // - Reference to the photo preview image, sed to reset the file input after a new image is selected
  const photoPreviewRef = useRef(null);

  // - useUpdateUserProfileMutation : a hook that returns a function to update user profile
  const [
    updateUserProfile,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateUserProfileMutation();

  // - useGetUserProfileQuery : a hook that returns a function to get user profile and information
  const {
    data: userProfile,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetUserProfileQuery();

  // - State to store original form values for comparison purposes
  const [originalData, setOriginalData] = useState(null);

  // - State to store selected image file
  const [selectedFile, setSelectedFile] = useState(null);

  // - State to store the preview URL of the selected image
  const [previewUrl, setPreviewUrl] = useState(null);

  // Add a new state to track if the profile photo should be removed
  const [removePhoto, setRemovePhoto] = useState(false);

  // - State to store the date of birth
  const [dob, setDob] = useState(null);

  // - Check if the user is a teacher
  const disableInputIfTeacher = checkUserRole === 'teacher';

  // - Form state management
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(UserProfileValidator),
    defaultValues: {
      photo: '',
      first_name: '',
      last_name: '',
      gender: '',
      dob: '',
      phone_number: '',
      address: '',
    },
  });

  // Fetching and setting up the original user profile data
  useEffect(() => {
    if (isSuccess && userProfile) {
      const formattedData = getUserProfileUpdateData(userProfile);
      // Dynamically set the form default values
      reset(formattedData);
      // Store the original data for comparison
      setOriginalData(formattedData);
    }
  }, [isSuccess, userProfile, reset]);

  // Handle success and error of updating user profile
  useEffect(() => {
    if (isUpdateSuccess) {
      // show success snackbar and close the modal
      dispatch(
        setSnackbar({
          open: true,
          message: 'Profile updated successfully',
          severity: 'success',
        }),
      );
      onClose();
    } else if (isUpdateError) {
      // show error snackbar with the error message
      dispatch(
        setSnackbar({
          open: true,
          message: `Failed to update profile: ${updateError?.data?.message || 'Unknown error'}`,
          severity: 'error',
        }),
      );
    }
  }, [isUpdateSuccess, isUpdateError, updateError, dispatch, onClose]);

  // - Handle image file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      file.type.startsWith('image/') &&
      file.size <= 5 * 1024 * 1024
    ) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setRemovePhoto(false); // Reset the removePhoto state when a new file is selected
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

  // - Handle remove photo
  const handleRemovePhoto = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setRemovePhoto(true); // trigger the random avatar
  };

  // - Handle form submission
  const onSubmit = async (data) => {
    // Fetch current form values
    const currentData = getValues();

    // Check if form data has changed
    const isDataChanged =
      JSON.stringify(currentData) !== JSON.stringify(originalData);

    // Check if a new image has been uploaded
    const isImageUploaded = selectedFile !== null;

    // Check if photo removal has been requested
    const isPhotoRemoved = removePhoto;

    // If no data changes, no image upload, and no photo removal, inform user
    if (!isDataChanged && !isImageUploaded && !isPhotoRemoved) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'No changes detected.',
          severity: 'info',
        }),
        onClose(),
      );
      return;
    }

    // Create a new FormData object for multipart/form-data
    const formData = new FormData();

    // If a new image is selected, add it to the form data
    // Also, update the photo in MyProfileView file
    if (selectedFile) {
      formData.append('photo', selectedFile);
      onPhotoUpdate(URL.createObjectURL(selectedFile)); // Update photo in MyProfileView
    } else if (isPhotoRemoved) {
      // If the photo removal checkbox is checked, add a remove_photo parameter to the form data
      // Also, clear the photo in MyProfileView
      formData.append('remove_photo', 'true');
      onPhotoUpdate('');
    }

    // Iterate through the form data and add all the fields except for the photo
    Object.keys(data).forEach((key) => {
      if (key !== 'photo') {
        formData.append(key, data[key]);
      }
    });

    if (checkUserRole === 'teacher') {
      // Teachers can only update their photo
      await updateUserProfile(
        new FormData().append('photo', selectedFile),
      ).unwrap();
    } else {
      // Admins can update all fields
      await updateUserProfile(formData).unwrap();
    }
  };

  // - Loading and error handling
  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError || !userProfile) {
    return <SomethingWentWrong description="Failed to fetch user profile" />;
  }

  return (
    <BootstrapDialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-account-modal-title"
      aria-describedby="edit-account-modal-description"
    >
      <DialogTitle>Edit Account</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <X />
      </IconButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          {/* FORM CONTAINER */}
          <Stack direction="column" gap={2}>
            {/* PROFILE CONTAINER */}
            <Stack direction={'row'} gap={2} alignItems={'center'}>
              {/* PROFILE IMAGE */}
              {removePhoto || (!previewUrl && !profilePhoto) ? (
                <RandomAvatar
                  username={userName}
                  gender={userGender}
                  size={140}
                />
              ) : (
                <Avatar
                  src={previewUrl || profilePhoto}
                  alt="Profile"
                  sx={{ width: 140, height: 140 }}
                />
              )}

              {/* UPLOAD PROFILE IMAGE */}
              <input
                accept="image/*"
                type="file"
                id="photo-upload"
                ref={photoPreviewRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* PROFILE BUTTONS */}
              <Stack direction={'column'} gap={2}>
                <label htmlFor="photo-upload">
                  <StyledButton
                    variant="contained"
                    component="span"
                    size="small"
                    fullWidth
                    startIcon={<ImagePlus size={18} />}
                  >
                    Change
                  </StyledButton>
                </label>
                <StyledButton
                  variant="outlined"
                  fullWidth
                  size="small"
                  color="error"
                  startIcon={<Trash2 size={18} />}
                  onClick={handleRemovePhoto}
                >
                  Remove
                </StyledButton>
              </Stack>
            </Stack>

            <Divider />

            {/* INPUTS CONTAINER */}
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2 }}>
              <Grid item xs={12} sm={6}>
                {/* FIRST NAME INPUT */}
                <InputField
                  name="first_name"
                  control={control}
                  label="First Name"
                  placeholder="First Name"
                  errors={errors}
                  icon={UserRoundPen}
                  disabled={disableInputIfTeacher}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* LAST NAME INPUT */}
                <InputField
                  name="last_name"
                  control={control}
                  label="Last Name"
                  placeholder="Last Name"
                  errors={errors}
                  icon={UserRoundPen}
                  disabled={disableInputIfTeacher}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* CONTACT NUMBER INPUT WITH COUNTRY CODE */}
                <PhoneInputField
                  name="phone_number"
                  control={control}
                  label="Contact Number"
                  errors={errors}
                  disabled={disableInputIfTeacher}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* STREET ADDRESS INPUT */}
                <InputField
                  name="address"
                  control={control}
                  label="Street Address"
                  placeholder="Phnom Penh, Street 210, ..."
                  errors={errors}
                  icon={MapPin}
                  required={false}
                  disabled={disableInputIfTeacher}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* GENDER INPUT */}
                <GenderSelect
                  control={control}
                  errors={errors}
                  name="gender"
                  label="Gender"
                  defaultValue={originalData?.gender}
                  disabled={disableInputIfTeacher}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                {/* DOB INPUT */}
                <DOBPicker
                  control={control}
                  errors={errors}
                  name="dob"
                  dob={dob}
                  disabled={disableInputIfTeacher}
                  setDob={setDob}
                  defaultValue={
                    originalData?.dob ? dayjs(originalData.dob) : null
                  }
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions>
          {/* CANCEL BUTTON */}
          <StyledButton size="small" onClick={onClose}>
            Cancel
          </StyledButton>
          {/* SAVE CHANGES BUTTON */}
          <StyledButton
            size="small"
            type="submit"
            variant="contained"
            disabled={isUpdateLoading}
          >
            {isUpdateLoading ? 'Saving...' : 'Save Changes'}
          </StyledButton>
        </DialogActions>
      </form>
    </BootstrapDialog>
  );
};

export default EditAccountModal;
