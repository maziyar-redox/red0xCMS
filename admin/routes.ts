/**
 * An array of accessible routes to public users.
 * All users can see these routes except private users.
 * @type {string[]}
*/
export const PublicRoutes = [
    "/auth/sign-in",
    "/auth/sign-up",
    "/auth/forgot-password",
    "/auth/otp"
];

/**
 * An array of accessible routes to private users.
 * All users can see these routes except public users.
 * @type {string[]}
*/
export const PrivateRoutes = [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/tasks",
    "/dashboard/blogs",
    "/dashboard/blogs/new-blog",
    "/dashboard/settings",
    "/dashboard/settings/account",
    "/dashboard/settings/appearance",
];

/**
 * Api authentication route that accessible for all users.
 * All users can see these routes
 * @type {string}
*/
export const ApiAuthPrefix = "/api/auth";

/**
 * Default redirection route after login
 * @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";


/**
 * Default redirection route before login
 * @type {string}
*/
export const DEFAULT_USER_REDIRECT = "/auth/sign-in";