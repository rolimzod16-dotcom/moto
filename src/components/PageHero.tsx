export function PageHero({ title, intro, image }: { title: string; intro: string; image?: string }) {
  return (
    <section className="page-hero relative isolate flex items-end overflow-hidden bg-navy-deep text-white">
      {image ? <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" /> : null}
      <div className="page-hero-shade absolute inset-0 -z-10" />
      <div className="shell relative pb-14 pt-28 md:pb-20">
        <p className="eyebrow text-gold">Pamir Motoride / Tajikistan</p>
        <h1 className="mt-5 max-w-4xl font-serif">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-white/85">{intro}</p>
      </div>
    </section>
  );
}
