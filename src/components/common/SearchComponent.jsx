import React from 'react';
import { InputAdornment, IconButton, Box } from '@mui/material';
import { Search, X } from 'lucide-react';
import { StyledTextField } from './InputField';

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
        ...sx,
      }}
    >
      <StyledTextField
        placeholder={placeholder}
        fullWidth
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
      />
    </Box>
  );
};

export default SearchComponent;
