import { connectDb } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "@/lib/config-env";
import { cookies } from "next/headers";

export async function POST(request) {
    const cookiesStore = await cookies();
    
    await connectDb();
    const _jsonData = await request.json();
    let success = false;

    const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/;
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

    const { identifier, password } = _jsonData;

    let user;

    if (usernameRegex.test(identifier)) {
        user = await UserModel.findOne({ username: identifier });
    } else if (emailRegex.test(identifier)) {
        user = await UserModel.findOne({ email: identifier });
    }

    if (user) {
        const verifyPassword = await bcrypt.compare(password, user.password);

        if (verifyPassword) {
            success = true;

            const payload = {
                id: user._id,
                email: user.email
            }

            const authToken = jwt.sign(payload, config.AUTH_TOKEN_SECRET, { expiresIn: config.AUTH_TOKEN_EXPIRY });

            cookiesStore.set("authtoken", authToken, {
                maxAge: 24 * 60 * 60,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/"
            });

            return NextResponse.json({
                success,
                message: "Logged in successfully!"
            }, { status: 200 })
        } else {
            return NextResponse.json({
                success,
                message: "Invalid password!"
            }, { status: 400 })
        }
    } else {
        return NextResponse.json({
            success,
            message: "User was not found!"
        }, { status: 404 })
    }
}