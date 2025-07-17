"use client";

import { HTMLAttributes, useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { loginFormSchema } from "@/schema";
import Link from "next/link";
import { Login } from "@/actions/auth/login";
import { AuthStatusCard } from "@/components/auth/form-states";
import { useRouter } from "@bprogress/next";
import { useOtpStore } from "@/store/use-otp";
import { VscLoading } from "react-icons/vsc";

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>;
type StatusFormProps = {
    formStatus: "error" | "success" | undefined;
    formMessage: string;
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const {
        setUsername
    } = useOtpStore();
    const [status, setStatus] = useState<StatusFormProps>({
        formStatus: undefined,
        formMessage: ""
    });
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: z.infer<typeof loginFormSchema>) {
        setStatus({
            formMessage: "",
            formStatus: undefined
        });
        startTransition(async () => {
            try {
                const submitedData = await Login(data);
                if (submitedData?.otp === true) {
                    setUsername(data.email, data.password);
                    setStatus({
                        formStatus: "success",
                        formMessage: "Login was successful, enter your otp."
                    });
                    setTimeout(() => {
                        router.push("/auth/otp");
                    }, 1500);
                };
                if (submitedData?.success) {
                    setStatus({
                        formStatus: "success",
                        formMessage: submitedData.success
                    });
                    setTimeout(() => {
                        router.refresh();
                    }, 1500);
                };
                if (submitedData?.error) {
                    setStatus({
                        formStatus: "error",
                        formMessage: submitedData.error
                    });
                };
            } catch (err) {
                setStatus({
                    formStatus: "error",
                    formMessage: "There was an unhandled error!"
                });
            };
        });
    };
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("grid gap-3", className)}
                {...props}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="name@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                            <Link
                                href="/auth/forgot-password"
                                className="text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75"
                            >
                                Forgot password?
                            </Link>
                        </FormItem>
                    )}
                />
                {status.formStatus == "success" && 
                    <AuthStatusCard
                        variant="success"
                        title="Login Successful!"
                        description={status.formMessage}
                    />
                }
                {status.formStatus == "error" && 
                    <AuthStatusCard
                        variant="error"
                        title="Login Failed!"
                        description={status.formMessage}
                    />
                }
                <Button
                    className="mt-2"
                    disabled={
                        isPending
                        ||
                        status.formStatus === "success"
                    }
                >
                    {
                        isPending
                        ?
                        <VscLoading className="animate-spin" />
                        :
                        "Login"
                    }
                </Button>

                <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background text-muted-foreground px-2">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" type="button" disabled={isPending}>
                        <FaGithub className="h-4 w-4" /> GitHub
                    </Button>
                    <Button variant="outline" type="button" disabled={isPending}>
                        <FaGoogle className="h-4 w-4" /> Facebook
                    </Button>
                </div>
            </form>
        </Form>
    );
};