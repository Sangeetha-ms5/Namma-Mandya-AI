const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/agriculture")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// ================= ROUTES =================

// Farmer Routes
const farmerRoutes = require("./routes/farmerRoutes");
app.use("/api/farmers", farmerRoutes);

// Crop Routes
const cropRoutes = require("./routes/cropRoutes");
app.use("/api/crops", cropRoutes);

// ✅ Consumer Routes (ADD THIS)
const consumerRoutes = require("./routes/consumer.routes");
app.use("/api/consumers", consumerRoutes);

const bulkOrderRoutes = require("./routes/bulkOrder.routes");
app.use("/api/bulk-orders", bulkOrderRoutes);


// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("🌾 Namma Mandya AI Backend Running");
});

// ================= SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});