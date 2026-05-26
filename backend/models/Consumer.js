const mongoose = require("mongoose");

const ConsumerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    taluk: {
      type: String,
      required: true
    },
    district: {
      type: String,
      default: "Mandya"
    }
  },
  { timestamps: true }
);

// This creates "consumers" collection automatically
module.exports = mongoose.model("Consumer", ConsumerSchema);