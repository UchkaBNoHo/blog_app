// import connectDB from "@/lib/db";
// import UserModel from "@/model/userModel";
// import { NextResponse } from "next/server";

// export const GET = async (request) => {
//   try {
//     connectDB();

//     const users = await UserModel.find();
//     return NextResponse.json(users, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to create post!");
//   }
// };
