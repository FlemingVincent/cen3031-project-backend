const Post = require("../models/postModel");
const User = require("../models/userModel");

// create post
const createPost = async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savePost = await newPost.save();
    const user = await User.findById(newPost.user._id);
    //res.status(200).json({ user });
    res.status(200).json({ savePost });
    return user;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// edit post
const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user.equals(req.body.user)) {
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
    if (post.user.equals(req.body.user)) {
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
    const user = await User.findById(obtainedPost.user);
    res.status(200).json(obtainedPost);
    return user;
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// like post
const likePost = async (req, res) => {
  try {
    const obtainedPost = await Post.findById(req.params.id);
    if (!obtainedPost.liked == true) {
      //await obtainedPost.updateOne({$push : {likes: req.body.author}});
      await obtainedPost.updateOne({ $set: { liked: true } });
      res.status(200).json("Post has been liked!");
    } else {
      //await obtainedPost.updateOne({$pull : {likes: req.body.author}})
      //await obtainedPost.updateOne({$pull : {liked: false}})
      await obtainedPost.updateOne({ $set: { liked: false } });
      res.status(200).json("Post has been disliked!");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ user: user });

    const followingPosts = await Promise.all(
      user.following.map((followingID) => {
        return Post.find({ user: followingID });
      })
    );
    feed = await posts.concat(...followingPosts);
    feed.sort((a, b) => b.createdAt - a.createdAt);
    res.json(feed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// gets all the posts from the req id
const userPosts = async (req, res) => {
  try{
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ user: user });
    res.status(200).json(posts);
  } catch (error) {
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
  userPosts,
};
