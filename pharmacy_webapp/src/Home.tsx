import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Box, Typography } from '@mui/material';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:8080/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch user');
        const data = await res.json();
        localStorage.setItem('username', data.username);
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        localStorage.removeItem('username');
      });
  }, []);

  const NAV_BAR_HEIGHT = 48;
  const EXTRA_SPACING = 0; // 0, skoro i tak centrujemy
  const totalNavbarOffset = NAV_BAR_HEIGHT + EXTRA_SPACING;

  return (
    <>
      <Navbar />
      {/* Spacer, aby treść nie wjeżdżała pod Navbar. */}
      <Box sx={{ height: `${totalNavbarOffset}px` }} />

      {/* Kontener dla treści strony głównej */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: `calc(100vh - ${totalNavbarOffset}px)`,
          backgroundColor: '#fbeaf4',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        {/* Komponenty Typography dla spójności */}
        <Typography variant="h4" sx={{ color: '#f36586', mb: 2 }}>
          Welcome to PharmaCare
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          We're your trusted and pink online pharmacy
        </Typography>
      </Box>
    </>
  );
}

export default App;
