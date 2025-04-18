import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';

const Footer = () => {
  const authors = [
    'Dr. Soumya Lipsa Rath',
    'Pratibha Singh',
    'M. Gokul Sai Reddy',
    'G. Nikhil Raj',
    'Ansh Desai',
    'Ritish Kumar'
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(21, 101, 192, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} Predictiva. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 1 }}>
          Developed by:
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
          {authors.map((author, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                fontWeight: 500,
                '&:not(:last-child)': {
                  '&::after': {
                    content: '"•"',
                    marginLeft: '8px',
                    color: 'rgba(0, 0, 0, 0.3)',
                  }
                }
              }}
            >
              {author}
            </Typography>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 