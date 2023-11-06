const categoryModel = require("../models/categoryModel");
const slug = require("slugify");

//create new category
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      res.status(401).json({
        msg: "name is required",
        success: false,
      });
    } else {
      const isExist = await categoryModel.findOne({ name });
      if (isExist) {
        return res.send("Already exist");
      }
      const newCategory = new categoryModel({
        name: name,
        slug: slug(name),
      });
      await newCategory.save();
      return res.status(201).json({
        success: true,
        msg: "new category created",
        newCategory,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      msg: "Error in Category",
    });
  }
};

//updating category
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send("name is required");
    }
    const update = await categoryModel.findByIdAndUpdate(
      req.params.id,
      { name, slug: slug(name) },
      { new: true }
    );
    res.status(201).json({
      success: true,
      msg: "updatetion done",
      update,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error while updating",
      error,
    });
  }
};

//get all categories
const getCategoryController = async (req, res) => {
  try {
    const allCategories = await categoryModel.find({});
    return res.send({
      success: true,
      msg: "get all category list",
      allCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error while geting categories",
      error,
    });
  }
};

//get single category
const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({
      slug: req.params.slug,
    });
    return res.send({
      success: true,
      msg: "get single category",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error while geting categories",
      error,
    });
  }
};

//delete category
const deleteCategoryController = async (req, res) => {
  try {
    await categoryModel.findOneAndDelete({
      _id: req.params.id,
    });
    return res.send({
      success: true,
      msg: "deletion done",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "error while deleting categery",
      error,
    });
  }
};

module.exports = {
  createCategoryController,
  updateCategoryController,
  getCategoryController,
  singleCategoryController,
  deleteCategoryController,
};
