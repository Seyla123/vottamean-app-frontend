import React from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import { Search, X } from 'lucide-react';

const SearchComponent = ({ sx, placeholder, value, onChange, onSearch }) => {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch && onSearch(value);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        ...sx,
      }}
    >
      <TextField
        fullWidth
        placeholder={placeholder}
        size="small"
        variant="outlined"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} color="#757575" />
            </InputAdornment>
          ),
          endAdornment: value && (
            <InputAdornment position="end">
              <IconButton
                aria-label="clear search"
                onClick={handleClear}
                edge="end"
                size="small"
              >
                <X size={16} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '42px',
            borderRadius: 2,
            backgroundColor: '#ffffff',
            transition: 'all 0.3s ease',
            border: '1px solid #e0e0e0',
            '&.Mui-focused': {
              boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      />
    </Box>
  );
};

export default SearchComponent;
