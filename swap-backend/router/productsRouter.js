const express = require("express");
const verify = require("../middlewares/verify");

const { getCategoryProduct, getProductDetails, addProduct,  updateProduct, getUserProducts , deleteProduct, } = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/productController");

const router = express.Router();

router.route("/addProduct").post(verify, uploadProductImage, addProduct);

router.route("/products/:category").get(getCategoryProduct);

router.route("/product/:id").get(verify, getProductDetails);

router.route("/userProducts").get(verify,getUserProducts);

router.route("/deleteProduct/:productId").delete(verify,deleteProduct);

router.route("/updateProduct/:id").put(verify,updateProduct);


module.exports = router;