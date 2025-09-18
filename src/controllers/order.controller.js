import { createOrder, getOrders, updateOrderStatus } from "../services/order.service.js";

export const createOrderController = async (req, res) => {
  try {
    const { productId, productName, userEmail, userMessage } = req.body;
    if (!productId || !productName || !userEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const order = await createOrder({ productId, productName, userEmail, userMessage });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOrdersController = async (req, res) => {
  try {
    const data = await getOrders();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!["new", "done", "reject"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const updated = await updateOrderStatus(id, status);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
