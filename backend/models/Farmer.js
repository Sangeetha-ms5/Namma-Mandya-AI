const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  taluk: String,
  district: String,
  photo: String
});

module.exports = mongoose.model("Farmer", FarmerSchema);