"use client";

import { useState } from "react";

const suggestedQuestions = [
  "What are Rahul's strongest projects?",
  "Which skills does Rahul demonstrate?",
  "Summarise Rahul for a recruiter.",
  "Which project shows backend development?",
];

const placeholderAnswers = {
  "What are Rahul's strongest projects?":
    "RahulOS, SectorFlow, and F1 Explorer are currently the strongest portfolio projects. RahulOS shows interactive frontend design, SectorFlow shows backend/API development, and F1 Explorer shows full-stack project experience.",

  "Which skills does Rahul demonstrate?":
    "This portfolio currently demonstrates JavaScript, React, Next.js, Tailwind CSS, Git, REST APIs, backend development, UI design, and creative computing.",

  "Summarise Rahul for a recruiter.":
    "Rahul is a Computer Science student and software developer with experience building full-stack web apps, backend APIs, interactive interfaces, and portfolio systems. His work shows technical implementation, clear UI thinking, and project-based learning.",

  "Which project shows backend development?":
    "SectorFlow and F1 Explorer are the clearest backend examples. SectorFlow focuses on Rust API endpoints, while F1 Explorer uses a Flask API with a SQLite database and frontend integration.",
};

export default function AssistantApp() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(
    "Assistant is running in local preview mode. Choose a suggested question or type one below."
  );

  function handleQuestion(question) {
    setInput(question);
    setResponse(
      placeholderAnswers[question] ||
        "This is a placeholder response. In the next version, this question will be answered using real portfolio data and an AI API."
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!input.trim()) {
      setResponse("Type a question first, then run the assistant.");
      return;
    }

    handleQuestion(input.trim());
  }

  return (
    <div className="space-y-5">
      <div className="border border-[#3a3a3a] bg-[#111111] p-4 font-mono text-sm">
        <p className="text-[#d97706]">$ assistant --mode local</p>
        <p className="mt-2 text-[#bdbdbd]">
          Portfolio assistant interface loaded. AI connection pending.
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
              className="border border-[#3a3a3a] bg-[#202020] px-3 py-2 text-left text-sm text-[#d0d0d0] transition hover:border-[#d97706] hover:bg-[#262626]"
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
            className="min-w-0 flex-1 border border-[#3a3a3a] bg-[#111111] px-3 py-2 text-sm text-[#f2f2f2] outline-none placeholder:text-[#6f6f6f] focus:border-[#d97706]"
          />

          <button
            type="submit"
            className="border border-[#d97706] bg-[#2a2118] px-4 py-2 text-sm text-[#f2f2f2] transition hover:bg-[#332719]"
          >
            Run
          </button>
        </div>
      </form>

      <section className="border border-[#3a3a3a] bg-[#202020] p-4">
        <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#a3a3a3]">
          Response
        </h3>

        <p className="mt-3 text-sm leading-6 text-[#d0d0d0]">{response}</p>
      </section>
    </div>
  );
}