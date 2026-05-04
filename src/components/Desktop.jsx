"use client";

import { useState } from "react";
import AppIcon from "./AppIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState({
    home: false,
    about: false,
    projects: false,
    skills: false,
    experience: false,
    contact: false,
    assistant: false,
  });

  function openApp(appName) {
    setOpenWindows((current) => ({
      ...current,
      [appName]: true,
    }));
  }

  function closeApp(appName) {
    setOpenWindows((current) => ({
      ...current,
      [appName]: false,
    }));
  }

  const apps = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
    { id: "assistant", label: "Assistant" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#1b1b1b] text-[#f2f2f2]">
      <Taskbar />

      <main className="flex min-h-screen items-center justify-center px-6 pt-10 pb-12">
        <section className="w-full max-w-4xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#a3a3a3]">
            local portfolio environment
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            RahulOS
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#bdbdbd]">
            An operating-system inspired portfolio for exploring my work,
            skills, experience, and background.
          </p>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {apps.map((app) => (
              <AppIcon
                key={app.id}
                label={app.label}
                onClick={() => openApp(app.id)}
              />
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-2xl border border-[#3a3a3a] bg-[#222222] p-4 text-left">
            <p className="font-mono text-sm text-[#d97706]">$ status</p>
            <div className="mt-3 grid gap-2 font-mono text-xs text-[#a3a3a3] sm:grid-cols-3">
              <p>profile: loaded</p>
              <p>projects: pending</p>
              <p>assistant: offline</p>
            </div>
          </div>
        </section>
      </main>

      {openWindows.home && (
        <Window title="Home" onClose={() => closeApp("home")}>
          <p className="text-sm leading-6 text-[#d0d0d0]">
            This is the home app for RahulOS. It introduces the portfolio and
            helps visitors understand how to explore the system.
          </p>
        </Window>
      )}

      {openWindows.about && (
        <Window title="About" onClose={() => closeApp("about")}>
          <p className="text-sm leading-6 text-[#d0d0d0]">
            This section will introduce who I am, what I study, what I build,
            and what kind of developer I am becoming.
          </p>
        </Window>
      )}

      {openWindows.projects && (
        <Window title="Projects" onClose={() => closeApp("projects")}>
          <p className="text-sm leading-6 text-[#d0d0d0]">
            This window will contain project case studies, screenshots,
            technical summaries, GitHub links, and development notes.
          </p>
        </Window>
      )}

      {openWindows.skills && (
        <Window title="Skills" onClose={() => closeApp("skills")}>
          <div className="border border-[#3a3a3a] bg-[#111111] p-4 font-mono text-sm">
            <p className="text-[#d97706]">$ skills --list</p>
            <p className="mt-3 text-[#bdbdbd]">
              JavaScript, React, Next.js, Tailwind CSS, Git, APIs, backend
              systems
            </p>
          </div>
        </Window>
      )}

      {openWindows.experience && (
        <Window title="Experience" onClose={() => closeApp("experience")}>
          <p className="text-sm leading-6 text-[#d0d0d0]">
            This section will show work experience, education, achievements, and
            relevant background.
          </p>
        </Window>
      )}

      {openWindows.contact && (
        <Window title="Contact" onClose={() => closeApp("contact")}>
          <div className="space-y-2 text-sm text-[#d0d0d0]">
            <p>
              <span className="text-[#a3a3a3]">Email:</span>{" "}
              your-email@example.com
            </p>
            <p>
              <span className="text-[#a3a3a3]">GitHub:</span>{" "}
              github.com/MonsieurR05
            </p>
            <p>
              <span className="text-[#a3a3a3]">Website:</span> rahulb.dev
            </p>
          </div>
        </Window>
      )}

      {openWindows.assistant && (
        <Window title="Assistant" onClose={() => closeApp("assistant")}>
          <p className="text-sm leading-6 text-[#d0d0d0]">
            The assistant will eventually answer questions about my portfolio,
            projects, skills, and experience using my own portfolio data.
          </p>
        </Window>
      )}
    </section>
  );
}