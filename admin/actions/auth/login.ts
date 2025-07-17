"use server";

import { z } from "zod";
import createClient from "openapi-fetch";

import { loginFormSchema } from "@/schema";
import { signIn } from "@/auth";
import type { paths } from "@/schema/schema";
import hashPassword from "@/lib/hash_generator";

const WEB_HOOK_SECRET_KEY: string = process.env.WEB_HOOK_SECRET_KEY as string;
 
export async function Login(loginData: z.infer<typeof loginFormSchema>) {
    const parsedData = loginFormSchema.safeParse(loginData);
    if (parsedData.error) {
        return { error: "Recive invalid schema." };
    };
    if (parsedData.success) {
        const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
        const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
        const { data, error } = await client.POST("/v1/api/auth/login", {
            body: {
                web_hook_token: generateHash,
                username: parsedData.data.email,
                password: parsedData.data.password
            },
        });
        if (error) {
            return { error: `An error occured, ${typeof(error.detail) === "string" ? error.detail : "try again."}` };
        };
        if (data) {
            if (data.is_otp === false) {
                await signIn("credentials", {
                    email: parsedData.data.email,
                    password: parsedData.data.password,
                    redirect: false,
                    redirectTo: "/dashboard"
                });
                return { success: `Wellcome ${data.first_name}` };
            };
            if (data.is_otp === true) {
                return { otp: true };
            };
        };
    };
};