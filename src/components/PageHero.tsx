export function PageHero({ title, intro, image }: { title: string; intro: string; image?: string }) {
  return (
    <section className="relative isolate flex min-h-[360px] items-end overflow-hidden bg-navy-deep text-white md:min-h-[440px]">
      {image ? <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0e161c] via-[#0e161c]/75 to-[#0e161c]/55" />
      <div className="shell relative pb-12 pt-28">
        <p className="eyebrow text-gold">Pamir Motoride · Tajikistan</p>
        <h1 className="mt-4 max-w-4xl font-serif text-4xl font-extrabold uppercase leading-[1.08] tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/80">{intro}</p>
      </div>
    </section>
  );
}
