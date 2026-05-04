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
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
    topLeft: "left-10 top-20",
    topRight: "right-10 top-20",
    bottomLeft: "left-10 bottom-16",
    bottomRight: "right-10 bottom-16",
  };

  const sizes = {
    small: "w-[90%] max-w-md",
    medium: "w-[90%] max-w-2xl",
    large: "w-[92%] max-w-4xl",
  };

  return (
    <div
      onMouseDown={onFocus}
      className={`absolute ${positions[position]} ${sizes[size]} border border-[#3a3a3a] bg-[#262626] shadow-2xl`}
      style={{ zIndex }}
    >
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

      <div className="max-h-[70vh] overflow-y-auto p-5">{children}</div>
    </div>
  );
}