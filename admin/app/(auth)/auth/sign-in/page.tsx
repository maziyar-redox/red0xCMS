import { UserAuthForm } from "@/components/auth/user-auth-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login Page | Red0x CMS",
    description: "Login to your account",
};


export default async function SignInPage() {
    return (
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-left">
                    <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your email and password below <br />
                        to log into your account
                    </p>
                </div>
                <UserAuthForm />
                <p className="text-muted-foreground px-8 text-center text-sm">
                    By clicking login, you agree to our{' '}
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