import { connectDb } from "@/lib/db";
import { cookies } from "next/headers";
import { UserModel } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { config } from "@/lib/config-env";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PUT(request) {
    await connectDb();

    const cookiesStore = await cookies();
    const authToken = cookiesStore.get('authtoken');
    let success = false;

    const _jsonData = await request.json();

    const { oldPassword, newPassword } = _jsonData;

    if (!authToken) {
        return NextResponse.json({
            message: 'Unauthorized request!'
        }, { status: 401 })
    } else {
        try {
            const decoded = jwt.verify(authToken.value, config.AUTH_TOKEN_SECRET);
            const user = await UserModel.findById(decoded.id);

            if (user.isVerified) {
                const verifyOldPassword = await bcrypt.compare(oldPassword, user.password);

                if (verifyOldPassword) {
                    await UserModel.findByIdAndUpdate(decoded.id, {
                        $set: {
                            password: await bcrypt.hash(newPassword, 12)
                        }
                    })

                    success = true;

                    return NextResponse.json({
                        success,
                        message: 'Password updated successfully!'
                    }, { status: 200 })
                } else {
                    return NextResponse.json({
                        success,
                        message: 'Incorrect old password!'
                    }, { status: 400 })
                }
            } else {
                if (user.verifyToken && new Date() < user.verifyTokenExpiry) {
                    return NextResponse.json({
                        success,
                        message: "You already have got email for verifying account! Please verify first."
                    }, { status: 400 })
                } else {
                    const verifyToken = crypto.randomBytes(16).toString('hex');
                    const verifyTokenExpiry = new Date(Date.now() + 8 * 60 * 60 * 1000);
    
                    user.verifyToken = verifyToken;
                    user.verifyTokenExpiry = verifyTokenExpiry;
    
                    await user.save();
    
                    await sendVerificationEmail(user.email, user.username, user.verifyToken);
                }

                if (!emailResponse.success) {
                    return NextResponse.json({
                        success,
                        message: emailResponse.message
                    }, { status: 500 })
                } else {
                    return NextResponse.json({
                        success,
                        message: "We have resent verification mail & verify before updating profile!"
                    }, { status: 400 })
                }
            }
        } catch (error) {
            return NextResponse.json({
                message: 'Invalid or expired token!'
            }, { status: 400 })
        }
    }

}