"use client";

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware";

type OtpStore = {
    username: string;
    password: string;
    setUsername: (user: string, pass: string) => void;
};

export const useOtpStore = create<OtpStore>()(
    persist(
        (set, get) => ({
            username: "",
            password: "",
            setUsername: (user, pass) => set({
                username: user,
                password: pass
            }),
        }),
        {
            name: "username-status",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);