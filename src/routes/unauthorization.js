// src/page/UnauthorizedPage.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const UnauthorizedPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
    <Typography variant="h4" color="error">
      Unauthorized Access
    </Typography>
   
  </Box>
);

export default UnauthorizedPage;
