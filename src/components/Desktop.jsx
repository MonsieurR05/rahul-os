"use client";

import { useState } from "react";
import AppIcon from "./AppIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import {
  profile,
  projects,
  skills,
  experience,
  contact,
} from "@/data/portfolio";

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

  const [activeWindow, setActiveWindow] = useState("home");

  const apps = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
    { id: "assistant", label: "Assistant" },
  ];

  const windowSettings = {
    home: { title: "Home", position: "center", size: "medium" },
    about: { title: "About", position: "topLeft", size: "medium" },
    projects: { title: "Projects", position: "center", size: "large" },
    skills: { title: "Skills", position: "bottomLeft", size: "medium" },
    experience: { title: "Experience", position: "topRight", size: "medium" },
    contact: { title: "Contact", position: "bottomRight", size: "small" },
    assistant: { title: "Assistant", position: "topRight", size: "small" },
  };

  function openApp(appName) {
    setOpenWindows((current) => ({
      ...current,
      [appName]: true,
    }));

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
    <section className="relative min-h-screen overflow-hidden bg-[#1b1b1b] text-[#f2f2f2]">
      <Taskbar />

      <main className="flex min-h-screen items-center justify-center px-6 pb-12 pt-10">
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
              <p>projects: {projects.length}</p>
              <p>assistant: offline</p>
            </div>
          </div>
        </section>
      </main>

      {openWindows.home && (
        <Window {...getWindowProps("home")}>
          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#a3a3a3]">
                welcome
              </p>

              <h2 className="mt-2 text-2xl font-semibold">{profile.name}</h2>

              <p className="mt-1 text-sm text-[#d0d0d0]">{profile.title}</p>
            </div>

            <p className="text-sm leading-6 text-[#c9c9c9]">
              {profile.summary}
            </p>

            <div className="grid gap-2 sm:grid-cols-2">
              {profile.focusAreas.map((area) => (
                <div
                  key={area}
                  className="border border-[#3a3a3a] bg-[#202020] p-3 text-sm text-[#d0d0d0]"
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
          <div className="space-y-4 text-sm leading-6 text-[#d0d0d0]">
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

            <p className="text-[#a3a3a3]">Location: {profile.location}</p>
          </div>
        </Window>
      )}

      {openWindows.projects && (
        <Window {...getWindowProps("projects")}>
          <div className="space-y-4">
            {projects.map((project) => (
              <article
                key={project.title}
                className="border border-[#3a3a3a] bg-[#202020] p-4"
              >
                <div>
                  <h3 className="font-medium text-[#f2f2f2]">
                    {project.title}
                  </h3>

                  <p className="mt-1 font-mono text-xs text-[#d97706]">
                    {project.status}
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={item}
                      className="border border-[#3a3a3a] bg-[#262626] px-2 py-1 text-xs text-[#bdbdbd]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-[#bdbdbd]">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Window>
      )}

      {openWindows.skills && (
        <Window {...getWindowProps("skills")}>
          <div className="space-y-4">
            <div className="border border-[#3a3a3a] bg-[#111111] p-4 font-mono text-sm">
              <p className="text-[#d97706]">$ skills --grouped</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {skills.map((group) => (
                <section
                  key={group.category}
                  className="border border-[#3a3a3a] bg-[#202020] p-4"
                >
                  <h3 className="text-sm font-medium text-[#f2f2f2]">
                    {group.category}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="border border-[#3a3a3a] bg-[#262626] px-2 py-1 text-xs text-[#c9c9c9]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Window>
      )}

      {openWindows.experience && (
        <Window {...getWindowProps("experience")}>
          <div className="space-y-4">
            {experience.map((item) => (
              <article
                key={`${item.role}-${item.organisation}`}
                className="border border-[#3a3a3a] bg-[#202020] p-4"
              >
                <p className="font-mono text-xs text-[#d97706]">{item.date}</p>

                <h3 className="mt-2 font-medium text-[#f2f2f2]">
                  {item.role}
                </h3>

                <p className="mt-1 text-sm text-[#a3a3a3]">
                  {item.organisation}
                </p>

                <p className="mt-3 text-sm leading-6 text-[#c9c9c9]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </Window>
      )}

      {openWindows.contact && (
        <Window {...getWindowProps("contact")}>
          <div className="space-y-3 text-sm text-[#d0d0d0]">
            <p className="text-[#a3a3a3]">Contact links and profiles.</p>

            <p>
              <span className="text-[#a3a3a3]">Email:</span> {contact.email}
            </p>

            <p>
              <span className="text-[#a3a3a3]">GitHub:</span>{" "}
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="text-[#d97706] hover:underline"
              >
                {contact.github}
              </a>
            </p>

            <p>
              <span className="text-[#a3a3a3]">Website:</span>{" "}
              <a
                href={contact.website}
                target="_blank"
                rel="noreferrer"
                className="text-[#d97706] hover:underline"
              >
                {contact.website}
              </a>
            </p>

            <p>
              <span className="text-[#a3a3a3]">LinkedIn:</span>{" "}
              {contact.linkedin}
            </p>
          </div>
        </Window>
      )}

      {openWindows.assistant && (
        <Window {...getWindowProps("assistant")}>
          <div className="space-y-4">
            <div className="border border-[#3a3a3a] bg-[#111111] p-4 font-mono text-sm">
              <p className="text-[#d97706]">$ assistant --status</p>

              <p className="mt-2 text-[#bdbdbd]">
                Offline. Portfolio Q&amp;A will be added in a later feature
                branch.
              </p>
            </div>

            <p className="text-sm leading-6 text-[#c9c9c9]">
              The assistant will eventually answer questions using this
              portfolio data, such as which projects demonstrate specific skills
              or which work is most relevant to a role.
            </p>
          </div>
        </Window>
      )}
    </section>
  );
}