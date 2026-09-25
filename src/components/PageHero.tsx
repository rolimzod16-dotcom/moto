export function PageHero({
  title,
  intro,
  image,
}: {
  title: string;
  intro: string;
  image?: string;
}) {
  return (
    <section className="border-b border-line bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg text-cream/90">{intro}</p>
        </div>
        {image ? (
          <img
            src={image}
            alt=""
            className="h-56 w-full rounded object-cover md:h-72"
          />
        ) : null}
      </div>
    </section>
  );
}
