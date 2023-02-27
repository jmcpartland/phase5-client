import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://localhost:4000/">
        Long Covid Support Community
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Footer() {
  const title = "Long Covid Support Community"

  return (
    <Box component="footer" sx={{ bgcolor: '#63a5db', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/* {description} */}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;