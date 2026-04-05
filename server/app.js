const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const port = 5000;

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// api
app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "서버 연결 확인" });
});

// routes 연결
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
