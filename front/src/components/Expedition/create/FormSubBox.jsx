import React from 'react';
import { Box, useTheme } from '@mui/material';

export const FormSubBox = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        border: `2px solid ${theme.palette.primary.main}`,
        borderRadius: '5px',
        marginBottom: '1rem',
        mx: { xs: '1rem', md: '2rem' },
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        // minWidth: '18rem',
        maxWidth: '50rem',
        padding: { xs: '1rem', md: '2rem' },
        // margin: 'auto',
      }}
    >
      {children}
    </Box>
  );
};
