import type { KnipConfig } from "knip";

const config: KnipConfig = {
    ignore: ["components/ui/**"],
    ignoreDependencies: ["tailwindcss", "tw-animate-css"]
};

export default config;