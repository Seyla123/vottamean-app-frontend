// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Custom components
import FormComponent from '../../../components/common/FormComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import TitleHeader from '../../../components/common/TitleHeader';

// Redux API and slice
import {
  useGetTeacherQuery,
  useDeleteTeacherMutation,
  useDeactivateTeacherMutation,
  useReactivateTeacherMutation,
  useResendVerificationTeacherMutation,
} from '../../../services/teacherApi';
import { setSnackbar } from '../../../store/slices/uiSlice';

// Format data
import { formatTeacherDetail } from '../../../utils/formatData';
// Update Modal
import UpdateTeacherForm from '../../../components/teacher/UpdateTeacherForm';
// Delete Modal
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';
import {
  Chip,
  Typography,
  Grid,
  Box,
  Divider,
  Avatar,
  Stack,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  User2Icon,
  CalendarFold,
  Mails,
  Phone,
  Ellipsis,
  Home,
  Pencil,
  ChevronLeft,
  Trash2,
  Folder,
  Contact,
  CircleDashed,
} from 'lucide-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import { cardContainer, shadow, tableShadow } from '../../../styles/global';
import StyledButton from '../../../components/common/StyledMuiButton';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import RandomAvatar from '../../../components/common/RandomAvatar';
import ConfirmModal from '../../../components/teacher/ConfirmModal';
function TeacherDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formattedTeacher, setFormattedTeacher] = useState([]);
  const [isDeactivateConfirmModalOpen, setDeactivateConfirmModal] = useState(false);
  const [isActivateConfirmModalOpen, setActivateConfirmModal] = useState(false);
  const [isResendConfirmModalOpen, setResendConfirmModal] = useState(false);

  // useGetTeacherQueryby id : a hook return function for get teacher data by id
  const {
    data: teacherData,
    isLoading,
    isError,
    error,
  } = useGetTeacherQuery(id);

  // useDeleteTeacherMutation : a hook return function for delete teacher data by id
  const [deleteTeacher] = useDeleteTeacherMutation();

  // useResendVerificationTeacherMutation : a hook return function for resend verification teacher account 
  // useDeactivateTeacherMutation : a hook return function for deactivate teacher account 
  // useReactivateTeacherMutation : a hook return function for reactivate teacher account 
  const [resendVerificationTeacher, { isLoading: isResending, isError: isResendError, error: resendError, isSuccess: isResendSuccess }] = useResendVerificationTeacherMutation(id);
  const [deactivateTeacher, { isLoading: isDeactivating, isError: isDeactivateError, error: deactivateError, isSuccess: isDeactivateSuccess }] = useDeactivateTeacherMutation(id);
  const [reactivateTeacher, { isLoading: isReactivating, isError: isReactivateError, error: reactivateError, isSuccess: isReactivateSuccess }] = useReactivateTeacherMutation(id);

  // States
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  // Menu for edit and delete state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Hanlde click for open menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Hanlde click for close menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Format teacher data and set it in the state
  useEffect(() => {
    if (teacherData) {
      setFormattedTeacher(formatTeacherDetail(teacherData));
    }
  }, [teacherData]);

  // Handle for edit modal
  const handleEdit = () => {
    setSelectedTeacherId(id);
    setIsUpdateOpen(true);
  };

  // Open delete confirmation modal when user clicks on delete button
  const handleDelete = () => {
    setItemToDelete(id);
    setIsOpen(true);
  };

  const hanldeBack = () => {
    navigate('/admin/teachers');
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      setIsOpen(false);
      await deleteTeacher(itemToDelete).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Teacher deleted successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/teachers');
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Failed to delete teacher',
          severity: 'error',
        }),
      );
    }
  };

  //Confirm Deactivation Teacher Account 
  const confirmDeactivateAccount = async () => {
    try {
      await deactivateTeacher(id).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Teacher account deactivated successfully',
          severity: 'success',
        }),
      );
      setDeactivateConfirmModal(false);
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Failed to deactivate teacher account',
          severity: 'error',
        }),
      );
    }
  }

  //Confirm Activation Teacher Account
  const confirmActivateAccount = async () => {
    try {
      await reactivateTeacher(id).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Teacher account activated successfully',
          severity: 'success',
        }),
      );
      setActivateConfirmModal(false);
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Failed to activate teacher account',
          severity: 'error',
        }),
      );
    }
  }

  // confirm resend verification email to teacher
  const resendVerificationEmail = async () => {
    try { 
      await resendVerificationTeacher(id).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Verification email resent successfully',
          severity: 'success',
        }),
      );
      setResendConfirmModal(false);
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: 'Failed to resend verification email',
          severity: 'error',
        }),
      );
    }
  }

  // loading and error states
  if (isLoading) return <LoadingCircle />;
  if (isError) return <SomethingWentWrong description={error?.data?.message} />;

  return (
    <>
      <FormComponent>
        <TitleHeader title={'Teacher Detail'} />
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={3}>
          <Card
            sx={{ boxShadow: shadow, bgcolor: 'white', p: 3, width: '100%' }}
          >
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              {/* Back Button */}
              <StyledButton
                variant="text"
                size={'small'}
                startIcon={<ChevronLeft size={18} />}
                onClick={hanldeBack}
              >
                Back
              </StyledButton>
              {/* Menu for edit and delete */}
              <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Ellipsis size={18} />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {/* Edit */}
                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <Pencil size={18} color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                {/* Delete */}
                <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <Trash2 size={18} color="#d32f2f" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
            <Box>
              {/* Profile */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                alignContent="center"
                justifyContent="start"
                spacing={4}
                sx={{ py: 4 }}
              >
                {formattedTeacher.photo ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                      position: 'relative',
                      boxShadow: 'rgba(17, 12, 46, 0.15) 0px 28px 100px 0px',
                      p: 0.5,
                      borderRadius: 50,
                    }}
                  >
                    <Avatar
                      src={formattedTeacher.photo}
                      alt="Profile"
                      sx={{ width: 140, height: 140, bgcolor: '#eee' }}
                    />{' '}
                  </Box>
                ) : (
                  <RandomAvatar
                    username={formattedTeacher.fullName}
                    gender={formattedTeacher.gender}
                    size={140}
                  />
                )}

                <Stack
                  direction="column"
                  alignItems={{ xs: 'center', sm: 'start' }}
                >
                  {/* Name */}
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontWeight={'bold'}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {formattedTeacher.fullName}
                  </Typography>
                  {/* Email */}
                  <Stack direction={'row'} alignItems={'center'} spacing={1}>
                    <Mails size={16} color="#797979" />
                    <Typography
                      gutterBottom
                      variant="body2"
                      color="text.secondary"
                    >
                      {formattedTeacher.email}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              {/* Personal Details */}
              <Box>
                <GridDetail
                  icon={<User2Icon size={18} color={'#6c63ff'} />}
                  label="Gender"
                  value={formattedTeacher.gender}
                />
                <GridDetail
                  icon={<CalendarFold size={18} color={'#6c63ff'} />}
                  label="Date of Birth"
                  value={formattedTeacher.dateOfBirth}
                />
                <GridDetail
                  icon={<Phone size={18} color={'#6c63ff'} />}
                  label="Contact Number"
                  value={formattedTeacher.phoneNumber}
                />
                <GridDetail
                  icon={<Home size={18} color={'#6c63ff'} />}
                  label="Street Address"
                  value={formattedTeacher.address}
                />
                {/* Email Verification Status */}
                <GridDetail
                  icon={<CircleDashed size={18} color={'#6c63ff'} />}
                  label="Status"
                  value={
                    formattedTeacher.emailVerified ?
                      formattedTeacher.active ? (
                        <Chip
                          size="small"
                          sx={{
                            backgroundColor: '#E0FBE2', color: '#347928',
                            ':hover': {
                              backgroundColor: '#A9E5AD'
                            }
                          }}
                          icon={
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: '#059212',

                              }}
                            />
                          }
                          label="Active"
                          onClick={() => setDeactivateConfirmModal(true)}
                        />
                      ) : (
                        <Chip
                          size="small"
                          sx={{
                            backgroundColor: '#fffbeb',
                            color: '#edbb00',
                            pointerEvents: 'auto',
                            cursor: 'pointer',
                            ':hover': {
                              backgroundColor: '#FDE9AE'
                            }

                          }}
                          icon={
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: '#edbb00',
                              }}
                            />
                          }
                          label="Inactive"
                          onClick={() => setActivateConfirmModal(true)}
                        />
                      )
                      :
                      <Chip
                        size="small"
                        sx={{
                          backgroundColor: '#fffbeb',
                          color: '#edbb00',
                          pointerEvents: 'auto',
                          cursor: 'pointer',
                          ':hover': {
                            backgroundColor: '#FDE9AE'
                          }

                        }}
                        icon={
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              bgcolor: '#edbb00',
                            }}
                          />
                        }
                        label="Pending Verification"
                        onClick={() => setResendConfirmModal(true)}
                      />
                  }
                />
              </Box>
            </Box>
          </Card>
          {/* Insights Card Information */}
          <Box>
            <Stack
              spacing={2}
              bgcolor={'background.paper'}
              sx={{
                ...cardContainer,
                height: '100%',
                display: { xs: 'none', sm: 'block' },
                maxWidth: {
                  sm: '100%',
                  md: '400px',
                },
              }}
            >
              <Stack mb={'auto'}>
                <Typography gutterBottom variant="h5" fontWeight="medium">
                  Gain detailed insights
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  into personal information of school instructors.
                </Typography>
              </Stack>
              <Stack spacing={2} mt={'auto'}>
                <GridInfo
                  icon={<Pencil size={18} color={'#6c63ff'} />}
                  text="Ensure accurate records for personnel management."
                />
                <GridInfo
                  icon={<Folder size={18} color={'#6c63ff'} />}
                  text="Address information for decision-making."
                />
                <GridInfo
                  icon={<Contact size={18} color={'#6c63ff'} />}
                  text="Facilitate communication by accessing updated contact details."
                />
                <GridInfo
                  icon={<User2Icon size={18} color={'#6c63ff'} />}
                  text="Manage the instructors efficiently"
                />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </FormComponent>
      {/* Update teacher form */}
      <UpdateTeacherForm
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        teacherId={selectedTeacherId}
      />
      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName="Teacher"
      />
      {/* Deactivate confirmation modal */}
      <ConfirmModal
        open={isDeactivateConfirmModalOpen}
        onClose={() => setDeactivateConfirmModal(false)}
        onConfirm={confirmDeactivateAccount}
        type="deactivate"
        isLoading={isDeactivating}
      />
      <ConfirmModal
        open={isActivateConfirmModalOpen}
        onClose={() => setActivateConfirmModal(false)}
        onConfirm={confirmActivateAccount}
        type="activate"
        isLoading={isReactivating}
      />
      <ConfirmModal
        open={isResendConfirmModalOpen}
        onClose={() => setResendConfirmModal(false)}
        onConfirm={resendVerificationEmail}
        type="resendVerification"
        isLoading={isResending}
      />
    </>
  );
}
// Insight information grid function
const GridInfo = ({ icon, text }) => (
  <Grid
    item
    xs={8}
    sm={12}
    boxShadow={tableShadow}
    sx={{
      bgcolor: 'transparent',
      borderRadius: 2,
      borderRight: '2px solid #6c63ff',
    }}
  >
    <Stack direction={'row'} alignItems={'center'} spacing={2} p={1.5}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>{icon}</Box>
      <Typography
        variant="body2"
        sx={{ whiteSpace: 'break-spaces', elipsis: 'true' }}
      >
        {text}
      </Typography>
    </Stack>
  </Grid>
);
// Personal detail grid function
const GridDetail = ({ icon, label, value }) => {
  return (
    <Grid
      container
      spacing={1}
      sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 1 } }}
    >
      <Grid item xs={12} sm={4}>
        <Chip
          label={label}
          icon={icon}
          sx={{
            fontWeight: 'medium',
            bgcolor: 'transparent',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography
          component={'div'}
          variant="body2"
          sx={{
            textTransform: 'capitalize',
            wordBreak: 'break-word',
          }}
        >
          {value !== null && value !== undefined && value !== ''
            ? value
            : 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default TeacherDetailPage;
