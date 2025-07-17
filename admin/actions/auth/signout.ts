"use server";

import { signOut } from "@/auth";
import { DEFAULT_USER_REDIRECT } from "@/routes";
 
export async function SingOut() {
    try {
        const signOutHandler = await signOut({
            redirect: false,
            redirectTo: DEFAULT_USER_REDIRECT,
        });
        if (signOutHandler) {
            return { success: "Ok" };
        } else {
            return { error: "There is an error occured" };
        };
    } catch (err) {
        return { error: "Internal error" };
    };
};