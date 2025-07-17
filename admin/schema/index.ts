import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
        .string()
        .min(6, { message: "Please enter your email" })
        .email({ message: "Invalid email address" }),
    password: z
        .string()
        .min(8, {
        message: "Password must be at least 7 characters long",
        })
        .max(64, {
            message: "Password should not be more than 64 characters long"
        }),
});

export const registerFormSchema = z.object({
    email: z
        .string()
        .min(6, { message: "Please enter your email" })
        .max(32, { message: "Invalid email length" })
        .email({ message: "Invalid email address" }),
    first_name: z
        .string()
        .min(3, {
        message: "Please enter your firstname",
        })
        .max(12, {
        message: "Firstname must be at least 7 characters long",
        }),
    last_name: z
        .string()
        .min(3, {
        message: "Please enter your Lastname",
        })
        .max(12, {
        message: "Lastname must be at least 7 characters long",
        }),
    username: z
        .string()
        .min(4, {
        message: "Please enter your username",
        })
        .max(8, {
        message: "username must be at least 7 characters long",
        }),
    password: z
        .string()
        .min(8, {
        message: "Please enter your password",
        })
        .max(64, {
        message: "Password must be at least 7 characters long",
        }),
    confirm_password: z
        .string()
        .min(8, {
        message: "Please enter your password",
        })
        .max(64, {
        message: "Password must be at least 7 characters long",
        }),
});

export const forgotPasswordFormSchema = z.object({
    email: z
        .string()
        .min(6, { message: "Please enter your email" })
        .max(32, { message: "Invalid email length" })
        .email({
            message: "Invalid email address"
        }),
});

export const resetPasswordFormSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Please enter your password" })
        .max(64, { message: "Invalid password length" }),
    confirm_password: z
        .string()
        .min(8, { message: "Please enter your password" })
        .max(64, { message: "Invalid password length" }),
    token: z.string()
});

export const otpFormSchema = z.object({
    otp: z.string().min(6).max(6),
    username: z.string().min(6, { message: "Please enter your email" }).max(32, { message: "Invalid email length" }),
    password: z.string().min(8, { message: "Please enter your password" }).max(64, { message: "Invalid password length" })
});

export const resendOtpSchema = z.object({
    username: z.string().min(6, { message: "Please enter your email" }).max(32, { message: "Invalid email length" }),
});

export const profileFormSchema = z.object({
    email: z
        .string()
        .min(6, { message: "Please enter your email" })
        .max(32, { message: "Invalid email length" })
        .email({ message: "Invalid email address" }),
    first_name: z
        .string()
        .min(3, {
        message: "Please enter your firstname",
        })
        .max(12, {
        message: "Firstname must be at least 7 characters long",
        }),
    last_name: z
        .string()
        .min(3, {
        message: "Please enter your Lastname",
        })
        .max(12, {
        message: "Lastname must be at least 7 characters long",
        }),
    username: z
        .string()
        .min(4, {
        message: "Please enter your username",
        })
        .max(8, {
        message: "username must be at least 7 characters long",
        }),
})

export const accountTwoFASchema = z.object({
    is_guard: z.boolean({ message: "Enter a value" })
});