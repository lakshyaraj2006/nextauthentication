"use client"

import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogInIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import axiosInstance from "@/axios";
import { toast } from "react-toastify";
import { Separator } from "../ui/separator";
import Link from "next/link";

const signInSchema = z.object({
    identifier: z
        .string()
        .nonempty({ message: "Identifier is required" }),
    password: z
        .string()
        .nonempty({ message: "Password is required" })
})
    .refine((data) =>
        data.identifier.match(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/) ||
        data.identifier.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g), {
        message: "Invalid identifier. Enter username or email",
        path: ["identifier"]
    });

export default function SignInComponent() {
    const [loading, setLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            identifier: "",
            password: ""
        }
    });
    const router = useRouter();

    const onSubmit = async (data) => {
        setLoading(true);
        axiosInstance.post('/api/login', data, {
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

                    setTimeout(() => {
                        router.replace('/profile');
                    }, 2700);
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
                    <CardTitle className="text-xl md:text-2xl font-semibold text-center">Login using credentials</CardTitle>
                </CardHeader>

                <Separator className="my-2" />
                <p className="text-center">
                    Not a member ? <Link href="/signup" className="text-blue-500">SignUp</Link> &bull; Forgot password ? <Link href="/reset-password" className="text-blue-500">Reset Here</Link>
                </p>
                <Separator className="mt-2" />

                <Form {...form}>
                    <form className="space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Identifier</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter username or email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" disabled={loading}>{loading ? <Loader2Icon className="animate-spin" /> : <LogInIcon />} Sign In</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}