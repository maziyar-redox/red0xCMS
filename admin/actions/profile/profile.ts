"use server";

import { profileFormSchema } from "@/schema";
import type { paths } from "@/schema/schema";
import hashPassword from "@/lib/hash_generator";
import { auth } from "@/auth";

import { z } from "zod";
import createClient from "openapi-fetch";

const WEB_HOOK_SECRET_KEY: string = process.env.WEB_HOOK_SECRET_KEY as string;

export async function Profile(profile_data: z.infer<typeof profileFormSchema>) {
    const parsedData = profileFormSchema.safeParse(profile_data);
    if (parsedData.error) {
        return { error: "Recive invalid schema." };
    };
    if (parsedData.success) {
        const session = await auth();
        const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
        const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
        const { data, error } = await client.POST("/v1/api/user/profile/{action}", {
            params: {
                path: {
                    action: "update_profile"
                },
            },
            body: {
                web_hook_token: generateHash,
                id: session?.user.id as string,
                first_name: profile_data.first_name,
                last_name: profile_data.last_name,
                username: profile_data.username,
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