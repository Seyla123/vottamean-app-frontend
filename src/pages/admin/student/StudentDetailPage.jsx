// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Custom components
import FormComponent from '../../../components/common/FormComponent';
import LoadingCircle from '../../../components/loading/LoadingCircle';
import TitleHeader from '../../../components/common/TitleHeader';
import { cardContainer, shadow, tableShadow } from '../../../styles/global';
import StyledButton from '../../../components/common/StyledMuiButton';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import RandomAvatar from '../../../components/common/RandomAvatar';

// API and slices
import { useGetStudentsByIdQuery, useDeleteStudentMutation } from '../../../services/studentApi';
import { setSnackbar } from '../../../store/slices/uiSlice';

// Update Modal
import UpdateStudentForm from '../../../components/student/UpdateStudentForm';
// Delete Modal
import DeleteConfirmationModal from '../../../components/common/DeleteConfirmationModal';

// MUI 
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
import Diversity1Icon from '@mui/icons-material/Diversity1';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';

// Lucide react icon
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
} from 'lucide-react';

// Format data
import { StudentProfile } from '../../../utils/formatData';

function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [formattedStudent, setFormattedStudent] = useState([]);
  const [formattedGuardian, setformattedGuardian] = useState([]);

  // useGetStudentsByIdQuery id : a hook return function for get student data by id
  const { data: studentData, isLoading, isError, error } = useGetStudentsByIdQuery(id);

  // useDeleteStudentMutation : a hook return function for delete student data by id
  const [deleteStudent] = useDeleteStudentMutation();

  // States
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

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

  // Format student data and set it in the state
  useEffect(() => {
    if (studentData) {
      const formattedData = StudentProfile(studentData?.data)
      setFormattedStudent({
        ...formattedData?.studentProfile,
        photo: formattedData.photo,
        active: studentData?.data?.active
      });

      setformattedGuardian(formattedData?.guardianProfile)

    }
  }, [studentData]);

  // Handle for edit modal
  const handleEdit = () => {
    setSelectedStudentId(id);
    setIsUpdateOpen(true);
  };

  // Open delete confirmation modal when user clicks on delete button
  const handleDelete = () => {
    setItemToDelete(id);
    setIsOpen(true);
  };

  const hanldeBack = () => {
    navigate('/admin/students');
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      setIsOpen(false);
      await deleteStudent(itemToDelete).unwrap();
      dispatch(
        setSnackbar({
          open: true,
          message: 'Student deleted successfully',
          severity: 'success',
        }),
      );
      navigate('/admin/students');
    } catch (error) {
      dispatch(
        setSnackbar({
          open: true,
          message: error?.data?.message || 'Failed to delete student',
          severity: 'error',
        }),
      );
    }
  };

  // error states
  if (isError) return <SomethingWentWrong description={error?.data?.message} />;

  return (
    <>
      <FormComponent
      >
        <TitleHeader title={'Student Detail'} />
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
            {isLoading ?
              <LoadingCircle customStyle={{ height: '50vh' }} />
              :
              <>
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
                    {formattedStudent.photo ? (
                      <Avatar
                        src={formattedStudent.photo}
                        alt="Profile"
                        sx={{ width: 140, height: 140, bgcolor: '#eee' }}
                      />
                    ) : (
                      <RandomAvatar size={140} />
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
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, textTransform: 'capitalize' }}
                      >
                        {formattedStudent.name}
                      </Typography>
                      {/* Class */}
                      <Stack direction={'row'} alignItems={'center'} spacing={1}>
                        <Chip
                          size="medium"
                          sx={{
                            background: 'linear-gradient(45deg, #fff, #fff)',
                            color: '#6c63ff',
                            padding: '0px 12px',
                            fontWeight: 500,
                            fontSize: '14px',
                            borderRadius: '16px',
                            border: '1px solid #6c63ff',
                            '&:hover': {
                              backgroundColor: '#fff',
                              borderColor: '#6c63ff',
                            },
                          }}
                          icon={
                            <CastForEducationIcon
                              style={{ width:18, color: '#6c63ff' }}
                            />
                          }
                          label={`Class ${formattedStudent.class}`}
                        />
                      </Stack>
                    </Stack>
                  </Stack>
                  {/* Personal Details */}
                  <Box>
                    <GridDetail
                      icon={<User2Icon size={18} color={'#6c63ff'} />}
                      label="Gender"
                      value={formattedStudent.gender}
                    />
                    <GridDetail
                      icon={<CalendarFold size={18} color={'#6c63ff'} />}
                      label="Date of Birth"
                      value={formattedStudent['Date of Birth']}
                    />
                    <GridDetail
                      icon={<Phone size={18} color={'#6c63ff'} />}
                      label="Contact Number"
                      value={formattedStudent.phone}
                    />
                    <GridDetail
                      icon={<Home size={18} color={'#6c63ff'} />}
                      label="Street Address"
                      value={formattedStudent.address}
                    />

                  </Box>

                </Box>
                <Typography variant="h6" py={2}>
                  Guardian Infomation
                </Typography>
                <Box>
                  {/* Personal Details */}
                  <Box>
                    <GridDetail
                      icon={<User2Icon size={18} color={'#6c63ff'} />}
                      label="Guardian Name"
                      value={formattedGuardian["Guardian's Name"]}
                    />
                    <GridDetail
                      icon={<Diversity1Icon style={{ color: '#6c63ff', maxWidth: '18px' }} />}
                      label="Relationship"
                      value={formattedGuardian.Relationship}
                    />
                    <GridDetail
                      icon={<Phone size={18} color={'#6c63ff'} />}
                      label="Guardian Contact Number"
                      value={formattedGuardian.Phone}
                    />
                    <GridDetail
                      icon={<Mails size={18} color={'#6c63ff'} />}
                      label="Guardian Email"
                      value={formattedGuardian.Email}
                      email
                    />
                  </Box>
                </Box>
              </>
            }

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
                  into personal information of enrolled students.
                </Typography>
              </Stack>
              <Stack spacing={2} mt={'auto'}>
                <GridInfo
                  icon={<Pencil size={18} color={'#6c63ff'} />}
                  text="Ensure accurate records for student management."
                />
                <GridInfo
                  icon={<Folder size={18} color={'#6c63ff'} />}
                  text="Access student details for informed decision-making."
                />
                <GridInfo
                  icon={<Contact size={18} color={'#6c63ff'} />}
                  text="Facilitate communication with students through updated contact information."
                />
                <GridInfo
                  icon={<User2Icon size={18} color={'#6c63ff'} />}
                  text="Manage student data efficiently."
                />
              </Stack>
            </Stack>
          </Box>

        </Stack>
      </FormComponent>
      {/* Update modal */}
      <UpdateStudentForm
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        studentId={selectedStudentId}
      />
      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName="Student"
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
const GridDetail = ({ icon, label, value, email }) => {
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
          variant="body2"
          sx={{
            textTransform: email ? 'lowercase':'capitalize',
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

export default StudentDetailPage;