import { connectDb } from "@/lib/db";
import { PasswordResetTokenModel } from "@/models/passord-reset-token.model";
import { UserModel } from "@/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function PUT(request, { params }) {
    await connectDb();

    const _jsonData = await request.json();
    const { newPassword } = _jsonData;

    const { token } = await params;
    let success = false;

    const resetTokenExists = await PasswordResetTokenModel.findOne({
        resetToken: token
    });

    if (resetTokenExists) {
        if (new Date() > resetTokenExists.resetTokenExpiry) {
            return NextResponse.json({
                success,
                message: 'Token has expired!'
            }, { status: 400 })
        } else {
            const userId = resetTokenExists.user.toString();

            await UserModel.findByIdAndUpdate(userId, {
                $set: {
                    password: await bcrypt.hash(newPassword, 12)
                }
            });

            await PasswordResetTokenModel.findOneAndDelete({ resetToken: token });
            success = true;

            return NextResponse.json({
                success,
                message: 'Password reset successfully!'
            }, { status: 200 })
        }
    } else {
        return NextResponse.json({
            success,
            message: 'Invalid reset token!'
        }, { status: 400 })
    }
}