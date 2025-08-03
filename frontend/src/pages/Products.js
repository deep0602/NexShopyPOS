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

function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({id: '', name: '', price: '', stockQty: '', unit: '' ,commission: ''});
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpen = (product = null) => {
    setEditProduct(product);
    setForm(product ? { ...product } : { id: '', name: '', price: '', stockQty: '', unit: '' ,commission: ''});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditProduct(null);
    setForm({ id: '', name: '', price: '', stockQty: '', unit: '' ,commission: ''});
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editProduct) {
      await api.put('/products', { ...form, id: editProduct.id });
    } else {
      await api.post('/products', form);
    }
    fetchProducts();
    handleClose();
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  const filteredProducts = products.filter(p => String(p.id).includes(search));

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Products</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add Product
        </Button>
      </Box>
      <TextField
        label="Search by Product ID"
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
              <TableCell>Price</TableCell>
              <TableCell>Stock Qty</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stockQty}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.commission}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(product)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(product.id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="ID"
            name="id"
            value={form.id}
            onChange={handleChange}
            fullWidth
          />
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
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Stock Qty"
            name="stockQty"
            type="number"
            value={form.stockQty}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Unit"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Commission"
            name="commission"
            type="number"
            value={form.commission}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editProduct ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Products; 