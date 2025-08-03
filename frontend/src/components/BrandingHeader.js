import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function BrandingHeader() {
  return (
    <Box display="flex" alignItems="center" mb={2}>
      <img src="/logo192.png" alt="NexShopy Logo" style={{ width: 48, height: 48, marginRight: 16 }} />
      <Box>
        <Typography variant="h5" fontWeight={700} color="primary">NexShopy POS</Typography>
        <Typography variant="body2">123 Market Street, City, Country</Typography>
      </Box>
    </Box>
  );
}

export default BrandingHeader; 