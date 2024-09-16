/**
 * AuthContainerCard component
 *
 * This component serves as a container for authentication-related content,
 * such as registration forms. It can display a side card with
 * branding and testimonials, and it allows for additional content to be
 * passed as children.
 *
 * @param {string} sideCard - Determines the position of the side card.
 *                            Accepts "left" or "right".
 * @param {React.ReactNode} children - The content to be displayed inside
 *                                      the authentication form.
 * @returns JSX.Element
 */

import { Container, Stack, Box, Typography } from '@mui/material';
import TestimonialCard from './TestimonialCard';
import LogoWaveTrack from '../../assets/images/logoWaveTrack.png';

function AuthContainerCard({ sideCard, children }) {
  // Determine the flex direction based on the sideCard prop
  const direction = sideCard === 'right' ? 'row-reverse' : 'row';

  // Set the alignment of the side card based on the sideCard prop
  const flexDir = sideCard === 'right' ? 'flex-end' : 'flex-start';

  return (
    <>
      {/* Main container for the authentication card */}
      <Container sx={{ ...gridContainer, flexDirection: direction }}>
        {/* Side card container for branding and testimonials */}
        <Box sx={sideCardContainer}>
          {/* Logo container with alignment based on flexDir */}
          <Box display={'flex'} justifyContent={flexDir} sx={{ padding: 2 }}>
            <Box
              component={'img'}
              src={LogoWaveTrack}
              sx={{ maxWidth: '60px' }}
            />
          </Box>
          {/* Text container for title and description */}
          <Box component={'div'}>
            <Typography variant="h4" fontWeight={500}>
              WaveTrack : <br />A New Hope for Attendance
            </Typography>
            <Typography
              fontWeight={400}
              variant="body1"
              sx={{ paddingTop: 2, paddingBottom: 2 }}
            >
              Accurately record and monitor student attendance with
              WaveTrack&apos;s user-friendly platform. Improve efficiency and
              reduce paperwork, all while ensuring every student is accounted
              for.
            </Typography>
          </Box>
          {/* Testimonial card component */}
          <Box component={'div'}>
            <TestimonialCard />
          </Box>
        </Box>
        {/* Main content area for the authentication form */}
        <Stack
          sx={{
            width: '100%',
            paddingTop: 2,
            paddingBottom: 2,
            display: 'flex',
            height: '100%',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {children} {/* Render any children passed to the component */}
        </Stack>
      </Container>
    </>
  );
}

export default AuthContainerCard;

// Styles for the main grid container
const gridContainer = {
  width: '100%',
  padding: { xs: 3, sm: 3 },
  display: 'flex',
  gap: 3,
  justifyContent: 'center',
  borderRadius: '24px',
  border: '0.3px solid #E0E0E0',
  boxShadow: '0px 0px 24px rgba(0, 0, 0, 0.08)',
};

// Styles for the side card container
const sideCardContainer = {
  display: { xs: 'none', md: 'flex' }, // Hide on extra small screens
  width: '100%',
  bgcolor: '#90CAF9',
  borderRadius: '18px',
  flexDirection: 'column',
  padding: '24px 32px',
  justifyContent: 'space-between',
};
