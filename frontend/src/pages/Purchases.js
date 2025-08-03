import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';

function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [open, setOpen] = useState(false);
  const [editPurchase, setEditPurchase] = useState(null);
  const [form, setForm] = useState({ supplierId: '', date: '', total: '', paid: '', due: '' });

  const fetchPurchases = async () => {
    const res = await api.get('/purchases');
    setPurchases(res.data);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleOpen = (purchase = null) => {
    setEditPurchase(purchase);
    setForm(purchase ? { ...purchase } : { supplierId: '', date: '', total: '', paid: '', due: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditPurchase(null);
    setForm({ supplierId: '', date: '', total: '', paid: '', due: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editPurchase) {
      await api.put('/purchases', { ...form, id: editPurchase.id });
    } else {
      await api.post('/purchases', form);
    }
    fetchPurchases();
    handleClose();
  };

  const handleDelete = async (id) => {
    await api.delete(`/purchases/${id}`);
    fetchPurchases();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Purchases</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Purchase
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Due</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.supplierId}</TableCell>
                <TableCell>{purchase.date}</TableCell>
                <TableCell>{purchase.total}</TableCell>
                <TableCell>{purchase.paid}</TableCell>
                <TableCell>{purchase.due}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(purchase)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(purchase.id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editPurchase ? 'Edit Purchase' : 'Add Purchase'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Supplier ID"
            name="supplierId"
            value={form.supplierId}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Total"
            name="total"
            type="number"
            value={form.total}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Paid"
            name="paid"
            type="number"
            value={form.paid}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Due"
            name="due"
            type="number"
            value={form.due}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editPurchase ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Purchases; 