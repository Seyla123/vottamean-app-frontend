import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';

const SearchComponent = ({ sx, placeholder, value, onChange, onClickIcon }) => {
  return (
    <TextField
      sx={{
        maxWidth: '700px',
        height: '50px',
        '& .MuiOutlinedInput-root': {
          height: '100%',
          borderRadius: '25px', // Rounded corners
          backgroundColor: '#f5f5f5', // Light gray background
          '&:hover': {
            backgroundColor: '#e0e0e0', // Slightly darker on hover
          },
          '& fieldset': {
            borderColor: 'transparent', // Remove default border
          },
          '&:hover fieldset': {
            borderColor: 'transparent', // Remove hover border
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main', // Add border color when focused
          },
        },
        '& .MuiInputBase-input': {
          height: '100%',
          padding: '10px 14px',
        },
        ...sx,
      }}
      placeholder={placeholder}
      size="medium"
      variant="outlined"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            onClick={onClickIcon}
            sx={{ cursor: 'pointer' }}
          >
            <Search size={20} color="#757575" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchComponent;
