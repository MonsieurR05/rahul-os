export default function AppIcon({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-[#3a3a3a] bg-[#242424] px-3 py-3 text-sm text-[#e5e5e5] transition hover:border-[#d97706] hover:bg-[#2d2d2d] sm:px-4"
    >
      {label}
    </button>
  );
}