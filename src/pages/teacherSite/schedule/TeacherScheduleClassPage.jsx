import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Skeleton,
  Tabs,
  Tab,
  MenuItem,
  useMediaQuery,
  useTheme,
  Menu,
  Chip,
} from '@mui/material';
import { styled } from '@mui/system';
import { Clock, Calendar, Users, ListFilter } from 'lucide-react';
import { useGetTeacherScheduleClassesQuery } from '../../../services/teacherApi';
import EmptyList from '../../../components/common/EmptyList';
import classHeaderImg1 from '../../../assets/images/study-bg.avif';
import classHeaderImg2 from '../../../assets/images/class-header-img-2.avif';
import classHeaderImg3 from '../../../assets/images/class-header-img-3.avif';
import classHeaderImg4 from '../../../assets/images/class-header-img-4.avif';
import classHeaderImg5 from '../../../assets/images/class-header-img-5.avif';
import classHeaderImg6 from '../../../assets/images/class-header-img-6.avif';
import { shadow } from '../../../styles/global';
import FormComponent from '../../../components/common/FormComponent';
import emptyClassesImage from '../../../assets/images/teacher-99.svg';
import SomethingWentWrong from '../../../components/common/SomethingWentWrong';
import StyledButton from '../../../components/common/StyledMuiButton';
import ClassMarkedModal from '../../../components/teacherSite/ClassMarkedModal';
import ClassMarkWrongDayModal from '../../../components/teacherSite/ClassMarkWrongDayModal';
import TitleHeader from '../../../components/common/TitleHeader';
import dayjs from 'dayjs'
import { formatTimeTo12Hour } from '../../../utils/formatHelper';
const headerImages = [
  classHeaderImg1,
  classHeaderImg2,
  classHeaderImg3,
  classHeaderImg4,
  classHeaderImg5,
  classHeaderImg6,
];

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: shadow.boxShadow,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 12px 20px rgba(0, 0, 0, 0.1)`,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  '& > svg': {
    marginRight: theme.spacing(1),
  },
}));

const days = [
  'Today',
  'All',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const ClassListItem = ({ classData, onClick, filterDay, setOpenModalMarked, setOpenModalWrongDay }) => {
  const dayIndex = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ].indexOf(classData.day.toLowerCase());
  const headerImage = headerImages[dayIndex % headerImages.length];

  /**
   * Handle class item click
   * If class is already marked, open the modal to show the warning
   * If class is not marked, navigate to the class attendance mark page
   */
  const handleClassClick = () => {
   // Get the current date
   const today = dayjs();
   // Get the day of the week as a string (e.g., "Monday")
   const day = today.format('dddd'); // Use 'ddd' for abbreviated names (e.g., "Mon")
    if (classData.isClassMarked) {
      // Class is already marked, open the modal to show the warning
      setOpenModalMarked(true);
    }else if(classData.day.toLocaleLowerCase() !== day.toLocaleLowerCase()) {
      setOpenModalWrongDay(true)
    }
    else {
      // Class is not marked, navigate to the class attendance mark page
      onClick();
    }
  };
  return (
    <StyledPaper onClick={handleClassClick}>
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${headerImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '120px',
          width: '100%',
          transition: 'background-size 0.3s ease-in-out',
          backgroundSize: '100% auto',
          filter: classData.isClassMarked ? 'grayscale(1)' : 'none', // Grayscale if marked
          pointerEvents: classData.isClassMarked ? 'none' : 'auto', // Disable interaction if marked
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            bottom: 0,
            zIndex: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 2,
            color: classData.isClassMarked
              ? 'rgba(255, 255, 255, 0.5)'
              : 'white', // Lighten text if marked
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
            {classData.class_name}
          </Typography>
          <Typography variant="body2" noWrap>
            {classData.subject}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ padding: 2 }}>
        <IconWrapper>
          <Calendar size={16} />
          <Typography variant="body2" textTransform="capitalize">
            {classData.day}
          </Typography>
        </IconWrapper>
        <IconWrapper sx={{ my: 1 }}>
          <Clock size={16} />
          <Typography variant="body2">
            {formatTimeTo12Hour(classData.start_time)} - {formatTimeTo12Hour(classData.end_time)}
          </Typography>
        </IconWrapper>
        <IconWrapper>
          <Users size={16} />
          <Typography variant="body2">
            {classData.students} student{classData.students > 1 ? 's' : ''}
          </Typography>
        </IconWrapper>
        {filterDay === 'today' && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {classData.isClassMarked ? (
              <Chip
                size="small"
                sx={{ backgroundColor: '#E0FBE2', color: '#347928' }}
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
                label="Completed Marked"
              />
            ) : (
              <Chip
                size="small"
                sx={{ backgroundColor: '#fffbeb', color: '#edbb00' }}
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
                label="Pending Marked"
              />
            )}
          </Box>
        )}
      </Box>
    </StyledPaper>
  );
};

function TeacherScheduleClassPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // classesData : State to store the data of classes
  const [classesData, setClassesData] = useState([]);

  // anchorEl : State to manage the anchor element
  const [anchorEl, setAnchorEl] = useState(null);

  // filterDay : State to schedule class selection filter for fetch from api
  // selectedDay : State to store the currently selected day for filtering
  // openModal : State to manage the modal open/close state
  const [filterDay, setFilterDay] = useState('all');
  const [selectedDay, setSelectedDay] = useState('Today');

  // openModal : state for modal
  const [openModalMarked, setOpenModalMarked] = useState(false);
  const [openModalWrongDay, setOpenModalWrongDay] = useState(false);

  //useGetTeacherScheduleClassesQuery : a hook return a function that fetch the classes schedule
  const {
    data: getTeacherClasses,
    isLoading,
    isSuccess,
    isError,
  } = useGetTeacherScheduleClassesQuery({ filter: filterDay });

  // when the classes schedule records are fetched successfully, set to the state
  useEffect(() => {
    if (getTeacherClasses && isSuccess) {
      setClassesData(getTeacherClasses.data);
    }
  }, [getTeacherClasses, isSuccess]);

  // when either classesData or selectedDay changes.
  // If selectedDay is 'Today', it will filter the classes to only include today's classes.
  // If selectedDay is 'All', it will return all classes.
  // If selectedDay is any other value, it will filter the classes to only include classes that
  const filteredClasses = useMemo(() => {
    if (selectedDay === 'Today') {
      // filter the classes to only include today's classes
      setFilterDay('today');
      return classesData;
    } else {
      // reset the filter to show all classes
      setFilterDay('all');
    }
    // if selectedDay is 'All', return all classes
    if (selectedDay === 'All') {
      return classesData;
    }

    // filter the classes to only include classes that match the selectedDay
    return classesData.filter(
      (c) => c.day.toLowerCase() === selectedDay.toLowerCase(),
    );
  }, [classesData, selectedDay]);

  // handle class clicked
  const handleClassClick = (sessionId) => {
    navigate(`${sessionId}`);
  };

  // handle filter clicked
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // handle filter menu closed
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  //handle filter day change
  const handleDayChange = (day) => {
    setSelectedDay(day);
    handleFilterClose();
  };

  // render skeleton
  const renderSkeleton = () => (
    <Grid container spacing={2}>
      {[...Array(4)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Skeleton
            variant="rectangular"
            height={200}
            sx={{ borderRadius: 4 }}
          />
        </Grid>
      ))}
    </Grid>
  );
  const renderContent = () => {
    // if loading, render skeleton
    if (isLoading) {
      return renderSkeleton();
    }

    // if error, render error page
    if (isError) {
      return <SomethingWentWrong customStyles={{ minHeight: '50vh' }} />;
    }

    // if no classes, render empty list
    if (filteredClasses.length === 0) {
      return (
        <EmptyList
          image={emptyClassesImage}
          title="No classes scheduled"
          description={`You don't have any classes scheduled for ${selectedDay === 'All' ? 'any day' : selectedDay}.`}
        />
      );
    }

    return (
      <Grid container spacing={2}>
        {filteredClasses.map((classData) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={classData.session_id}>
            <ClassListItem
              classData={classData}
              onClick={() => handleClassClick(classData.session_id)}
              filterDay={filterDay}
              setOpenModalMarked={setOpenModalMarked}
              setOpenModalWrongDay={setOpenModalWrongDay}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  // render Day Selector
  const renderDaySelector = () => {
    if (isMobile) {
      return (
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <StyledButton
            size="small"
            variant="outlined"
            startIcon={<ListFilter size={18} />}
            onClick={handleFilterClick}
          >
            {selectedDay === 'All' ? 'Filter by Day' : selectedDay}
          </StyledButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterClose}
          >
            {days.map((day) => (
              <MenuItem
                key={day}
                onClick={() => handleDayChange(day)}
                selected={day === selectedDay}
              >
                {day}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      );
    } else {
      return (
        <>
          <Tabs
            value={selectedDay}
            onChange={(_, newValue) => setSelectedDay(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {days.map((day) => (
              <Tab
                key={day}
                label={day}
                value={day}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Tabs>
        </>
      );
    }
  };

  return (
    <FormComponent>
      <TitleHeader title={'Schedule'} />
      {renderDaySelector()}
      {renderContent()}
      <ClassMarkedModal open={openModalMarked} onClose={() => setOpenModalMarked(false)} />
      <ClassMarkWrongDayModal open={openModalWrongDay} onClose={() => setOpenModalWrongDay(false)} />
    </FormComponent>
  );
}

export default TeacherScheduleClassPage;
