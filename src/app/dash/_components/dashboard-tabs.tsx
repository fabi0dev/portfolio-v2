"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDashboardData,
  type Message,
  type Project,
  type Skill,
} from "../dashboard-context";

export function SkillsTab() {
  const { skills, setSkills } = useDashboardData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState<number | "">("");
  const [saving, setSaving] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const categories = useMemo(
    () =>
      Array.from(new Set(skills.map((s) => s.category)))
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    [skills],
  );

  const filteredSkills =
    filterCategory === "all"
      ? skills
      : skills.filter((s) => s.category === filterCategory);

  function openCreateDialog() {
    setEditingSkill(null);
    setName("");
    setCategory(categories[0] ?? "");
    setOrder("");
    setDialogOpen(true);
  }

  function openEditDialog(skill: Skill) {
    setEditingSkill(skill);
    setName(skill.name);
    setCategory(skill.category);
    setOrder(typeof skill.order === "number" ? skill.order : "");
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !category.trim()) return;
    setSaving(true);

    try {
      if (editingSkill) {
        const res = await fetch(`/api/skills/${editingSkill.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            category: category.trim(),
            order: typeof order === "number" ? order : 0,
          }),
        });
        if (!res.ok) return;
        const updated = await res.json();
        setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      } else {
        const res = await fetch("/api/skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            category: category.trim(),
            order: typeof order === "number" ? order : 0,
          }),
        });
        if (!res.ok) return;
        const created = await res.json();
        setSkills((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Remover esta skill?");
    if (!confirmed) return;

    await fetch(`/api/skills/${id}`, { method: "DELETE" });
    setSkills((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 md:flex-row md:items-center">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-slate-100">Skills</h2>
          <p className="text-xs text-slate-400">
            Gerencie suas skills e categorias. Clique em uma skill para editar.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="skills-category-filter"
              className="text-xs text-slate-400"
            >
              Categoria:
            </label>
            <select
              id="skills-category-filter"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-8 rounded-md border border-slate-700 bg-slate-950 px-2 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="all">Todas</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <Button
            size="sm"
            className="bg-emerald-500 text-black hover:bg-emerald-600"
            onClick={openCreateDialog}
          >
            Nova skill
          </Button>
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        {skills.length === 0 ? (
          <p className="text-xs text-slate-400">
            Nenhuma skill cadastrada ainda.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {filteredSkills
              .slice()
              .sort((a, b) => a.order - b.order || a.name.localeCompare(b.name))
              .map((skill) => (
                <li
                  key={skill.id}
                  className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 hover:border-emerald-500/70 hover:bg-slate-900/80"
                >
                  <button
                    type="button"
                    onClick={() => openEditDialog(skill)}
                    className="flex flex-1 flex-col items-start text-left"
                  >
                    <span className="font-medium text-slate-100">
                      {skill.name}
                    </span>
                    <span className="text-xs text-slate-400">
                      {skill.category}{" "}
                      {skill.order ? `• ordem ${skill.order}` : ""}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(skill.id)}
                    className="ml-3 text-xs text-red-400 hover:text-red-300"
                  >
                    Remover
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  {editingSkill ? "Editar skill" : "Nova skill"}
                </h3>
                <p className="text-xs text-slate-400">
                  Preencha os campos abaixo para{" "}
                  {editingSkill ? "atualizar" : "cadastrar"} a skill.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Nome</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-slate-950 border-slate-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-9 w-full rounded-md border border-slate-800 bg-slate-950 px-2 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  {!categories.includes(category) && category && (
                    <option value={category}>{category}</option>
                  )}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Ordem (opcional)</label>
                <Input
                  type="number"
                  value={order}
                  onChange={(e) =>
                    setOrder(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-500 text-black hover:bg-emerald-600"
                >
                  {saving
                    ? "Salvando..."
                    : editingSkill
                      ? "Salvar alterações"
                      : "Adicionar skill"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProjectsTab() {
  const { projects, setProjects } = useDashboardData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [deployUrl, setDeployUrl] = useState("");
  const [order, setOrder] = useState<number | "">("");
  const [saving, setSaving] = useState(false);

  function openCreateDialog() {
    setEditingProject(null);
    setTitle("");
    setDescription("");
    setTags("");
    setGithubUrl("");
    setDeployUrl("");
    setOrder("");
    setDialogOpen(true);
  }

  function openEditDialog(project: Project) {
    setEditingProject(project);
    setTitle(project.title);
    setDescription(project.description);
    setTags(project.tags?.join(", ") ?? "");
    setGithubUrl(project.githubUrl ?? "");
    setDeployUrl(project.deployUrl ?? "");
    setOrder(typeof project.order === "number" ? project.order : "");
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSaving(true);

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    try {
      if (editingProject) {
        const res = await fetch(`/api/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            tags: tagsArray,
            githubUrl: githubUrl.trim() || undefined,
            deployUrl: deployUrl.trim() || undefined,
            order: typeof order === "number" ? order : 0,
          }),
        });
        if (!res.ok) return;
        const updated = await res.json();
        setProjects((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        );
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title.trim(),
            description: description.trim(),
            tags: tagsArray,
            githubUrl: githubUrl.trim() || undefined,
            deployUrl: deployUrl.trim() || undefined,
            order: typeof order === "number" ? order : 0,
          }),
        });
        if (!res.ok) return;
        const created = await res.json();
        setProjects((prev) => [...prev, created]);
      }
      setDialogOpen(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Remover este projeto?");
    if (!confirmed) return;

    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4 md:flex-row md:items-center">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-slate-100">Projetos</h2>
          <p className="text-xs text-slate-400">
            Lista de projetos cadastrados. Clique em um projeto para editar.
          </p>
        </div>
        <Button
          size="sm"
          className="bg-emerald-500 text-black hover:bg-emerald-600"
          onClick={openCreateDialog}
        >
          Novo projeto
        </Button>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        {projects.length === 0 ? (
          <p className="text-xs text-slate-400">
            Nenhum projeto cadastrado ainda.
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {projects
              .slice()
              .sort(
                (a, b) => a.order - b.order || a.title.localeCompare(b.title),
              )
              .map((project) => (
                <li
                  key={project.id}
                  className="flex flex-col gap-1 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 hover:border-emerald-500/70 hover:bg-slate-900/80"
                >
                  <button
                    type="button"
                    onClick={() => openEditDialog(project)}
                    className="flex items-center justify-between gap-2 text-left"
                  >
                    <div>
                      <p className="font-medium text-slate-100">
                        {project.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </button>
                  <div className="mt-1 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                      {project.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(project.id)}
                      className="text-[11px] text-red-400 hover:text-red-300"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  {editingProject ? "Editar projeto" : "Novo projeto"}
                </h3>
                <p className="text-xs text-slate-400">
                  Preencha os campos abaixo para{" "}
                  {editingProject ? "atualizar" : "cadastrar"} o projeto.
                </p>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Título</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-950 border-slate-800"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[80px] w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400">
                  Tags (separadas por vírgula)
                </label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="bg-slate-950 border-slate-800"
                />
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">
                    GitHub (opcional)
                  </label>
                  <Input
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="bg-slate-950 border-slate-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">
                    Deploy (opcional)
                  </label>
                  <Input
                    value={deployUrl}
                    onChange={(e) => setDeployUrl(e.target.value)}
                    className="bg-slate-950 border-slate-800"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400">
                  Ordem (opcional)
                </label>
                <Input
                  type="number"
                  value={order}
                  onChange={(e) =>
                    setOrder(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="bg-slate-950 border-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-500 text-black hover:bg-emerald-600"
                >
                  {saving
                    ? "Salvando..."
                    : editingProject
                      ? "Salvar alterações"
                      : "Adicionar projeto"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function MessagesTab() {
  const { messages, setMessages } = useDashboardData();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "all" | "unread" | "read" | "archived"
  >("all");
  const [search, setSearch] = useState("");

  async function updateStatus(id: string, status: Message["status"]) {
    // atualização otimista
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m)),
    );
    setSelectedMessage((prev) =>
      prev && prev.id === id ? { ...prev, status } : prev,
    );

    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) return;

    const updated = await res.json();
    setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
    setSelectedMessage((prev) => (prev && prev.id === id ? updated : prev));
  }

  function handleOpenMessage(msg: Message) {
    setSelectedMessage(msg);
    if (msg.status === "NEW") {
      void updateStatus(msg.id, "READ");
    }
  }

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = messages.filter((m) => {
    if (statusFilter === "unread" && m.status !== "NEW") return false;
    if (statusFilter === "read" && m.status !== "READ") return false;
    if (statusFilter === "archived" && m.status !== "ARCHIVED") return false;

    if (!normalizedSearch) return true;

    const haystack = [
      m.email,
      m.message,
      m.ip ?? "",
      m.userAgent ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedSearch);
  });

  const unreadMessages = filtered.filter((m) => m.status === "NEW");
  const otherMessages = filtered.filter((m) => m.status !== "NEW");

  return (
    <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Mensagens Recebidas
          </h2>
          <p className="text-xs text-slate-400">
            Clique em uma mensagem para ver os detalhes completos.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex gap-1 rounded-full bg-slate-900/80 p-1 text-[11px] text-slate-300">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`rounded-full px-2 py-1 ${
                statusFilter === "all"
                  ? "bg-emerald-500 text-black"
                  : "hover:bg-slate-800"
              }`}
            >
              Todas
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("unread")}
              className={`rounded-full px-2 py-1 ${
                statusFilter === "unread"
                  ? "bg-emerald-500 text-black"
                  : "hover:bg-slate-800"
              }`}
            >
              Não lidas
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("read")}
              className={`rounded-full px-2 py-1 ${
                statusFilter === "read"
                  ? "bg-emerald-500 text-black"
                  : "hover:bg-slate-800"
              }`}
            >
              Lidas
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("archived")}
              className={`rounded-full px-2 py-1 ${
                statusFilter === "archived"
                  ? "bg-emerald-500 text-black"
                  : "hover:bg-slate-800"
              }`}
            >
              Arquivadas
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por e-mail, mensagem, IP..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 w-full rounded-md border border-slate-700 bg-slate-950 px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {messages.length === 0 ? (
        <p className="text-xs text-slate-400">
          Nenhuma mensagem recebida ainda.
        </p>
      ) : (
        <>
          {filtered.length === 0 ? (
            <p className="text-xs text-slate-400">
              Nenhuma mensagem encontrada com os filtros atuais.
            </p>
          ) : statusFilter === "all" ? (
            <div className="space-y-4 text-sm">
              {unreadMessages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
                    Não lidas ({unreadMessages.length})
                  </p>
                  <ul className="space-y-2">
                    {unreadMessages.map((msg) => (
                      <li
                        key={msg.id}
                        className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-emerald-600/60 bg-slate-950/80 p-3 hover:border-emerald-400 hover:bg-slate-900/80"
                        onClick={() => handleOpenMessage(msg)}
                      >
                        <div className="min-w-0 text-xs text-slate-300">
                          <p className="truncate font-medium text-slate-100">
                            {msg.email}
                          </p>
                          <p className="mt-1 line-clamp-1 text-slate-300">
                            {msg.message}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
                          Nova
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {otherMessages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    Outras ({otherMessages.length})
                  </p>
                  <ul className="space-y-2">
                    {otherMessages.map((msg) => (
                      <li
                        key={msg.id}
                        className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-3 hover:border-emerald-500/70 hover:bg-slate-900/80"
                        onClick={() => handleOpenMessage(msg)}
                      >
                        <div className="min-w-0 text-xs text-slate-400">
                          <p className="truncate font-medium text-slate-100">
                            {msg.email}
                          </p>
                          <p className="mt-1 line-clamp-1 text-slate-300">
                            {msg.message}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
                            msg.status === "READ"
                              ? "bg-sky-500/10 text-sky-400"
                              : "bg-slate-700/60 text-slate-300"
                          }`}
                        >
                          {msg.status === "READ" ? "Lida" : "Arquivada"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ul className="space-y-3 text-sm">
              {filtered.map((msg) => (
                <li
                  key={msg.id}
                  className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-3 hover:border-emerald-500/70 hover:bg-slate-900/80"
                  onClick={() => handleOpenMessage(msg)}
                >
                  <div className="min-w-0 text-xs text-slate-400">
                    <p className="truncate font-medium text-slate-100">
                      {msg.email}
                    </p>
                    <p className="mt-1 line-clamp-1 text-slate-300">
                      {msg.message}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] ${
                      msg.status === "NEW"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : msg.status === "READ"
                          ? "bg-sky-500/10 text-sky-400"
                          : "bg-slate-700/60 text-slate-300"
                    }`}
                  >
                    {msg.status === "NEW"
                      ? "Nova"
                      : msg.status === "READ"
                        ? "Lida"
                        : "Arquivada"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  Detalhes da mensagem
                </h3>
                <p className="text-xs text-slate-400">
                  Enviada por {selectedMessage.email}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs text-slate-300 hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>

            <div className="mb-4 grid gap-3 rounded-xl bg-slate-900/60 p-3 text-xs text-slate-300 md:grid-cols-2">
              <div className="space-y-1">
                <p>
                  <span className="text-slate-400">E-mail:</span>{" "}
                  <span className="text-slate-100">
                    {selectedMessage.email}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">Status:</span>{" "}
                  <span
                    className={
                      selectedMessage.status === "NEW"
                        ? "text-emerald-400"
                        : selectedMessage.status === "READ"
                          ? "text-sky-400"
                          : "text-slate-300"
                    }
                  >
                    {selectedMessage.status === "NEW"
                      ? "Nova"
                      : selectedMessage.status === "READ"
                        ? "Lida"
                        : "Arquivada"}
                  </span>
                </p>
                <p>
                  <span className="text-slate-400">Recebida em:</span>{" "}
                  {new Date(selectedMessage.createdAt).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="space-y-1">
                {selectedMessage.ip && (
                  <p>
                    <span className="text-slate-400">IP:</span>{" "}
                    {selectedMessage.ip}
                  </p>
                )}
                {selectedMessage.userAgent && (
                  <p className="break-words">
                    <span className="text-slate-400">Navegador:</span>{" "}
                    {selectedMessage.userAgent}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <p className="text-xs font-medium text-slate-200 mb-2">
                Mensagem
              </p>
              <p className="whitespace-pre-wrap text-sm text-slate-100">
                {selectedMessage.message}
              </p>
            </div>

            <div className="flex flex-wrap justify-between gap-3 text-xs">
              <div className="flex flex-wrap gap-2">
                {selectedMessage.status !== "NEW" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedMessage.id, "NEW")
                    }
                    className="rounded-md border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-800"
                  >
                    Marcar como nova
                  </button>
                )}
                {selectedMessage.status !== "READ" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedMessage.id, "READ")
                    }
                    className="rounded-md border border-slate-700 px-3 py-1 text-slate-200 hover:bg-slate-800"
                  >
                    Marcar como lida
                  </button>
                )}
                {selectedMessage.status !== "ARCHIVED" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus(selectedMessage.id, "ARCHIVED")
                    }
                    className="rounded-md border border-slate-700 px-3 py-1 text-slate-400 hover:bg-slate-800"
                  >
                    Arquivar
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="ml-auto rounded-md border border-slate-700 px-3 py-1 text-slate-300 hover:bg-slate-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

