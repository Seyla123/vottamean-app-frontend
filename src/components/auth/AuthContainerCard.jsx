import { Stack, Box, Typography } from '@mui/material';
import ImagePreviewCarousel from './ImagePreviewCarousel';
import LogoVottamean from '../../assets/images/VOTTAMEAN.svg';
import image1 from '../../assets/images/auth-illustrator-img-1.svg';
import image2 from '../../assets/images/auth-illustrator-img-2.svg';
import image3 from '../../assets/images/auth-illustrator-img-3.png';

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

function AuthContainerCard({ sideCard, children }) {
  // Determine the flex direction based on the sideCard prop
  const direction = sideCard === 'right' ? 'row' : 'row-reverse';

  const carouselImages = [image1, image2, image3];

  return (
    <>
      {/* Main container for the authentication card */}
      <Box
        sx={{
          ...gridContainer,
          flexDirection: direction,
        }}
      >
        <img
          src={LogoVottamean}
          alt=""
          style={{ width: '140px', position: 'absolute', top: 32, left: 32 }}
        />

        {/* Side card container for branding and testimonials */}
        <Box sx={sideCardContainer}>
          {/* Text container for title and description */}
          <Box
            component={'div'}
            sx={{
              borderRadius: 2,
              backdropFilter: 'blur(26px)',
            }}
          >
            <Typography variant="h4" fontWeight={'bold'}>
              Welcome to Vottamean! <br />A New Hope for Attendance
            </Typography>
            <Typography
              variant="body1"
              sx={{
                paddingTop: 2,
                paddingBottom: 2,
                color: 'text.secondary',
              }}
            >
              Accurately record and monitor student attendance with
              Vottamean&apos;s user-friendly platform. Improve efficiency and
              reduce paperwork, all while ensuring every student is accounted
              for.
            </Typography>
            <Box
              sx={{
                bgcolor: '#ebeaff',
                px: 1,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: 'max-content',
                fontSize: '14px',
                color: 'text.secondary',
              }}
            >
              <Box
                component={'div'}
                sx={{ width: '10px', height: '2px', background: '#aaa' }}
              />
              Developed by HexCode+
              <Box
                component={'div'}
                sx={{ width: '10px', height: '2px', background: '#aaa' }}
              />
            </Box>
          </Box>
          {/* Image Carousel component */}
          <Box component={'div'}>
            <ImagePreviewCarousel images={carouselImages} />
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
      </Box>
    </>
  );
}

export default AuthContainerCard;

// Styles for the main grid container
const gridContainer = {
  position: 'relative',
  width: '100%',
  height: '100%',
  maxHeight: '800px',
  padding: { xs: 2, sm: 1 },
  display: 'flex',
  justifyContent: 'center',
  borderRadius: 4,
  boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
  background: '#fff',
};

// Styles for the side card container
const sideCardContainer = {
  display: { xs: 'none', md: 'flex' },
  width: '100%',
  height: '100%',
  background: ' linear-gradient(45deg, #cfcdfd 0%, #eef1f5  100%)',
  borderRadius: 2,
  flexDirection: 'column',
  padding: '42px 32px 32px 32px',
  justifyContent: 'space-between',
  overflow: 'hidden',
};
