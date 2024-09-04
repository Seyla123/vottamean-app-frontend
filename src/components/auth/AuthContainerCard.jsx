
import { Container, Box } from "@mui/material";

function AuthContainerCard({sideCard, children}) {
const flexdirection = sideCard ==='right' ? 'row-reverse' : 'row';

const gridContainer = {
    width: "100%",
    padding: { xs: 2, sm: 3 },
    display: "flex",
    gap: 3,
    flexDirection : flexdirection,
    justifyContent: "center",
    bgcolor: "#FFFFFF",
    height: "50vh",
    borderRadius: "24px",
    border: "0.3px solid #E0E0E0",
    boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.08)",
  };
  return (
    <>
        <Container component="form"  sx={gridContainer}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "100%",
              height: "100%",
              bgcolor: "#90CAF9",
              borderRadius: "18px",
            }}
          >
            <Container>
              
            </Container>
          </Box>
          <Box sx={{ width: "100%", height: "100%"}}>
            {children}
          </Box>
        </Container>
    </>
  );
  
}
export default AuthContainerCard;




