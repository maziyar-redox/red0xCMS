import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@repo/ui/globals.css";
import { ThemeProvider } from "@repo/ui/providers/theme-provider";
import { Toaster } from "@repo/ui/components/sonner";

import { config } from "@/config/build-config";
import { signOgImageUrl } from "@/lib/og-image";
import { cn } from "@repo/ui/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/styles/globals.css";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: {
        absolute: config.blog.metadata.title.absolute,
        default: config.blog.metadata.title.default,
        template: config.blog.metadata.title.template,
    },
    description: config.blog.metadata.description,
    openGraph: {
        title: config.blog.metadata.title.default,
        description: config.blog.metadata.description,
        images: [
            signOgImageUrl({
                title: config.blog.name,
            }),
        ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const queryClient = new QueryClient();
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="font-sans antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryClientProvider client={queryClient}>
                        {children}
                    </QueryClientProvider>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
};