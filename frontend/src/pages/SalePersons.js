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
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';

function SalePersons() {
  const [salePersons, setSalePersons] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', commission: '' });
  const [search, setSearch] = useState('');

  const fetchSalePersons = async () => {
    const res = await api.get('/sale_persons');
    setSalePersons(res.data);
  };

  useEffect(() => {
    fetchSalePersons();
  }, []);

  const handleOpen = () => {
    setForm({ name: '', commission: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({ name: '', commission: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await api.post('/sale_persons', {
      ...form,
      commission: parseFloat(form.commission),
    });
    fetchSalePersons();
    handleClose();
  };

  const handleDelete = async (id) => {
    await api.delete(`/sale_persons/${id}`);
    fetchSalePersons();
  };

  const filteredSalePersons = salePersons.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Sale Persons</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Sale Person
        </Button>
      </Box>
      <TextField
        label="Search by Name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSalePersons.map((salePerson) => (
              <TableRow key={salePerson.id}>
                <TableCell>{salePerson.name}</TableCell>
                <TableCell>{salePerson.commission}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDelete(salePerson.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Sale Person</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Commission"
            name="commission"
            type="number"
            inputProps={{ step: '0.01', min: 0 }}
            value={form.commission}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default SalePersons;
