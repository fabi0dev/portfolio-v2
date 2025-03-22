import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Link } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";

export default function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed top-4 left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-full bg-background/80 backdrop-blur-sm border-primary/20"
        >
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
            className="h-5 w-5"
          >
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16" />
            )}
          </svg>
        </Button>
      </div>

      <aside
        className={`
          bg-background/80 backdrop-blur-sm  w-full md:w-64 
          fixed md:sticky top-0 h-screen overflow-y-auto z-40
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full p-6">
          <Link to={"/blog"}>
            <div className="text-center">
              <img
                src="/profile-pic.png"
                className="border-[4px] border-black rounded-full w-[60px] mx-auto"
              />
              <div className="text-xs font-bold">
                @fabio<span className="text-green-500">dev</span>
              </div>
            </div>
          </Link>

          {/*   <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-10 bg-muted/50 border-primary/10 focus-visible:ring-primary/20"
            />
          </div> */}

          <div className="mt-auto pt-6 flex justify-between items-center">
            <span className="text-sm text-foreground/80">
              © {new Date().getFullYear()} Fábio Costa
            </span>
            <ModeToggle />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
