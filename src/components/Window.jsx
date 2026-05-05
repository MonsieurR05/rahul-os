export default function Window({
  title,
  children,
  onClose,
  position = "center",
  size = "medium",
  zIndex = 20,
  onFocus,
}) {
  const positions = {
    center:
      "left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2",

    upperLeft:
      "left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 md:left-[18%] md:top-[26%] md:translate-x-0 md:translate-y-0",

    upperRight:
      "left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 md:right-[18%] md:left-auto md:top-[26%] md:translate-x-0 md:translate-y-0",

    experienceRight:
      "left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 md:right-[18%] md:left-auto md:top-[18%] md:translate-x-0 md:translate-y-0",

    lowerLeft:
      "left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 md:left-[18%] md:top-auto md:bottom-[14%] md:translate-x-0 md:translate-y-0",

    lowerRight:
      "left-1/2 top-[54%] -translate-x-1/2 -translate-y-1/2 md:right-[18%] md:left-auto md:top-auto md:bottom-[14%] md:translate-x-0 md:translate-y-0",
  };

  const sizes = {
    small: "w-[92%] max-w-md",
    medium: "w-[92%] max-w-2xl",
    large: "w-[94%] max-w-4xl",
    assistant: "w-[94%] max-w-3xl",
  };

  return (
    <div
      onMouseDown={onFocus}
      className={`fixed ${positions[position]} ${sizes[size]} overflow-hidden rounded-3xl border border-[#1f1f1f] bg-[#0d0d0d] shadow-[0_24px_80px_rgba(0,0,0,0.55)]`}
      style={{ zIndex }}
    >
      <div className="flex items-center justify-between border-b border-[#1f1f1f] bg-[#080808] px-3 py-2 md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-3 w-3 shrink-0 rounded-full border border-[#3a3a3a] bg-[#050505]" />
          <p className="truncate text-sm font-medium text-[#f5f5f5]">
            {title}
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-full border border-[#1f1f1f] bg-[#050505] px-3 py-1 text-xs text-[#a3a3a3] transition hover:border-[#3a3a3a] hover:text-[#f5f5f5]"
        >
          close
        </button>
      </div>

      <div className="max-h-[76vh] overflow-y-auto p-4 md:max-h-[78vh] md:p-5">
        {children}
      </div>
    </div>
  );
}