"use client";

import { useEffect, useState } from "react";

type Visit = {
  id: string;
  path: string;
  ip: string | null;
  userAgent: string | null;
  durationMs: number | null;
  createdAt: string;
};

type VisitsResponse = {
  total: number;
  visits: Visit[];
};

export default function VisitsPage() {
  const [data, setData] = useState<VisitsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/analytics/visits");
        if (!res.ok) {
          throw new Error("Erro ao buscar visitas");
        }
        const json = (await res.json()) as VisitsResponse;
        setData(json);
      } catch {
        setError("Erro ao carregar visitas.");
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  const totalDurationSeconds =
    data?.visits.reduce(
      (acc, v) => acc + (v.durationMs ? v.durationMs / 1000 : 0),
      0,
    ) ?? 0;

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Visitas ao site
          </h2>
          <p className="text-xs text-slate-400">
            Estatísticas básicas de visitas, tempo de permanência e navegador.
          </p>
        </div>
        {data && (
          <div className="flex flex-wrap gap-3 text-xs text-slate-300">
            <span className="rounded-full bg-slate-800 px-3 py-1">
              Total de visitas registradas:{" "}
              <strong className="text-slate-100">{data.total}</strong>
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1">
              Tempo total somado:{" "}
              <strong className="text-slate-100">
                {Math.round(totalDurationSeconds)}s
              </strong>
            </span>
          </div>
        )}
      </div>

      {loading ? (
        <p className="text-xs text-slate-400">Carregando visitas...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : !data || data.visits.length === 0 ? (
        <p className="text-xs text-slate-400">
          Nenhuma visita registrada ainda.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60">
          <table className="min-w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-[11px] uppercase text-slate-400">
              <tr>
                <th className="px-3 py-2">Data</th>
                <th className="px-3 py-2">Caminho</th>
                <th className="px-3 py-2">Duração</th>
                <th className="px-3 py-2">IP</th>
                <th className="px-3 py-2">Navegador</th>
              </tr>
            </thead>
            <tbody>
              {data.visits.map((visit) => (
                <tr
                  key={visit.id}
                  className="border-t border-slate-800/80 hover:bg-slate-900/80"
                >
                  <td className="px-3 py-2 align-top">
                    {new Date(visit.createdAt).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-3 py-2 align-top font-mono text-[11px] text-emerald-300">
                    {visit.path}
                  </td>
                  <td className="px-3 py-2 align-top">
                    {visit.durationMs != null
                      ? `${Math.round(visit.durationMs / 1000)}s`
                      : "—"}
                  </td>
                  <td className="px-3 py-2 align-top">
                    {visit.ip ?? "—"}
                  </td>
                  <td className="px-3 py-2 align-top max-w-xs">
                    <span className="line-clamp-2" title={visit.userAgent ?? ""}>
                      {visit.userAgent ?? "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

