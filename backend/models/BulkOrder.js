const mongoose = require("mongoose");

const CropRequirementSchema = new mongoose.Schema({
  crop: String,
  quantity: Number
});

const BulkOrderSchema = new mongoose.Schema(
  {
    organizationType: String,
    organizationName: String,
    address: String,
    taluk: String,
    district: {
      type: String,
      default: "Mandya"
    },
    deliveryDate: String,

    cropRequirements: [CropRequirementSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("BulkOrder", BulkOrderSchema);