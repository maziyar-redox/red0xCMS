"use client";

import { HTMLAttributes, useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { VscLoading } from "react-icons/vsc";
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
import { forgotPasswordFormSchema } from "@/schema";
import { useRouter } from "@bprogress/next";
import { AuthStatusCard } from "@/components/auth/form-states";
import { ForgotPassword } from "@/actions/auth/forgot-password";

type ForgotPasswordFormProps = HTMLAttributes<HTMLFormElement>;
type StatusFormProps = {
    formStatus: "error" | "success" | undefined;
    formMessage: string;
};

export function ForgotPasswordForm({ className, ...props }: ForgotPasswordFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [status, setStatus] = useState<StatusFormProps>({
        formStatus: undefined,
        formMessage: ""
    });
    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: "",
        },
    });

    function onSubmit(data: z.infer<typeof forgotPasswordFormSchema>) {
        setStatus({
            formMessage: "",
            formStatus: undefined
        });
        startTransition(async () => {
            try {
                const submitedData = await ForgotPassword(data);
                if (submitedData?.success) {
                    setStatus({
                        formStatus: "success",
                        formMessage: submitedData.success
                    });
                    setTimeout(() => {
                        router.push("/auth/sign-in");
                    }, 2500);
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
                {status.formStatus == "success" && 
                    <AuthStatusCard
                        variant="success"
                        title="Operation successful"
                        description={status.formMessage}
                    />
                }
                {status.formStatus == "error" && 
                    <AuthStatusCard
                        variant="error"
                        title="ERROR!"
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
                        "Continue"
                    }
                </Button>
            </form>
        </Form>
    );
};