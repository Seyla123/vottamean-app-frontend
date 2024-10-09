import { Controller } from 'react-hook-form';
import { Box, Typography, Select, MenuItem, FormHelperText } from '@mui/material';

const RenderSelect = ({ name, label, options, control, errors }) => (
  <Controller
    name={name}
    control={control}
    fullWidth
    render={({ field }) => (
      <Box sx={boxStyle}>
        <Typography>{label}</Typography>
        <Select
          {...field}
          displayEmpty
          fullWidth
          renderValue={(selected) =>
            !selected ? (
              <span style={{ color: 'gray' }}>{label}</span>
            ) : (
              options.find((option) => option.value === selected)?.label || ''
            )
          }
          sx={{
            '& .MuiSelect-placeholder': {
              color: 'gray',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {errors[name] && (
          <FormHelperText error>{errors[name].message}</FormHelperText>
        )}
      </Box>
    )}
  />
);

export default RenderSelect;

const boxStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};
