import express from "express";
import {
  createOrderController,
  getOrdersController,
  updateOrderStatusController
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrderController);
router.get("/", getOrdersController);
router.put("/:id", updateOrderStatusController);

export default router;
