"use client";

import {
  createContext,
  useContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type Skill = {
  id: string;
  name: string;
  category: string;
  order: number;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string | null;
  githubUrl?: string | null;
  deployUrl?: string | null;
  order: number;
};

export type Message = {
  id: string;
  email: string;
  message: string;
  ip: string | null;
  userAgent: string | null;
  status: "NEW" | "READ" | "ARCHIVED";
  createdAt: string;
};

type DashboardDataContextValue = {
  skills: Skill[];
  setSkills: Dispatch<SetStateAction<Skill[]>>;
  projects: Project[];
  setProjects: Dispatch<SetStateAction<Project[]>>;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const DashboardDataContext = createContext<DashboardDataContextValue | undefined>(
  undefined,
);

export function useDashboardData(): DashboardDataContextValue {
  const context = useContext(DashboardDataContext);

  if (!context) {
    throw new Error("useDashboardData deve ser usado dentro de DashboardDataProvider");
  }

  return context;
}

type DashboardDataProviderProps = {
  value: DashboardDataContextValue;
  children: ReactNode;
};

export function DashboardDataProvider({
  value,
  children,
}: DashboardDataProviderProps) {
  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}

