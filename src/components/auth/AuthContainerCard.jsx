
import { Container, Box, Button } from "@mui/material";
import TestimonialCard from "./TestimonialCard";
import LogoWaveTrack from '../../assets/images/logoWaveTrack.png'
function AuthContainerCard({sideCard, children}) {
const flexdirection = sideCard ==='right' ? 'row-reverse' : 'row';
const gridContainer = {
    width: "100%",
    padding: { xs: 3, sm: 3 },
    display: "flex",
    gap: 3,
    flexDirection : flexdirection,
    justifyContent: "center",
    borderRadius: "24px",
    border: "0.3px solid #E0E0E0",
    boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.08)",
  };
  const logoFlexEnd = true;
  const flexDir = logoFlexEnd ? 'flex-end' : 'flex-start';
  return (
    <>
        <Container component="form"  sx={gridContainer}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "100%",
              bgcolor: "#90CAF9",
              borderRadius: "18px",
              flexDirection: "column",
            }}
          >
            <Box display={"flex"} justifyContent={flexDir} sx={{ padding: 2 }}>
              <Box component={'img'} src={LogoWaveTrack} sx={{ maxWidth: "60px" }}/>
            </Box>
            <Button sx={{ width: "100%" }}>Get Started</Button>
            <Box component={"div"}>
            <TestimonialCard/>
            </Box>
          </Box>
          <Box sx={{ width: "100%", paddingTop:2, paddingBottom:2}}>
            {children}
          </Box>
        </Container>
    </>
  );
  
}
export default AuthContainerCard;




