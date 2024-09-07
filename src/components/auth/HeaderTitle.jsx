import { Box, Typography } from '@mui/material'

const HeaderTitle = ({ title, subTitle, center, children }) => {

  return (
    <Box sx={containerStyles}>
    {/* Render any additional content passed as children */}
      {children}
      <Typography variant="h4" fontWeight={"bold"} padding={0}>
        {title}
      </Typography>
      <Typography variant="subtitle1">{subTitle}</Typography>
    </Box>
  );
};

export default HeaderTitle;

const containerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    textAlign: center ? "center" : "left",
  };