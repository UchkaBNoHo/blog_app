import connectDB from "@/lib/db";
import PostModel from "@/model/postModel";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const id = params.id;
  try {
    connectDB();
    const posts = await PostModel.find({ userId: id });
    console.log(posts);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};
