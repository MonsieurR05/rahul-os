"use client";

import TerminalApp from "./TerminalApp";
import AssistantApp from "./AssistantApp";
import Taskbar from "./Taskbar";
import { profile, projects } from "@/data/portfolio";

export default function Desktop() {
  return (
    <section className="relative min-h-dvh overflow-x-hidden bg-[#030303] text-[#f5f5f5]">
      <Taskbar />

      <main className="flex min-h-dvh items-start justify-center px-3 pb-6 pt-14 sm:px-5 sm:pb-8 sm:pt-16 lg:items-center lg:px-8 lg:pb-10 lg:pt-10">
        <section className="w-full max-w-[1700px] rounded-[1.75rem] border border-[#242424] bg-[#050505] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:rounded-[2rem] sm:p-4 lg:p-5 lg:my-auto">
          <div className="grid items-start gap-4 xl:grid-cols-[minmax(320px,430px)_minmax(0,1fr)_minmax(320px,430px)] xl:items-center xl:gap-5">
            <div className="order-2 min-w-0 xl:order-1">
              <Panel title="terminal" status="command mode">
                <TerminalApp />
              </Panel>
            </div>

            <section className="order-1 flex min-w-0 items-center justify-center px-2 py-2 sm:px-4 sm:py-4 xl:order-2">
              <div className="w-full max-w-2xl text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#666666] sm:text-xs sm:tracking-[0.32em]">
                  local portfolio environment
                </p>

                <h1 className="mt-4 text-4xl font-bold leading-none tracking-[-0.05em] text-[#f5f5f5] sm:mt-5 sm:text-5xl lg:text-6xl xl:text-7xl">
                  Rahul Bagga
                </h1>

                <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-[#d7d7d7] sm:mt-6 sm:text-xl sm:leading-9 lg:text-2xl lg:leading-10">
                  {profile.summary}
                </p>

                <div className="mx-auto mt-6 w-full max-w-xl rounded-[1.5rem] border border-[#2a2a2a] bg-[#080808] p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:mt-8 sm:rounded-[1.75rem] sm:p-5">
                  <p className="font-mono text-sm text-[#f5f5f5]">$ system</p>

                  <div className="mt-3 grid gap-2 font-mono text-xs text-[#666666] sm:grid-cols-2">
                    <p>profile: loaded</p>
                    <p>projects: {projects.length}</p>
                    <p>terminal: active</p>
                    <p>assistant: ready</p>
                  </div>
                </div>

                <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#777777] sm:mt-6 sm:text-base">
                  Use the terminal for direct commands, or ask the assistant for
                  guided portfolio answers.
                </p>
              </div>
            </section>

            <div className="order-3 min-w-0">
              <Panel title="AI Assistant" status="guided mode">
                <AssistantApp />
              </Panel>
            </div>
          </div>
        </section>
      </main>
    </section>
  );
}

function Panel({ title, status, children }) {
  return (
    <section className="min-w-0 overflow-hidden rounded-[1.5rem] border border-[#2a2a2a] bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:rounded-[2rem]">
      <div className="flex items-center justify-between border-b border-[#242424] bg-[#0d0d0d] px-4 py-3 sm:px-5 sm:py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#666666]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#8a8a8a]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#b0b0b0]" />
        </div>

        <div className="text-right">
          <p className="font-mono text-xs text-[#f5f5f5]">{title}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#666666]">
            {status}
          </p>
        </div>
      </div>

      <div className="max-h-[58dvh] overflow-y-auto p-2 sm:p-3 xl:max-h-[46vh]">
        {children}
      </div>
    </section>
  );
}