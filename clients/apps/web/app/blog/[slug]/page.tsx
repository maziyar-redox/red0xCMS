import { BlogPostContent } from "@/components/BlogPostContent";
import { CommentSection } from "@/components/CommentSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RelatedPosts } from "@/components/RelatedPosts";
import { config } from "@/config/build-config";
import { signOgImageUrl } from "@/lib/og-image";
import { notFound } from "next/navigation";
import type { BlogPosting, WithContext } from "schema-dts";

export async function generateMetadata(props: { params: Promise<Params> }) {
    const params = await props.params;
    const { slug } = params;
    const result = await wisp.getPost(slug);
    if (!result || !result.post) {
        return {
            title: "Blog post not found",
        };
    };
    const { title, description, image } = result.post;
    const generatedOgImage = signOgImageUrl({ title, brand: config.blog.name });
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: image ? [generatedOgImage, image] : [generatedOgImage],
        },
    };
};

interface Params {
    slug: string;
};

export default async function Page(props: { params: Promise<Params> }) {
    const params = await props.params;
    const { slug } = params;
    const result = await wisp.getPost(slug);
    const { posts } = await wisp.getRelatedPosts({ slug, limit: 3 });
    if (!result || !result.post) {
        return notFound();
    }
    const { title, publishedAt, updatedAt, image, author } = result.post;
    const jsonLd: WithContext<BlogPosting> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        image: image ? image : undefined,
        datePublished: publishedAt ? publishedAt.toString() : undefined,
        dateModified: updatedAt.toString(),
        author: {
            "@type": "Person",
            name: author.name ?? undefined,
            image: author.image ?? undefined,
        },
    };
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-5">
                <Header />
                <div className="max-w-prose mx-auto text-xl">
                    <BlogPostContent post={result.post} />
                    <RelatedPosts posts={posts} />
                    <CommentSection slug={slug} />
                </div>
                <Footer />
            </div>
        </>
    );
};