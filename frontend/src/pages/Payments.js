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

function Payments() {
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const [editPayment, setEditPayment] = useState(null);
  const [form, setForm] = useState({ type: '', refId: '', amount: '', date: '', remarks: '' });

  const fetchPayments = async () => {
    const res = await api.get('/payments');
    setPayments(res.data);
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleOpen = (payment = null) => {
    setEditPayment(payment);
    setForm(payment ? { ...payment } : { type: '', refId: '', amount: '', date: '', remarks: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditPayment(null);
    setForm({ type: '', refId: '', amount: '', date: '', remarks: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editPayment) {
      await api.put('/payments', { ...form, id: editPayment.id });
    } else {
      await api.post('/payments', form);
    }
    fetchPayments();
    handleClose();
  };

  const handleDelete = async (id) => {
    await api.delete(`/payments/${id}`);
    fetchPayments();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Payments</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Payment
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Ref ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Remarks</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.type}</TableCell>
                <TableCell>{payment.refId}</TableCell>
                <TableCell>{payment.amount}</TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.remarks}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(payment)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(payment.id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editPayment ? 'Edit Payment' : 'Add Payment'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Type (customer/supplier)"
            name="type"
            value={form.type}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Ref ID"
            name="refId"
            value={form.refId}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Amount"
            name="amount"
            type="number"
            value={form.amount}
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
            label="Remarks"
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editPayment ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Payments; 