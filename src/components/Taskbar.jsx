export default function Taskbar() {
  return (
    <header className="absolute left-0 top-0 z-30 flex h-10 w-full items-center justify-between border-b border-[#2a303a] bg-[#08090b] px-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="font-mono text-sm font-semibold text-[#f4f4f5]">
          RahulOS
        </span>
        <span className="hidden font-mono text-xs text-[#9ca3af] sm:inline">
          / portfolio environment
        </span>
      </div>

      <div className="font-mono text-xs text-[#67e8f9]">online</div>
    </header>
  );
}