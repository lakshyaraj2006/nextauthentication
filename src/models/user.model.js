import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    name: {
        type: String
    },
    profile: {
        address: { type: String },
        phone: { type: String }
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: {
        type: Date
    }
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
})

mongoose.models = {};
const UserModel = mongoose.model('User', UserSchema);

export { UserModel };
