import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

const ProductForm = ({ initialValues, onSubmit }) => {
  const productSchema = yup.object().shape({
    productName: yup.string().required("Product name is required"),
    productDescription: yup.string().required("Product description is required"),
    price: yup.number().positive("Price must be positive").required("Price is required"),
    stock: yup.number().integer("Stock must be a whole number").positive("Stock must be positive").required("Stock is required"),
    category: yup.string().required("Category is required"),
    sku: yup.string().required("SKU is required"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm(); // Reset form after submission
      }}
      validationSchema={productSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(2, 1fr)" // Make the form smaller
          >
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Product Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.productName}
              name="productName"
              error={!!touched.productName && !!errors.productName}
              helperText={touched.productName && errors.productName}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Product Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.productDescription}
              name="productDescription"
              error={!!touched.productDescription && !!errors.productDescription}
              helperText={touched.productDescription && errors.productDescription}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Price"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.price}
              name="price"
              error={!!touched.price && !!errors.price}
              helperText={touched.price && errors.price}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              label="Stock"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.stock}
              name="stock"
              error={!!touched.stock && !!errors.stock}
              helperText={touched.stock && errors.stock}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="Category"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.category}
              name="category"
              error={!!touched.category && !!errors.category}
              helperText={touched.category && errors.category}
            />
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              label="SKU"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.sku}
              name="sku"
              error={!!touched.sku && !!errors.sku}
              helperText={touched.sku && errors.sku}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
              {values.id ? "Update Product" : "Create Product"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ProductForm;
