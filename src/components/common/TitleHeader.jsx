/**
 * TitleHeader component
 *
 * This component is used to render a title and an subtitle in a structured format.
 * It is typically used for section headers or page titles.
 *
 * Usage:
 *
 * import TitleHeader from './path/to/TitleHeader';
 *
 * <TitleHeader title="Main Title" subTitle="This is a subtitle" />
 *
 * @param {string} title - The main title to be displayed, typically in a larger font.
 * @param {string} [subTitle] - An optional subtitle to provide additional context or information.
 * @returns JSX.Element
 */

import { Stack, Typography } from '@mui/material';

const TitleHeader = ({ title, subTitle }) => (
  <Stack direction="column">
    <Typography
      variant="h5"
      component="h1"
      fontWeight="bold"
      textTransform="capitalize"
    >
      {title}
    </Typography>
    <Typography variant="body1" color="text.secondary">
      {/* {subTitle} */}
    </Typography>
  </Stack>
);

export default TitleHeader;
