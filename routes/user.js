import express from "express"
import {
  auth,
  followUser,
  unfollowUser,
  getUsers,
} from "../controllers/user.js";

const router=express.Router();


router.post('/api/authenticate',auth);
router.post("/api/follow/:id", followUser);
router.post("/api/unfollow/:id", unfollowUser);
router.get('/api/user',getUsers)

export default router