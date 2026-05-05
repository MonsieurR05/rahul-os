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
    "Assistant is connected to local portfolio data. Ask a question or choose a suggested prompt."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("local");

  function getProjectsSummary() {
    return projects
      .map(
        (project) =>
          `${project.title} is a ${project.type.toLowerCase()} with ${project.tech.join(
            ", "
          )}.`
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

    return `${profile.name} is a ${profile.title.toLowerCase()} based in ${
      profile.location
    }. ${profile.summary} Key projects include ${projectNames}. The portfolio demonstrates skills including ${mainSkills}.`;
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
    ];

    const backendProjects = projects.filter((project) =>
      project.tech.some((tech) => backendKeywords.includes(tech))
    );

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
      lowerQuestion.includes("strongest") ||
      lowerQuestion.includes("projects")
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
      lowerQuestion.includes("recruiter") ||
      lowerQuestion.includes("summarise") ||
      lowerQuestion.includes("summary")
    ) {
      return getRecruiterSummary();
    }

    if (
      lowerQuestion.includes("backend") ||
      lowerQuestion.includes("api") ||
      lowerQuestion.includes("database")
    ) {
      return getBackendProjects();
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

    return "I could not match that question to a local portfolio section yet. Try asking about projects, skills, backend work, experience, or a recruiter summary.";
  }

  async function askAssistant(question) {
    setIsLoading(true);
    setResponse("Thinking...");

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

      setMode("ai");
      setResponse(data.answer);
    } catch (error) {
      console.error(error);

      setMode("local fallback");
      setResponse(
        `${generateLocalResponse(
          question
        )}\n\n[Local fallback used because the AI request failed.]`
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
    <div className="space-y-5">
      <div className="border border-[#3a3a3a] bg-[#111111] p-4 font-mono text-sm">
        <p className="text-[#d97706]">$ assistant --mode {mode}</p>
        <p className="mt-2 text-[#bdbdbd]">
          Portfolio assistant can answer using the server AI route, with local
          fallback if the request fails.
        </p>
      </div>

      <section>
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#a3a3a3]">
          Suggested questions
        </h3>

        <div className="mt-3 grid gap-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              onClick={() => handleQuestion(question)}
              disabled={isLoading}
              className="border border-[#3a3a3a] bg-[#202020] px-3 py-2 text-left text-sm text-[#d0d0d0] transition hover:border-[#d97706] hover:bg-[#262626] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {question}
            </button>
          ))}
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="assistant-question"
          className="block font-mono text-xs uppercase tracking-[0.16em] text-[#a3a3a3]"
        >
          Ask about the portfolio
        </label>

        <div className="flex gap-2">
          <input
            id="assistant-question"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="e.g. What project best shows React?"
            disabled={isLoading}
            className="min-w-0 flex-1 border border-[#3a3a3a] bg-[#111111] px-3 py-2 text-sm text-[#f2f2f2] outline-none placeholder:text-[#6f6f6f] focus:border-[#d97706] disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="border border-[#d97706] bg-[#2a2118] px-4 py-2 text-sm text-[#f2f2f2] transition hover:bg-[#332719] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Run..." : "Run"}
          </button>
        </div>
      </form>

      <section className="border border-[#3a3a3a] bg-[#202020] p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#a3a3a3]">
          Response
        </h3>

        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-[#d0d0d0]">
          {response}
        </p>
      </section>
    </div>
  );
}