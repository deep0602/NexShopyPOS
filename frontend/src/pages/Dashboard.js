import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import BrandingHeader from '../components/BrandingHeader';
import api from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({ products: 0, customers: 0, suppliers: 0, invoices: 0 });

  useEffect(() => {
    async function fetchStats() {
      const [products, customers, suppliers, invoices] = await Promise.all([
        api.get('/products'),
        api.get('/customers'),
        api.get('/suppliers'),
        api.get('/invoices'),
      ]);
      setStats({
        products: products.data.length,
        customers: customers.data.length,
        suppliers: suppliers.data.length,
        invoices: invoices.data.length,
      });
    }
    fetchStats();
  }, []);

  return (
    <Box>
      <BrandingHeader />
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Products</Typography>
            <Typography variant="h4" color="primary">{stats.products}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Customers</Typography>
            <Typography variant="h4" color="primary">{stats.customers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Suppliers</Typography>
            <Typography variant="h4" color="primary">{stats.suppliers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Invoices</Typography>
            <Typography variant="h4" color="primary">{stats.invoices}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 