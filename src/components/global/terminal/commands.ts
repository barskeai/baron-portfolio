import { NAVIGATION_TARGETS } from "@/types/navigation";
import type { AppId } from "@/types/navigation";

export interface CommandContext {
  navigateTo: (id: AppId) => void;
  clear: () => void;
  requestPassword: () => void;
}

export interface Command {
  description: string;
  hidden?: boolean;
  action: (context: CommandContext) => string[] | undefined;
}

function navCommand(id: AppId, label: string): Command {
  return {
    description: `Open ${label}`,
    action: ({ navigateTo }) => {
      navigateTo(id);
      return [`Opening ${label}...`];
    },
  };
}

export const COMMANDS: Record<string, Command> = {
  help: {
    description: "Show available commands",
    action: () => [
      "Available commands:",
      ...Object.entries(COMMANDS)
        .filter(([, command]) => !command.hidden)
        .map(([name, command]) => `  ${name.padEnd(12)}${command.description}`),
    ],
  },
  ...Object.fromEntries(NAVIGATION_TARGETS.map((target) => [target.id, navCommand(target.id, target.label)])),
  clear: {
    description: "Clear the terminal",
    action: ({ clear }) => {
      clear();
      return undefined;
    },
  },
  whoami: {
    description: "Show current user",
    hidden: true,
    action: () => [
      "Baron",
      "Software Engineer, Builder, Leader.",
      "Currently running Baron.OS in your browser.",
    ],
  },
  "cat journal.txt": {
    description: "Read the journal",
    hidden: true,
    action: () => [
      "> entry 001",
      "Still building. Still learning. Still shipping.",
      "The best systems are simple ones that actually work.",
    ],
  },
  "sudo reveal-dreams": {
    description: "Reveal dreams",
    hidden: true,
    action: () => [
      "Permission granted.",
      "Build things that outlast the hype.",
      "Lead well. Write honestly. Never stop learning.",
    ],
  },
  login: {
    description: "Admin login",
    hidden: true,
    action: ({ requestPassword }) => {
      requestPassword();
      return ["Password required.", "Enter password:"];
    },
  },
};

export function runCommand(input: string, context: CommandContext): string[] {
  const name = input.trim().toLowerCase();
  if (!name) return [];

  const command = COMMANDS[name];
  if (!command) {
    return ["Command not found.", "", "Type 'help' for available commands."];
  }

  return command.action(context) ?? [];
}
