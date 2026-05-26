const express = require("express");
const router = express.Router();
const BulkOrder = require("../models/BulkOrder");

// CREATE BULK ORDER
router.post("/create", async (req, res) => {
  try {
    console.log("📦 Bulk Order Request:", req.body);

    const newOrder = new BulkOrder(req.body);
    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Bulk Order Created Successfully 📦",
      order: savedOrder
    });

  } catch (error) {
    console.log("❌ Error:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
});

// GET ALL ORDERS (optional test)
router.get("/", async (req, res) => {
  try {
    const orders = await BulkOrder.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;