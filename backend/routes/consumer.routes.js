const express = require("express");
const router = express.Router();
const Consumer = require("../models/Consumer");

// REGISTER CONSUMER
router.post("/register", async (req, res) => {
  try {

    // 🔥 DEBUG LOGS (ADD HERE)
    console.log("HEADERS:", req.headers["content-type"]);
    console.log("BODY:", req.body);

    const { name, phone, address, taluk, district } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({
        message: "Name and Phone are required"
      });
    }

    const newConsumer = new Consumer({
      name,
      phone,
      address,
      taluk,
      district
    });

    const saved = await newConsumer.save();

    res.status(201).json({
      message: "Consumer Registered Successfully",
      consumer: saved
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
});

module.exports = router;