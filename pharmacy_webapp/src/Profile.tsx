import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from './components/Navbar';

const Profile: React.FC = () => {
  const username = localStorage.getItem('username');

  // Określenie wysokośći Navbara i spacera
  const NAV_BAR_HEIGHT = 48;
  const EXTRA_SPACING = 80;
  const totalNavbarOffset = NAV_BAR_HEIGHT + EXTRA_SPACING;

  return (
    <>
      <Navbar />
      {/* Spacer, aby treść nie wjeżdżała pod Navbar i zapewnić duży odstęp */}
      <Box sx={{ height: `${totalNavbarOffset}px` }} />

      {/* Główny kontener treści dla strony profilu */}
      <Box
        sx={{
          backgroundColor: '#fbeaf4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: `calc(100vh - ${totalNavbarOffset}px)`,
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{ maxWidth: 400, width: '100%', mx: 'auto', p: 3 }}
        >
          <Avatar
            sx={{
              bgcolor: '#f36586',
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography
            variant="h5"
            sx={{
              color: '#f36586',
              mb: 2,
              textAlign: 'center',
            }}
          >
            Profile Info
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
            }}
          >
            <strong>Username:</strong> {username || 'Not logged in'}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mt: 2,
              color: '#f36586',
            }}
          >
            Thank you for choosing Pharmacare{' '}
            <span role="img" aria-label="smile">
              ♡
            </span>
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default Profile;
