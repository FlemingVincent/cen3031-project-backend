const router = require("express").Router();
const Post = require("../models/postModel")

/* controller functions
const {
    createPost,
} = require("../controllers/postController");*/

// create post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savePost = await newPost.save();
        res.status(200).json({savePost});
    } catch (error){
        res.status(400).json({error: error.message});
    }
})

// edit post
router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.author === req.body.author){
            await post.updateOne({$set:req.body});
            res.status(200).json("updated!")
        }else{
            res.status(403).json("you can update only your post");
        }
    } catch(error){
        res.status(400).json({error: error.message})
    }
})

// delete post
router.delete("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.author === req.body.author){
            await post.deleteOne();
            res.status(200).json("deleted")
        }else{
            res.status(403).json("you can delete only your post");
        }
    } catch(error){
        res.status(400).json({error: error.message})
    } 
})
module.exports = router;