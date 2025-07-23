"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@repo/ui/components/sheet";
import { config } from "@/config/build-config";
import { cn } from "@repo/ui/lib/utils";
import { LuMenu } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
    name: string;
    href: string;
}

const menuItems: MenuItem[] = [
    { name: "Blog", href: "/" },
    { name: "About", href: "/about" },
];

export function Navigation() {
  const pathname = usePathname();
    return (
        <nav>
            <div className="hidden md:flex items-center">
                {menuItems.map((item) => (
                    <div key={item.href} className="ml-4 md:ml-8">
                        <Link
                            href={item.href}
                            className={cn(
                                "hover:opacity-50",
                                pathname === item.href && "font-semibold"
                            )}
                        >
                            {item.name}
                        </Link>
                    </div>
                ))}
            </div>
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <LuMenu size="24" />
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetDescription>
                                {menuItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "block py-2",
                                        pathname === item.href && "font-semibold"
                                    )}
                                >
                                    {item.name}
                                </Link>
                                ))}
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export function Header() {
    return (
        <section className="flex items-center justify-between mt-8 md:mt-16 mb-12">
            <Link href="/">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                    {config.blog.name}
                </h1>
            </Link>
            <Navigation />
        </section>
    );
};