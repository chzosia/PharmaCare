import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import './Navbar.css';
import { Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const username = localStorage.getItem('username');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('cart');
    handleMenuClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  return (
    <div className="topnav">
      <a
        href="/home"
        className="active"
        style={{ padding: 0, display: 'flex', alignItems: 'center' }}
      >
        <img
          src={require('../assets/logo_bcg.png')}
          alt="PharmaCare Logo"
          style={{ height: '48px', display: 'block' }}
        />
      </a>

      <a href="/products">Products</a>
      <a href="/contact">Contact</a>

      {/* Profile Avatar + Dropdown Menu */}
      <div style={{ float: 'right' }}>
        <IconButton onClick={() => navigate('/cart')} sx={{ mr: 1 }}>
          <ShoppingCartIcon sx={{ color: '#f36586' }} />
        </IconButton>

        <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
          <Avatar
            alt="User Profile"
            sx={{ bgcolor: '#f36586', color: 'white' }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Box sx={{ px: 2, pt: 1, pb: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
              Logged in as:
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold">
              {username || 'Guest'}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          <MenuItem onClick={handleProfile}>
            <PersonIcon fontSize="small" sx={{ mr: 1 }} />
            Profile
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
