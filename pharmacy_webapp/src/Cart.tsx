import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Navbar from './components/Navbar';

interface Drug {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Drug[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (updated: Drug[]) => {
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const changeQuantity = (id: number, delta: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, (item.quantity || 1) + delta),
          }
        : item,
    );
    updateCart(updated);
  };

  const removeFromCart = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0,
  );

  // Określa wysokość Navbara i spacera (tak samo jak w innych komponentach)
  const NAV_BAR_HEIGHT = 48;
  const EXTRA_SPACING = 80;
  const totalNavbarOffset = NAV_BAR_HEIGHT + EXTRA_SPACING;

  return (
    <>
      <Navbar />
      {/* Spacer, aby treść nie wjeżdżała pod Navbar i zapewnić duży odstęp */}
      <Box sx={{ height: `${totalNavbarOffset}px` }} />

      {/* Główny kontener treści dla strony koszyka */}
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#fbeaf4',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: `calc(100vh - ${totalNavbarOffset}px)`,
        }}
      >
        <Paper elevation={3} sx={{ maxWidth: 700, mx: 'auto', p: 4 }}>
          <Typography
            variant="h4"
            sx={{ mb: 3, color: '#f36586', textAlign: 'center' }}
          >
            Your Cart
          </Typography>

          {cart.length === 0 ? (
            <Typography variant="body1" textAlign="center">
              Your cart is empty.
            </Typography>
          ) : (
            <List>
              {cart.map((item) => (
                <React.Fragment key={item.id}>
                  <ListItem>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      sx={{ width: '100%' }}
                    >
                      <Box sx={{ flex: 2 }}>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price.toFixed(2)} per unit
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => changeQuantity(item.id, -1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>
                          {item.quantity || 1}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => changeQuantity(item.id, 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Box sx={{ flex: 1, textAlign: 'right' }}>
                        <Typography variant="body2" color="text.secondary">
                          Total:
                        </Typography>
                        <Typography>
                          ${(item.price * (item.quantity || 1)).toFixed(2)}
                        </Typography>
                      </Box>

                      <IconButton onClick={() => removeFromCart(item.id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Stack>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          )}

          {cart.length > 0 && (
            <Typography
              variant="h6"
              sx={{
                mt: 3,
                textAlign: 'right',
                color: '#f36586',
                fontWeight: 'bold',
              }}
            >
              Total: ${total.toFixed(2)}
            </Typography>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default Cart;
