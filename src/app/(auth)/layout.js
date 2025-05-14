import { ToastContainer } from "react-toastify";

export default function AuthLayout({ children }) {
    return (
        <>
            <ToastContainer />
            {children}
        </>
    )
}