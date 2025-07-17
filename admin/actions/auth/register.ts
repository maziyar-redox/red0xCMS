"use server";

import { z } from "zod";
import createClient from "openapi-fetch";

import { registerFormSchema } from "@/schema";
import { signIn } from "@/auth";
import type { paths } from "@/schema/schema";
import hashPassword from "@/lib/hash_generator";
 
const WEB_HOOK_SECRET_KEY: string = process.env.WEB_HOOK_SECRET_KEY as string;

export async function Register(registerData: z.infer<typeof registerFormSchema>) {
    const parsedData = registerFormSchema.safeParse(registerData);
    if (parsedData.error) {
        return { error: "Recived invalid schema." };
    };
    if (parsedData.success) {
        const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
        const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
        const { data, error } = await client.POST("/v1/api/auth/register", {
            body: {
                web_hook_token: generateHash,
                email: parsedData.data.email,
                username: parsedData.data.username,
                first_name: parsedData.data.first_name,
                last_name: parsedData.data.last_name,
                password: parsedData.data.password
            },
        });
        if (error) {
            return { error: `An error occured, $${typeof(error.detail) === "string" ? error.detail : "try again."}` };
        };
        if (data) {
            await signIn("credentials", {
                email: parsedData.data.email,
                password: parsedData.data.password,
                redirect: false,
                redirectTo: "/dashboard"
            });
            return { success: `${data.detail}` };
        };
    };
};