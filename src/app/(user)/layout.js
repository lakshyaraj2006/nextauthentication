import Navbar from "@/components/navbar.component";
import { ToastContainer } from "react-toastify";

export default function ProfileLayout({ children }) {
    return (
        <>
            <Navbar />
            <ToastContainer />
            {children}
        </>
    );
}
