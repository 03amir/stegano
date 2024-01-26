const { json } = require("express");
const Product = require("../models/productModel");

exports.addProduct = async (req, res) => {

  const {
    title,
    brand,
    price,
    productImage,
    condition,
    author,
    tag,
    description,
  } = req.body;

  // console.log(req.user);

  try {

    const newProduct = new Product({
      title,
      condition,
      author,
      price,
      productImage,
      description,
      tag,
      brand,
      listedBy: req.user[0]._id,
    });

    const addeProduct = await (
      await newProduct.save()
    ).populate("listedBy", "_id mobile name email");

    res.status(200).json({
      succes: true,
      data: addeProduct,
    });
  }
   catch (err) {
    res.send(err);
  }
};


exports.getAllProducts = async (req, res, next) => {
  try {
    //filtering in basis of the query
    const queries = { ...req.query };

    const search = req.query.search || "";

    let tag = req.query.category;

    const removableFeilds = ["sort", "search", "limit","category"];

    removableFeilds.forEach((val) => {
      delete queries[val];
    });

    let queryString = JSON.stringify(queries);

    // replacing all the feilds as mongoos accepts
    queryString = queryString.replace(/gt|gte|lt|lte|in/gi, function (x) {
      return `$${x}`;
    });

    let jsonstring = JSON.parse(queryString);
   
    let queryProducts;

    if (tag === "all") {
      queryProducts = Product.find({$and:[{title: { $regex: search, $options: "i" }},jsonstring]});
    } else {
      queryProducts = Product.find({$and:[{title: { $regex: search, $options: "i" }},jsonstring,{tag:tag}]});
    }

    // sorting;
    if (req.query.sort) {
      const sortArray = req.query.sort.split(",");
      const sortString = sortArray.join(" ");
      queryProducts = queryProducts.sort(sortString);
    }

    const allProducts = await queryProducts;

    let total;

    if (tag === "all") {
      total = await  Product.countDocuments({$and:[{title: { $regex: search, $options: "i" }},jsonstring]})

    } else {
      total = await Product.countDocuments({$and:[{title: { $regex: search, $options: "i" }},jsonstring,{tag:tag}]})
    }

    res.status(200).json({
      success: true,
      total,
      data: allProducts,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.getCategoryProduct = async (req, res) => {
  try {
    
    const category = req.params.category;

    const categoryProducts = await Product.find({ tag: category });

    res.status(200).json({
      succes: true,
      data: categoryProducts,
    });
  } catch (err) {
    res.send(err.name);
  }
};

exports.getProductDetails = async (req, res) => {
  try {

    const id = req.params.id;

    const productDetails = await Product.find({ _id: id }).populate(
      "listedBy",
      "name email mobile"
    );

    res.status(200).json({
      succes: true,
      data: productDetails,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.deleteAll = async (req, res) => {
  try {
    const deleted = await Product.deleteMany({});
    res.send("all deleted");
  } catch (err) {
    res.send(err);
  }
};

exports.getUserProducts = async (req,res)=>{
  const products = await Product.find({ listedBy: req.user[0]._id });
  res.json(products);
}

exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
   
    const deletedProduct = await Product.findOneAndRemove({ _id: productId });

    if (deletedProduct) {
      return res.status(200).json({ 
         name:deletedProduct.title
        ,message: 'Product deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};



