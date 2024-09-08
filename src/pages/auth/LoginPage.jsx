import AuthContainerCard from "../../components/auth/AuthContainerCard";
import LoginForm from "../../components/auth/LoginForm";
import { Container } from "@mui/material";

function LoginPage() {
  return (
    <>
    <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <AuthContainerCard sideCard="left">
        <LoginForm />
      </AuthContainerCard>
    </Container>
    </>
  )
}

export default LoginPage;
