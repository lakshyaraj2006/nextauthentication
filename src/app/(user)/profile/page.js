import PasswordChangeComponent from "@/components/user/password-change"
import ProfileComponent from "@/components/user/profile.component"

export const metadata = {
  title: "My Profile | NextJS Authentication"
}

export default function Profile() {
  return (
    <div className="max-w-[96vw] w-full mx-auto my-6">
      <ProfileComponent />

      <div className="mt-6">
        <PasswordChangeComponent />
      </div>
    </div>
  )
}
