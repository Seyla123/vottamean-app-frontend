// React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Material UI components
import {
  Box,
  Typography,
} from '@mui/material';

// Lucid Icons
import {
  ChevronLeft,
  RectangleEllipsis,
  ShieldCheck,
  ShieldX,
} from 'lucide-react';

// Redux hooks and actions
import { useResetPasswordMutation } from '../../services/authApi';

// Custom Components
import HeaderTitle from '../../components/auth/HeaderTitle';
import PasswordIndicator from '../../components/auth/PasswordIndicator';
import PasswordInput from '../../components/auth/PasswordInput';

// Icons
import BackgroundImage from '../../assets/images/reset-password-illustration.svg';
import Logo from '../../assets/images/new-logo-name.svg';

// Validator
import { ResetPasswordValidator } from '../../validators/validationSchemas';
import StyledButton from '../../components/common/StyledMuiButton';

const ResetNewPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  // - showPassword: a boolean to show/hide password input field
  // - isSubmit: a boolean to track if the form is submitted or not
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  // - passwordValidation: an object to store the validation result of the password
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    number: false,
    letter: false,
    special: false,
  });

  // Hook form setup with Yup validation
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResetPasswordValidator),
  });

  const passwordValue = watch('password', '');

  // useResetPasswordMutation : Redux Reset Password API
  const [resetPassword, { isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      await resetPassword({
        token,
        newPassword: data.password,
      }).unwrap();
      setIsSubmit(true);
    } catch (err) {
      setIsSubmit(true)
      console.error('Password reset error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Validate password whenever it changes
  useEffect(() => {
    validatePassword(passwordValue);
  }, [passwordValue]);

  const validatePassword = (password) => {
    if (password) {
      setPasswordValidation({
        length: password.length >= 8,
        number: /[0-9]/.test(password),
        letter: /[a-zA-Z]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      });
    } else {
      setPasswordValidation({
        length: false,
        number: false,
        letter: false,
        special: false,
      });
    }
  };

  const handleLoginRedirect = () => {
    navigate('/auth/signin');
  };
  const handleBackButtonClick = () => {
    setIsSubmit(false);
  };

  return (
    <Box component="section" sx={styles.pageContainer}>
      {/* LEFT CONTAINER */}
      <Box component="div" sx={styles.leftContainer}>
        <img src={Logo} alt="vottamean logo" style={styles.logo} />
        {isSubmit ? (
          <ResetPasswordSubmit
            isLoading={isLoading}
            handleLoginRedirect={handleLoginRedirect}
            handleBackButtonClick={handleBackButtonClick}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
          />
        ) : (
          <Box sx={styles.formContainer}>
            <Box component={'div'} sx={styles.iconContainer}>
              <RectangleEllipsis size={100} />
            </Box>
            <HeaderTitle
              title={'Reset New Password'}
              subTitle={'Enter your new password to reset your password.'}
            />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: { xs: 2, md: 3 },
                }}
              >
                {/* NEW PASSWORD INPUT */}
                <PasswordInput
                  name="password"
                  label="New Password"
                  control={control}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  error={errors.password}
                  placeholder="Enter new password"
                />
                {/* NEW CONFIRM PASSWORD INPUT */}
                <PasswordInput
                  name="passwordConfirm"
                  label="Confirm Password"
                  control={control}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  error={errors.passwordConfirm}
                  placeholder="Confirm new password"
                />
                {/* PASSWORD VALIDITY INDICATORS */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Register Requirement{' '}
                    <span style={{ color: 'red', marginLeft: 1 }}>*</span>
                  </Typography>
                  <PasswordIndicator
                    isValid={passwordValidation.length}
                    message="At least 8 characters."
                  />
                  <PasswordIndicator
                    isValid={passwordValidation.letter}
                    message="Contain at least one letter."
                  />
                  <PasswordIndicator
                    isValid={passwordValidation.number}
                    message="Contain at least one number."
                  />
                  <PasswordIndicator
                    isValid={passwordValidation.special}
                    message="Contain at least one special character."
                  />
                </Box>
                <StyledButton
                  variant="contained"
                  type="submit"
                  size="small"
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </StyledButton>
              </Box>
            </form>
            <Link to={'/auth/signin'} style={styles.footer}>
              <ChevronLeft size={18} />
              <Typography variant="body2">Back to sign in</Typography>
            </Link>
          </Box>
        )}
      </Box>
      {/* RIGHT CONTAINER */}
      <Box component="div" sx={styles.rightContainer}>
        <Box component="div" sx={styles.imageOverlay} />

        <Box sx={styles.content}>
          <Typography variant="h3" color="white">
            Password Security Tips:
          </Typography>
          <Typography variant="subtitle1" color="white">
            - Make sure your new password is strong and unique. Need help?
            <br />- Use a mix of letters, numbers, and symbols for a secure
            password.
          </Typography>
          <Typography variant="body1" color="white">
            Reach out to our support team if you encounter any issues during the
            reset process.
          </Typography>
        </Box>
        <img
          src={BackgroundImage}
          alt="Reset Password"
          style={styles.backgroundImage}
        />
      </Box>
    </Box>
  );
};

export default ResetNewPasswordPage;

const styles = {
  pageContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 2,
    gap: 2,
    bgcolor: 'white',
  },
  leftContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  logo: {
    width: '150px',
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
  },
  iconContainer: {
    width: {
      xs: '40px',
      md: '50px',
    },
    height: {
      xs: '40px',
      md: '50px',
    },
    p: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    border: '1px solid #ccc',
  },
  formContainer: {
    width: '100%',
    maxWidth: '400px',
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    margin: '0 auto',
  },
  rightContainer: {
    display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
    position: 'relative',
    zIndex: 10,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, #64b5f6 0%, #8B93FF 100%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 2,
    p: 2,
    overflow: 'hidden',
  },
  imageOverlay: {
    position: 'absolute',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
  content: {
    p: 4,
    bottom: 0,
    left: 0,
    width: '100%',
    maxWidth: '800px',
    position: 'absolute',
    zIndex: 50,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  footer: {
    color: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
  },
  emailContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    alignItems: 'center',
    textAlign: 'center',
  },

  contactSupport: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    width: 'fit-content',
    background: 'white',
    borderRadius: '4px',
    padding: '2px 8px',
  },
};

