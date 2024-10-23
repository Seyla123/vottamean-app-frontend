import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/VOTTAMEAN.svg';

const ShortHeader = () => {
  return (
    <AppBar position="static" color='none' sx={styles.pageContainer}>
      <Toolbar component={'div'} sx={styles.leftContainer}>
        <Link to="/">
          <img
            src={Logo}
            alt="wavetrack logo" style={styles.logo} 
          />
        </Link>
      </Toolbar>
    </AppBar>
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
    boxShadow: "none",
    backgroundColor:'white'
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