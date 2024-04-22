import connectDB from "@/lib/db";
import PostModel from "@/model/postModel";
import { NextResponse } from "next/server";

export const POST = async (request, { params }) => {
  const { id } = params;
  try {
    connectDB();

    const body = await request.json();
    // console.log(body.userId, id);
    const post = await PostModel.findById(id);
    if (post.loved.includes(body.userId)) {
      return NextResponse.json("Already loved", { status: 200 });
    }
    post.loved.push(body.userId);
    await post.save();
    return NextResponse.json("Successfully loved", { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to love posts!");
  }
};
