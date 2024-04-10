import connectDB from "@/lib/db";
import PostModel from "@/model/postModel";
import UserModel from "@/model/userModel";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    connectDB();

    const posts = await PostModel.find();
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};

export const POST = async (request) => {
  try {
    connectDB();
    const body = await request.json();
    // console.log(body.session.user.email);

    const user = await UserModel.findOne({ email: body.session.user.email });
    // console.log(user);

    const newPost = new PostModel({
      title: body.title,
      desc: body.desc,
      userId: user._id,
      slug: body.slug,
    });
    await newPost.save();
    console.log(newPost);
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post!");
  }
};
