import NextAuth, { NextAuthResult } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import createClient from "openapi-fetch";
import { JWT } from "next-auth/jwt";

import type { paths } from "@/schema/schema";
import hashPassword from "./lib/hash_generator";

declare module "next-auth" {
    interface User {
        id: string;
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        profile_pic: string;
    }
    interface Session {
        user: {
            id: string;
            first_name: string;
            last_name: string;
            username: string;
            email: string;
            profile_pic: string;
        }
    }
};

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        profile_pic: string;
        issuedAt: number;
    }
}

const WEB_HOOK_SECRET_KEY: string = process.env.WEB_HOOK_SECRET_KEY as string;

const nextAuth = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 2
    },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials, request) {
                const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
                const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
                const { data, error } = await client.POST("/v1/api/auth/login", {
                    body: {
                        web_hook_token: generateHash,
                        username: credentials.email as string,
                        password: credentials.password as string
                    },
                });
                return {
                    id: data?.id as string,
                    first_name: data?.first_name as string,
                    last_name: data?.last_name as string,
                    username: data?.username as string,
                    email: data?.email as string,
                    profile_pic: data?.profile_pic as string,
                };
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.first_name = user.first_name;
                token.last_name = user.last_name;
                token.username = user.username;
                token.profile_pic = user.profile_pic;
                token.exp = 60 * 60 * 2;
                token.issuedAt = Math.floor(Date.now() / 1000);
            };
            const now = Math.floor(Date.now() / 1000);
            const TOKEN_EXPIRY_SECONDS = 60 * 60 * 2;
            if (token.issuedAt && (now - token.issuedAt > TOKEN_EXPIRY_SECONDS)) {
                return null;
            }
            return token;
        },
        async session({ session, token }) {
            const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
            const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
            const { data, error } = await client.POST("/v1/api/auth/user", {
                body: {
                    web_hook_token: generateHash,
                    id: token.id
                },
            });
            session.user.id = data?.id as string;
            session.user.email = data?.email as string;
            session.user.first_name = data?.first_name as string;
            session.user.last_name = data?.last_name as string;
            session.user.username = data?.username as string;
            session.user.profile_pic = data?.profile_pic as string;
            return session;
        },
    }
});

export const handlers: NextAuthResult["handlers"] = nextAuth.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuth.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuth.signOut;
export const auth: NextAuthResult["auth"] = nextAuth.auth;