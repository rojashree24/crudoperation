import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import UserModal from "../models/User.js";

const secret="test"

export const auth = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await UserModal.create({
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "24h",
    });

    res.status(201).json({token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

export const followUser = async (req, res) => {
const { id } = req.params;

if (!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send(`No post with id: ${id}`);

const user = await UserModal.findById(id);

const update = await UserModal.findByIdAndUpdate(
  id,
  { followers: user.followers + 1 },
  {
    new: true,
  }
);
res.status(200).json(update);
}

export const unfollowUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const user = await UserModal.findById(id);

  const update = await UserModal.findByIdAndUpdate(
    id,
    { followers: user.followers - 1 },
    {
      new: true,
    }
  );
  res.status(200).json(update);
};


export const getUsers=async(req,res)=>{
   let users;
   try {
     users = await UserModal.find();
   } catch (error) {
     console.log(error);
   }

   if (!users) {
     return res.status(404).json({ message: "No users found" });
   }
   return res.status(200).json({ users });
}