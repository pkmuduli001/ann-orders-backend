import express from "express";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

// DynamoDB client
const client = new DynamoDBClient({ region: process.env.AWS_REGION || "ap-south-1" });
const ddb = DynamoDBDocumentClient.from(client);

// POST /orders → create order
app.post("/orders", async (req, res) => {
  try {
    const { userEmail, productId, quantity, price } = req.body;

    const order = {
      orderId: uuidv4(),
      userEmail,
      productId,
      quantity,
      price,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    await ddb.send(
      new PutCommand({
        TableName: process.env.ORDERS_TABLE,
        Item: order,
      })
    );

    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Health check
app.get("/", (req, res) => res.send("Orders Service Running ✅"));

// Run server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
