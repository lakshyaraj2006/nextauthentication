import { render } from "@react-email/components";
import VerificationEmail from "@/emails/verification-email";
import ResetPasswordEmail from "@/emails/reset-password-email";

const renderVerificationEmailTemplate = async (username, token) => {
    return render(<VerificationEmail username={username} token={token} />)
}

const renderResetPasswordEmailTemplate = async (username, token) => {
    return render(<ResetPasswordEmail username={username} token={token} />)
}

export { renderVerificationEmailTemplate, renderResetPasswordEmailTemplate };