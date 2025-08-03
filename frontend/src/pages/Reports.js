import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import api from '../services/api';

function Reports() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [sales, setSales] = useState(0);
  const [purchases, setPurchases] = useState(0);
  const [dues, setDues] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const [invoicesRes, purchasesRes] = await Promise.all([
        api.get('/invoices'),
        api.get('/purchases'),
      ]);
      let filteredInvoices = invoicesRes.data;
      let filteredPurchases = purchasesRes.data;
      if (from) {
        filteredInvoices = filteredInvoices.filter(i => i.date >= from);
        filteredPurchases = filteredPurchases.filter(p => p.date >= from);
      }
      if (to) {
        filteredInvoices = filteredInvoices.filter(i => i.date <= to);
        filteredPurchases = filteredPurchases.filter(p => p.date <= to);
      }
      setSales(filteredInvoices.reduce((sum, i) => sum + Number(i.total), 0));
      setPurchases(filteredPurchases.reduce((sum, p) => sum + Number(p.total), 0));
      setDues(filteredInvoices.reduce((sum, i) => sum + Number(i.due), 0));
    }
    fetchData();
  }, [from, to]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Reports</Typography>
      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="From"
          type="date"
          value={from}
          onChange={e => setFrom(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="To"
          type="date"
          value={to}
          onChange={e => setTo(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4" color="primary">₹{sales.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Purchases</Typography>
            <Typography variant="h4" color="primary">₹{purchases.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Dues</Typography>
            <Typography variant="h4" color="error">₹{dues.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Reports; 