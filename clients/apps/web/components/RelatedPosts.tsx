"use client";

import { AspectRatio } from "@repo/ui/components/aspect-ratio";

import Image from "next/image";
import Link from "next/link";

export function RelatedPosts() {
    const posts = [
        {
            id: 1,
            slug: "a",
            image: "",
            title: "test",
            description: "ok"
        }
    ];
    if (posts.length === 0) {
        return null;
    };
    return (
        <div className="my-8">
            <div className="mb-6 text-lg font-semibold tracking-tight">
                Related Posts
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {posts.slice(0, 3).map((post) => (
                    <div className=" bg-muted overflow-hidden rounded-lg" key={post.id}>
                        <Link href={`/blog/${post.slug}`}>
                        <AspectRatio ratio={16 / 9} className="w-full">
                            <Image
                            src={post.image || "/images/placeholder.png"}
                            alt={post.title}
                            fill
                            className="h -full min-h-full min-w-full object-cover object-center"
                            />
                        </AspectRatio>
                        </Link>
                        <div className="prose prose-sm dark:prose-invert p-4">
                        <h3 className="line-clamp-2">{post.title}</h3>
                        <p className="line-clamp-3">{post.description}</p>
                        <Link href={`/blog/${post.slug}`}>
                            <strong>Read Full Story</strong>
                        </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};