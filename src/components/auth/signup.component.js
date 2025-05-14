"use client"

import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { LogInIcon } from "lucide-react";
import axiosInstance from "@/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const signupSchema = z.object({
    name: z.optional(z.string()),
    username: z
        .string()
        .nonempty({ message: "Username is required" })
        .min(4, { message: "Username must contain atleast 4 characters" })
        .max(12, { message: "Username must contain atmost 12 characters" })
        .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/, { message: "Username can only contain alphabets & numbers" }),
    email: z
        .string()
        .nonempty({ message: "Email is required" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .nonempty({ message: "Password is required" })
        .min(8, { message: "Password must contain atleast 8 characters" }),
    cpassword: z
        .string()
        .nonempty({ message: "Confirm Password is required" })
        .min(8, { message: "Confirm Password must contain atleast 8 characters" }),
})
    .refine(data => data.cpassword === data.password, {
        message: "Passwords do not match!",
        path: ["cpassword"]
    });

export default function SignUpComponent() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
            cpassword: "",
        }
    });

    const onSubmit = async (data) => {
        setLoading(true);
        delete data['cpassword'];
        axiosInstance.post('/api/signup', data, {
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
                const { success, message } = error.response.data;
                toast.error(message, {
                    autoClose: 2500
                })
            });
    }

    return (
        <Card className="max-w-[40vw] w-full">
            <CardContent>
                <CardHeader>
                    <CardTitle className="text-xl md:text-2xl text-center font-semibold">SignUp for a new account</CardTitle>
                </CardHeader>

                <Separator className="my-2" />
                <p className="text-center">Already a member ? <Link href="/signin" className="text-blue-500">SignIn</Link></p>
                <Separator className="mt-2" />

                <Form {...form}>
                    <form className="space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Choose your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Choose a strong password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="cpassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Confirm your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button className="w-full" disabled={loading}>{loading ? <Loader2Icon className="animate-spin" /> : <LogInIcon />} Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}