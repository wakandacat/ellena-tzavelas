function Banner() {
  return (
    <section
      id="banner"
      className="section-padding-x section-padding-y flex h-screen w-full flex-col items-center justify-center bg-gradient-to-tr from-(--detail-color) to-(--detail-color-2) text-white"
    >
      <div className="flex flex-col justify-center gap-6 text-center">
        <h1 className="text-6xl font-bold md:text-7xl lg:text-8xl">
          Ellena Tzavelas
        </h1>
        <p className="text-3xl leading-loose font-extralight italic md:text-4xl lg:text-5xl">
          Frontend Designer & Developer
        </p>
        <p className="text-lg font-extralight lg:text-xl">
          Creating accessible and engaging web experiences
        </p>
        <a
          href="#about"
          className="mt-20 text-3xl text-white motion-safe:animate-bounce"
        >
          ↓
        </a>
      </div>
    </section>
  );
}

export default Banner;
