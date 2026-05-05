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
      className={`fixed ${positions[position]} ${sizes[size]} overflow-hidden border border-[#3a3a3a] bg-[#262626] shadow-2xl`}
      style={{ zIndex }}
    >
      <div className="flex items-center justify-between border-b border-[#3a3a3a] bg-[#303030] px-3 py-2 md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-3 w-3 shrink-0 border border-[#6b6b6b] bg-[#1b1b1b]" />
          <p className="truncate text-sm font-medium text-[#f2f2f2]">
            {title}
          </p>
        </div>

        <button
          onClick={onClose}
          className="border border-[#4a4a4a] bg-[#242424] px-2 py-1 text-xs text-[#d0d0d0] transition hover:border-[#d97706] hover:text-[#f2f2f2]"
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