import React from 'react';
import {
  Select,
  MenuItem,
  Box,
  useMediaQuery,
  useTheme,
  Typography,
  InputAdornment,
  Stack,
  InputLabel,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';
import { truncate } from '../../utils/truncate';
import { StyledTextField } from './InputField';

const FilterComponent = ({
  data,
  placeholder,
  value,
  onChange,
  customStyles,
  icon,
}) => {
  const selectedLabel =
    data.find((item) => item.value === value)?.label || placeholder;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const truncateLength = isMobile ? 7 : 10;

  return (
    <StyledTextField
      select
      value={value}
      onChange={onChange}
      size="small"
      displayEmpty
      SelectProps={{
        displayEmpty: true,
        renderValue: (selected) => (
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            {/* {icon && <InputAdornment position="start">{icon}</InputAdornment>} */}
            <InputLabel> {truncate(selectedLabel, truncateLength)}</InputLabel>
          </Stack>
        ),
      }}
    >
      {data.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </StyledTextField>
  );
};

export default FilterComponent;
