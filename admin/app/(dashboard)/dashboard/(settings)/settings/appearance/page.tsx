import { AppearanceForm } from "@/app/(dashboard)/_components/settings/appearance/appearance-form";
import { ContentSection } from "@/app/(dashboard)/_components/settings/content-section";

export default async function AppearancePage() {
    return (
        <ContentSection
            title="Appearance"
            desc="Customize the appearance of the app. Automatically switch between day and night themes."
        >
            <AppearanceForm />
        </ContentSection>
    );
};