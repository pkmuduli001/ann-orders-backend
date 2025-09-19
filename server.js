import express from "express";
import bodyParser from "body-parser";
import orderRoutes from "./src/routes/order.routes.js";

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`✅ Order Service running on port ${PORT}`));
