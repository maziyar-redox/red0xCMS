import { Main } from "@/components/layout/main";
import { Apps } from "@/app/(dashboard)/_components/apps/apps";

export default function AppsPage() {
    return (
       <Main fixed>
            <div>
                <h1 className="text-2xl font-bold tracking-tight">
                    App Integrations
                </h1>
                <p className="text-muted-foreground">
                    Here&apos;s a list of your apps for the integration!
                </p>
            </div>
            <Apps />
        </Main>
    );
};