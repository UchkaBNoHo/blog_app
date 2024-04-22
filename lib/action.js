import PostModel from "@/model/postModel";
import connectDB from "./db";
import UserModel from "@/model/userModel";

export const getUser = async (userId) => {
  console.log("userId", userId);
  try {
    connectDB();
    const user = await UserModel.findById(userId);
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const handleLoved = async (postId) => {
  try {
    connectDB();
    const post = await PostModel.findById(postId);
    console.log(post);
    return post;
  } catch (error) {
    console.log(error);
  }
};
