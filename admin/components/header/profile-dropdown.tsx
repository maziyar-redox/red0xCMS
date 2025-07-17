"use client";

import { LuBadgeCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { BsChevronExpand } from "react-icons/bs";
import { IoPersonOutline, IoSettingsSharp } from "react-icons/io5";

import { SingOut } from "@/actions/auth/signout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_USER_REDIRECT } from "@/routes";
import { useRouter } from "@bprogress/next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useIsMounted } from "usehooks-ts";
import { Skeleton } from "../ui/skeleton";
import { Toaster } from "../toaster";

export function ProfileDropdown() {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { data: session } = useSession();
    const isMounted = useIsMounted();
    const [showProfile, setShowProfile] = useState<boolean>(false);
    useEffect(() => {
        if (isMounted() && session?.user != undefined) {
            setShowProfile(true);
        };
    }, [isMounted, session]);
    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={session?.user.profile_pic} alt={`${session?.user.first_name} ${session?.user.last_name}`} />
                        <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    {
                        showProfile
                        ?
                        <>
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm leading-none font-medium">{`${session?.user.first_name} ${session?.user.last_name}`}</p>
                                <p className="text-muted-foreground text-xs leading-none">
                                    {session?.user.email}
                                </p>
                            </div>
                        </>
                        :
                        <>
                            <div className="flex items-center justify-center gap-x-2 w-full">
                                <Skeleton className="h-9 w-9 rounded-md" />
                                <div className="space-y-2 w-full">
                                    <Skeleton className="h-4" />
                                    <Skeleton className="h-4" />
                                </div>
                            </div>
                        </>
                    }
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/settings/account">
                            <LuBadgeCheck />
                            Account
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings">
                            <IoPersonOutline />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings/settings">
                            <IoSettingsSharp />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => {
                    startTransition(async () => {
                        try {
                            await SingOut();
                            router.push(DEFAULT_USER_REDIRECT);
                        } catch (err) {
                            Toaster(
                                "Something went wrong!",
                                "There was an error while parsing your signout request"
                            );
                        };
                    });
                }}>
                    <FiLogOut />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};