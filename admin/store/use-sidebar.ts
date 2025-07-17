"use client";

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware";

type SidebarStore = {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>()(
    persist(
        (set, get) => ({
            isOpen: false,
            setIsOpen: (open) => set({ isOpen: open }),
        }),
        {
            name: "sidebar-status",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);