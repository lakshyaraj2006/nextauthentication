import mongoose, { Schema } from "mongoose"

const PasswordResetTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    resetToken: {
        type: String
    },
    resetTokenExpiry: {
        type: Date
    }
}, { timestamps: true });

mongoose.models = {};
const PasswordResetTokenModel = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);

export { PasswordResetTokenModel };
