const mongoose = require("mongoose");

const serveSchema = new mongoose.Schema({
  title: { type: String, required: true },
  serveTags: { type: Array, required: true },
  category: { type: String, required: true },
  serveType: { type: Array, required: true },
  code: { type: String, required: true },
  isAvailable: { type: Boolean, required: true, default: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "shop" },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  ratingCount: { type: String },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  additives: { type: Array, required: true },
  imageUrl: { type: Array, required: true },
});

module.exports = mongoose.model("serve", serveSchema);
