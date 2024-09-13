import React, { useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ProductForm from "../../components/ProductForm";

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: 1, productName: "Jacket", productDescription: "Winter Jacket", price: 100, stock: 10, category: "Clothing", sku: "JK101" },
    { id: 2, productName: "Shoes", productDescription: "Running Shoes", price: 80, stock: 50, category: "Footwear", sku: "SH201" },
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [open, setOpen] = useState(false); // For modal open/close state

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleFormSubmit = (product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      setProducts([...products, { ...product, id: products.length + 1 }]);
    }
    setEditingProduct(null);
    setOpen(false); // Close the modal after submission
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setOpen(true); // Open modal for editing
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setOpen(true); // Open modal for creating
  };

  return (
    <Box m="20px">
      <h1>Product List</h1>
      <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginBottom: "20px" }}>
        Create New Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productDescription}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(product)}
                    color="primary"
                    variant="contained"
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    color="secondary"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Create and Edit Product */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingProduct ? "Edit Product" : "Create New Product"}</DialogTitle>
        <DialogContent>
          <ProductForm initialValues={editingProduct || initialFormValues} onSubmit={handleFormSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const initialFormValues = {
  productName: "",
  productDescription: "",
  price: "",
  stock: "",
  category: "",
  sku: "",
};

export default ProductList;
