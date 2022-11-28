const Post = require("../models/postModel");

// create post
const createPost = async (req, res) => {
    
    const newPost = new Post(req.body);

    try {
        const savePost = await newPost.save();
        res.status(200).json({savePost});
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

// edit post
const editPost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.author === req.body.author){
            await post.updateOne({$set:req.body});
            res.status(200).json("updated!")
        }else{
            res.status(400).json("you can update only your post");
        }
    } catch(error){
        res.status(400).json({error: error.message});
    }
};

const deletePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.author === req.body.author){
            await post.deleteOne();
            res.status(200).json("deleted");
        }else{
            res.status(403).json("you can delete only your post");
        }
    } catch(error){
        res.status(400).json({error: error.message});
    } 
};

const getPost = async (req, res) => {
    try{
        const obtainedPost = await Post.findById(req.params.id);
        res.status(200).json(obtainedPost);
    } catch(error){
        res.status(400).json({error: error.message});
    }
};

// like post

// dislike post

module.exports = {
    createPost,
    editPost,
    deletePost,
    getPost,
};