const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  name: String,
  icon: String,
  apmcPrice: Number,
  editablePrice: Number,
  quantity: Number,
  customIcon: String
});

module.exports = mongoose.model("Crop", CropSchema);