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
} from '@mui/material';
import { X, User2Icon, CalendarFold, Mails, Phone, Home } from 'lucide-react';
import viewImage from '../../../assets/images/data-storage.svg';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { cardContainer } from '../../../styles/global';
import { useTheme } from '@emotion/react';
import StyledButton from '../../../components/common/StyledMuiButton';

function TeacherDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formattedTeacher, setFormattedTeacher] = useState([]);

  // Get teacher information through API
  const { data: teacherData, isLoading, fetchError } = useGetTeacherQuery(id);
  // Delete teacher information through API
  const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation();

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);

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
console.log(formattedTeacher.address)
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
  if (fetchError) return <div>Error loading teacher details</div>;

  return (
    <>
      <FormComponent
        title="Teacher Details"
        subTitle="View Teacher Information"
      >
        <Card sx={{ ...cardContainer, bgcolor: 'white' }}>
          <CardActionArea>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems="center"
              alignContent='center'
              justifyContent="start"
              spacing={4}
              sx={{ p: 2 }}
            >
              <Avatar
                src={formattedTeacher.photo}
                alt="Profile"
                sx={{ width: 140, height: 140, bgcolor: '#eee' }}
              />
              <Stack direction="column" alignItems={{ xs: 'center', sm: 'start' }}>
                <Typography gutterBottom variant="h5" fontWeight={'bold'} component="div">
                  {formattedTeacher.fullName}
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  Detail personal information below
                </Typography>
              </Stack>
            </Stack>
            <CardContent>
                <GridDetail
                  icon={User2Icon}
                  label="Gender"
                  value={formattedTeacher.gender}
                />
                <GridDetail
                  icon={CalendarFold}
                  label="Date of Birth"
                  value={formattedTeacher.dateOfBirth}
                />

                <GridDetail
                  icon={Mails}
                  label="Email"
                  value={formattedTeacher.email}
                />
                <GridDetail
                  icon={Phone}
                  label="Contact Number"
                  value={formattedTeacher.phoneNumber}
                />
                <GridDetail
                  icon={Home}
                  label="Street Address"
                  value={formattedTeacher.address}
                />
            </CardContent>

          </CardActionArea>
        </Card>
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

// Grid Detais
const GridDetail = ({ icon: IconComponent, label, value }) => {
  // Determine if the screen size is small
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <Grid
      container
      spacing={1}
      sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 1 } }}
    >
      <Grid item xs={12} sm={4}>
        <Chip
          label={!isSmallScreen ? label : ''}
          icon={<IconComponent size={18} />}
          variant="outlined"
          color="primary"
          sx={{
            px: 1,
          }}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <Typography
          variant="body1"
          sx={{
            fontSize: '1rem',
            textTransform: 'capitalize',
            elipsis: 'true',
            wordBreak: 'break-word',
          }}
        >
          {value !== null && value !== undefined && value !== "" ? value.toString() : 'N/A'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};
export default TeacherDetailPage;
