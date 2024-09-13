import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { CheckCircle, LocalShipping, Pending } from "@mui/icons-material";

const OrderPage = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "John Doe",
      orderDate: "2023-09-01",
      status: "Processing",
      shippingState: "Not Shipped",
    },
    {
      id: 2,
      customer: "Jane Smith",
      orderDate: "2023-09-02",
      status: "Shipped",
      shippingState: "Out for Delivery",
    },
    {
      id: 3,
      customer: "Mark Taylor",
      orderDate: "2023-09-05",
      status: "Delivered",
      shippingState: "Delivered",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <Box m={4}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Order Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Shipping State</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <MenuItem value="Processing">Processing</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Delivered">Delivered</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>{order.shippingState}</TableCell>
                <TableCell>
                  {order.status === "Delivered" ? (
                    <CheckCircle color="success" />
                  ) : order.status === "Shipped" ? (
                    <LocalShipping color="primary" />
                  ) : (
                    <Pending color="warning" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderPage;
