import connectDB from "@/lib/db";
import PostModel from "@/model/postModel";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    connectDB();

    const body = await request.json();
    const posts = await PostModel.find();
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
