import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  Username: { type: String},
  email: { type: String, required: true },
  password: { type: String, required: true },
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] },
});

export default mongoose.model("User", userSchema);
