 require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
var cors = require('cors');


connectDB();
app.use(cors());
app.use(express.json());



app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) =>{
  console.log("Yihaa")
  res.send("hellloo")
});

const server = app.listen(PORT, () =>
  console.log("Sever running on port: " + PORT)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});