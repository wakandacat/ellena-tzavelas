function Skills() {
  return (
    <section
      id="skills"
      className="section-padding-x section-padding-y flex flex-col justify-between gap-10 bg-(--background-color-2) lg:flex-row lg:items-start lg:gap-20"
    >
      <div className="flex w-full flex-col justify-center gap-6">
        <h2 className="heading">Skills & Tools</h2>
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-4">
            <p className="sub-heading">Development</p>
            <div className="flex flex-wrap gap-4">
              <p className="skill-pill">HTML</p>
              <p className="skill-pill">CSS</p>
              <p className="skill-pill">JavaScript</p>
              <p className="skill-pill">React</p>
              <p className="skill-pill">TypeScript</p>
              <p className="skill-pill">Java (Android Studio)</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="sub-heading">Design</p>
            <div className="flex flex-wrap gap-4">
              <p className="skill-pill">Figma</p>
              <p className="skill-pill">Tailwind CSS</p>
              <p className="skill-pill">BootStrap CSS</p>
              <p className="skill-pill">WCAG</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="sub-heading">Support</p>
            <div className="flex flex-wrap gap-4">
              <p className="skill-pill">GitHub</p>
              <p className="skill-pill">JIRA</p>
              <p className="skill-pill">Agile</p>
              <p className="skill-pill">Google Analytics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
