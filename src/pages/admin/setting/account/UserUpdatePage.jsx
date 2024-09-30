// - React and third-party libraries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// - Material UI components
import {
  Box,
  Stack,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
} from '@mui/material';

// - Custom components
import FormComponent from '../../../../components/common/FormComponent';
import profile from '../../../../assets/images/default-profile.png';
import UserUpdateModal from '../../../../components/admin/EditAccountModal';

// - Redux Hooks and APIs
import {
  useUpdateUserProfileMutation,
  useGetUserProfileQuery,
} from '../../../../services/userApi';

// - Formatted Data
import { getUserProfileUpdateData } from '../../../../utils/formatData';

// - User Profile Validator
import { UserProfileValidator } from '../../../../validators/validationSchemas';

// - UI Slice for Snackbar
import { setSnackbar } from '../../../../store/slices/uiSlice';

/**
 * UserUpdatePage component enables users to update their personal information, including
 * name, email, phone number, address, date of birth, gender, and profile picture.
 *
 * It performs the following:
 * - Fetches current user data using {@link useGetUserProfileQuery}.
 * - Manages form state and validation with {@link useForm} and {@link yupResolver}.
 * - Updates user information via {@link useUpdateUserProfileMutation}.
 * - Previews selected images and provides snackbar notifications for status updates.
 *
 * Dependencies: React, Redux, Material UI, react-hook-form, yup.
 *
 * @param {Object} userInfo - The current user data to populate the form.
 * @param {Function} onUpdate - Callback triggered after a successful update.
 * @param {Array} fields - List of fields that can be modified (e.g., name, email).
 * @param {boolean} isEditable - Indicates if the fields are editable or read-only.
 *
 * @returns {JSX.Element} The rendered UserUpdatePage component.
 */

function UserUpdatePage() {
  // - Initialize dispatch and navigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userProfile, isLoading, isSuccess } = useGetUserProfileQuery();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!isSuccess || !userProfile) {
    return <Typography variant="h6">No user data found</Typography>;
  }

  return (
    <>
      <Button variant="contained" onClick={handleOpenModal}>
        Update Personal Information
      </Button>
      <UserUpdateModal
        open={isModalOpen}
        onClose={handleCloseModal}
        userProfile={userProfile}
      />
    </>
  );
}

export default UserUpdatePage;
