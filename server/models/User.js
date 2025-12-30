import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: false, default: "" },
  email: { type: String, required: true, unique: true },
  resume: { type: String },
  image: { type: String, required: false, default: "" }
})

const User = mongoose.model('User', userSchema)

export default User;