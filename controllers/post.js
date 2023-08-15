import PostModel from "../models/Post.js";

import mongoose from "mongoose";



export const createPost = async (req, res) => {
  const { title, desc } = req.body;
  const newPostMessage = new PostModel({
    id: req.userId,
    title: title,
    desc: desc,
    created_at: new Date(new Date().toUTCString()),
  });
  try {
    await newPostMessage.save();
    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  let post;
  try {
    post = await PostModel.findByIdAndRemove(id);
  } catch (error) {
    console.log(error);
  }
  if (!post) {
    return res.status(404).json({ message: "Unable to delete" });
  }
  return res.status(200).json({ message: "deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostModel.findById(id);

  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    { likes: post.likes + 1 },
    {
      new: true,
    }
  );
  res.status(200).json(updatedPost);
};

export const unlikePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostModel.findById(id);

  const updatedPost = await PostModel.findByIdAndUpdate(
    id,
    { likes: post.likes - 1 },
    {
      new: true,
    }
  );
  res.status(200).json(updatedPost);
};


export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { comments } = req.body;
  const post = await PostModel.findById(id);
  post.comments.unshift(comments);
  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};


export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await PostModel.find();
  } catch (error) {
    console.log(error);
  }

  if (!posts) {
    return res.status(404).json({ message: "No books found" });
  }
  return res.status(200).json({ posts });
};
