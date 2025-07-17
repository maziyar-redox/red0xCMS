import { AuthenticatedLayout } from "@/components/layout/authenticated-layout";
import { Header } from "@/components/layout/header";
import { ProfileDropdown } from "@/components/header/profile-dropdown";
import { Search } from "@/components/header/search";
import { ThemeSwitch } from "@/components/theme-switch";

import { Main } from "@/components/layout/main";

import { DashboardComponent } from "../_components/dashboard/dashboard";

export default function DashboardHome() {
    return (
        <>
            <AuthenticatedLayout>
                <Header>
                    <Search />
                    <div className="ml-auto flex items-center space-x-4">
                        <ThemeSwitch />
                        <ProfileDropdown />
                    </div>
                </Header>
                <Main>
                    <DashboardComponent />
                </Main>
            </AuthenticatedLayout>
        </>
    );
};