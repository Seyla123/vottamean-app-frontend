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
    <Select
      value={value}
      onChange={onChange}
      size="small"
      displayEmpty
      // IconComponent={() => <ChevronDown size={18} color="#757575" />}
      sx={{
        width: '100%',
        maxWidth: '200px',
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        ...customStyles,
      }}
      renderValue={(selected) => (
        <Stack direction={'row'} gap={1} alignItems={'center'}>
          {/* {icon && <InputAdornment position="start">{icon}</InputAdornment>} */}
          <InputLabel> {truncate(selectedLabel, truncateLength)}</InputLabel>
        </Stack>
      )}
      MenuProps={{
        PaperProps: {
          sx: {
            '& .MuiMenuItem-root': {
              padding: '8px 16px !important',
            },
          },
        },
      }}
    >
      {data.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default FilterComponent;
