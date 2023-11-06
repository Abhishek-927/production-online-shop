const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    type: Boolean,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("Product", productSchema);
