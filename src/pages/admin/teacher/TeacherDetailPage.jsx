// React and third-party libraries
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Custom components
import FormComponent from '../../../components/common/FormComponent';
import CardComponent from '../../../components/common/CardComponent';
import CardInformation from '../../../components/common/CardInformation';
import LoadingCircle from '../../../components/loading/LoadingCircle';

// Redux API and slice
import {
  useGetTeacherQuery,
  useDeleteTeacherMutation,
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
  useMediaQuery,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  X,
  User2Icon,
  CalendarFold,
  Mails,
  Phone,
  Ellipsis,
  Home,
  Pencil,
  Settings,
  ChevronLeft,
  Trash2,
  File,
  Folder,
  Contact,
} from 'lucide-react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import viewImage from '../../../assets/images/data-storage.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { cardContainer, shadow, tableShadow } from '../../../styles/global';
import StyledButton from '../../../components/common/StyledMuiButton';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';

function TeacherDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formattedTeacher, setFormattedTeacher] = useState([]);

  // Get teacher information through API
  const {
    data: teacherData,
    isLoading,
    isError,
    error,
  } = useGetTeacherQuery(id);
  // Delete teacher information through API
  const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
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

  // loading and error states
  if (isLoading || isDeleting) return <LoadingCircle />;
  if (isError) return <SomethingWentWrong description={error?.data?.message} />;

  return (
    <>
      <FormComponent
        title="Teacher Details"
        subTitle="View Teacher Information"
      >
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={3}>
          <Card
            sx={{ boxShadow: shadow, bgcolor: 'white', p: 3, width: '100%' }}
          >
            <Stack
              direction="row"
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <StyledButton
                variant="text"
                size={'small'}
                startIcon={<ChevronLeft size={18} />}
                onClick={hanldeBack}
              >
                Back
              </StyledButton>
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
                <MenuItem onClick={handleEdit}>
                  <ListItemIcon>
                    <Pencil size={18} color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <Trash2 size={18} color="#d32f2f" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
            </Stack>
            <Box>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                alignContent="center"
                justifyContent="start"
                spacing={4}
                sx={{ py: 4 }}
              >
                <Avatar
                  src={formattedTeacher.photo}
                  alt="Profile"
                  sx={{ width: 140, height: 140, bgcolor: '#eee' }}
                />
                <Stack
                  direction="column"
                  alignItems={{ xs: 'center', sm: 'start' }}
                >
                  <Typography gutterBottom variant="h5" fontWeight={'bold'}>
                    {formattedTeacher.fullName}
                  </Typography>
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
              </Box>
            </Box>
          </Card>
          <Box>
            <Stack
              spacing={2}
              bgcolor={'background.paper'}
              sx={{
                ...cardContainer,
                display: { xs: 'none', sm: 'block' },
                maxWidth: {
                  sm: '100%',
                  md: '400px',
                },
              }}
            >
              <Stack>
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
      {/* Delete confirmation modal */}
      <DeleteConfirmationModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={confirmDelete}
        itemName="Teacher"
      />
      {/* Update teacher form */}
      <UpdateTeacherForm
        isOpen={isUpdateOpen}
        onClose={() => setIsUpdateOpen(false)}
        teacherId={selectedTeacherId}
      />
    </>
  );
}

const GridInfo = ({ icon, text }) => (
  <Grid
    item
    xs={8}
    sm={12}
    bgcolor={'transparent'}
    boxShadow={tableShadow}
    sx={{
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
// Grid Detais
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
            px: 0,
            fontWeight: 'medium',
            bgcolor: 'transparent',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography
          variant="body2"
          sx={{
            textTransform: 'capitalize',
            elipsis: 'true',
            wordBreak: 'break-word',
          }}
        >
          {value !== null && value !== undefined && value !== ''
            ? value.toString()
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
