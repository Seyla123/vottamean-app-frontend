import React from 'react';
import { AppBar, Stack, Toolbar, CssBaseline } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/new-logo-name.svg';
const ShortHeader = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" color="white" sx={styles.pageContainer}>
        <Toolbar component={'div'} sx={styles.leftContainer}>
          <Link to="/">
            <img
              src={Logo}
              alt="vottamean logo" style={styles.logo}
            />
          </Link>
        </Toolbar>
        <Stack
          sx={{
            height: '80vh',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            width: '100%',
          }}
        >
          {children}
        </Stack>
      </AppBar>
    </>
  );
};

export default ShortHeader;
const styles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    p: 2,
    gap: 2,
    shadow: 'none',
    boxShadow: 'none',
    backgroundColor: 'white',
    height: '100vh',
  },
  leftContainer: {
    width: '100%',
  },
  logo: {
    width: '150px',
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 10,
  },
};
