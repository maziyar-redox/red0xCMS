"use client";

import { HTMLAttributes, useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useRouter } from "@bprogress/next";
import { AuthStatusCard } from "@/components/auth/form-states";
import { resetPasswordFormSchema } from "@/schema";
import { ResetPassword } from "@/actions/auth/reset-password";
import { PasswordInput } from "@/components/password-input";
import { VscLoading } from "react-icons/vsc";

type ResetPasswordFormProps = HTMLAttributes<HTMLFormElement> & {
    token: string;
};
type StatusFormProps = {
    formStatus: "error" | "success" | undefined;
    formMessage: string;
};

export function ResetPasswordForm({ className, token, ...props }: ResetPasswordFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const [status, setStatus] = useState<StatusFormProps>({
        formStatus: undefined,
        formMessage: ""
    });
    const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            password: "",
            confirm_password: "",
            token: token
        },
    });

    function onSubmit(data: z.infer<typeof resetPasswordFormSchema>) {
        setStatus({
            formMessage: "",
            formStatus: undefined
        });
        startTransition(async () => {
            try {
                const submitedData = await ResetPassword(data);
                console.log(submitedData);
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
                    name="password"
                    render={({ field }) => (
                        <FormItem className="relative">
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder='********' {...field} />
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
                            <FormLabel>Confrim Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder='********' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {status.formStatus == "success" && 
                    <AuthStatusCard
                        variant="success"
                        title="Operation was successful"
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
                        "Reset Password"
                    }
                </Button>
            </form>
        </Form>
    );
};