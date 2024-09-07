
import { Container, Box, Button, Typography } from "@mui/material";
import TestimonialCard from "./TestimonialCard";
import LogoWaveTrack from '../../assets/images/logoWaveTrack.png'
function AuthContainerCard({ sideCard, children }) {
  const flexdirection = sideCard === 'right' ? 'row-reverse' : 'row';
  console.log(sideCard);
  
  const flexDir = sideCard === 'right' ? 'flex-end' : 'flex-start';
  return (
    <>
      <Container component="form" sx={gridContainer} flexDirection={flexdirection}>
        <Box  sx={sideCardContainer} >
          <Box display={"flex"} justifyContent={flexDir} sx={{ padding: 2 }}>
            <Box component={'img'} src={LogoWaveTrack} sx={{ maxWidth: "60px" }} />
          </Box>
          <Box component={'div'}>
            <Typography variant="h4" fontWeight={500}>WaveTrack : <br />A New Hope for Attendance</Typography>
            <Typography fontWeight={400} variant="body1" sx={{ paddingTop: 2, paddingBottom: 2 }} >
              Accurately record and monitor student attendance with WaveTrack&apos;s user-friendly platform. Improve efficiency and reduce paperwork, all while ensuring every student is accounted for.
            </Typography>
          </Box>
          <Box component={"div"}>
            <TestimonialCard />
          </Box>
        </Box>
        <Box sx={{ width: "100%", paddingTop: 2, paddingBottom: 2 }}>
          {children}
        </Box>
      </Container>
    </>
  );

}
export default AuthContainerCard;
const gridContainer = {
  width: "100%",
  padding: { xs: 3, sm: 3 },
  display: "flex",
  gap: 3,
  justifyContent: "center",
  borderRadius: "24px",
  border: "0.3px solid #E0E0E0",
  boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.08)",
};

const sideCardContainer = {
  display: { xs: "none", md: "flex" },
  width: "100%",
  bgcolor: "#90CAF9",
  borderRadius: "18px",
  flexDirection: "column",
  padding: '24px 32px',
  justifyContent: 'space-between'
}
