const mongoose = require("mongoose");
const userModel = require("./userModel");

const Schema = mongoose.Schema;

const postSchema = new Schema (
    {
        body:{
            type: String,
            required: true,
        },
        image:{
            type: String,
            required: false,
        },
        likes:{
            type:Array,
            default:[]
        },
        date:{
            type: Date,
            default: Date.now,
            required: true,
        },
        author:{
            type: String,
            require: true,
        },
        mentions:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        comments:{
            body:"string", 
            by: mongoose.Schema.Types.ObjectId
        },
        
    },
    {timestamps: true}      
)

module.exports = mongoose.model("Post", postSchema);