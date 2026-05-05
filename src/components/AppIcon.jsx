export default function AppIcon({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group border border-[#2a303a] bg-[#101216] px-3 py-3 text-left font-mono text-sm text-[#f4f4f5] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:border-[#67e8f9] hover:bg-[#151922] sm:px-4"
    >
      <span className="text-[#67e8f9] transition group-hover:text-[#93c5fd]">
        $
      </span>{" "}
      <span className="text-[#d4d4d8]">open</span>{" "}
      <span>{label.toLowerCase()}</span>
    </button>
  );
}