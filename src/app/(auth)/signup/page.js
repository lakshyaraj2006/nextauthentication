import SignUpComponent from "@/components/auth/signup.component";

export const metadata = {
    title: "SignUp | NextJS Authentication"
}

export default function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <SignUpComponent />
        </div>
    )
}