import { OtpForm } from "@/components/auth/otp-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Otp Verification Page | Red0x CMS",
    description: "Verify otp and login your account",
};

export default async function OtpPage() {
    return (
        <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
                <OtpForm />
            </div>
        </div>
    );
};