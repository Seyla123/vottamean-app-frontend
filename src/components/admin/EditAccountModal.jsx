import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Button,
  Avatar,
  IconButton,
  MenuItem,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Edit as EditIcon, Mail, Phone, Home, Cake, User } from 'lucide-react';
import { useUpdateUserProfileMutation } from '../../services/userApi';
import { UserProfileValidator } from '../../validators/validationSchemas';
import { setSnackbar } from '../../store/slices/uiSlice';

const EditAccountModal = ({ open, onClose, initialData }) => {
  const dispatch = useDispatch();
  const [updateUserProfile, { isLoading: isUpdateLoading }] = useUpdateUserProfileMutation();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(UserProfileValidator),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      address: '',
      dob: '',
      gender: '',
    },
  });

  useEffect(() => {
    if (open && initialData) {
      reset({
        first_name: initialData.first_name || '',
        last_name: initialData.last_name || '',
        email: initialData.email || '',
        phone_number: initialData.phone_number || '',
        address: initialData.address || '',
        dob: initialData.dob || '',
        gender: initialData.gender || '',
      });
      setPreviewUrl(initialData.photo || null);
    }
  }, [open, initialData, reset]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      dispatch(setSnackbar({
        open: true,
        message: 'Invalid image file',
        severity: 'error',
      }));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (selectedFile) {
      formData.append('photo', selectedFile);
    }
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

    try {
      await updateUserProfile(formData).unwrap();
      dispatch(setSnackbar({
        open: true,
        message: 'Profile updated successfully',
        severity: 'success',
      }));
      onClose();
    } catch (error) {
      dispatch(setSnackbar({
        open: true,
        message: error.data?.message || 'Update failed',
        severity: 'error',
      }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Account</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative' }}>
              <Avatar src={previewUrl} sx={{ width: 100, height: 100 }} />
              <input
                accept="image/*"
                type="file"
                id="icon-button-file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  aria-label="upload picture"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'background.paper',
                  }}
                >
                  <EditIcon />
                </IconButton>
              </label>
            </Box>
          </Box>

          <Controller
            name="first_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="First Name"
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                margin="normal"
              />
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Last Name"
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                margin="normal"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Mail size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Phone Number"
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Address"
                error={!!errors.address}
                helperText={errors.address?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home size={20} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dob}
                helperText={errors.dob?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Cake size={20} />
                    </InputAdornment>
                  ),
                }}
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
                fullWidth
                label="Gender"
                error={!!errors.gender}
                helperText={errors.gender?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <User size={20} />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" disabled={isUpdateLoading}>
            {isUpdateLoading ? <CircularProgress size={24} /> : 'Save Changes'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditAccountModal;