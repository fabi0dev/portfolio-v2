"use client";

import { useEffect, useState } from "react";
import {
  getBrowserName,
  getDeviceInfo,
} from "@/app/dash/_utils/user-agent";

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

type DateRangeKey = "day" | "week" | "month" | "3months" | "6months" | "year";

export default function VisitsPage() {
  const [data, setData] = useState<VisitsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeKey>("week");
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

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

  const filteredVisits =
    data?.visits.filter((visit: Visit) => {
      const visitDate = new Date(visit.createdAt);
      if (Number.isNaN(visitDate.getTime())) return false;

      const now = new Date();
      const start = new Date(now);

      switch (dateRange) {
        case "day":
          start.setDate(now.getDate() - 1);
          break;
        case "week":
          start.setDate(now.getDate() - 7);
          break;
        case "month":
          start.setMonth(now.getMonth() - 1);
          break;
        case "3months":
          start.setMonth(now.getMonth() - 3);
          break;
        case "6months":
          start.setMonth(now.getMonth() - 6);
          break;
        case "year":
          start.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }

      return visitDate >= start && visitDate <= now;
    }) ?? [];

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
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
        <div className="flex flex-col gap-1">
          <label htmlFor="date-range" className="text-[11px] text-slate-400">
            Período
          </label>
          <select
            id="date-range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as DateRangeKey)}
            className="rounded-md border border-slate-800 bg-slate-900/80 px-2 py-1 text-xs text-slate-100 outline-none focus:border-emerald-500"
          >
            <option value="day">Hoje</option>
            <option value="week">Últimos 7 dias</option>
            <option value="month">Últimos 30 dias</option>
            <option value="3months">Últimos 3 meses</option>
            <option value="6months">Últimos 6 meses</option>
            <option value="year">Últimos 12 meses</option>
          </select>
        </div>
        {data && (
          <span className="ml-auto text-[11px] text-slate-400">
            Exibindo{" "}
            <strong className="text-slate-100">{filteredVisits.length}</strong>{" "}
            visitas no período selecionado
          </span>
        )}
      </div>

      {loading ? (
        <p className="text-xs text-slate-400">Carregando visitas...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : !data || filteredVisits.length === 0 ? (
        <p className="text-xs text-slate-400">
          Nenhuma visita registrada ainda para o período selecionado.
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
              {filteredVisits.map((visit: Visit) => (
                <tr
                  key={visit.id}
                  className="cursor-pointer border-t border-slate-800/80 hover:bg-slate-900/80"
                  onClick={() => setSelectedVisit(visit)}
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
                  <td className="max-w-xs px-3 py-2 align-top">
                    <span className="line-clamp-2" title={visit.userAgent ?? ""}>
                      {getBrowserName(visit.userAgent)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  Detalhes da visita
                </h3>
                <p className="text-xs text-slate-400">
                  Registro completo da sessão do visitante.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedVisit(null)}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>

            <div className="mb-4 grid gap-3 rounded-xl bg-slate-900/60 p-3 text-xs text-slate-300 md:grid-cols-2">
              <div className="space-y-1">
                <p>
                  <span className="text-slate-400">Data:</span>{" "}
                  <span className="text-slate-100">
                    {new Date(selectedVisit.createdAt).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">Caminho acessado:</span>{" "}
                  <span className="font-mono text-[11px] text-emerald-300">
                    {selectedVisit.path}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">Duração estimada:</span>{" "}
                  <span className="text-slate-100">
                    {selectedVisit.durationMs != null
                      ? `${Math.round(selectedVisit.durationMs / 1000)}s`
                      : "—"}
                  </span>
                </p>
                {selectedVisit.ip && (
                  <p>
                    <span className="text-slate-400">IP:</span>{" "}
                    <span className="text-slate-100">{selectedVisit.ip}</span>
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <p>
                  <span className="text-slate-400">Navegador:</span>{" "}
                  <span className="text-slate-100">
                    {getBrowserName(selectedVisit.userAgent)}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">Dispositivo:</span>{" "}
                  {(() => {
                    const { deviceType, os } = getDeviceInfo(
                      selectedVisit.userAgent,
                    );
                    return (
                      <span className="text-slate-100">
                        {deviceType}
                        {os !== "Desconhecido" ? ` • ${os}` : ""}
                      </span>
                    );
                  })()}
                </p>
                {selectedVisit.userAgent && (
                  <p className="break-words">
                    <span className="text-slate-400">User agent completo:</span>
                    <br />
                    <span className="text-[11px] text-slate-300">
                      {selectedVisit.userAgent}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

