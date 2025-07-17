import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot password Page | Red0x CMS",
    description: "Enter your email and login to your account",
};

export default async function ForgotPasswordPage() {
    return (
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-left">
                    <h1 className="text-2xl font-semibold tracking-tight">Forgot Password</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your registered email and <br />
                        we will send you a link to reset your password.
                    </p>
                </div>
                <ForgotPasswordForm />
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