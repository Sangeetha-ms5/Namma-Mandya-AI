const express = require("express");
const router = express.Router();
const Farmer = require("../models/Farmer");

// REGISTER FARMER
router.post("/register", async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();

    res.json({
      message: "Farmer Registered Successfully",
      farmer
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;