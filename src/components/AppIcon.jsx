export default function AppIcon({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border border-[#1f1f1f] bg-[#080808] px-4 py-3 text-left font-mono text-sm text-[#f5f5f5] shadow-[0_12px_35px_rgba(0,0,0,0.28)] transition hover:border-[#3a3a3a] hover:bg-[#111111]"
    >
      <span className="text-[#666666]">$</span>{" "}
      <span className="text-[#a3a3a3]">open</span>{" "}
      <span>{label.toLowerCase()}</span>
    </button>
  );
}