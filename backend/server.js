const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/peopleDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
