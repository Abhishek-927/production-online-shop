const { validationResult } = require("express-validator");
const User = require("../models/User");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../helper/authHelper");
const orderModel = require("../models/orderModel");

const signUp = async (req, res) => {
  try {
    //check all validation of request or user details
    const result = validationResult(req);
    if (result.isEmpty()) {
      const { name, email, address, phone, password } = req.body;
      //check user
      const isExist = await User.findOne({ email });
      if (isExist && isExist.length !== 0) {
        return res.json({
          success: false,
          msg: "Already Have an account Please login",
        });
      }
      const hashedPassword = await hashPassword(password);
      // storing user
      const newUser = await User.create({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
      });
      const token = generateToken({ email });
      newUser.save(); //save in database
      return res.status(201).json({
        success: true,
        msg: "signup success",
        user: {
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          address: newUser.address,
          role: newUser.role,
          _id: newUser._id,
        },
        token,
      });
    } else {
      res.status(500).json({
        success: false,
        message: result,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const login = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(422).json({
          success: false,
          msg: "Invalid email or password",
        });
      }
      const isValidPassword = await comparePassword(password, user.password);
      if (!isValidPassword) {
        return res.status(422).json({
          success: false,
          msg: "Invalid email or password",
        });
      }
      const token = generateToken({ email });
      res.json({
        success: true,
        msg: "login success",
        token,
        user: {
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
          _id: user._id,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        msg: "Internal server error while login",
        error: error,
      });
    }
  } else {
    res.status(404).json({
      success: false,
      err: result,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const user = await User.findOne({ email: req.user.email });
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );

    res.json({
      success: true,
      msg: "update success",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error while updating",
      error: error,
    });
  }
};

const getOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await orderModel
      .find({ buyer: id })
      .populate("products", "-photo")
      .populate("buyer", "email")
      .sort({ date: "-1" });

    res.json({
      success: true,
      msg: "order get done",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error while getting orders",
      error: error,
    });
  }
};

const getAllOrderController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "email")
      .sort({ date: "-1" });

    res.json({
      success: true,
      msg: "get all orders done",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error while getting orders",
      error: error,
    });
  }
};

const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      msg: "get all orders done",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error while updating orders status",
      error: error,
    });
  }
};

const getAllUserController = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      msg: "get all users success",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Internal server error while get all users",
      error: error,
    });
  }
};

module.exports = {
  signUp,
  login,
  updateProfileController,
  getAllUserController,
  getAllOrderController,
  getOrderController,
  orderStatusController,
};
