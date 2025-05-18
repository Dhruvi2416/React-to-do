const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); //whatever post method will send server will accept it for ex., name,email etc.
const app = express();
require("dotenv").config();
require("./Models/db");
const AuthRouter = require("./Routes/AuthRouter");
const ProductRouter = require("./Routes/ProductRouter");
const TodoRouter = require("./Routes/TodoRouter");
// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Define routes
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/auth", AuthRouter);
// app.use("/api", ProductRouter);
app.use("/todos", TodoRouter);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
