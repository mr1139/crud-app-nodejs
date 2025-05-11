// const { MongoClient } = require("mongodb");

// const uri = "mongodb://localhost:27017/"; // MongoDB connection string
// const client = new MongoClient(uri); // Create a new MongoClient instance

// const main = async () => {
//   try {
//     await client.connect(); // Connect to MongoDB
//     const db = client.db("students"); // Select "students" database
//     const collection = db.collection("users"); // Select "users" collection

//     console.log("✅ Connected successfully to MongoDB");

// await collection.insertOne({ _id: "user001", name: "mary kom", age: 35 });
// const data1 = await collection
//   .aggregate([
//     { $match: { name: "mary kom" } },
//     { $project: { name: 1, age: 1 } },
//   ])
//   .toArray();
// console.log(data1);

//     const result = await collection.find({}).toArray();
//     console.log("📦 Fetched Documents:", result);
//   } catch (error) {
//     console.error("❌ Connection failed:", error.message);
//   } finally {
//     await client.close(); // Cleanly close the MongoDB connection
//     console.log("🔌 Connection closed");
//   }
// };

// main();

const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/students")
  .then(() => {
    console.log("✅ Connected successfully to MongoDB");
  })
  .catch((error) => {
    console.error("❌ Connection failed:", error);
  });

app.use("/app", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
