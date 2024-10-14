import React from 'react';
import { Box, Typography, Paper, Chip, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import { shadow } from '../../styles/global';
import greetingImage from '../../assets/images/startup-1.svg';
import { School } from 'lucide-react';
import CircularProgress from '@mui/material/CircularProgress';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: 'linear-gradient(45deg, #4e54c8 30%, #EBD3F8  70%)',
    color: 'white',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
}));
function WelcomeCard({ name, subTitle, schoolName, img = greetingImage, isLoading }) {

    const currentHour = new Date().getHours();
    let greeting = 'Good evening';

    if (currentHour < 12) {
        greeting = 'Good morning';
    } else if (currentHour < 18) {
        greeting = 'Good afternoon';
    }

    if (isLoading) {
        return <Skeleton
            variant="rectangular"
            height={200}
            sx={{ borderRadius: 4 }}
        />
    }

    return (
        <StyledPaper elevation={3} sx={shadow}>

            <Box
                position={'relative'}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Box sx={{ position: 'relative', zIndex: '100', width: '100%' }}>
<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/feature/teacher-site-class-session
                    <Chip
                        icon={<School size={16} />}
                        label={schoolName || 'School Name'}
                        color="primary"
                        sx={{ mb: 3 }}
                    />
                    <Typography variant="h4" gutterBottom>
                        {greeting}, {name}! 👋
                    </Typography>
                    <Typography variant="subtitle1">
<<<<<<< HEAD
                        {subTitle}
=======
                       {subTitle}
>>>>>>> refs/remotes/origin/feature/teacher-site-class-session
                    </Typography>
                </Box>
                <img
                    src={img}
                    alt="greeting"
                    style={{
                        width: '300px',
                        objectFit: 'contain',
                        position: 'absolute',
                        right: 0,
                        zIndex: 1,
                    }}
                />
<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/feature/teacher-site-class-session
            </Box>
        </StyledPaper>
    )
}

export default WelcomeCard