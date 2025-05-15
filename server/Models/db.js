const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONN)
  .then(() => console.log("Mongo Db is connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
