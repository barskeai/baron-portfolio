import type { ComponentType, CSSProperties } from "react";
import { BookOpen, Code2, FolderGit2, Mail, User } from "lucide-react";

export type AppId = "about" | "skills" | "projects" | "articles" | "contact";

export interface NavigationTarget {
  id: AppId;
  label: string;
  description: string;
  path: string;
}

export const NAVIGATION_TARGETS: NavigationTarget[] = [
  { id: "about", label: "About", description: "Who Baron is", path: "/about" },
  { id: "skills", label: "Skills", description: "Engineering, leadership, music, writing", path: "/skills" },
  { id: "projects", label: "Projects", description: "Project vault", path: "/projects" },
  { id: "articles", label: "Articles", description: "Writing and reflections", path: "/articles" },
  { id: "contact", label: "Contact", description: "Get in touch", path: "/contact" },
];

export const NAVIGATION_ICONS: Record<AppId, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  about: User,
  skills: Code2,
  projects: FolderGit2,
  articles: BookOpen,
  contact: Mail,
};

// Keep in sync with the accent tokens in src/index.css — stored as hex literals
// because Framer Motion interpolates color-bearing animated props in JS and
// cannot resolve CSS custom properties.
export const NAVIGATION_ACCENTS: Record<AppId, string> = {
  about: "#7cff6b", // --terminal-green
  skills: "#38bdf8", // --electric-blue
  projects: "#fb923c", // --creative-orange
  articles: "#c084fc", // --art-purple
  contact: "#d9f99d", // --street-lime
};
