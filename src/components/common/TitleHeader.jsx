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
