// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const connectDB = require("./config/db"); // ✅ Import MongoDB Connection
// const personRoutes = require("./routes/personRoutes");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// // ✅ Connect to MongoDB Before Starting the Server
// connectDB();

// app.use("/api/person", personRoutes);

// app.listen(5000, () => console.log("✅ Server running on port 5000"));


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({
  origin: "http://localhost:4200", // ✅ Allow Angular Frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/peopleDB")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Import Routes
const personRoutes = require("./routes/personRoutes");
app.use("/api/person", personRoutes);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
