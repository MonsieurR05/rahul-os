"use client";

import { useEffect, useState } from "react";

export default function BootScreen({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);

  const bootLines = [
    "RahulOS v0.1",
    "Loading portfolio modules...",
    "Initialising project archive...",
    "Loading skills interface...",
    "Starting AI assistant shell...",
    "Welcome."
  ];

  useEffect(() => {
    if (lineIndex < bootLines.length) {
      const timer = setTimeout(() => {
        setLineIndex((current) => current + 1);
      }, 550);

      return () => clearTimeout(timer);
    }

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 700);

    return () => clearTimeout(finishTimer);
  }, [lineIndex, onComplete, bootLines.length]);

    return (
    <section className="flex min-h-screen items-center justify-center bg-[#111111] px-6">
    <div className="w-full max-w-2xl border border-[#3a3a3a] bg-black p-8">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
        boot sequence
      </p>

      <div className="space-y-3 font-mono text-sm text-[#d97706]">
        {bootLines.slice(0, lineIndex).map((line) => (
          <p key={line}>
            <span className="text-[#777777]">&gt;</span> {line}
          </p>
        ))}

        <span className="inline-block h-4 w-2 animate-pulse bg-[#d97706]" />
      </div>
    </div>
  </section>
);
}