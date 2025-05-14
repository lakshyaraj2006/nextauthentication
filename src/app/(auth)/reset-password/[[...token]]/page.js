import ForgotPasswordComponent from "@/components/auth/reset-password.component";

export const metadata = {
    title: "Forgot Password | NextJS Authentication"
}

export default async function ForgotPassword({ params }) {
    const { token } = await params;
    
    return (
        <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
            {(!token || token.length === 1) && <ForgotPasswordComponent token={token} />}
            {(token && token.length > 1) && <h1 className="text-xl md:text-2xl font-semibold text-red-500">
                Please provide a single token!    
            </h1>}
        </div>
    )
}