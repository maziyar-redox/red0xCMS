import { userListSchema } from "@/app/(dashboard)/_components/users/data/schema";
import { users } from "@/app/(dashboard)/_components/users/data/users";
import { UsersPrimaryButtons } from "@/app/(dashboard)/_components/users/users-primary-buttons";
import { UsersTable } from "@/app/(dashboard)/_components/users/users-table";
import { columns } from "@/app/(dashboard)/_components/users/users-columns";
import { UsersDialogs } from "@/app/(dashboard)/_components/users/users-dialogs";
import UsersProvider from "@/app/(dashboard)/_components/users/context/users-context";

import { Main } from "@/components/layout/main";

export default function UsersPage() {
    const userList = userListSchema.parse(users);
    
    return (
        <UsersProvider>
            <Main>
                <div className="mb-2 flex flex-wrap items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">User List</h2>
                        <p className="text-muted-foreground">
                            Manage your users and their roles here.
                        </p>
                    </div>
                    <UsersPrimaryButtons />
                </div>
                <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12">
                    <UsersTable data={userList} columns={columns} />
                </div>
            </Main>
            <UsersDialogs />
        </UsersProvider>
    );
};