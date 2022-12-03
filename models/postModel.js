const mongoose = require("mongoose");
const userModel = require("./userModel");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    image: {
      type: String,
    },
    caption: {
      type: String
    },
    liked: {
      type: Boolean,
      default: false
    },
    comments: {
      type: Array,
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    }
    // likes: {
    //   type: Array,
    //   default: [],
    // },
    // date: {
    //   type: Date,
    //   default: Date.now,
    //   required: true,
    // },
    // author: {
    //   type: String,
    //   require: true,
    // },
    // mentions: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // comments: {
    //   body: "string",
    //   by: mongoose.Schema.Types.ObjectId,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
