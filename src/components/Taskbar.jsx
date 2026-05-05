export default function Taskbar() {
  return (
    <header className="absolute left-0 top-0 z-30 flex h-10 w-full items-center justify-between border-b border-[#3a3a3a] bg-[#222222] px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        <span className="font-mono text-sm font-semibold text-[#f2f2f2]">
          RahulOS
        </span>
        <span className="hidden text-xs text-[#a3a3a3] sm:inline">
          portfolio environment
        </span>
      </div>

      <div className="font-mono text-xs text-[#a3a3a3]">online</div>
    </header>
  );
}