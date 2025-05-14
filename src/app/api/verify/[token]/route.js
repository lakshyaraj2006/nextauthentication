import { connectDb } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    await connectDb();
    const { token } = await params;
    let success = false;

    try {
        const user = await UserModel.findOne({ verifyToken: token });

        if (user) {
            const tokenHasExpired = (new Date() > user.verifyTokenExpiry) ? true : false;

            if (tokenHasExpired) {
                return NextResponse.json({
                    success,
                    message: "Token has expired!"
                }, { status: 400 })
            } else {
                await UserModel.findByIdAndUpdate(user.id, {
                    $set: { isVerified: true },
                    $unset: { verifyToken: true, verifyTokenExpiry: true }
                });
                success = true;

                return NextResponse.json({
                    success,
                    message: "Email verified successfully!"
                }, { status: 200 })
            }
        } else {
            return NextResponse.json({
                success,
                message: "Invalid verification token!"
            }, {status: 401})
        }
    } catch (error) {
        return NextResponse.json({
            success,
            message: "Internal Server Error!"
        }, {status: 500})
    }
}