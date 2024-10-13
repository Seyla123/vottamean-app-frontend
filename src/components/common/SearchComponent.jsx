import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
function SearchComponent({sx, placeholder, value,onChange, onClickIcon}) {
  return (
<TextField
  sx={{
    maxWidth: '700px',   // Ensure the max width is set
    height: '50px',       // Control the height
    '& .MuiOutlinedInput-root': {
      height: '100%',     // Apply height to the root element
    },
    '& .MuiInputBase-input': {
      height: '100%',     // Ensure the input element takes the full height
      padding: '10px 14px', // Adjust padding as needed for vertical centering
    },...sx}}
  placeholder={placeholder}
  size="medium"
  variant="outlined"
  value={value}
  onChange={onChange}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end" onClick={onClickIcon}>
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>

  )
}

export default SearchComponent