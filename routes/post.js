import express from 'express'

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  likePost,
  unlikePost,
  commentPost,
    
} from "../controllers/post.js";

const router=express.Router()


router.post('/api/posts',createPost)
router.delete("/api/posts/:id", deletePost);
router.post("/api/like/:id",likePost)
router.post("/api/unlike/:id", unlikePost);
router.post("/api/comment/:id", commentPost);
router.get('/api/posts/:id',getPost)
router.get("/api/all_posts", getPosts);

export default router