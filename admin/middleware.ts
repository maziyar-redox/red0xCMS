import { AppRouteHandlerFn } from "@/node_modules/next-auth/lib/types";

import { NextResponse } from "next/server";

import { auth } from "@/auth";

import {
    PublicRoutes,
    ApiAuthPrefix,
    DEFAULT_LOGIN_REDIRECT,
    PrivateRoutes,
    DEFAULT_USER_REDIRECT
} from "@/routes";

export default auth((req) => {
    const { nextUrl, auth: session } = req;
    const isLoggedIn = !!session;
    const isApiAuthRoute = nextUrl.pathname.startsWith(ApiAuthPrefix);
    const isPublicRoute = PublicRoutes.includes(nextUrl.pathname);
    const isPrivateRoute = PrivateRoutes.includes(nextUrl.pathname);
    const isRootRoute = nextUrl.pathname === "/"
    if (isRootRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        } else {
            return NextResponse.redirect(new URL(DEFAULT_USER_REDIRECT, nextUrl));
        };
    };
    if (isApiAuthRoute) {
        return NextResponse.next();
    };
    if (isPrivateRoute) {
        if (isLoggedIn) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL(DEFAULT_USER_REDIRECT, nextUrl));
        };
    };
    if (isPublicRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        } else {
            return NextResponse.next();
        };
    };
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};