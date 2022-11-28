const express = require("express");

const {
    createPost,
    editPost,
    deletePost,
    getPost,
} = require("../controllers/postController");

const router = express.Router();
// create post
router.post("", createPost);

// edit post
router.put("/:id", editPost);

// delete post
router.delete("/:id", deletePost);

// get post
//router.get(":/id", getPost);

module.exports = router;