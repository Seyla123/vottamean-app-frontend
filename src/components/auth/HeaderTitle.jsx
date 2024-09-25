import { Box, Typography } from '@mui/material';

const HeaderTitle = ({ title, subTitle }) => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={'bold'}>
        {title}
      </Typography>
      <Typography variant="subtitle1" mt={0}>
        {subTitle}
      </Typography>
    </Box>
  );
};

export default HeaderTitle;
