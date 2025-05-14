import VerifyComponent from "@/components/auth/verify.component";
import { Card, CardContent } from "@/components/ui/card";
import { cookies } from "next/headers";

export const metadata = {
    title: "Verify | NextJS Authentication"
}

export default async function VerifyPage({ params }) {
    const { token } = await params;
    const cookiesStore = await cookies();

    return (
        <>
            {token && <VerifyComponent token={token} authToken={cookiesStore.get("authtoken")} />}
            {!token && <Card className="w-1/3 bg-red-500 text-white">
                <CardContent>
                    <h1 className="text-xl md:text-2xl text-center font-bold flex items-center justify-center gap-4">
                        {verifying ? <><Loader2Icon className="animate-spin" /> <span>Verifying...</span></> : message}
                    </h1>
                </CardContent>
            </Card>}
        </>
    )
}