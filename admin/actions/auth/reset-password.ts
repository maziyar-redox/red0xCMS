"use server";

import { z } from "zod";
import createClient from "openapi-fetch";

import type { paths } from "@/schema/schema";
import hashPassword from "@/lib/hash_generator";
import { resetPasswordFormSchema } from "@/schema";

const WEB_HOOK_SECRET_KEY: string = process.env.WEB_HOOK_SECRET_KEY as string;
 
export async function ResetPassword(passwordData: z.infer<typeof resetPasswordFormSchema>) {
    const parsedData = resetPasswordFormSchema.safeParse(passwordData);
    if (parsedData.error) {
        return { error: "Recive invalid schema." };
    };
    if (parsedData.success) {
        const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
        const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
        const { data, error } = await client.POST("/v1/api/auth/reset-password", {
            body: {
                web_hook_token: generateHash,
                password: parsedData.data.password,
                token: parsedData.data.token,
            },
        });
        if (error) {
            return { error: `An error occured, ${typeof(error.detail) === "string" ? error.detail : "try again."}` };
        };
        if (data) {
            return { success: `Password has been reset successfuly.` };
        };
    };
};