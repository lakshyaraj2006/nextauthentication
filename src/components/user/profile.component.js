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

const profileSchema = z.object({
    name: z.optional(z.string()),
    address: z.optional(z.string()),
    phone: z.optional(z.string())
})

export default function ProfileComponent() {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "",
            address: "",
            phone: ""
        }
    });

    useEffect(() => {
        getProfile();
    }, [])

    const getProfile = async () => {
        const response = await axiosInstance.get("/api/profile");
        const data = response.data;

        form.setValue("name", data.name ? data.name : "");
        form.setValue("address", data.profile ? data.profile.address : "");
        form.setValue("phone", data.profile ? data.profile.phone : "");
    }

    const onSubmit = (data) => {
        setLoading(true);
        axiosInstance.patch("/api/profile", data, {
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
                    getProfile();
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
            <h1 className="text-xl md:text-2xl font-semibold underline">Profile Details</h1>

            <Form {...form}>
                <form className="space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your full address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} />
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
