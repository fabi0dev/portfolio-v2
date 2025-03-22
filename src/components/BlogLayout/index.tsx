import type { ReactNode } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Helmet } from "react-helmet-async";
import { Site } from "@/data/Site";
import { cn } from "@/lib/utils";

interface BlogLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function BlogLayout({
  title = "",
  description,
  children,
}: BlogLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Helmet>
        <title>
          {title} {title && "|"} {Site.Title} / Blog
        </title>
        {description && <meta name="description" content={description} />}
      </Helmet>

      {title && <Sidebar />}

      <div className="flex-1 flex flex-col">
        {!title && (
          <div
            className="flex bg-gray-900 p-2 h-[280px] relative"
            style={{
              backgroundImage: "url(/cover.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className={cn(
                " absolute left-1/2 -translate-x-1/2 translate-y-1/2",
                " -bottom-0 w-[150px] h-[150px] overflow-hidden",
                ""
              )}
            >
              <img
                src="/profile-pic.png"
                className="border-[5px] border-gray-950 rounded-full"
              />
              <div className="text-red-500 mt-20">Fábio Costa</div>
            </div>
          </div>
        )}

        <div className="h-[50px]"></div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
