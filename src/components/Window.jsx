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
      className={`fixed ${positions[position]} ${sizes[size]} overflow-hidden border border-[#2a303a] bg-[#151922] shadow-[0_24px_80px_rgba(0,0,0,0.55)]`}
      style={{ zIndex }}
    >
      <div className="flex items-center justify-between border-b border-[#2a303a] bg-[#101216] px-3 py-2 md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-3 w-3 shrink-0 border border-[#3b4452] bg-[#08090b]" />
          <p className="truncate font-mono text-sm font-medium text-[#f4f4f5]">
            {title}
          </p>
        </div>

        <button
          onClick={onClose}
          className="border border-[#2a303a] bg-[#0c0e12] px-2 py-1 font-mono text-xs text-[#9ca3af] transition hover:border-[#67e8f9] hover:text-[#f4f4f5]"
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