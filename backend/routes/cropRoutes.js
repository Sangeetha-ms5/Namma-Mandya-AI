const express = require("express");
const router = express.Router();
const Crop = require("../models/Crop");

// Add crop
router.post("/add", async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.json({ message: "Crop saved", crop });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all crops
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;