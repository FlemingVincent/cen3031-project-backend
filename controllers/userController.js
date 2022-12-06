const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  try {
    const user = await User.signup(email, password, firstname, lastname);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account successfully updated");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json("You do not have permission to update.");
  }
};

// delete user
const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account successfully deleted.");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json("You do not have permission to delete.");
  }
};

// get user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// follow/unfollow user
const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res
          .status(200)
          .json(
            `You are now following ${user.firstname + " " + user.lastname}.`
          );
      } else {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res
          .status(200)
          .json(
            `You are no longer following ${
              user.firstname + " " + user.lastname
            }.`
          );
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json("Error: Please try again.");
  }
};

// fetch all users with the correct attributes
const fetchAllUser = async (req, res) => {
    try {
      const users = await User.find({}).select(
        "firstname lastname profilepicture role company"
      );
      
      res.status(200).json(users);
      
    } catch (error) {
      res.status(400).json({ error: error.message});
    }
};

module.exports = {
  signupUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  followUser,
  fetchAllUser,
};
