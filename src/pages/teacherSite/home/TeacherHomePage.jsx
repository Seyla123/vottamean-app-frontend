import DateCalendarCard from '../../../components/common/DateCalendarCard';
import { Box, Paper, Grid } from '@mui/material';
import FormComponent from '../../../components/common/FormComponent';
import ShortcutCard from '../../../components/teacherSite/ShortcutCard';
import teacherIcon from '../../../assets/images/teacher-93.svg';
import checkListIcon from '../../../assets/images/checklist-1-97.svg';
import TeacherWelcomeCard from '../../../components/teacherSite/TeacherWelcomeCard';
import TitleHeader from '../../../components/common/TitleHeader';

const TeacherHomePage = () => {
    return (
        <FormComponent
        >
            <TitleHeader
                title={'Home'}

            />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TeacherWelcomeCard />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <ShortcutCard
                            title={'Efficiently Manage Classes and Student Records'}
                            description={
                                'Access and manage your class schedules with ease. Filter schedules by date, mark attendance, and monitor student numbers across all your classes.'
                            }
                            icon={checkListIcon}
                            href={'/teacher/schedule'}
                            buttonText={'View Schedule'}
                        />
                        <ShortcutCard
                            title={'Manage Your Account Settings'}
                            description={
                                'Update your password, reset credentials, deactivate your account, and view your profile. Comprehensive account management at your fingertips.'
                            }
                            icon={teacherIcon}
                            href={'/teacher/settings/account'}
                            buttonText={'Account Settings'}
                        />
                    </Box>

                </Grid>
                <Grid item xs={12} md={4}>
                    <DateCalendarCard />
                </Grid>
            </Grid>
        </FormComponent>
    );
};

export default TeacherHomePage;
