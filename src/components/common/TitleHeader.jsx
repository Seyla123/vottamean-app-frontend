import { Stack, Typography } from '@mui/material';

const TitleHeader = ({ title, subTitle }) => (
  <Stack direction="column" gap={1} pt={1}>
    <Typography variant="h4" m={0}  component="h1" gutterBottom fontWeight="bold" textTransform="uppercase">
      {title}
    </Typography>
    <Typography variant="subtitle1" color="text.secondary">
      {subTitle}
    </Typography>
  </Stack>
);

export default TitleHeader;
