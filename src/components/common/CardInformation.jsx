/**
 * CardInformation component
 *
 * This component is used to display a list of key-value pairs in a column format. Each key-value pair is rendered with the key in bold and the value in a different style.
 *
 * Usage:
 *
 * import CardInformation from './CardInformation';
 *
 * const data = {
 *   Name: "John Doe",
 *   Age: "30",
 *   Location: "New York"
 * };
 *
 * <CardInformation data={data} />
 *
 * @param {Object} props - The props for the component.
 * @param {Object} props.data - An object containing key-value pairs to be displayed. The keys are displayed as labels, and the values are shown alongside them.
 *
 * @returns {JSX.Element} The rendered CardInformation component.
 */

import { Box, Typography } from '@mui/material';
function CardInformation({ data = [] }) {
  return (
    <>
      <Box sx={containerStyle}>
        {Object.entries(data).map(([key, value]) => (
          <Box sx={textStyles} key={key}>
            {key}: <Typography sx={textInput}>{value}</Typography>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default CardInformation;

const textStyles = {
  fontWeight: 'bold',
  display: 'flex',
  gap: 0.5,
  overflowWrap: 'break-word',
  textOverflow: 'ellipsis',
  fontSize: { xs: '14px', sm: '16px' },
};

const textInput = {
  fontSize: { xs: '14px', sm: '16px' },
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: {
    xs: '10px',
    sm: '12px',
  },
  width: '100%',
};
