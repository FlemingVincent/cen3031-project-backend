const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// Static Signup Method
userSchema.statics.signup = async function (
  email,
  password,
  firstname,
  lastname
) {
  // Validation
  if (!email || !password || !firstname || !lastname) {
    throw Error("All fields are required.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid.");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("This email is already in use.");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    firstname,
    lastname,
  });

  return user;
};

// Static Login Method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("The email entered is not correct.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("The password entered is not correct.");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
