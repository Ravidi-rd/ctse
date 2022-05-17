const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      trim: true,
    },
    product_name: {
      type: String,
      trim: true,
    },
    
    product_in_date: {
      type: String,
      trim: true,
    },
    product_out_date: {
      type: String,
      trim: true,
    },
    product_price: {
      type: String,
      trim: true,
    },
    product_quantity: {
      type: String,
      trim: true,
    },
   
    product_image: {
      type: String,
      trim: true,
      default:
        "https://images.unsplash.com/photo-1610271340738-726e199f0258?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
