import React from 'react';
import { TextField, Typography, InputAdornment, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    margin: 0,
    width: '100%',
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper,
    '& fieldset': {
      borderColor: theme.palette.mode === 'light' ? '#e0e0e0' : '#424242',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'light' ? '#b0b0b0' : '#616161',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputAdornment-root': {
    marginRight: 0,
  },
}));

const InputField = ({
  name,
  control,
  placeholder,
  errors,
  icon: Icon,
  type = 'text',
  multiline = false,
  minRows,
  required = true,
  disabled = false,
  maxLength = 50,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
      }}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          // Get the current character count
          const currentLength = field.value?.length || 0;

          return (
            <Box sx={{ position: 'relative' }}>
              <StyledTextField
                {...field}
                variant="outlined"
                fullWidth
                type={type}
                placeholder={placeholder}
                error={!!errors[name]}
                helperText={errors[name]?.message}
                InputProps={{
                  startAdornment: Icon ? (
                    <InputAdornment position="start" sx={{ pr: 2 }}>
                      <Icon
                        size={18}
                        color={disabled ? '#9e9e9e' : '#616161'}
                      />
                    </InputAdornment>
                  ) : null,
                  ...(multiline &&
                    maxLength && {
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            background: 'rgba(255, 255, 255, 0.8)',
                            padding: '2px 4px',
                            borderRadius: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            color={
                              currentLength > maxLength
                                ? 'error'
                                : 'text.secondary'
                            }
                          >
                            {currentLength}/{maxLength}
                          </Typography>
                        </InputAdornment>
                      ),
                    }),
                }}
                disabled={disabled}
                multiline={multiline}
                minRows={minRows}
                onChange={field.onChange}
              />
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default InputField;
