import express from "express";
import bodyParser from "body-parser";
import orderRoutes from "./routes/order.routes.js";

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/orders", orderRoutes);

export default app;
