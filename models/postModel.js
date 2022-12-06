const mongoose = require("mongoose");
const userModel = require("./userModel");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);