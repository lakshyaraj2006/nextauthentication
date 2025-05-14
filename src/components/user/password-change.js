"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import axiosInstance from "@/axios";
import { toast } from "react-toastify";

const passwordChangeSchema = z.object({
    oldPassword: z
        .string()
        .nonempty({ message: "Old password is required" }),
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

export default function PasswordChangeComponent() {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        }
    });

    const onSubmit = (data) => {
        setLoading(true);
        axiosInstance.put("/api/profile/password", data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                setLoading(false);
                const { success, message } = response.data;

                if (success) {
                    toast.success(message, {
                        autoClose: 2500
                    });

                    form.reset();
                } else {
                    toast.error(message, {
                        autoClose: 2500
                    });
                }
            })
            .catch(error => {
                setLoading(false);
                const { success, message } = error.response.data;
                toast.error(message, {
                    autoClose: 2500
                });
            })
    }

    return (
        <>
            <h1 className="text-xl md:text-2xl font-semibold underline">Change Password</h1>

            <Form {...form}>
                <form className="space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Old Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Enter old password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
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

                    <Button disabled={loading}>{loading && <Loader2Icon className="animate-spin" />} {loading ? "Updating..." : "Update"}</Button>
                </form>
            </Form>
        </>
    )
}
