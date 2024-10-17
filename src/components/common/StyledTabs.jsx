import { styled, Tab } from '@mui/material';

export const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontSize: theme.typography.pxToRem(15),
  }),
);
