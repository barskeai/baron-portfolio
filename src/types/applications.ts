import type { AppId } from "@/types/navigation";

export interface ApplicationMeta {
  exeTitle: string;
  theme: string;
  sections: string[];
  futureVisualization: string;
}

export const APPLICATION_META: Record<AppId, ApplicationMeta> = {
  about: {
    exeTitle: "ABOUT.EXE",
    theme: "Identity",
    sections: ["Education", "Leadership", "Values", "Journey"],
    futureVisualization: "Future identity visualization area.",
  },
  skills: {
    exeTitle: "SKILLS.SYS",
    theme: "Engineering",
    sections: ["Software Engineering", "Multimedia", "Music", "Writing"],
    futureVisualization: "Future knowledge graph area.",
  },
  projects: {
    exeTitle: "PROJECT_VAULT.EXE",
    theme: "Building",
    sections: ["Featured Projects", "Open Source", "Experiments"],
    futureVisualization: "Future project archive visualization area.",
  },
  articles: {
    exeTitle: "ARCHIVE.DOC",
    theme: "Knowledge",
    sections: ["Technical", "Leadership", "Reflections"],
    futureVisualization: "Future document visualization area.",
  },
  contact: {
    exeTitle: "CONTACT.PROTOCOL",
    theme: "Connection",
    sections: ["Email", "GitHub", "LinkedIn", "Resume"],
    futureVisualization: "Future network visualization area.",
  },
};
