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
    // post.views.push(body.userId);
    post.views = post.views + 1;

    await post.save();
    return NextResponse.json("Successfully viewed", { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to view post!");
  }
};
