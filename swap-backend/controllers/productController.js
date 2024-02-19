
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

exports.getCategoryProduct = async (req, res) => {
  try {
    
    const category = req.params.category;
    let categoryProducts;

    if (category === "all") {
      categoryProducts = await Product.find({});
    } else {
      categoryProducts = await Product.find({ tag: category });
    }

    res.status(200).json({
      success: true,
      data: categoryProducts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.name,
    });
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


exports.getUserProducts = async (req,res)=>{
  const products = await Product.find({ listedBy: req.user[0]._id });
  res.json(products);
}


exports.deleteProduct = async (req, res) => {

  const productId = req.params.productId;

  try {

    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (deletedProduct) {
      return res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
