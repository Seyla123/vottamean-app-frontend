import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
function SearchComponent({sx, placeholder, value,onChange, onClickIcon}) {
  return (
    //{ width: '100%', maxWidth: '700px' }
    <TextField
    sx={sx}
    placeholder={placeholder}
    variant='outlined'
    value={value}
    onChange={onChange}
    InputProps={{
        endAdornment: true ? (
            <InputAdornment position='end' onClick={onClickIcon}>
                <SearchIcon />
            </InputAdornment>
        ) : null,
    }}
/>
  )
}

export default SearchComponent