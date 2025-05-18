const mongoose = require("mongoose");
const TodoModel = require("../Models/Todo");
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_CONN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
