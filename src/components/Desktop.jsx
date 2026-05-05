"use client";

import { useState } from "react";
import AppIcon from "./AppIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import AssistantApp from "./AssistantApp";
import TerminalApp from "./TerminalApp";
import { profile, projects, experience, contact } from "@/data/portfolio";

const initialWindows = {
  home: false,
  about: false,
  projects: false,
  skills: false,
  experience: false,
  contact: false,
  assistant: false,
};

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState(initialWindows);
  const [activeWindow, setActiveWindow] = useState("home");

  const apps = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Terminal" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
    { id: "assistant", label: "Assistant" },
  ];

  const windowSettings = {
    home: { title: "Home", position: "center", size: "medium" },
    about: { title: "About", position: "upperLeft", size: "medium" },
    projects: { title: "Projects", position: "center", size: "large" },
    skills: { title: "Terminal", position: "lowerLeft", size: "large" },
    experience: { title: "Experience", position: "experienceRight", size: "medium" },
    contact: { title: "Contact", position: "lowerRight", size: "small" },
    assistant: { title: "Assistant", position: "center", size: "assistant" },
  };

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
    <section className="relative min-h-screen overflow-hidden bg-[#08090b] text-[#f4f4f5]">
      <Taskbar />

      <main className="flex min-h-screen items-center justify-center px-4 pb-10 pt-16 sm:px-6 md:pt-10">
        <section className="w-full max-w-4xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#9ca3af]">
            local portfolio environment
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            RahulOS
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#9ca3af]">
            An operating-system inspired portfolio for exploring my work,
            skills, experience, and background.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-2 sm:mt-10 sm:grid-cols-4 sm:gap-3">
            {apps.map((app) => (
              <AppIcon
                key={app.id}
                label={app.label}
                onClick={() => openApp(app.id)}
              />
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-2xl border border-[#2a303a] bg-[#101216] p-4 text-left sm:mt-10">
            <p className="font-mono text-sm text-[#67e8f9]">$ status</p>

            <div className="mt-3 grid gap-2 font-mono text-xs text-[#9ca3af] sm:grid-cols-3">
              <p>profile: loaded</p>
              <p>projects: {projects.length}</p>
              <p>assistant: gemini/local</p>
            </div>
          </div>
        </section>
      </main>

      {openWindows.home && (
        <Window {...getWindowProps("home")}>
          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9ca3af]">
                welcome
              </p>

              <h2 className="mt-2 text-2xl font-semibold">{profile.name}</h2>

              <p className="mt-1 text-sm text-[#d4d4d8]">{profile.title}</p>
            </div>

            <p className="text-sm leading-6 text-[#d4d4d8]">
              {profile.summary}
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {profile.focusAreas.map((area) => (
                <div
                  key={area}
                  className="border border-[#2a303a] bg-[#101216] p-3 text-sm text-[#d4d4d8]"
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
          <div className="space-y-4 text-sm leading-6 text-[#d4d4d8]">
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

            <p className="text-[#9ca3af]">Location: {profile.location}</p>
          </div>
        </Window>
      )}

      {openWindows.projects && (
        <Window {...getWindowProps("projects")}>
          <div className="space-y-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9ca3af]">
                case studies
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#f4f4f5]">
                Projects
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#d4d4d8]">
                A selection of software and interactive systems, presented as
                structured portfolio case studies.
              </p>
            </div>

            {projects.map((project) => (
              <article
                key={project.title}
                className="border border-[#2a303a] bg-[#101216] p-5"
              >
                <div className="flex flex-col gap-3 border-b border-[#2a303a] pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-medium text-[#f4f4f5]">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#9ca3af]">
                      {project.type}
                    </p>
                  </div>

                  <div className="text-left font-mono text-xs text-[#9ca3af] sm:text-right">
                    <p>{project.status}</p>
                    <p>{project.timeline}</p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[1fr_220px]">
                  <div className="space-y-4">
                    <p className="text-sm leading-6 text-[#d4d4d8]">
                      {project.description}
                    </p>

                    <section>
                      <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#67e8f9]">
                        Problem
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#9ca3af]">
                        {project.problem}
                      </p>
                    </section>

                    <section>
                      <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#67e8f9]">
                        Solution
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#9ca3af]">
                        {project.solution}
                      </p>
                    </section>

                    <section>
                      <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#67e8f9]">
                        Outcome
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[#9ca3af]">
                        {project.outcome}
                      </p>
                    </section>
                  </div>

                  <aside className="space-y-4">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                        Role
                      </h4>
                      <p className="mt-2 text-sm text-[#f4f4f5]">
                        {project.role}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                        Tech
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.tech.map((item) => (
                          <span
                            key={item}
                            className="border border-[#2a303a] bg-[#151922] px-2 py-1 text-xs text-[#d4d4d8]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                        Features
                      </h4>
                      <ul className="mt-2 list-inside list-disc space-y-1 text-xs leading-5 text-[#9ca3af]">
                        {project.features.map((feature) => (
                          <li key={feature}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                        Links
                      </h4>
                      <div className="mt-2 space-y-1 text-xs text-[#9ca3af]">
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

      {openWindows.skills && (
        <Window {...getWindowProps("skills")}>
          <TerminalApp />
        </Window>
      )}

      {openWindows.experience && (
        <Window {...getWindowProps("experience")}>
          <div className="space-y-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9ca3af]">
                background
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#f4f4f5]">
                Experience
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#d4d4d8]">
                A summary of my education, work experience, and technical
                background.
              </p>
            </div>

            {experience.map((item) => (
              <article
                key={`${item.role}-${item.organisation}`}
                className="border border-[#2a303a] bg-[#101216] p-5"
              >
                <div className="flex flex-col gap-3 border-b border-[#2a303a] pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-[#67e8f9]">
                      {item.type}
                    </p>

                    <h3 className="mt-2 text-lg font-medium text-[#f4f4f5]">
                      {item.role}
                    </h3>

                    <p className="mt-1 text-sm text-[#9ca3af]">
                      {item.organisation}
                    </p>
                  </div>

                  <div className="text-left font-mono text-xs text-[#9ca3af] sm:text-right">
                    <p>{item.date}</p>
                    <p>{item.location}</p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#d4d4d8]">
                  {item.description}
                </p>

                <ul className="mt-4 list-inside list-disc space-y-1 text-sm leading-6 text-[#9ca3af]">
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
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9ca3af]">
                connect
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#f4f4f5]">
                Contact
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#d4d4d8]">
                {contact.availability}
              </p>
            </div>

            <div className="space-y-3 border border-[#2a303a] bg-[#101216] p-4 text-sm">
              <p>
                <span className="text-[#9ca3af]">Email:</span> {contact.email}
              </p>

              <p>
                <span className="text-[#9ca3af]">GitHub:</span>{" "}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-[#67e8f9] hover:underline"
                >
                  {contact.github}
                </a>
              </p>

              <p>
                <span className="text-[#9ca3af]">Website:</span>{" "}
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noreferrer"
                  className="break-all text-[#67e8f9] hover:underline"
                >
                  {contact.website}
                </a>
              </p>

              <p>
                <span className="text-[#9ca3af]">LinkedIn:</span>{" "}
                {contact.linkedin}
              </p>
            </div>

            <section>
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-[#9ca3af]">
                Areas of interest
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {contact.interests.map((interest) => (
                  <span
                    key={interest}
                    className="border border-[#2a303a] bg-[#101216] px-2 py-1 text-xs text-[#d4d4d8]"
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
