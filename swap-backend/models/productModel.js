const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;

const productShema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tag:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productImage: {
    type: String,
  },
  condition: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
  },
  brand: {
    type: String,
  },
  listedBy:{
    type:ObjectId,
        ref:"User",

  }
});

const Product = mongoose.model("Product",productShema);
module.exports = Product;
