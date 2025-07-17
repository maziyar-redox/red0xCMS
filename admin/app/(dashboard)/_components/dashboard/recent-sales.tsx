"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentSales() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-wrap items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm leading-none font-medium">
                            Olivia Martin
                        </p>
                        <p className="text-muted-foreground text-sm">
                            olivia.martin@email.com
                        </p>
                    </div>
                    <div className="font-medium">
                        +$1,999.00
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-wrap items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm leading-none font-medium">
                            Olivia Martin
                        </p>
                        <p className="text-muted-foreground text-sm">
                            olivia.martin@email.com
                        </p>
                    </div>
                    <div className="font-medium">
                        +$1,999.00
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-wrap items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm leading-none font-medium">
                            Olivia Martin
                        </p>
                        <p className="text-muted-foreground text-sm">
                            olivia.martin@email.com
                        </p>
                    </div>
                    <div className="font-medium">
                        +$1,999.00
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-wrap items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm leading-none font-medium">
                            Olivia Martin
                        </p>
                        <p className="text-muted-foreground text-sm">
                            olivia.martin@email.com
                        </p>
                    </div>
                    <div className="font-medium">
                        +$1,999.00
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-wrap items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm leading-none font-medium">
                            Olivia Martin
                        </p>
                        <p className="text-muted-foreground text-sm">
                            olivia.martin@email.com
                        </p>
                    </div>
                    <div className="font-medium">
                        +$1,999.00
                    </div>
                </div>
            </div>
        </div>
    )
}