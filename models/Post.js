import mongoose, { mongo } from "mongoose";


const postSchema = mongoose.Schema({
  title: String,
  desc: String,
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
});

const postMessage=mongoose.model("PostMessage",postSchema)


export default postMessage