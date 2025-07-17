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
import { registerFormSchema } from "@/schema";
import { useRouter } from "@bprogress/next";
import { Register } from "@/actions/auth/register";
import { AuthStatusCard } from "@/components/auth/form-states";
import { VscLoading } from "react-icons/vsc";

type UserRegisterFormProps = HTMLAttributes<HTMLFormElement>;
type StatusFormProps = {
    formStatus: "error" | "success" | undefined;
    formMessage: string;
};

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [status, setStatus] = useState<StatusFormProps>({
        formStatus: undefined,
        formMessage: ""
    });

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            confirm_password: ""
        },
    });

    function onSubmit(data: z.infer<typeof registerFormSchema>) {
        setStatus({
            formMessage: "",
            formStatus: undefined
        });
        startTransition(async () => {
            try {
                const submitedData = await Register(data);
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
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="username" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row justify-center items-center gap-x-3">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {status.formStatus == "success" && 
                    <AuthStatusCard
                        variant="success"
                        title="Register was Successful!"
                        description={status.formMessage}
                    />
                }
                {status.formStatus == "error" && 
                    <AuthStatusCard
                        variant="error"
                        title="Register Failed!"
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
                        "Create Account"
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