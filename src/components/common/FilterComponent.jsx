import React from 'react';
import { Select, MenuItem, Box, useMediaQuery, useTheme, Typography, InputAdornment } from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { truncate } from '../../utils/truncate';

const FilterComponent = ({ data, placeholder, value, onChange, customStyles, icon }) => {
  const selectedLabel = data.find(item => item.value === value)?.label || placeholder;
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  
  const truncateLength = isMobile ? 7 : 10;
  
  return (
    <Select
      value={value}
      onChange={onChange}
      displayEmpty
      IconComponent={() => <ChevronDown size={18} color="#757575" />}
      sx={{
        width: '100%',
        maxWidth: '200px',
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
          backgroundColor: '#ffffff',
          transition: 'all 0.3s ease',
          border: '1px solid #e0e0e0',
          '&:hover': {
            borderColor: '#b0b0b0',
          },
          '&.Mui-focused': {
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            borderColor: theme.palette.primary.main,
          },
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        ...customStyles
      }}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          )}
          <Typography
            variant="body2"
            sx={{
              color: value ? 'inherit' : '#757575',
              fontWeight: value ? 500 : 400,
            }}
          >
            {truncate(selectedLabel, truncateLength)}
          </Typography>
        </Box>
      )}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 300,
            '& .MuiMenuItem-root': {
              padding: '8px 16px',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
              '&.Mui-selected': {
                backgroundColor: '#e3f2fd',
                '&:hover': {
                  backgroundColor: '#bbdefb',
                },
              },
            },
          },
        },
      }}
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
