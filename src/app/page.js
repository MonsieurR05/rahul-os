export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-[#f5f5f5]">
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <p className="font-mono text-xs uppercase tracking-[0.32em] text-[#666666]">
            rahulb.dev
          </p>

          <h1 className="mt-6 text-5xl font-bold tracking-[-0.05em] sm:text-6xl">
            Portfolio under redevelopment
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#a3a3a3]">
            Rahul Bagga’s portfolio is currently being rebuilt into RahulOS, an
            operating-system-inspired portfolio experience with a terminal and
            AI-assisted project guide.
          </p>

          <div className="mx-auto mt-8 max-w-md rounded-3xl border border-[#1f1f1f] bg-[#080808] p-5 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <p className="font-mono text-sm text-[#f5f5f5]">$ status</p>

            <div className="mt-3 space-y-2 font-mono text-xs text-[#666666]">
              <p>current_site: under_development</p>
              <p>new_portfolio: RahulOS</p>
              <p>launch_status: building</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/MonsieurR05"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-[#1f1f1f] bg-[#080808] px-5 py-3 text-sm font-semibold text-[#f5f5f5] transition hover:border-[#3a3a3a] hover:bg-[#111111]"
            >
              GitHub
            </a>

            <a
              href="mailto:MonsieurR9@proton.me"
              className="rounded-2xl bg-[#f5f5f5] px-5 py-3 text-sm font-semibold text-[#050505] transition hover:bg-[#d4d4d4]"
            >
              Contact Rahul
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}