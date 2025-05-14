import Navbar from "@/components/navbar.component";
import { ToastContainer } from "react-toastify";

export const metadata = {
    title: "Home | NextJS Authentication",
    description: "Authentication tutorial using nextjs.",
};

export default function RootLayout({ children }) {
    return (
        <>
            <Navbar />
            <ToastContainer />
            {children}
        </>
    );
}
