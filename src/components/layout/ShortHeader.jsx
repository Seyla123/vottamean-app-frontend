import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '@assets/images/logo.png';

const ShortHeader = () => {
  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: '150px', height: '100%' }}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default ShortHeader;
