"use client";

import { useEffect, useRef, useState } from "react";
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
  const [history, setHistory] = useState([]);
  const latestEntryRef = useRef(null);

  useEffect(() => {
    if (latestEntryRef.current) {
      latestEntryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [history]);

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
Website: ${contact.website}`;
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
    <div className="h-full rounded-2xl bg-[#050505] p-4 font-mono text-sm">
      <div className="mb-4 max-h-[46vh] space-y-4 overflow-y-auto pr-2">
        <div>
          <p className="text-[#f5f5f5]">$ boot</p>
          <pre className="mt-2 whitespace-pre-wrap text-[#a3a3a3]">
            RahulOS terminal ready. Type 'help' to view commands.
          </pre>
        </div>

        {history.map((entry, index) => (
          <div
            key={`${entry.command}-${index}`}
            ref={index === history.length - 1 ? latestEntryRef : null}
          >
            <p className="text-[#f5f5f5]">$ {entry.command}</p>
            <pre className="mt-2 whitespace-pre-wrap text-[#a3a3a3]">
              {entry.output}
            </pre>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-[#2a2a2a] pt-3"
      >
        <span className="text-[#f5f5f5]">$</span>

        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[#f5f5f5] outline-none placeholder:text-[#666666]"
          placeholder="type a command..."
        />
      </form>
    </div>
  );
}
