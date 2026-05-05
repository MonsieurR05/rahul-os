export default function Taskbar() {
  return (
    <header className="absolute left-0 top-0 z-30 flex h-10 w-full items-center justify-between border-b border-[#1f1f1f] bg-[#030303] px-3 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="font-mono text-sm font-semibold text-[#f5f5f5]">
          RahulOS
        </span>
        <span className="hidden font-mono text-xs text-[#666666] sm:inline">
          / portfolio environment
        </span>
      </div>

      <div className="font-mono text-xs text-[#f5f5f5]">online</div>
    </header>
  );
}
