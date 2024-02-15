const express = require("express");
const verify = require("../middlewares/verify");

const { getAllProducts , getCategoryProduct , getProductDetails, addProduct, deleteAll, getUserProducts , deleteProduct} = require("../controllers/productController");

const router = express.Router();

router.route("/allproducts").get(getAllProducts).post(verify , addProduct);

router.route("/products/:category").get(getCategoryProduct);

router.route("/product/:id").get(verify, getProductDetails);

router.route("/userProducts").get(verify,getUserProducts);

router.route("/deleteProduct/:productId").delete(verify,deleteProduct);

router.route("/deleteall").get(deleteAll);


module.exports = router;