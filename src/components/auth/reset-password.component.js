"use client"

import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormControl, FormLabel, FormMessage, FormItem } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import axiosInstance from "@/axios"
import { toast } from "react-toastify"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MailIcon, Loader2Icon, LockIcon } from "lucide-react"

const emailSchema = z.object({
    email: z
        .string()
        .nonempty({ message: "Email is required" })
        .email({ message: "Invalid email address" }),
});

const resetPasswordSchema = z.object({
    newPassword: z
        .string()
        .min(8, { message: "New password must contain atleast 8 characters" })
        .nonempty({ message: "New password is required" }),
    confirmNewPassword: z
        .string()
        .nonempty({ message: "Confirm New password is required" }),
})
.refine(data => data.confirmNewPassword === data.newPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"]
});

export default function ForgotPasswordComponent({ token }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (!token) {
        const form = useForm({
            resolver: zodResolver(emailSchema),
            defaultValues: {
                email: ""
            }
        });

        const onSubmit = async (data) => {
            setLoading(true);
            axiosInstance.post('/api/reset-password', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    const { success, message } = response.data;

                    if (success) {
                        toast.success(message, {
                            autoClose: 2500
                        });
                        setLoading(false);
                        form.reset();
                    } else {
                        setLoading(false);
                        toast.error(message, {
                            autoClose: 2500
                        })
                    }
                })
                .catch(error => {
                    setLoading(false);
                    const { success, message } = error.response.data;
                    toast.error(message, {
                        autoClose: 2500
                    })
                })
        }

        return (
            <Card className="max-w-[40vw] w-full">
                <CardContent>
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl text-center font-semibold">Reset Your Password</CardTitle>
                    </CardHeader>
                    <Form {...form}>
                        <form className="space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full" disabled={loading}>{loading ? <Loader2Icon className="animate-spin" /> : <MailIcon />} Send Mail</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        )
    } else {
        const form = useForm({
            resolver: zodResolver(resetPasswordSchema),
            defaultValues: {
                newPassword: "",
                confirmNewPassword: ""
            }
        });

        const onSubmit = async (data) => {
            delete data['confirmNewPassword'];
            setLoading(true);
            axiosInstance.put(`/api/reset-password/${token}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    const { success, message } = response.data;

                    if (success) {
                        toast.success(message, {
                            autoClose: 2500
                        });
                        setLoading(false);
                        form.reset();

                        setTimeout(() => {
                            router.replace("/signin");
                        }, 2700);
                    } else {
                        setLoading(false);
                        toast.error(message, {
                            autoClose: 2500
                        })
                    }
                })
                .catch(error => {
                    setLoading(false);
                    const { success, message } = error.response.data;
                    toast.error(message, {
                        autoClose: 2500
                    })
                })
        }

        return (
            <Card className="max-w-[40vw] w-full">
                <CardContent>
                    <CardHeader>
                        <CardTitle className="text-xl md:text-2xl text-center font-semibold">Reset Your Password</CardTitle>
                    </CardHeader>
                    <Form {...form}>
                        <form className="space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Choose a strong new password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmNewPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm your new password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button className="w-full" disabled={loading}>{loading ? <Loader2Icon className="animate-spin" /> : <LockIcon />} Reset Password</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        )
    }
}