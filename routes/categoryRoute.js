const express = require("express");
const { isAdmin, signinRequired } = require("../middlewares/authMiddle");
const {
  createCategoryController,
  updateCategoryController,
  singleCategoryController,
  getCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//create new category
router.post(
  "/create-category",
  signinRequired,
  isAdmin,
  createCategoryController
);

//updating category
router.put(
  "/update-category/:id",
  signinRequired,
  isAdmin,
  updateCategoryController
);

//get all categories
router.get("/get-categories", getCategoryController);

//get single category
router.get("/single-category/:slug", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  signinRequired,
  isAdmin,
  deleteCategoryController
);

module.exports = router;
