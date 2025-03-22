"use client";

import type React from "react";

import { useParams, Link } from "react-router-dom";
import { Posts } from "@/data/Posts";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import BlogLayout from "@/components/BlogLayout";

export default function PostBlog() {
  const { slug } = useParams<{ slug: string }>();
  const post = Posts.find((post) => post.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Post não encontrado</h1>
        <Button asChild>
          <Link to="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    );
  }

  return (
    <BlogLayout title={post.title}>
      <div className="container mx-auto py-12 max-w-4xl">
        <Button variant="ghost" asChild className="mb-8 gap-1">
          <a href="../">
            <ArrowLeftIcon className="h-4 w-4" /> Voltar para o blog
          </a>
        </Button>

        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="text-sm text-muted-foreground mb-2">
              {formatDate(post.date)}
            </div>
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground">{post.excerpt}</p>
          </div>

          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <>
              {post.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </>
          </div>
        </article>

        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold mb-6">
            Outros posts que você pode gostar
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {Posts.filter((p) => p.slug !== post.slug)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  to={`/posts/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="relative h-40 w-full mb-4 overflow-hidden rounded-lg">
                    <img
                      src={relatedPost.image || "/placeholder.svg"}
                      alt={relatedPost.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatDate(relatedPost.date)}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
