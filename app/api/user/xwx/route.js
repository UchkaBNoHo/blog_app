// import connectDB from "@/lib/db";
// import UserModel from "@/model/userModel";
// import { NextResponse } from "next/server";

// export const GET = async (request, { params }) => {
//   const userId = params.id;
//   try {
//     connectDB();
//     const user = await UserModel.findOne({ userId });
//     console.log(user);
//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     console.log(error);
//     throw new Error("Failed to fetch user");
//   }
// };
