"use client";

import TerminalApp from "./TerminalApp";
import AssistantApp from "./AssistantApp";
import Taskbar from "./Taskbar";
import { profile, projects } from "@/data/portfolio";

export default function Desktop() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#030303] text-[#f5f5f5]">
      <Taskbar />

      <main className="flex min-h-screen items-center justify-center px-5 pb-10 pt-20 sm:px-8">
        <section className="w-full max-w-[1700px] rounded-[2.5rem] border border-[#242424] bg-[#050505] p-6 shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
          <div className="grid items-center gap-5 xl:grid-cols-[430px_minmax(0,1fr)_430px]">
            <Panel title="terminal" status="command mode">
              <TerminalApp />
            </Panel>

            <section className="flex items-center justify-center px-4 py-8">
              <div className="max-w-xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#666666]">
                  local portfolio environment
                </p>

                <h1 className="mt-6 text-5xl font-bold leading-none tracking-[-0.06em] text-[#f5f5f5] sm:text-6xl xl:text-7xl">
                  Rahul Bagga
                </h1>

                <p className="mt-6 text-base font-semibold leading-7 text-[#a3a3a3]">
                  {profile.summary}
                </p>

                <div className="mx-auto mt-8 max-w-md rounded-3xl border border-[#2a2a2a] bg-[#080808] p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                  <p className="font-mono text-sm text-[#f5f5f5]">$ system</p>

                  <div className="mt-3 grid gap-2 font-mono text-xs text-[#666666] sm:grid-cols-2">
                    <p>profile: loaded</p>
                    <p>projects: {projects.length}</p>
                    <p>terminal: active</p>
                    <p>assistant: ready</p>
                  </div>
                </div>

                <p className="mx-auto mt-6 max-w-md text-sm leading-6 text-[#666666]">
                  Use the terminal for direct commands, or ask the assistant for
                  guided portfolio answers.
                </p>
              </div>
            </section>

            <Panel title="AI Assistant" status="guided mode">
              <AssistantApp />
            </Panel>
          </div>
        </section>
      </main>
    </section>
  );
}

function Panel({ title, status, children }) {
  return (
    <section className="flex items-center">
      <div className="w-full overflow-hidden rounded-[2rem] border border-[#2a2a2a] bg-[#080808] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between border-b border-[#2a2a2a] bg-[#0d0d0d] px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#555555]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#777777]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#999999]" />
          </div>

          <div className="text-right">
            <p className="font-mono text-xs text-[#f5f5f5]">{title}</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#666666]">
              {status}
            </p>
          </div>
        </div>

        <div className="max-h-[46vh] overflow-y-auto p-3">{children}</div>
      </div>
    </section>
  );
}
