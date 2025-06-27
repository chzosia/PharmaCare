import React from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import Navbar from './components/Navbar';

const Contact: React.FC = () => {
  return (
    <>
      <Navbar />

      <Box
        sx={{
          backgroundColor: '#fbeaf4',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            maxWidth: 600,
            width: '100%',
            borderRadius: 3,
            backgroundColor: '#fffff',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: '#f36586', fontWeight: 600, textAlign: 'center' }}
          >
            Contact Us
          </Typography>

          <Typography
            variant="body1"
            gutterBottom
            sx={{ mb: 3, textAlign: 'center' }}
          >
            We’d love to hear from you! Please fill out the form and we'll get
            back to you shortly.
          </Typography>

          <form>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
              required
            />
            <Button
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#f36586',
                '&:hover': {
                  backgroundColor: '#ed8fa5',
                },
              }}
            >
              Send Message
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default Contact;
