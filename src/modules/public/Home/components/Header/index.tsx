import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/useTheme";
import { ChevronsUp, Moon, Sun } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function Header() {
  const { toggleTheme, theme } = useTheme();
  const { scrollY } = useScroll();
  const [scrollYPos, setScrollYPos] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollYPos(latest);
  });

  const navItems = [
    { href: "#about", label: "Sobre" },
    { href: "#projects", label: "Projetos" },
    { href: "#skills", label: "Skills" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFeedback(null);

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedEmail || !trimmedMessage) {
      setError("Preencha e-mail e mensagem.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail, message: trimmedMessage }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message ?? "Não foi possível enviar sua mensagem.");
        return;
      }

      setFeedback(data?.message ?? "Mensagem enviada com sucesso!");
      setEmail("");
      setMessage("");
    } catch {
      setError("Erro ao enviar a mensagem. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-200 dark:border-white/5 bg-white/80 dark:bg-gray-950/80"
      >
        <div className="container flex items-center justify-between h-16">
          <a
            href="/#"
            className="text-2xl font-bold tracking-tight group text-gray-900 dark:text-white"
          >
            fabio
            <span className="text-emerald-500 dark:text-emerald-400 group-hover:text-glow transition-all">
              dev
            </span>
            <span className="text-emerald-500 dark:text-emerald-400 animate-pulse">
              _
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="relative px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-emerald-500 group-hover:w-1/2 transition-all duration-300" />
              </motion.a>
            ))}
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => setIsContactOpen(true)}
            >
              Contate-me
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={toggleTheme}
              size="icon"
              variant="ghost"
              className="text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-400/10"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      <motion.div
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 20 },
        }}
        transition={{ duration: 0.3 }}
        animate={scrollYPos > 400 ? "visible" : "hidden"}
        className="fixed right-6 bottom-6 z-50"
      >
        <a
          href="#"
          title="Voltar ao topo"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-sm hover:bg-emerald-500/30 transition-all"
        >
          <ChevronsUp className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
        </a>
      </motion.div>

      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Fale comigo
                </h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                  Envie seu e-mail e mensagem, logo darei um retorno.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsContactOpen(false);
                  setError(null);
                  setFeedback(null);
                }}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 dark:text-slate-200">
                  E-mail
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="bg-white border-gray-300 text-gray-900 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-gray-700 dark:text-slate-200">
                  Mensagem
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                />
              </div>
              {error && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {error}
                </p>
              )}
              {feedback && !error && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                  {feedback}
                </p>
              )}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-500 text-white hover:bg-emerald-600"
              >
                {submitting ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
