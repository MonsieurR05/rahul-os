"use client";

import { useState } from "react";
import Window from "./Window";
import Taskbar from "./Taskbar";
import AssistantApp from "./AssistantApp";
import TerminalApp from "./TerminalApp";
import AppIcon from "./AppIcon";
import { profile, projects, experience, contact } from "@/data/portfolio";

const initialWindows = {
  home: false,
  about: false,
  projects: false,
  experience: false,
  contact: false,
  assistant: false,
};

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState(initialWindows);
  const [activeWindow, setActiveWindow] = useState("home");

  const windowSettings = {
    home: { title: "Home", position: "upperRight", size: "medium" },
    about: { title: "About", position: "upperRight", size: "medium" },
    projects: { title: "Projects", position: "center", size: "large" },
    experience: {
      title: "Experience",
      position: "experienceRight",
      size: "medium",
    },
    contact: { title: "Contact", position: "lowerRight", size: "small" },
    assistant: { title: "Assistant", position: "center", size: "assistant" },
  };

  const apps = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
    { id: "assistant", label: "Assistant" },
  ];

  function openApp(appName) {
    setOpenWindows({
      ...initialWindows,
      [appName]: true,
    });

    setActiveWindow(appName);
  }

  function closeApp(appName) {
    setOpenWindows((current) => ({
      ...current,
      [appName]: false,
    }));
  }

  function getWindowProps(appName) {
    return {
      title: windowSettings[appName].title,
      position: windowSettings[appName].position,
      size: windowSettings[appName].size,
      zIndex: activeWindow === appName ? 40 : 20,
      onFocus: () => setActiveWindow(appName),
      onClose: () => closeApp(appName),
    };
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f5f5f5]">
      <Taskbar />

      <main className="grid min-h-screen gap-12 px-5 pb-10 pt-20 sm:px-8 lg:grid-cols-[620px_minmax(0,1fr)] lg:px-16 xl:grid-cols-[660px_minmax(0,1fr)] xl:px-20">
        <aside className="flex items-center lg:justify-start">
          <div className="w-full max-w-[660px] overflow-hidden rounded-[2rem] border border-[#1f1f1f] bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between border-b border-[#1f1f1f] bg-[#0d0d0d] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#555555]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#777777]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#999999]" />
              </div>

              <p className="font-mono text-xs text-[#666666]">terminal</p>
            </div>

            <div className="p-4">
              <TerminalApp />
            </div>
          </div>
        </aside>

        <section className="flex items-center justify-center lg:justify-start lg:pl-14 xl:pl-20">
          <div className="w-full max-w-4xl text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#666666]">
              local portfolio environment
            </p>

            <h1 className="mt-5 text-5xl font-bold leading-none tracking-[-0.06em] text-[#f5f5f5] sm:text-6xl lg:text-7xl">
              Rahul <span className="text-[#3f3f3f]">Bagga</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#a3a3a3] lg:text-lg">
              {profile.summary}
            </p>

            <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
              {apps.map((app) => (
                <AppIcon
                  key={app.id}
                  label={app.label}
                  onClick={() => openApp(app.id)}
                />
              ))}
            </div>

            <div className="mt-8 max-w-[820px] rounded-3xl border border-[#1f1f1f] bg-[#080808] p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
              <p className="font-mono text-sm text-[#f5f5f5]">$ status</p>

              <div className="mt-3 grid gap-2 font-mono text-xs text-[#666666] sm:grid-cols-3">
                <p>profile: loaded</p>
                <p>projects: {projects.length}</p>
                <p>assistant: gemini/local</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {openWindows.home && (
        <Window {...getWindowProps("home")}>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#666666]">
                welcome
              </p>

              <h2 className="mt-2 text-2xl font-semibold">{profile.name}</h2>

              <p className="mt-1 text-sm text-[#a3a3a3]">{profile.title}</p>
            </div>

            <p className="text-sm leading-6 text-[#a3a3a3]">
              {profile.summary}
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {profile.focusAreas.map((area) => (
                <div
                  key={area}
                  className="rounded-2xl border border-[#1f1f1f] bg-[#080808] p-3 text-sm text-[#a3a3a3]"
                >
                  {area}
                </div>
              ))}
            </div>
          </div>
        </Window>
      )}

      {openWindows.about && (
        <Window {...getWindowProps("about")}>
          <div className="space-y-4 text-sm leading-6 text-[#a3a3a3]">
            <p>
              I’m a UK-based Computer Science student interested in building
              software systems that are functional, clear, and engaging to use.
            </p>

            <p>
              My work sits between software engineering, creative computing, and
              interactive web experiences. I’m currently building RahulOS as an
              experimental portfolio system that presents my work through an
              operating-system inspired interface.
            </p>

            <p className="text-[#666666]">Location: {profile.location}</p>
          </div>
        </Window>
      )}

      {openWindows.projects && (
        <Window {...getWindowProps("projects")}>
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#666666]">
                case studies
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#f5f5f5]">
                Projects
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#a3a3a3]">
                A selection of software and interactive systems, presented as
                structured portfolio case studies.
              </p>
            </div>

            {projects.map((project) => (
              <article
                key={project.title}
                className="rounded-3xl border border-[#1f1f1f] bg-[#080808] p-5"
              >
                <div className="flex flex-col gap-3 border-b border-[#1f1f1f] pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-medium text-[#f5f5f5]">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#666666]">
                      {project.type}
                    </p>
                  </div>

                  <div className="text-left text-xs text-[#666666] sm:text-right">
                    <p>{project.status}</p>
                    <p>{project.timeline}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_220px]">
                  <div className="space-y-4">
                    <p className="text-sm leading-6 text-[#a3a3a3]">
                      {project.description}
                    </p>

                    <section>
                      <h4 className="text-xs uppercase tracking-[0.16em] text-[#f5f5f5]">
                        Problem
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#a3a3a3]">
                        {project.problem}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-xs uppercase tracking-[0.16em] text-[#f5f5f5]">
                        Solution
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#a3a3a3]">
                        {project.solution}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-xs uppercase tracking-[0.16em] text-[#f5f5f5]">
                        Outcome
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#a3a3a3]">
                        {project.outcome}
                      </p>
                    </section>
                  </div>

                  <aside className="space-y-4">
                    <div>
                      <h4 className="text-xs uppercase tracking-[0.16em] text-[#666666]">
                        Role
                      </h4>
                      <p className="mt-2 text-sm text-[#f5f5f5]">
                        {project.role}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-[0.16em] text-[#666666]">
                        Tech
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.tech.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-[#1f1f1f] bg-[#0d0d0d] px-2 py-1 text-xs text-[#a3a3a3]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-[0.16em] text-[#666666]">
                        Features
                      </h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-xs leading-5 text-[#a3a3a3]">
                        {project.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-[0.16em] text-[#666666]">
                        Links
                      </h4>
                      <div className="mt-2 space-y-1 text-xs text-[#a3a3a3]">
                        <p>GitHub: {project.links.github}</p>
                        <p>Live: {project.links.live}</p>
                      </div>
                    </div>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        </Window>
      )}

      {openWindows.experience && (
        <Window {...getWindowProps("experience")}>
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#666666]">
                background
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#f5f5f5]">
                Experience
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#a3a3a3]">
                A summary of my education, work experience, and technical
                background.
              </p>
            </div>

            {experience.map((item) => (
              <article
                key={`${item.role}-${item.organisation}`}
                className="rounded-3xl border border-[#1f1f1f] bg-[#080808] p-5"
              >
                <div className="flex flex-col gap-3 border-b border-[#1f1f1f] pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-[#f5f5f5]">
                      {item.type}
                    </p>

                    <h3 className="mt-2 text-lg font-medium text-[#f5f5f5]">
                      {item.role}
                    </h3>

                    <p className="mt-1 text-sm text-[#666666]">
                      {item.organisation}
                    </p>
                  </div>

                  <div className="text-left text-xs text-[#666666] sm:text-right">
                    <p>{item.date}</p>
                    <p>{item.location}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#a3a3a3]">
                  {item.description}
                </p>

                <ul className="mt-4 list-inside list-disc space-y-1 text-sm leading-6 text-[#a3a3a3]">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Window>
      )}

      {openWindows.contact && (
        <Window {...getWindowProps("contact")}>
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[#666666]">
                connect
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#f5f5f5]">
                Contact
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#a3a3a3]">
                {contact.availability}
              </p>
            </div>

            <div className="space-y-3 rounded-3xl border border-[#1f1f1f] bg-[#080808] p-4 text-sm">
              <p>
                <span className="text-[#666666]">Email:</span> {contact.email}
              </p>

              <p>
                <span className="text-[#666666]">GitHub:</span>{" "}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-[#f5f5f5] hover:underline"
                >
                  {contact.github}
                </a>
              </p>

              <p>
                <span className="text-[#666666]">Website:</span>{" "}
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-[#f5f5f5] hover:underline"
                >
                  {contact.website}
                </a>
              </p>

              <p>
                <span className="text-[#666666]">LinkedIn:</span>{" "}
                {contact.linkedin}
              </p>
            </div>

            <section>
              <h3 className="text-xs uppercase tracking-[0.16em] text-[#666666]">
                Areas of interest
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {contact.interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full border border-[#1f1f1f] bg-[#080808] px-2 py-1 text-xs text-[#a3a3a3]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </Window>
      )}

      {openWindows.assistant && (
        <Window {...getWindowProps("assistant")}>
          <AssistantApp />
        </Window>
      )}
    </section>
  );
} 