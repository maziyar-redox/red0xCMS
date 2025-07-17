"use server";

import { z } from "zod";
import createClient from "openapi-fetch";

import { forgotPasswordFormSchema } from "@/schema";
import type { paths } from "@/schema/schema";
import hashPassword from "@/lib/hash_generator";

const WEB_HOOK_SECRET_KEY: string = process.env.WEB_HOOK_SECRET_KEY as string;
 
export async function ForgotPassword(emailData: z.infer<typeof forgotPasswordFormSchema>) {
    const parsedData = forgotPasswordFormSchema.safeParse(emailData);
    if (parsedData.error) {
        return { error: "Recive invalid schema." };
    };
    if (parsedData.success) {
        const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
        const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
        const { data, error } = await client.POST("/v1/api/auth/forgot-password", {
            body: {
                web_hook_token: generateHash,
                username: parsedData.data.email,
            },
        });
        if (error) {
            return { error: `An error occured, ${typeof(error.detail) === "string" ? error.detail : "try again."}` };
        };
        if (data) {
            return { success: `Forgot password link has been sent to your email, Check your email` };
        };
    };
};