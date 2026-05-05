"use client";

import { useEffect, useState } from "react";

export default function BootScreen({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);

  const bootLines = [
    "rahulos kernel initialised",
    "mounting portfolio filesystem",
    "loading project index",
    "loading experience records",
    "starting terminal interface",
    "starting assistant service",
    "environment ready",
  ];

  useEffect(() => {
    if (lineIndex < bootLines.length) {
      const timer = setTimeout(() => {
        setLineIndex((current) => current + 1);
      }, 420);

      return () => clearTimeout(timer);
    }

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 650);

    return () => clearTimeout(finishTimer);
  }, [lineIndex, onComplete, bootLines.length]);

  const progress = Math.min(
    Math.round((lineIndex / bootLines.length) * 100),
    100
  );

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#08090b] px-4 text-[#f4f4f5]">
      <div className="w-full max-w-2xl border border-[#2a303a] bg-[#101216] shadow-[0_24px_80px_rgba(0,0,0,0.55)]">
        <div className="flex items-center justify-between border-b border-[#2a303a] bg-[#0c0e12] px-4 py-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#9ca3af]">
              RahulOS
            </p>
            <h1 className="mt-1 font-mono text-lg font-semibold text-[#f4f4f5]">
              boot sequence
            </h1>
          </div>

          <p className="font-mono text-xs text-[#67e8f9]">{progress}%</p>
        </div>

        <div className="p-5">
          <div className="mb-5 h-2 border border-[#2a303a] bg-[#08090b]">
            <div
              className="h-full bg-[#67e8f9] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="min-h-56 space-y-3 font-mono text-sm">
            {bootLines.slice(0, lineIndex).map((line, index) => (
              <p key={line} className="text-[#d4d4d8]">
                <span className="text-[#67e8f9]">$</span>{" "}
                <span className="text-[#9ca3af]">
                  [{String(index + 1).padStart(2, "0")}]
                </span>{" "}
                {line}
              </p>
            ))}

            {lineIndex < bootLines.length ? (
              <p className="text-[#9ca3af]">
                <span className="text-[#67e8f9]">$</span> running
                <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-[#67e8f9] align-middle" />
              </p>
            ) : (
              <p className="text-[#67e8f9]">
                <span>$</span> launch desktop
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}