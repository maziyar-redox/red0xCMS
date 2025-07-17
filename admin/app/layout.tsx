import { ThemeProvider } from "@/provider/theme-provider";
import { BprogressProvider } from "@/provider/bprogress-provider";

import { Toaster } from "@/components/ui/sonner";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Root Layout",
    description: "Auto generated root layout",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "antialiased",
                    inter.className
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <BprogressProvider>
                        <Loader>
                            {children}
                            <Toaster />
                        </Loader>
                    </BprogressProvider>
                </ThemeProvider>
            </body>
        </html>
    );
};