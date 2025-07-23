"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "next-themes";

export function DarkModeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // When the component mounts on the client, update the state to indicate it is mounted
        setMounted(true);
    }, []);
    const toggleDarkMode = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };
    // Render nothing on the server
    if (!mounted) return null;
    // Once the component has mounted, we can safely render
    return (
        <Button variant="ghost" onClick={toggleDarkMode} className="p-2">
            {resolvedTheme === "dark" ? (
                <LuMoon className="w-4 h-4" />
            ) : (
                <LuSun className="w-4 h-4" />
            )}
        </Button>
    );
};