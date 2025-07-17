import { NewBlogComponent } from "@/app/(dashboard)/_components/new-blog/new-blog";
import { EditorSection } from "@/app/(dashboard)/_components/new-blog/section";
import { Main } from "@/components/layout/main";

export default function NewBlogPage() {
    return (
        <>
            <Main className="space-y-4">
                <NewBlogComponent />
                <div className="flex flex-1 flex-col">
                    <div className="container-wrapper section-soft flex-1 pb-6">
                        <div className="//container overflow-hidden">
                            <EditorSection />
                        </div>
                    </div>
                </div>
            </Main>
        </>
    );
};