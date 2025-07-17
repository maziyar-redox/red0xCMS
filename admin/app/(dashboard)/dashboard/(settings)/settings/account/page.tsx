import { AccountForm } from "@/app/(dashboard)/_components/settings/account/account-form";
import { ContentSection } from "@/app/(dashboard)/_components/settings/content-section";
import { auth } from "@/auth";
import hashPassword from "@/lib/hash_generator";
import { paths } from "@/schema/schema";

import createClient from "openapi-fetch";

const WEB_HOOK_SECRET_KEY: string = process.env.WEB_HOOK_SECRET_KEY as string;

export default async function AccountPage() {
    const session = await auth();
    const client = createClient<paths>({ baseUrl: "http://127.0.0.1:8000" });
    const generateHash = hashPassword(WEB_HOOK_SECRET_KEY);
    const { data, error } = await client.POST("/v1/api/auth/user", {
        body: {
            web_hook_token: generateHash,
            id: session?.user.id as string
        },
    });
    return (
        <ContentSection
            title="Account"
            desc="Update your account settings. Set your preferred language and timezone."
        >
            <AccountForm
                is_guard={data?.is_guard as boolean}
            />
        </ContentSection>
    );
};