const express = require("express");

const {
  createPost,
  editPost,
  deletePost,
  getPost,
  likePost,
  fetchPosts, 
} = require("../controllers/postController");

const router = express.Router();
// create post
router.post("/", createPost);

// edit post
router.put("/:id", editPost);

// delete post
router.delete("/:id", deletePost);

// get post
router.get("/:id", getPost);

// like post & dislike post
router.put("/:id/like", likePost);

// fetch user post
router.get("/feed/user", fetchPosts);

module.exports = router;
