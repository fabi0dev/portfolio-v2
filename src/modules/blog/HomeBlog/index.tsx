import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import { Posts } from "@/data/Posts";
import { Button } from "@/components/ui/button";
import BlogLayout from "@/components/BlogLayout";

export default function HomePage() {
  return (
    <BlogLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="flex flex-col items-center text-center space-y-2 mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight lg:text-3xl">
            Fábio Costa / Blog
          </h1>
          <div className="text-xl text-muted-foreground max-w-[700px]">
            Um espaço para ideias sobre desenvolvimento.
          </div>
        </section>

        <div className="space-y-12">
          {Posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col md:flex-row gap-8 border-b pb-12"
            >
              <div className="flex flex-col md:w-2/3">
                <div className="text-sm text-muted-foreground mb-2">
                  {formatDate(post.date)}
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  <Link
                    to={`/blog/post/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <p className="mb-4">{post.content.substring(0, 200)}...</p>
                <div className="mt-auto">
                  <Button asChild>
                    <Link to={`/blog/post/${post.slug}`}>Ler mais</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </BlogLayout>
  );
}
