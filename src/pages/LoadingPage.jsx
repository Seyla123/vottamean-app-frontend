import { Box, Container, Stack } from '@mui/material'
import loadingAnimation from '../assets/images/Animation - 1725891705036.gif'
function LoadingPage() {
  return (
    <Container >
    <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90vh"}}>
      <Box component={"img"} src={loadingAnimation}></Box>
    </Stack>
  </Container>
  )
}

export default LoadingPage