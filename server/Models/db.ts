// const mongoose = require("mongoose");
// const TodoModel = require("../Models/Todo");
import mongoose from "mongoose";
import TodoModel from "../Models/Todo";
import dotenv from "dotenv";
dotenv.config();
// Connect to MongoDB
const mongoConn = process.env.MONGO_CONN;
if (!mongoConn) {
  throw new Error("MONGO_CONN environment variable is not defined");
}

mongoose
  .connect(mongoConn)
  .then(async () => {
    console.log("Mongo DB is connected");

    // Ensure compound index is created
    await TodoModel.collection.createIndex(
      { task: 1, user: 1 },
      { unique: true }
    );
    console.log("Compound index { task, user } created");
  })
  .catch((err) => console.error("MongoDB connection error:", err));
