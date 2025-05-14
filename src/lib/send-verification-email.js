import { transporter } from "./nodemailer";
import { renderVerificationEmailTemplate } from "./render-email-template";

export async function sendVerificationEmail(email, username, token) {
    let success = false;

    try {
        await transporter.sendMail({
            from: '"CodeWithLaksh" <noreply@codewithlaksh.com>',
            to: email,
            subject: "Email Verification - NextAuthentication",
            html: await renderVerificationEmailTemplate(username, token)
        })

        success = true;

        return { success, message: "Please check your email for further instructions!" };
    } catch (error) {
        console.log("Error sending verification email: ", error);

        return { success, message: "Failed to send verification email!" };
    }
}
