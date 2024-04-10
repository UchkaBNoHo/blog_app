import connectDB from "@/lib/db";
import PostModel from "@/model/postModel";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { slug } = params;
  // console.log(slug);
  try {
    connectDB();

    const post = await PostModel.findOne({ slug: slug });
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};