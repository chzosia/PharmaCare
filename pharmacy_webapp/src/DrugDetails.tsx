import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import Navbar from './components/Navbar';
import TabletIcon from './assets/tablet.png';
import SyrupIcon from './assets/syrup.png';
import InjectionIcon from './assets/injection.png';

interface Drug {
  id: number;
  code: string;
  name: string;
  manufacturer: string;
  availableUnits: number;
  dose: string;
  form: string;
  price: number;
  symptom: string;
}

const DrugDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [drug, setDrug] = useState<Drug | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchDrug = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/drugs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch drug details');
        const data = await response.json();
        setDrug(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrug();
  }, [id]);

  const addToCart = (drug: Drug) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({ ...drug, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${drug.name} has been added to your cart.`);
  };

  const getIconByForm = (form: string) => {
    switch (form.toLowerCase()) {
      case 'tablet':
        return TabletIcon;
      case 'syrup':
        return SyrupIcon;
      case 'injection':
        return InjectionIcon;
      default:
        return null;
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Navbar />
        <Box sx={{ textAlign: 'center', mt: 10, px: 2 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            You must be logged in to view specific products.
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Please{''}
            <Box
              component="span"
              onClick={() => navigate('/')}
              sx={{
                all: 'unset',
                color: '#f36586',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontWeight: 500,
                ml: 0.5,
                '&:hover': {
                  textDecoration: 'underline',
                  opacity: 0.8,
                },
              }}
            >
              log in
            </Box>{' '}
            to continue.
          </Typography>
        </Box>
      </>
    );
  }

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!drug) {
    return (
      <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">
          Drug not found.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/products')}>
          Back to list
        </Button>
      </Box>
    );
  }

  const icon = getIconByForm(drug.form);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          backgroundColor: '#fbeaf4',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Card sx={{ maxWidth: 600, borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ color: '#f36586', mr: 2 }}>
                {drug.name}
              </Typography>
              {icon && (
                <Box
                  component="img"
                  src={icon}
                  alt={drug.form}
                  sx={{ width: 48, height: 48 }}
                />
              )}
            </Box>
            <Typography variant="body1" gutterBottom>
              <strong>Manufacturer:</strong> {drug.manufacturer}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Form:</strong> {drug.form}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Dose:</strong> {drug.dose}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Available Units:</strong> {drug.availableUnits}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Symptom:</strong> {drug.symptom}
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Price: ${drug.price.toFixed(2)}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 3,
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                sx={{ color: '#f36586', borderColor: '#f36586' }}
                onClick={() => addToCart(drug)}
              >
                Add to Cart
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#f36586' }}
                onClick={() => navigate('/products')}
              >
                Back to list
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DrugDetails;
