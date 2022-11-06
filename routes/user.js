const express = require("express");

// controller functions
const {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  followUser,
} = require("../controllers/userController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// update user route
router.put("/:id", updateUser);

// delete user route
router.delete("/:id", deleteUser);

// get user route
router.get("/:id", getUser);

// follow/unfollow user route
router.put("/:id/follow", followUser);

module.exports = router;
