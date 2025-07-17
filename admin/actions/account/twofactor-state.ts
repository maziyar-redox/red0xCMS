"use server";

import { auth } from "@/auth";
import hashPassword from "@/lib/hash_generator";
import { accountTwoFASchema } from "@/schema";
import { paths } from "@/schema/schema";

import createClient from "openapi-fetch";
import { z } from "zod";

const WEB_HOOK_SECRET_KEY: string = process.env.WEB_HOOK_SECRET_KEY as string;

export async function TwoFactorState(twofa_state: z.infer<typeof accountTwoFASchema>) {
    const parsedData = accountTwoFASchema.safeParse(twofa_state);
    if (parsedData.error) {
        return { error: "Recive invalid schema." };
    };
    if (parsedData.success) {
        const session = await auth();
        const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
        const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
        const { data, error } = await client.POST("/v1/api/user/account/{action}", {
            params: {
                path: {
                    action: "twofa_state"
                },
            },
            body: {
                web_hook_token: generateHash,
                id: session?.user.id as string,
                is_guard: twofa_state.is_guard
            },
        });
        if (error) {
            return { error: "An error occured, try again." };
        };
        if (data) {
            return { success: "Success" }
        };
    };
};