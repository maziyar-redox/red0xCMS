import Link from "next/link";
import type { Metadata } from "next";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
    title: "Password Recovery Page | Red0x CMS",
    description: "Enter your new password and login to your account",
};

type PasswordResetProps = {
    params: Promise<{ id: string }>;
};

export default async function PasswordResetPage({
    params
}: PasswordResetProps) {
    const { id } = await params;
    return (
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-left">
                    <h1 className="text-2xl font-semibold tracking-tight">Reset Your Password</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your new password in fields below
                    </p>
                </div>
                <ResetPasswordForm
                    token={id}
                />
                <p className="text-muted-foreground px-8 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link
                        href="/auth/sign-up"
                        className="hover:text-primary underline underline-offset-4"
                    >
                        Sign Up
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};