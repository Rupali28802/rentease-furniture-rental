import { api } from "../api/axios";

// Get all orders for the logged-in user
export const getMyOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

// Place a new order (cart checkout or rentNow checkout)
export const placeOrder = async (payload) => {
  const res = await api.post("/orders", payload);
  return res.data;
};

// Get a single order by id
export const getOrderById = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};

// Cancel an order
export const cancelOrder = async (id) => {
  const res = await api.put(`/orders/${id}/cancel`);
  return res.data;
};
