import { ContentSection } from "@/app/(dashboard)/_components/settings/content-section";
import { ProfileForm } from "@/app/(dashboard)/_components/settings/profile/profile-form";

export default async function SettingsPage() {
    return (
        <ContentSection
            title="Profile"
            desc="This is how others will see you on the site."
        >
            <ProfileForm />
        </ContentSection>
    );
};