/**
 * GoBackButton component
 * 
 * This component renders a button that allows users to navigate back to a previous page or step in an application.
 * 
 * Usage:
 * 
 * import GoBackButton from './path/to/GoBackButton';
 * 
 * const handleGoBack = () => {
 *   // Add your navigation logic here
 *   console.log('Going back...');
 * };
 * 
 * <GoBackButton handleOnClick={handleGoBack} />
 * 
 * When the button is clicked, the `handleOnClick` function will be executed, allowing you to navigate back to the previous page or step.
 * 
 * @param {function} handleOnClick - The function to be called when the button is clicked.
 * @returns JSX.Element
 */

import { Box, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
function GoBackButton({handleOnClick}) {
  return (
    <Box
      component={"div"}
      sx={style}
      onClick={handleOnClick}>
      <WestIcon fontSize="small" sx={{ alignSelf: "center" }} />
      <Typography variant="body1" fontWeight={600} lineHeight={"24px"}>
        Back
      </Typography>
    </Box>
  );
}

export default GoBackButton;
const style = {
  display: "flex",
  gap: 1,
  alignItems: "center",
  color: "text.disabled",
  cursor: "pointer",
  ":hover": { color: "black" }}