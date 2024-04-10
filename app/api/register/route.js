import UserModel from "@/model/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";

export async function POST(request) {
  await connectDB();

  try {
    const { userName, email, password, confirmPassword } = await request.json();
    console.log(password, confirmPassword);

    if (!userName || !email || !password || !confirmPassword) {
      return NextResponse.json(
        { message: "Please fill all the fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message: "Password must be at least 6 characters",
        },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    const userEmail = await UserModel.findOne({ email });
    const userUsername = await UserModel.findOne({ userName });

    if (userEmail || userUsername) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
