"use client";

import { useState } from "react";
import BootScreen from "@/components/BootScreen";
import Desktop from "@/components/Desktop";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      {!booted ? (
        <BootScreen onComplete={() => setBooted(true)} />
      ) : (
        <Desktop />
      )}
    </main>
  );
}