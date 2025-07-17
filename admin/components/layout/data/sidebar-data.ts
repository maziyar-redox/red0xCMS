import {
    GalleryVerticalEnd,
    LayoutDashboard,
    ListCheck,
    Boxes,
    MessagesSquare,
    Users,
    BadgeQuestionMark,
    Settings,
    UserCog,
    Wrench,
    Palette,
    Bell,
    PanelTop,
    Scroll,
    NotebookText,
    PencilLine
} from "lucide-react";

import { type SidebarData } from "@/components/layout/types";

import { IoPersonOutline } from "react-icons/io5";
import { FiTool } from "react-icons/fi";
import { MdOutlinePalette } from "react-icons/md";
import { PiNotification } from "react-icons/pi";
import { TbBrowserCheck } from "react-icons/tb";

export const sidebarNavItems = [
    {
        title: "Profile",
        icon: IoPersonOutline,
        href: "/dashboard/settings",
    },
    {
        title: "Account",
        icon: FiTool,
        href: "/dashboard/settings/account",
    },
    {
        title: "Appearance",
        icon: MdOutlinePalette,
        href: "/dashboard/settings/appearance",
    },
];

export const sidebarData: SidebarData = {
    teams: [
        {
            name: "Red0x Blog",
            logo: GalleryVerticalEnd,
            plan: "Main Workplace",
        },
    ],
    navGroups: [
        {
            title: "General",
            items: [
                {
                    title: "Dashboard",
                    url: "/dashboard",
                    icon: LayoutDashboard,
                },
                {
                    title: "Tasks",
                    url: "/dashboard/tasks",
                    icon: ListCheck,
                },
                {
                    title: "Apps",
                    url: "/dashboard/apps",
                    icon: Boxes,
                },
                {
                    title: "Chats",
                    url: "/dashboard/chats",
                    badge: "3",
                    icon: MessagesSquare,
                },
                {
                    title: "Users",
                    url: "/dashboard/users",
                    icon: Users,
                },
            ],
        },
        {
            title: "Pages",
            items: [
                {
                    title: "Blog",
                    icon: NotebookText,
                    items: [
                        {
                            title: "Manage Blogs",
                            url: "/dashboard/blogs",
                            icon: Scroll
                        },
                        {
                            title: "Create new blog",
                            url: "/dashboard/blogs/new-blog",
                            icon: PencilLine
                        },
                    ],
                },
            ],
        },
        {
            title: "Other",
            items: [
                {
                    title: "Settings",
                    icon: Settings,
                    items: [
                        {
                        title: "Profile",
                        url: "/dashboard/settings",
                        icon: UserCog,
                        },
                        {
                        title: "Account",
                        url: "/dashboard/settings/account",
                        icon: Wrench,
                        },
                        {
                        title: "Appearance",
                        url: "/dashboard/settings/appearance",
                        icon: Palette,
                        },
                    ],
                },
                {
                    title: "Help Center",
                    url: "/dashboard/help-center",
                    icon: BadgeQuestionMark,
                },
            ],
        },
    ],
};