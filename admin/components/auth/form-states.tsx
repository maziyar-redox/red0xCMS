"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CiCircleCheck } from "react-icons/ci";
import { GoXCircle } from "react-icons/go";
import { cn } from "@/lib/utils";

type AuthStatusCardProps = {
    variant: "success" | "error";
    title: string;
    description: string;
    className?: string;
};

export function AuthStatusCard({
    variant,
    title,
    description,
    className,
}: AuthStatusCardProps) {
  return (
        <Card className={cn(
            "w-[380px] transition-all",
            variant === "success" && "bg-green-50/50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
            variant === "error" && "bg-red-50/50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
            className
        )}>
            <CardHeader>
                <div className="flex items-center space-x-1.5">
                    {variant === "success" ? (
                        <CiCircleCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                        <GoXCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                    <CardTitle className={cn(
                        variant === "success" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                        {title}
                    </CardTitle>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    );
};