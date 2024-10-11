import React from 'react';
import { Select, MenuItem, Box, useMediaQuery,useTheme, Typography } from '@mui/material';
import { longText } from '../../styles/global';
import { truncate } from '../../utils/truncate';


const FilterComponent = ({ data, placeholder, value, onChange, customStyles, icon }) => {
  // get the label of the selected value
  const selectedLabel = data.find(item => item.value === value)?.label || placeholder;
  
  // get the theme and check if the screen size is mobile
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  // set the truncate length depending on the screen size
  const trucateLong = isMobile ? 7 : 10;
  
  // render the component
  return (
      <Select
      value={value}
      onChange={onChange}
      displayEmpty
      sx={{ ...longText, ...customStyles }}
      renderValue={(selected) => (
        <Box component="p" variant="body2" sx={{ color: value ? 'inherit' : '#B5B5B5', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {icon ? icon : null}
          {truncate(selectedLabel, trucateLong)}
        </Box>
      )}
      
    >
      <MenuItem value="" disabled>
        {placeholder}
      </MenuItem>
      {data.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FilterComponent;
