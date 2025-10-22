function Banner() {
  return (
    <section
      id="banner-image"
      className="banner-text-outline banner-background relative box-border flex min-h-[400px] w-full flex-col items-center md:min-h-[500px] lg:min-h-[700px] xl:min-h-[900px]"
    >
      <div className="absolute flex h-[100%] flex-col justify-center">
        <h1 id="name" className="font-bold text-(--text-color-2) uppercase">
          ELLENA TZAVELAS
        </h1>
        <h3 id="banner-sub" className="text-(--detail-color)">
          Web Dev // Game Dev
        </h3>
      </div>
    </section>
  );
}

export default Banner;
