import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register Page | Red0x CMS",
    description: "Register and login with your account",
};


import { UserRegisterForm } from "@/components/auth/user-register-form";

export default async function SignUpPage() {
    return (
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-left">
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your email and password to create an account.<br />
                        Already have an account?{' '}
                        <Link
                            href="/auth/sign-in"
                            className="hover:text-primary underline underline-offset-4"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
                <UserRegisterForm />
                <p className="text-muted-foreground px-8 text-center text-sm">
                    By creating an account, you agree to our{' '}
                    <a
                        href="/terms"
                        className="hover:text-primary underline underline-offset-4"
                    >
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                        href="/privacy"
                        className="hover:text-primary underline underline-offset-4"
                    >
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};