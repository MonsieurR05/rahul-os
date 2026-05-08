"use client";

import { useState } from "react";
import { profile, projects, skills, experience } from "@/data/portfolio";

const suggestedQuestions = [
  "What are Rahul's strongest projects?",
  "Which skills does Rahul demonstrate?",
  "Summarise Rahul for a recruiter.",
  "Which project shows backend development?",
];

export default function AssistantApp() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(
    "Portfolio assistant can answer using the server AI route, with local fallback if the request fails."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("local");

  function getProjectsSummary() {
    return projects
      .map(
        (project) =>
          `${project.title} is a ${project.type.toLowerCase()} using ${project.tech.join(
            ", "
          )}. ${project.description}`
      )
      .join(" ");
  }

  function getSkillsSummary() {
    return skills
      .map((group) => `${group.category}: ${group.items.join(", ")}`)
      .join(" | ");
  }

  function getRecruiterSummary() {
    const projectNames = projects.map((project) => project.title).join(", ");
    const mainSkills = skills
      .flatMap((group) => group.items)
      .slice(0, 12)
      .join(", ");

    return `${profile.name} is a ${profile.title.toLowerCase()} based in ${profile.location}. ${profile.summary} Key projects include ${projectNames}. The portfolio demonstrates skills including ${mainSkills}.`;
  }

  function getBackendProjects() {
    const backendKeywords = [
      "Rust",
      "Python",
      "Flask",
      "Node.js",
      "REST APIs",
      "SQLite",
      "SQL",
      "Express",
    ];

    const backendProjects = projects.filter((project) =>
      project.tech.some((tech) => backendKeywords.includes(tech))
    );

    if (backendProjects.length === 0) {
      return "That information is not available in Rahul OS.";
    }

    return backendProjects
      .map(
        (project) =>
          `${project.title}: ${project.description} Tech used: ${project.tech.join(
            ", "
          )}.`
      )
      .join(" ");
  }

  function getExperienceSummary() {
    return experience
      .map(
        (item) =>
          `${item.role} at ${item.organisation} (${item.date}): ${item.description}`
      )
      .join(" ");
  }

  function generateLocalResponse(question) {
    const lowerQuestion = question.toLowerCase();

    if (
      lowerQuestion.includes("backend") ||
      lowerQuestion.includes("api") ||
      lowerQuestion.includes("database") ||
      lowerQuestion.includes("rust")
    ) {
      return getBackendProjects();
    }

    if (
      lowerQuestion.includes("recruiter") ||
      lowerQuestion.includes("summarise") ||
      lowerQuestion.includes("summary") ||
      lowerQuestion.includes("interview") ||
      lowerQuestion.includes("hire")
    ) {
      return getRecruiterSummary();
    }

    if (
      lowerQuestion.includes("project") ||
      lowerQuestion.includes("projects") ||
      lowerQuestion.includes("strongest") ||
      lowerQuestion.includes("best")
    ) {
      return getProjectsSummary();
    }

    if (
      lowerQuestion.includes("skill") ||
      lowerQuestion.includes("tech") ||
      lowerQuestion.includes("stack")
    ) {
      return getSkillsSummary();
    }

    if (
      lowerQuestion.includes("experience") ||
      lowerQuestion.includes("work") ||
      lowerQuestion.includes("education")
    ) {
      return getExperienceSummary();
    }

    if (
      lowerQuestion.includes("rahul") ||
      lowerQuestion.includes("who") ||
      lowerQuestion.includes("about")
    ) {
      return `${profile.name} is a ${profile.title.toLowerCase()} based in ${profile.location}. ${profile.summary}`;
    }

    return "That information is not available in Rahul OS. Try asking about projects, skills, experience, backend work, or recruiter summaries.";
  }

  async function askAssistant(question) {
    setIsLoading(true);
    setResponse("Processing request...");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Assistant request failed.");
      }

      setMode("online");
      setResponse(data.answer);
    } catch (error) {
      console.error(error);

      setMode("local");
      setResponse(
        `${generateLocalResponse(
          question
        )}\n\n[Online assistant unavailable. Local Rahul OS data used.]`
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleQuestion(question) {
    setInput(question);
    askAssistant(question);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!input.trim()) {
      setResponse("Type a question first, then run the assistant.");
      return;
    }

    askAssistant(input.trim());
  }

  return (
    <div className="space-y-4 rounded-[1.5rem] bg-[#050505] p-3">
      <div className="rounded-[1.25rem] border border-[#242424] bg-[#111111] px-4 py-4">
        <p className="font-mono text-sm text-[#f5f5f5]">
          $ assistant --mode {mode}
        </p>
        <p className="mt-2 text-sm leading-6 text-[#8a8a8a]">
          Portfolio assistant with server AI routing and local fallback support.
        </p>
      </div>

      <section>
        <h3 className="px-1 text-xs uppercase tracking-[0.22em] text-[#666666]">
          Suggested questions
        </h3>

        <div className="mt-3 grid gap-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleQuestion(question)}
              disabled={isLoading}
              className="rounded-[1.1rem] border border-[#242424] bg-[#0d0d0d] px-4 py-3 text-left text-sm text-[#cfcfcf] transition hover:border-[#343434] hover:bg-[#141414] hover:text-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {question}
            </button>
          ))}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="assistant-question"
          className="px-1 text-xs uppercase tracking-[0.22em] text-[#666666]"
        >
          Ask about the portfolio
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="assistant-question"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g. What project best shows React?"
            disabled={isLoading}
            className="rounded-[1.1rem] border border-[#d9d9d9] bg-[#e8e8e8] px-4 py-3 text-sm font-semibold text-[#050505] transition hover:bg-[#ffffff] disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-[1.1rem] border border-[#d9d9d9] bg-[#e8e8e8] px-4 py-3 text-sm font-semibold text-[#050505] transition hover:bg-[#ffffff] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Run..." : "Run"}
          </button>
        </div>
      </form>

      <section className="rounded-[1.4rem] border border-[#242424] bg-[#0d0d0d] p-4">
        <h3 className="text-xs uppercase tracking-[0.22em] text-[#666666]">
          Response
        </h3>

      <div className="mt-3 min-h-20">
        {isLoading ? (
          <ThinkingAnimation />
       ) : (
          <p className="whitespace-pre-line text-sm leading-7 text-[#b8b8b8]">
            {response}
          </p>
        )}
      </div>
      </section>
    </div>
  );
}

function ThinkingAnimation() {
  return (
    <div className="flex items-center gap-3 text-sm text-[#a3a3a3]">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f5f5f5] opacity-20" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#a3a3a3]" />
      </span>

      <span className="font-mono">assistant is thinking</span>

      <span className="flex gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#666666] [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#666666] [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#666666]" />
      </span>
    </div>
  );
}