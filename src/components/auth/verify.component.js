"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Loader2Icon } from "lucide-react";
import axiosInstance from "@/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function VerifyComponent(props) {
    const router = useRouter();
    const { token, authToken } = props;
    const [verifying, setVerifying] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        verifyToken();
    }, [])

    const verifyToken = () => {
        axiosInstance.post(`/api/verify/${token}`, null, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                const { success, message } = response.data;

                if (success) {
                    toast.success(message, {
                        autoClose: 2500
                    });
                    setVerifying(false);
                    setMessage(message);

                    setTimeout(() => {
                        router.replace(authToken ? '/profile' : '/signin');
                    }, 2700);
                } else {
                    toast.error(message, {
                        autoClose: 2500
                    });
                    setVerifying(false);
                    setMessage(message);
                }
            })
            .catch(error => {
                const { success, message } = error.response.data;
                toast.error(message, {
                    autoClose: 2500
                });
                setVerifying(false);
                setMessage(message);
            });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200">
            <Card className="w-1/3">
                <CardContent>
                    <h1 className="text-xl md:text-2xl text-center font-bold flex items-center justify-center gap-4">
                        {verifying ? <><Loader2Icon className="animate-spin" /> <span>Verifying...</span></> : message}
                    </h1>
                </CardContent>
            </Card>
        </div>
    )
}