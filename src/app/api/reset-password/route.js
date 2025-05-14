import { connectDb } from "@/lib/db";
import { sendResetPasswordEmail } from "@/lib/send-password-reset-email";
import { PasswordResetTokenModel } from "@/models/passord-reset-token.model";
import { UserModel } from "@/models/user.model";
import { NextResponse } from "next/server";
import crypto from "node:crypto";

export async function POST(request) {
    await connectDb();
    const _jsonData = await request.json();
    let success = false;

    const { email } = _jsonData;

    const user = await UserModel.findOne({
        email: email
    });

    if (user) {
        const resetToken = crypto.randomBytes(16).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3 * 60 * 60 * 1000);

        // Check if the user already has a token
        const resetTokenExists = await PasswordResetTokenModel.findOne({
            user: user._id
        });

        if (resetTokenExists) {
            await PasswordResetTokenModel.findOneAndUpdate({ user: user._id }, {
                $set: {
                    resetToken: resetToken,
                    resetTokenExpiry: resetTokenExpiry
                }
            });

            const emailResponse = await sendResetPasswordEmail(user.email, user.username, resetToken);

            if (emailResponse.success) {
                success = true;

                return NextResponse.json({
                    success,
                    message: emailResponse.message,
                    resetToken
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    success,
                    message: emailResponse.message
                }, { status: 500 })
            }
        } else {
            await PasswordResetTokenModel.create({
                user: user._id,
                resetToken: resetToken,
                resetTokenExpiry: resetTokenExpiry
            });

            const emailResponse = await sendResetPasswordEmail(user.email, user.username, resetToken);

            if (emailResponse.success) {
                success = true;

                return NextResponse.json({
                    success,
                    message: emailResponse.message,
                    resetToken
                }, { status: 200 })
            } else {
                return NextResponse.json({
                    success,
                    message: emailResponse.message
                }, { status: 500 })
            }
        }
    } else {
        return NextResponse.json({
            success,
            message: 'No such user was found!'
        }, { status: 404 })
    }
}