import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete from '@mui/material/Autocomplete';
import api from '../services/api';

function InvoiceCreate() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [salePersons, setSalePersons] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [salePersonId, setSalePersonId] = useState('');
  const [items, setItems] = useState([{ productId: '', quantity: 1, discount: 0 }]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalDiscount, setTotalDiscount] = useState(0);
  
  useEffect(() => {
    async function fetchData() {
      const [custRes, prodRes, salePersonRes] = await Promise.all([
        api.get('/customers'),
        api.get('/products'),
        api.get('/sale_persons'),
      ]);
      setCustomers(custRes.data);
      setProducts(prodRes.data);
      setSalePersons(salePersonRes.data);
    }
    fetchData();
  }, []);

  const handleItemChange = (idx, field, value) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: value } : item));
  };

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1, discount: 0 }]);
  };

  const handleRemoveItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };
  const handleSalePersonChange = (e) => {
    setSalePersonId(e.target.value);
  };
  const handleTotalDiscount = (e) => {
    setTotalDiscount(Number(e.target.value));

  };

  const subtotal = items.reduce((sum, item) => {
    const product = products.find(p => p.id === String(item.productId));
    if (!product) return sum;
    return sum + (product.price * item.quantity);
  }, 0);
  
  const total = subtotal-totalDiscount;
  
  const handleSave = async () => {
    setSaving(true);
    const formattedDate = new Date().toLocaleDateString('en-GB', { timeZone: 'Asia/Kolkata' });
    console.log("Invoice Date (IST):", formattedDate);
    // Generate invoice number (could be improved)
    const invoiceNumber = 'INV-' + Date.now();
    const invoiceRes = await api.post('/invoices', {
      invoiceNumber,
      customerId,
      date:formattedDate,
      total,
      discount: totalDiscount,
      paid: total,
      due: 0,
      salePersonId:salePersonId,
    });
    const invoiceId = invoiceRes.data.id;
    // Save invoice items
    for (const item of items) {
      await api.post('/invoice_items', {
        invoiceId: invoiceId,
        productId: item.productId,
        quantity: item.quantity,
        price: products.find(p => p.id === String(item.productId))?.price || 0,
        discount: 0,
        salePersonId:salePersonId,
      });

    }
     // Calculate total commission for salesperson
     let totalCommission = 0;
     for (const item of items) {
       const product = products.find(p => p.id === String(item.productId));
       if (product && product.commission) {
         totalCommission += item.quantity * product.commission;
       }
     }
       // Update salesperson's commission
    const currentSalePerson = salePersons.find(s => s.id === Number(salePersonId));
    await api.put('/sale_persons/${salePersonId}', {
      id: currentSalePerson.id,
      name: currentSalePerson.name,
      commission: (currentSalePerson.commission || 0) + totalCommission,
    });
 
    setSaving(false);
    setSuccess(true);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Create Invoice</Typography>
      <Autocomplete
        options={customers}
        getOptionLabel={option => option.name || ''}
        value={customers.find(c => c.id === Number(customerId)) || null}
        onChange={(_, newValue) => setCustomerId(newValue ? newValue.id : '')}
        renderInput={params => (
          <TextField {...params} label="Customer" fullWidth margin="normal" />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <Autocomplete
        options={salePersons}
        getOptionLabel={option => option.name || ''}
        value={salePersons.find(s => s.id === Number(salePersonId)) || null}
        onChange={(_, newValue) => setSalePersonId(newValue ? newValue.id : '')}
        renderInput={params => (
          <TextField {...params} label="Sale Person" fullWidth margin="normal" />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
      />
      <TextField
        label="Total Discount"
        type="number"
        value={totalDiscount}
        onChange={handleTotalDiscount}
        sx={{ width: 200 }}
      />
      <Typography variant="h6" mt={2}>Items</Typography>
      {items.map((item, idx) => (
        <Box key={idx} display="flex" alignItems="center" gap={2} mb={1}>
          <Autocomplete
            options={products}
            getOptionLabel={option => option.id ? String(option.id) : ''}
            value={products.find(p => p.id === String(item.productId)) || null}
            onChange={(_, newValue) => handleItemChange(idx, 'productId', newValue ? String(newValue.id) : '')}
            renderInput={params => (
              <TextField {...params} label="Product ID" sx={{ minWidth: 180 }} />
            )}
            isOptionEqualToValue={(option, value) => {
              if (!option || !value) return false;
              return String(option.id) === String(value.productId || value.id);
            }}
          />
          <TextField
            label="Qty"
            type="number"
            value={item.quantity}
            onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
            sx={{ width: 80 }}
          />
          <IconButton onClick={() => handleRemoveItem(idx)} disabled={items.length === 1}><DeleteIcon /></IconButton>
        </Box>
      ))}
      <Button startIcon={<AddIcon />} onClick={handleAddItem} sx={{ mb: 2 }}>Add Item</Button>
      <Box mb={2}>
        <Typography>Subtotal: ₹{subtotal.toFixed(2)}</Typography>
        <Typography>Total Discount: ₹{totalDiscount.toFixed(2)}</Typography>
        <Typography variant="h6">Total: ₹{total.toFixed(2)}</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={handleSave} disabled={saving || !customerId || items.some(i => !i.productId)}>
        Save Invoice
      </Button>
      {success && <Typography color="success.main" mt={2}>Invoice created successfully!</Typography>}
    </Box>
  );
}

export default InvoiceCreate; 