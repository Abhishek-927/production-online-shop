const express = require("express");
const { body } = require("express-validator");

const {
  signUp,
  login,
  updateProfileController,
  getOrderController,
  getAllOrderController,
  orderStatusController,
  getAllUserController,
} = require("../controllers/authController");
const { signinRequired, isAdmin } = require("../middlewares/authMiddle");

const router = express.Router();

// ROUTING

//User Routes

// 1. creating new user -  signup
router.post(
  "/createuser",
  [
    body("name", "Name is required and At least 3 character").isLength({
      min: 3,
    }),
    body("email", "Email is required and must be valid").isEmail(),
    body("phone", "Phone number is required and must be valid").isLength({
      min: 10,
      max: 10,
    }),
    body("password", "Password is required and At least 6 character").isLength({
      min: 6,
    }),
    body("address", "Address is required").isLength({ min: 3 }),
  ],
  signUp
);

// 2. login user
router.post(
  "/login",
  [
    body("email", "Email is required and must be valid").isEmail(),
    body("password", "Password is required and At least 6 character").isLength({
      min: 6,
    }),
  ],
  login
);

// 3. protected route for user
router.get("/user-auth", signinRequired, (req, res) => {
  res.status(200).json({ ok: true });
});

// 4. protected route for admin
router.get("/admin-auth", signinRequired, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

// 5. update profiles
router.put("/profile-update", signinRequired, updateProfileController);

// 6. get all users
router.get("/all-users", signinRequired, isAdmin, getAllUserController);

//Orders Routes

//get single order
router.get("/orders/:id", signinRequired, getOrderController);

//get all orders
router.get("/all-orders", signinRequired, isAdmin, getAllOrderController);

//order update status
router.put(
  "/order-status/:orderId",
  signinRequired,
  isAdmin,
  orderStatusController
);

module.exports = router;
