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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp";
import { otpFormSchema } from "@/schema";
import { useOtpStore } from "@/store/use-otp";
import { Otp } from "@/actions/auth/otp";
import { useRouter } from "@bprogress/next";
import { AuthStatusCard } from "@/components/auth/form-states";
import { ResendOtp } from "@/actions/auth/resend_otp";
import { Toaster } from "@/components/toaster";
import { VscLoading } from "react-icons/vsc";

type OtpFormProps = HTMLAttributes<HTMLFormElement>;
type StatusFormProps = {
    formStatus: "error" | "success" | undefined;
    formMessage: string;
};

export function OtpForm({ className, ...props }: OtpFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const {
        username,
        password,
        setUsername
    } = useOtpStore();
    const [status, setStatus] = useState<StatusFormProps>({
        formStatus: undefined,
        formMessage: ""
    });
    const form = useForm<z.infer<typeof otpFormSchema>>({
        resolver: zodResolver(otpFormSchema),
        defaultValues: {
            otp: "",
            username: (typeof(username) === "undefined" ? "" : username),
            password: (typeof(password) === "undefined" ? "" : password)
        },
    });
    if (!username || !password) {
        return (
            <div className="text-center">
                <h1 className="text-2xl tracking-tight font-semibold">
                    An error occured
                </h1>
            </div>
        );
    };
    const otp = form.watch("otp");
    function onSubmit(data: z.infer<typeof otpFormSchema>) {
        setStatus({
            formMessage: "",
            formStatus: undefined
        });
        startTransition(async () => {
            try {
                const submitedData = await Otp(data);
                if (submitedData?.success) {
                    setStatus({
                        formStatus: "success",
                        formMessage: submitedData.success
                    });
                    setTimeout(() => {
                        router.refresh();
                    }, 1500);
                    window.localStorage.removeItem("username-status");
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
        <>
            <div className="flex flex-col space-y-2 text-left">
                <h1 className="text-2xl font-semibold tracking-tight">Two-factor Authentication</h1>
                <p className="text-muted-foreground text-sm">
                    Please enter the authentication code. <br />
                    We have sent the authentication code to your email.
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className={cn("grid gap-2", className)}
                    {...props}
                >
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="sr-only">One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP
                                        maxLength={6}
                                        {...field}
                                        containerClassName="justify-between sm:[&>[data-slot='input-otp-group']>div]:w-12"
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={2} />
                                            <InputOTPSlot index={3} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
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
                    <Button className="mt-2" disabled={
                        otp.length < 6
                        ||
                        isPending
                        ||
                        status.formStatus === "success"
                    }>
                        {
                            isPending
                            ?
                            <VscLoading className="animate-spin" />
                            :
                            "Verify"
                        }
                    </Button>
                </form>
            </Form>
            <p className="text-muted-foreground px-8 text-center text-sm">
                Haven&apos;t received it?{' '}
                <button
                    className="hover:text-primary underline underline-offset-4"
                    disabled={isPending}
                    onClick={() => {
                        startTransition(async () => {
                            try {
                                const submitedData = await ResendOtp({
                                    username: username
                                });
                                if (submitedData?.success) {
                                    Toaster(
                                        "Success",
                                        submitedData.success
                                    );
                                };
                                if (submitedData?.error) {
                                    Toaster(
                                        "Error",
                                        submitedData.error
                                    );
                                };
                            } catch (err) {
                                setStatus({
                                    formStatus: "error",
                                    formMessage: "There was an unhandled error!"
                                });
                            };
                        });
                    }}
                >
                    Resend a new code
                </button>
                .
            </p>
        </>
    );
};