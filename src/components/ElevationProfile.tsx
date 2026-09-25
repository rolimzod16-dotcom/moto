export function ElevationProfile({ locale }: { locale: string }) {
  const ru = locale === "ru";
  return (
    <section className="elev">
      <div className="shell">
        <p className="eyebrow text-gold">{ru ? "Профиль высот M41" : "M41 elevation profile"}</p>
        <h2 className="mt-2 font-serif text-2xl font-extrabold uppercase tracking-wide md:text-3xl">
          {ru ? "Памирский тракт: от долины до перевала" : "Pamir Highway: valley to the pass"}
        </h2>
        <div className="mt-6 rounded-xl border border-white/10 bg-[#070d11] p-4">
          <svg viewBox="0 0 380 140" className="h-40 w-full" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="pamirElev" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#e5bb7c" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#e5bb7c" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <line x1="0" x2="380" y1="20" y2="20" stroke="#334155" strokeDasharray="3 3" />
            <line x1="0" x2="380" y1="55" y2="55" stroke="#334155" strokeDasharray="3 3" />
            <line x1="0" x2="380" y1="95" y2="95" stroke="#334155" strokeDasharray="3 3" />
            <path
              d="M0 115 C40 108,70 95,100 82 C140 70,180 50,220 38 C240 30,260 16,275 16 C290 16,310 32,330 45 C350 75,365 105,380 110 L380 140 L0 140 Z"
              fill="url(#pamirElev)"
            />
            <path
              d="M0 115 C40 108,70 95,100 82 C140 70,180 50,220 38 C240 30,260 16,275 16 C290 16,310 32,330 45 C350 75,365 105,380 110"
              fill="none"
              stroke="#e5bb7c"
              strokeWidth="3"
            />
            <circle cx="275" cy="16" r="4.5" fill="#fff" stroke="#e5bb7c" strokeWidth="2.5" />
          </svg>
          <div className="mt-3 grid grid-cols-4 gap-1 text-center font-mono text-[11px] text-slate-300">
            <div>
              <b className="block text-white">Dushanbe</b>706m
            </div>
            <div>
              <b className="block text-white">Khorog</b>2,123m
            </div>
            <div>
              <b className="block text-white">Murghab</b>3,618m
            </div>
            <div>
              <b className="block text-white">Ak-Baital</b>4,655m
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
