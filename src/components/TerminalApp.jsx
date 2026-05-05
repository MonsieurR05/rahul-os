"use client";

import { useState } from "react";
import { profile, projects, skills, experience, contact } from "@/data/portfolio";

const helpText = `Available commands:
whoami
projects
skills
experience
contact
clear
help`;

export default function TerminalApp() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      command: "boot",
      output:
        "RahulOS terminal ready. Type 'help' to view available commands.",
    },
  ]);

  function runCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase();

    if (!command) return;

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let output = "";

    if (command === "help") {
      output = helpText;
    } else if (command === "whoami") {
      output = `${profile.name}
${profile.title}
${profile.location}

${profile.summary}`;
    } else if (command === "projects") {
      output = projects
        .map(
          (project) =>
            `${project.title} — ${project.type}
Status: ${project.status}
Tech: ${project.tech.join(", ")}
${project.description}`
        )
        .join("\n\n");
    } else if (command === "skills") {
      output = skills
        .map((group) => `${group.category}: ${group.items.join(", ")}`)
        .join("\n");
    } else if (command === "experience") {
      output = experience
        .map(
          (item) =>
            `${item.role} — ${item.organisation}
${item.date} | ${item.location}
${item.description}`
        )
        .join("\n\n");
    } else if (command === "contact") {
      output = `Email: ${contact.email}
GitHub: ${contact.github}
Website: ${contact.website}
LinkedIn: ${contact.linkedin}`;
    } else {
      output = `Command not found: ${rawCommand}
Type 'help' to view available commands.`;
    }

    setHistory((current) => [...current, { command: rawCommand, output }]);
    setInput("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    runCommand(input);
  }

  return (
    <div className="border border-[#3a3a3a] bg-[#111111] p-4 font-mono text-sm">
      <div className="mb-4 space-y-4">
        {history.map((entry, index) => (
          <div key={`${entry.command}-${index}`}>
            <p className="text-[#d97706]">$ {entry.command}</p>
            <pre className="mt-2 whitespace-pre-wrap text-[#c9c9c9]">
              {entry.output}
            </pre>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-[#d97706]">$</span>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoFocus
          className="min-w-0 flex-1 bg-transparent text-[#f2f2f2] outline-none placeholder:text-[#6f6f6f]"
          placeholder="type a command..."
        />
      </form>
    </div>
  );
}