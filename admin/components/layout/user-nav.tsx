"use client";

import { LuBadgeCheck } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
import { BsChevronExpand } from "react-icons/bs";
import { IoPersonOutline, IoSettingsSharp } from "react-icons/io5";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { SingOut } from "@/actions/auth/signout";
import { useRouter } from "@bprogress/next";
import { DEFAULT_USER_REDIRECT } from "@/routes";
import { useSession } from "next-auth/react";
import { useIsMounted } from "usehooks-ts";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/toaster";

export function NavUser() {
    const { isMobile } = useSidebar();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const isMounted = useIsMounted();
    const { data: session } = useSession();
    const [showProfile, setShowProfile] = useState<boolean>(false);
    useEffect(() => {
        if (isMounted() && session?.user != undefined) {
            setShowProfile(true);
        };
    }, [isMounted, session]);
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            {
                                showProfile
                                ?
                                <>
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={session?.user.profile_pic} alt={`${session?.user?.first_name} ${session?.user?.last_name}`} />
                                        <AvatarFallback className="rounded-lg">SN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{`${session?.user?.first_name} ${session?.user?.last_name}`}</span>
                                        <span className="truncate text-xs">{session?.user?.email}</span>
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
                            <BsChevronExpand className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={session?.user.profile_pic} alt={`${session?.user?.first_name} ${session?.user?.last_name}`} />
                                    <AvatarFallback className="rounded-lg">SN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{`${session?.user?.first_name} ${session?.user?.last_name}`}</span>
                                    <span className="truncate text-xs">{session?.user?.email}</span>
                                </div>
                            </div>
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
            </SidebarMenuItem>
        </SidebarMenu>
    );
};