import SignInComponent from "@/components/auth/signin.component";

export const metadata = {
    title: "SignIn | NextJS Authentication"
}

export default function SignUp() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-200">
            <SignInComponent />
        </div>
    )
}