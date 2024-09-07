import HeaderTitle from "./HeaderTitle";
import GoBackButton from "../common/GoBackButton";
import { Box, TextField, Typography } from "@mui/material";
import { fieldContainer, container } from "../../styles/authStyle";

function ContactInformationForm({ onClickBack, children }) {
  return (
    <Box sx={container}>
      {/* header title */}
      <Box component={'div'}  sx={container} >
        <GoBackButton handleOnClick={onClickBack} />
        <HeaderTitle
          title={"Contact information"}
          subTitle={"Input your information"}
        />
      </Box>
      {/* form container */}
      <Box  sx={container} > 
        {/*phone number input container */}
        <Box sx={fieldContainer}>
          <Typography variant="body1">Phone Number</Typography>
          <TextField placeholder="phone number" />
        </Box>
        <Box sx={fieldContainer}>
          <Typography variant="body1">Address</Typography>
          <TextField
            multiline
            minRows={5}
            placeholder="Phnom Penh, Street 210, ..."
          />
        </Box>
        {children}
      </Box>

    </Box>
  );
}
export default ContactInformationForm;