"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("As senhas novas não coincidem.");
      return;
    }

    if (newPassword.length < 8) {
      setError("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!res.ok) {
        setError(data?.message ?? "Não foi possível alterar a senha.");
        return;
      }

      setSuccess(data?.message ?? "Senha alterada com sucesso.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("Erro ao tentar alterar a senha. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-100">
          Configurações
        </h1>
        <p className="text-sm text-slate-400">
          Atualize sua senha de acesso ao dashboard.
        </p>
      </div>

      <div className="max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-sm font-medium text-slate-100">
          Alterar senha
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="currentPassword"
              className="text-xs font-medium text-slate-200"
            >
              Senha atual
            </label>
            <Input
              id="currentPassword"
              type="password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-100"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="newPassword"
              className="text-xs font-medium text-slate-200"
            >
              Nova senha
            </label>
            <Input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-100"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-medium text-slate-200"
            >
              Confirmar nova senha
            </label>
            <Input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-slate-950 border-slate-800 text-slate-100"
              required
            />
          </div>

          {error && (
            <p className="text-xs font-medium text-red-400">{error}</p>
          )}
          {success && (
            <p className="text-xs font-medium text-emerald-400">{success}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-500 text-black hover:bg-emerald-400 disabled:opacity-80"
          >
            {isSubmitting ? "Salvando..." : "Salvar nova senha"}
          </Button>
        </form>
      </div>
    </div>
  );
}

