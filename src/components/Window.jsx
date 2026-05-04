export default function Window({ title, children, onClose }) {
  return (
    <div className="absolute left-1/2 top-1/2 z-20 w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 border border-[#3a3a3a] bg-[#262626] shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#3a3a3a] bg-[#303030] px-4 py-2">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 border border-[#6b6b6b] bg-[#1b1b1b]" />
          <p className="text-sm font-medium text-[#f2f2f2]">{title}</p>
        </div>

        <button
          onClick={onClose}
          className="border border-[#4a4a4a] bg-[#242424] px-2 py-1 text-xs text-[#d0d0d0] transition hover:border-[#d97706] hover:text-[#f2f2f2]"
        >
          close
        </button>
      </div>

      <div className="p-5">{children}</div>
    </div>
  );
}