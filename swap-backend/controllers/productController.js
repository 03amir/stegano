const Product = require("../models/productModel");
const multer = require("multer");
const {getImagesofProduct , uploadtos3, deleteFromS3} = require("../utils/gets3images");
const {getRandomFileName} = require("../utils/helper");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

exports.uploadProductImage = upload.single('file');

exports.addProduct = async (req, res) => {

  try {

    const {
      title,
      brand,
      price,
      condition,
      author,
      tag,
      description,
    } = req.body;

    const imageName = getRandomFileName();

    await uploadtos3(req.file.buffer,imageName);

    const newProduct = new Product({
      title,
      condition,
      author,
      price,
      productImage:imageName,
      description,
      tag,
      brand,
      listedBy: req.user._id,
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

    await getImagesofProduct([...categoryProducts]);

    res.status(200).json({
      success: true,
      data: categoryProducts,
    });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      error: err.name,
    });
  }
};



exports.getProductDetails = async (req, res) => {
  try {
   
    const productId = req.params.id;

    const productDetails = await Product.findById(productId).populate(
      'listedBy',
      'name email mobile'
    );

    await getImagesofProduct([productDetails]);

    res.status(200).json({
      success: true,
      data: productDetails,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message || error.name,
    });
  }
};


exports.getUserProducts = async (req, res) => {
  try {
    
    const userId = req.user._id;
    const products = await Product.find({ listedBy: userId });

    await getImagesofProduct([...products]);

    res.json({
      success: true,
      data: products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.name,
    });

  }
};



exports.deleteProduct = async (req, res) => {

    const productId = req.params.productId;

    try {

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      const imageKey = product.productImage;

      await deleteFromS3(imageKey)

      const deletedProduct = await Product.findByIdAndDelete(productId);

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

exports.updateProduct = async (req, res) => {

  const { id } = req.params;

  const { title, tag, description, price, condition, author, brand } = req.body;

  try {
   
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.listedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Permission denied. You are not the owner of this product.' });
    }

    product.title = title || product.title;
    product.tag = tag || product.tag;
    product.description = description || product.description;
    product.price = price || product.price;
    product.condition = condition || product.condition;
    product.author = author || product.author;
    product.brand = brand || product.brand;

    const updatedProduct = await product.save();

    res.status(200).json({ success: true, data: updatedProduct });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

};