//
const ResetPasswordSubmit = ({
  isLoading,
  handleLoginRedirect,
  isSuccess,
  error,
  handleBackButtonClick
}) => {
  return (
    <>
      <Box sx={styles.formContainer}>
        <Box component={'div'} sx={isSuccess ? styles.iconContainer : {...styles.iconContainer, border: '1px solid red', color:'red'}}>
          {isSuccess ? <ShieldCheck size={100} /> : <ShieldX size={100} />}
        </Box>
        {/* FORM HEADER */}
        <HeaderTitle
          title={
            isSuccess
              ? 'Your password has been successfully reset.'
              : 'Password Reset Failed.'
          }
          subTitle={
            isSuccess
              ? 'You can now sign in with your new password. '
              : (error ? `${error?.data?.message}. Please try again.` : 'We were unable to reset your password at this time. Please try again later.')
          }
        />
        <form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: { xs: 2, md: 3 },
            }}
          >
            {/* BUTTON */}
            {isSuccess ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <StyledButton
                  size="small"
                  variant="contained"
                  onClick={handleLoginRedirect}
                  disabled={isLoading}
                >
                  Go to sign in
                </StyledButton>
              </Box>
            ) : (
              <StyledButton
                size="small"
                variant="contained"
                onClick={handleBackButtonClick}
                disabled={isLoading}
              >
                Try again
              </StyledButton>
            )}
            {!isSuccess && (
              <Link to={'/auth/signin'} style={styles.footer}>
                <ChevronLeft size={18} />
                <Typography variant="body2">Back to sign in</Typography>
              </Link>
            )}
          </Box>
        </form>
        {/* FOOTER */}
      </Box>
    </>
  );
};
