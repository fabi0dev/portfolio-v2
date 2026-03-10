"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DashboardDataProvider,
  type Message,
  type Project,
  type Skill,
} from "./dashboard-context";
import { ArrowRight } from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
};

type AuthState = {
  isAuthenticated: boolean | null;
};

function useDashboardAuth(): AuthState {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/messages", {
          method: "GET",
        });
        setIsAuthenticated(res.status !== 401);
      } catch {
        setIsAuthenticated(false);
      }
    }

    void checkAuth();
  }, []);

  return { isAuthenticated };
}

function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "Falha no login.");
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = "/dash";
      } else {
        router.refresh();
      }
    } catch {
      setError("Erro ao tentar autenticar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2 text-white">Login</h1>
        <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-medium tracking-wide text-emerald-300 mb-6">
          Bem vindo de volta!
        </span>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-200"
            >
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-100"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-200"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-100"
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            {isSubmitting ? "Aguarde..." : "Entrar"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

function Sidebar({
  unreadCount,
  onLogout,
}: {
  unreadCount: number;
  onLogout: () => void;
}) {
  const pathname = usePathname();

  const items = [
    {
      href: "/dash/inbox",
      label: "Caixa de entrada",
    },
    {
      href: "/dash/skills",
      label: "Skills",
    },
    {
      href: "/dash/projects",
      label: "Projetos",
    },
    {
      href: "/dash/visits",
      label: "Visitas",
    },
    {
      href: "/dash/settings",
      label: "Configurações",
    },
  ];

  return (
    <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 md:p-4">
      <nav className="flex flex-col gap-2">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dash" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group rounded-xl border px-3 py-2.5 text-xs transition-colors ${
                isActive
                  ? "border-emerald-500/70 bg-emerald-500/10 text-emerald-100 shadow-sm"
                  : "border-transparent bg-slate-950/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-medium">{item.label}</p>
                {item.href === "/dash/inbox" && unreadCount > 0 && (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                    {unreadCount}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={onLogout}
          className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-900"
        >
          Sair
        </button>
      </nav>
    </aside>
  );
}

export default function DashLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { isAuthenticated } = useDashboardAuth();

  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [skillsRes, projectsRes, messagesRes] = await Promise.all([
          fetch("/api/skills"),
          fetch("/api/projects"),
          fetch("/api/messages"),
        ]);

        if (
          skillsRes.status === 401 ||
          projectsRes.status === 401 ||
          messagesRes.status === 401
        ) {
          router.refresh();
          return;
        }

        const [skillsData, projectsData, messagesData] = await Promise.all([
          skillsRes.json(),
          projectsRes.json(),
          messagesRes.json(),
        ]);

        setSkills(skillsData);
        setProjects(projectsData);
        setMessages(messagesData);
      } catch {
        setError("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    if (isAuthenticated) {
      void load();
    }
  }, [isAuthenticated, router]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      if (typeof window !== "undefined") {
        window.location.href = "/dash";
      } else {
        router.refresh();
      }
    }
  }

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <p className="text-sm text-slate-400">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  const unreadCount = messages.filter((m) => m.status === "NEW").length;

  return (
    <DashboardDataProvider
      value={{
        skills,
        setSkills,
        projects,
        setProjects,
        messages,
        setMessages,
      }}
    >
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <div className="space-y-0.5">
              <h1 className="text-xl font-semibold text-slate-50 md:text-2xl">
                Dashboard
              </h1>
              <p className="text-xs text-slate-400 md:text-sm">
                Painel interno do seu portfólio.
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
            <Sidebar unreadCount={unreadCount} onLogout={handleLogout} />
            <section className="min-w-0">
              {loading ? (
                <p className="text-sm text-slate-400">Carregando dados...</p>
              ) : error ? (
                <p className="text-sm text-red-400">{error}</p>
              ) : (
                children
              )}
            </section>
          </div>
        </main>
      </div>
    </DashboardDataProvider>
  );
}
