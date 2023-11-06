const express = require("express");
const formidable = require("express-formidable");

const { signinRequired, isAdmin } = require("../middlewares/authMiddle");
const {
  createProductController,
  getProductController,
  singleProductController,
  getPhotoController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  getSimilarProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePatmentController,
} = require("../controllers/productController");

const router = express.Router();

//create product
router.post(
  "/create-product",
  signinRequired,
  isAdmin,
  formidable(),
  createProductController
);

//get All product
router.get("/get-product", getProductController);

//get single product
router.get("/single-product/:slug", singleProductController);

//get photo
router.get("/product-photo/:id", getPhotoController);

//update product
router.put(
  "/update-product/:id",
  signinRequired,
  isAdmin,
  formidable(),
  updateProductController
);

//delete product
router.delete(
  "/delete-product/:id",
  signinRequired,
  isAdmin,
  deleteProductController
);

//get filter product
router.post("/product-filter", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page - load more feature
router.get("/product-list/:page", productListController);

//search product - filters
router.get("/search/:keyword", searchProductController);

//suggetion of similar product
router.get("/similar-product/:pid/:cid", getSimilarProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

//get token via braintree
router.get("/braintree/token", braintreeTokenController);

//for payment
router.post("/braintree/payment", signinRequired, braintreePatmentController);

module.exports = router;
