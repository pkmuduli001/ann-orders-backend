import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION || "us-east-1"
});

const TABLE_NAME = process.env.DYNAMODB_TABLE || "Orders";

// Create Order
export const createOrder = async ({ productId, productName, userEmail, userMessage }) => {
  const order = {
    order_id: uuidv4(),
    productId,
    productName,
    userEmail,
    userMessage: userMessage || "",
    status: "new",
    createdAt: new Date().toISOString()
  };

  await dynamoDB.put({
    TableName: TABLE_NAME,
    Item: order
  }).promise();

  return order;
};

// Get all orders
export const getOrders = async () => {
  const data = await dynamoDB.scan({
    TableName: TABLE_NAME
  }).promise();
  return data.Items;
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  const params = {
    TableName: TABLE_NAME,
    Key: { order_id: orderId },
    UpdateExpression: "set #st = :s",
    ExpressionAttributeNames: { "#st": "status" },
    ExpressionAttributeValues: { ":s": status },
    ReturnValues: "ALL_NEW"
  };

  const result = await dynamoDB.update(params).promise();
  return result.Attributes;
};
