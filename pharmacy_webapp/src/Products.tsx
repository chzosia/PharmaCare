import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
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

const Products: React.FC = () => {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState('All');
  const [selectedSymptom, setSelectedSymptom] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    const fetchDrugs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/drugs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch drugs');
        const data = await response.json();
        setDrugs(data);
      } catch (error) {
        console.error('Error fetching drugs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, [token]);

  const addToCart = (drug: Drug) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = cart.findIndex(
      (item: Drug) => item.id === drug.id,
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity =
        (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...drug, quantity: 1 });
    }

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

  const formOptions = Array.from(new Set(drugs.map((d) => d.form)));
  const symptomOptions = Array.from(
    new Set(drugs.flatMap((d) => d.symptom.split(',').map((s) => s.trim()))),
  );

  const filteredDrugs = drugs.filter((drug) => {
    const matchForm =
      selectedForm === 'All' ||
      drug.form.toLowerCase() === selectedForm.toLowerCase();

    const matchSymptom =
      selectedSymptom === 'All' ||
      drug.symptom
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .includes(selectedSymptom.toLowerCase());

    const matchSearch = drug.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());

    return matchForm && matchSymptom && matchSearch;
  });

  const NAV_BAR_HEIGHT = 48;
  const EXTRA_SPACING = 32;
  const totalNavbarOffset = NAV_BAR_HEIGHT + EXTRA_SPACING;

  if (!token) {
    return (
      <>
        <Navbar />
        <Box sx={{ height: `${totalNavbarOffset}px` }} />
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: '#fbeaf4',
            minHeight: `calc(100vh - ${totalNavbarOffset}px)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            px: 4,
            pb: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: '#f36586', mb: 2 }}>
            You need to be logged in to view our products.{' '}
            <Box
              component="span"
              onClick={() => navigate('/')}
              sx={{
                color: '#f36586',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Go to Login
            </Box>
          </Typography>
        </Box>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ height: `${totalNavbarOffset}px` }} />
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: '#fbeaf4',
            minHeight: `calc(100vh - ${totalNavbarOffset}px)`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ height: `${totalNavbarOffset}px` }} />

      <Box
        sx={{
          px: 4,
          pb: 4,
          backgroundColor: '#fbeaf4',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          minHeight: `calc(100vh - ${totalNavbarOffset}px)`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: '#f36586',
            textAlign: 'center',
            mb: 4,
            minHeight: '56px',
          }}
        >
          Available Products
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            mb: 5,
            width: '100%',
            maxWidth: 900,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            {/* SearchBar */}
            <TextField
              label="Search by Name"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                '& label': {
                  color: '#f36586',
                },
                '& label.Mui-focused': {
                  color: '#f36586',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#f36586',
                  },
                  '&:hover fieldset': {
                    borderColor: '#f36586',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#f36586',
                  },
                  color: '#f36586',
                },
                input: {
                  color: '#f36586',
                },
              }}
            />

            {/* Filter label */}
            <Typography
              variant="subtitle1"
              sx={{
                color: '#f36586',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                mr: 1,
              }}
            >
              or filter by:
            </Typography>

            {/* Form Filter */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel
                sx={{
                  color: '#f36586',
                  '&.Mui-focused': { color: '#f36586' },
                }}
                id="form-select-label"
              >
                Form
              </InputLabel>
              <Select
                labelId="form-select-label"
                value={selectedForm}
                label="Form"
                onChange={(e) => setSelectedForm(e.target.value)}
                sx={{
                  color: '#f36586',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f36586',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f36586',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f36586',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#f36586',
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                {formOptions.map((form) => (
                  <MenuItem key={form} value={form}>
                    {form}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Symptom Filter */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel
                sx={{
                  color: '#f36586',
                  '&.Mui-focused': { color: '#f36586' },
                }}
                id="symptom-select-label"
              >
                Symptom
              </InputLabel>
              <Select
                labelId="symptom-select-label"
                value={selectedSymptom}
                label="Symptom"
                onChange={(e) => setSelectedSymptom(e.target.value)}
                sx={{
                  color: '#f36586',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f36586',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f36586',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#f36586',
                  },
                  '& .MuiSvgIcon-root': {
                    color: '#f36586',
                  },
                }}
              >
                <MenuItem value="All">All</MenuItem>
                {symptomOptions.map((symptom) => (
                  <MenuItem key={symptom} value={symptom}>
                    {symptom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {filteredDrugs.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#888',
              mt: 8,
              minHeight: '200px',
            }}
          >
            No products match the selected filters.
          </Typography>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
              },
              gap: 3,
              width: '100%',
              maxWidth: 1200,
            }}
          >
            {filteredDrugs.map((drug) => {
              const icon = getIconByForm(drug.form);
              return (
                <Card
                  key={drug.id}
                  sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: 180,
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography variant="h6" sx={{ color: '#f36586' }}>
                        {drug.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Dose: {drug.dose}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Price:</strong> ${drug.price.toFixed(2)}
                      </Typography>
                    </Box>
                    {icon && (
                      <Box
                        component="img"
                        src={icon}
                        alt={drug.form}
                        sx={{ width: 48, height: 48, ml: 2 }}
                      />
                    )}
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: 'space-between',
                      px: 2,
                      pb: 2,
                    }}
                  >
                    <Button
                      size="small"
                      sx={{ color: '#f36586' }}
                      onClick={() => navigate(`/products/${drug.id}`)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ color: '#f36586', borderColor: '#f36586' }}
                      onClick={() => addToCart(drug)}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>
    </>
  );
};

export default Products;
