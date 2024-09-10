import React from 'react'
import { Select,Box, MenuItem } from '@mui/material';
import { longText } from '../../styles/global';
function FilterComponent({data,placeholder,value,onChange,customStyles}) {
  return (
    <Select
    value={value}
    onChange={onChange}
    displayEmpty
    sx={{...longText,...customStyles}}
    renderValue={selected => {
        if (selected.length === 0) {
            return <Box component="p" variant="body2" sx={{ color: '#B5B5B5' }}>{placeholder}</Box>;
        }
        return selected;
    }}
>
    {data.map((item) => (
        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
    ))}
</Select>
  )
}

export default FilterComponent;