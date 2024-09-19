import React from 'react';
import { Select, MenuItem, Box } from '@mui/material';
import { longText } from '../../styles/global';

const FilterComponent = ({ data, placeholder, value, onChange, customStyles }) => {
  const selectedLabel = data.find(item => item.value === value)?.label || placeholder;

  return (
    <Select
      value={value}
      onChange={onChange}
      displayEmpty
      sx={{ ...longText, ...customStyles }}
      renderValue={(selected) => (
        <Box component="p" variant="body2" sx={{ color: value ? 'inherit' : '#B5B5B5' }}>
          {selectedLabel}
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
