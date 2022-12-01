const Post = require("../models/postModel");
const User = require("../models/userModel");

// create post
const createPost = async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savePost = await newPost.save();
    res.status(200).json({ savePost });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit post
const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author === req.body.author) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("updated!");
    } else {
      res.status(400).json("you can update only your post");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author === req.body.author) {
      await post.deleteOne();
      res.status(200).json("deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const obtainedPost = await Post.findById(req.params.id);
    res.status(200).json(obtainedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// like post
const likePost = async (req, res) => {
  try{
    const obtainedPost = await Post.findById(req.params.id);
    if(!obtainedPost.likes.includes(req.body.author)){
      await obtainedPost.updateOne({$push : {likes: req.body.author}});
      res.status(200).json("Post has been liked!");
    } else {
      await obtainedPost.updateOne({$pull : {likes: req.body.author}})
      res.status(200).json("Post has been disliked!");
    }
  } catch (error){
    res.status(400).json({error: error.message});
  }
};

const fetchPosts = async (req, res) => {
  try {
    const user = await User.findById(req.body.author);
    const posts = await Post.find({author: user._id});
    const followingPosts = await Promise.all(
      user.following.map((followingID) => {
          return Post.find({author: followingID});
      })
    );
    const feed = await posts.concat(...followingPosts);
    feed.sort((a, b) => b.date - a.date);
    res.json(feed);
  } catch (error){
    res.status(400).json({error: error.message});
  }
  
}

module.exports = {
  createPost,
  editPost,
  deletePost,
  getPost,
  likePost,
  fetchPosts,
};
