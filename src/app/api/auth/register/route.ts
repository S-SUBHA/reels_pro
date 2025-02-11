import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

// Function to register new user
export async function POST(request: NextRequest) {
  try {
    // collect the required fields from the request
    const { name, email, password } = await request.json();
    // check if required fields are recieved properly
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, Email and Password are required" },
        { status: 400 }
      );
    }
    // check for database connection
    await connectToDatabase();
    // check if an user already exists with identical credentials
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    // register new user
    const user = await User.create({
      name,
      email,
      password,
    });
    console.log(user);
    // return a success response
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    // log the error
    console.error(error);
    // throw an error
    return NextResponse.json(
      { error: "User registration failed" },
      { status: 500 }
    );
  }
}
