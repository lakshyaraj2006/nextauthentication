import { transporter } from "./nodemailer";
import { renderResetPasswordEmailTemplate } from "./render-email-template";

export async function sendResetPasswordEmail(email, username, token) {
    let success = false;

    try {
        await transporter.sendMail({
            from: '"CodeWithLaksh" <noreply@codewithlaksh.com>',
            to: email,
            subject: "Reset Password - NextAuthentication",
            html: await renderResetPasswordEmailTemplate(username, token)
        })

        success = true;

        return { success, message: "Please check your email for further instructions!" };
    } catch (error) {
        console.log("Error sending verification email: ", error);

        return { success, message: "Failed to send verification email!" };
    }
}
