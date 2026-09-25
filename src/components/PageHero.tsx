export function PageHero({ title, intro, image }: { title: string; intro: string; image?: string }) {
  return (
    <section className="relative isolate flex min-h-[390px] items-end overflow-hidden bg-navy-deep text-cream md:min-h-[460px]">
      {image ? <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" /> : null}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,32,31,.95),rgba(10,32,31,.72)_60%,rgba(10,32,31,.4))]" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-28 sm:px-8 md:pb-20">
        <p className="eyebrow text-gold">Pamir Motoride · Tajikistan</p>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.08] tracking-[-.035em] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85 md:text-xl">{intro}</p>
      </div>
    </section>
  );
}
