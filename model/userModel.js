import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 20,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    confirmPassword: {
      type: String,
      required: true,
      min: 6,
    },
    img: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let UserModel;

if (mongoose.models?.user) {
  UserModel = mongoose.models.user;
} else {
  UserModel = mongoose.model("user", User);
}

export default UserModel;
