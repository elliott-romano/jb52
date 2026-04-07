"use client";

import Image from "next/image";
import Lenis from "lenis";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

type Section = {
  id: string;
  eyebrow: string;
  title?: string;
  lead?: string;
  body?: string[];
  list?: string[];
  principles?: string[];
  layout?:
    | "hero"
    | "statement"
    | "copy"
    | "principlesCards"
    | "servicesScroll"
    | "bioFeature"
    | "contact";
};

const interactivePrinciples = [
  "What matters to our clients matters to us. We are consumer insight and business challenge focused.",
  "We don't chase awards. Our biggest reward is helping our clients grow their business and brands to sell more product.",
  "We believe that in an overcommunicated world a simple, clear, and distinctive big brand idea sits at the core of everything. It is actually more important than ever.",
  "Smart, meaningful great creative cures everything.",
  "There is a sweet spot that sits between the problem your product solves and culture.",
  "The best work and results come from meaningful and genuine agency and client partnerships.",
  "We believe in joy. And our joy comes from making great creative that helps our clients achieve their goals."
] as const;

const sections: Section[] = [
  {
    id: "hero",
    eyebrow: "Information",
    layout: "hero",
    body: ["JB52 is a full service brand building creative studio"]
  },
  {
    id: "why-we-exist",
    eyebrow: "Why we exist",
    layout: "copy",
    body: [
      "We exist to provide fat free, top quality thinking, smart brand ideas and top notch service with one and one goal: Help our clients grow their businesses and overcome their business challenges."
    ]
  },
  {
    id: "problems-we-solve",
    eyebrow: "Problem we solve",
    layout: "copy",
    body: [
      "Often traditional big agencies get unnecessarily complex in the way they operate. Work suffers and consistency becomes a challenge. We believe in a process where brands always have access to top senior talent that comes with extensive agency experience. No red tape. No BS."
    ]
  },
  // {
  //   id: "principles",
  //   eyebrow: "Our principles",
  //   layout: "copy",
  //   body: [
  //     "What matters to our clients matters to us. We are consumer and business focused. We are not industry obsessed.",
  //     "We believe that in an overcommunicated world a simple clear ownable and distinctive brand idea is everything and imperative for survival.",
  //     "Smart meaningful great creative cures everything.",
  //     "We don't chase awards. We chase the reward of helping our client grow their business.",
  //     "We believe in joy, because to us this is not a job is our absolute passion."
  //   ]
  // },
  {
    id: "principles-cards",
    eyebrow: "Our principles",
    layout: "principlesCards",
    principles: [...interactivePrinciples]
  },
  {
    id: "what-we-do",
    eyebrow: "What we do",
    layout: "servicesScroll",
    list: [
      "Brand & Campaign Ideas",
      "Communication Ideas",
      "Creative Strategy",
      "Brand Visual Identity",
      "Initiative conceptualization",
      "Multi touchpoint toolkits and go to market",
      "Product naming",
      "Production"
    ]
  },
  {
    id: "who-we-are",
    eyebrow: "How we work",
    layout: "copy",
    body: [
      "With vast access to a network of top proven talent, we lead and assemble a team that fits the specific needs of each project."
    ]
  },
  {
    id: "javier-bonilla",
    eyebrow: "Founder",
    layout: "bioFeature",
    title: "Javier Bonilla",
    body: [
      "A seasoned creative leader with more than 25 years of experience across multiple continents: North America, Europe, Latin America and Asia. With a strong background in beauty and CPG, Javier has developed highly effective creative that that resonates in culture to build brands. He has led the creation of campaigns for billion dollar brands as well as niche businesses. A true believer that great advertising can only be great if it sells, Javier has always dreamed about starting a lean, dynamic creative agency with impeccable, exquisite dedication to clients and business challenges.\nBased in NY."
    ]
  },
  {
    id: "contact",
    eyebrow: "Contact",
    layout: "contact",
    body: [
      "Have a project or collaboration in mind?",
      "Please email us at:",
      "javier.bonilla@jb52.com"
    ]
  }
];

const introFrames = ["light", "dark", "light", "dark", "light", "dark", "light", "dark"] as const;
const HERO_LEDE_DELAY_MS = 350;
const PRINCIPLES_AUTO_ADVANCE_MS = 6400;
const WHY_WE_EXIST_UNDERLINE_TEXT =
  "Help our clients grow their businesses and overcome their business challenges.";
const PROBLEM_WE_SOLVE_STRIKETHROUGH_TEXT = "No red tape. No BS.";

const navItems = [
  { id: "why-we-exist", label: "Why we exist" },
  { id: "problems-we-solve", label: "Problem we solve" },
  { id: "principles-cards", label: "Principles" },
  { id: "what-we-do", label: "What we do" },
  { id: "who-we-are", label: "How we work" },
  { id: "contact", label: "Contact" }
] as const;

const whatWeDoItems = sections.find((section) => section.id === "what-we-do")?.list ?? [];
const PRINCIPLES_SECTION_INDEX = sections.findIndex((section) => section.id === "principles-cards");

export function ScrollySite() {
  const [introStep, setIntroStep] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [heroLedeVisible, setHeroLedeVisible] = useState(false);
  const [whyWeExistUnderlineProgress, setWhyWeExistUnderlineProgress] = useState(0);
  const [problemWeSolveStrikeProgress, setProblemWeSolveStrikeProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      wheelMultiplier: 0.92,
      touchMultiplier: 0.9,
      lerp: 0.08
    });

    let frameId = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateServices = () => {
      const section = document.getElementById("what-we-do");

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 0.9999);
      const nextIndex = Math.min(whatWeDoItems.length - 1, Math.floor(progress * whatWeDoItems.length));

      setActiveService(nextIndex);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateServices);
    };

    updateServices();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateProblemWeSolveStrike = () => {
      const section = document.getElementById("problems-we-solve");

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const revealProgress = Math.min(Math.max((progress - 0.2) / 0.72, 0), 1);

      setProblemWeSolveStrikeProgress(revealProgress);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProblemWeSolveStrike);
    };

    updateProblemWeSolveStrike();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!introDone) {
      setHeroLedeVisible(false);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setHeroLedeVisible(true);
    }, HERO_LEDE_DELAY_MS);

    return () => window.clearTimeout(timeoutId);
  }, [introDone]);

  useEffect(() => {
    let frameId = 0;

    const updateWhyWeExistUnderline = () => {
      const section = document.getElementById("why-we-exist");

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const revealProgress = Math.min(Math.max((progress - 0.2) / 0.72, 0), 1);

      setWhyWeExistUnderlineProgress(revealProgress);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateWhyWeExistUnderline);
    };

    updateWhyWeExistUnderline();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const renderSplitText = (text: string, className = "services-panel__char") => {
    let charIndex = 0;

    return text.split(" ").map((word, wordIndex, words) => (
      <span aria-hidden="true" className="services-panel__word" key={`${word}-${wordIndex}`}>
        {word.split("").map((character) => {
          const currentIndex = charIndex;
          charIndex += 1;

          return (
            <span
              aria-hidden="true"
              className={className}
              key={`${word}-${wordIndex}-${currentIndex}`}
              style={{ transitionDelay: `${Math.min(currentIndex * 14, 360)}ms` }}
            >
              {character}
            </span>
          );
        })}
        {wordIndex < words.length - 1 ? "\u00A0" : ""}
      </span>
    ));
  };

  const renderSplitWords = (text: string, className = "hero-panel__word") =>
    text.split(" ").map((word, wordIndex) => (
      <span
        aria-hidden="true"
        className={className}
        key={`${word}-${wordIndex}`}
        style={{ transitionDelay: `${Math.min(wordIndex * 55, 440)}ms` }}
      >
        {word}
        {wordIndex < text.split(" ").length - 1 ? "\u00A0" : ""}
      </span>
    ));

  useEffect(() => {
    const frameInterval = window.setInterval(() => {
      setIntroStep((current) => {
        if (current >= introFrames.length - 1) {
          window.clearInterval(frameInterval);
          window.setTimeout(() => setIntroDone(true), 950);
          return current;
        }

        return current + 1;
      });
    }, 520);

    return () => window.clearInterval(frameInterval);
  }, []);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-story-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) {
          return;
        }

        const target = visible.target as HTMLElement;
        const nextIndex = Number(target.dataset.index);
        setActiveSection(nextIndex);
      },
      {
        threshold: [0.35, 0.55, 0.75]
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const closeMenu = () => {
      if (window.innerWidth > 840) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", closeMenu);

    return () => window.removeEventListener("resize", closeMenu);
  }, [menuOpen]);

  useEffect(() => {
    if (activeSection !== PRINCIPLES_SECTION_INDEX) {
      setActivePrinciple(0);
      return;
    }

    setActivePrinciple(0);

    const intervalId = window.setInterval(() => {
      setActivePrinciple((current) => (current + 1) % interactivePrinciples.length);
    }, PRINCIPLES_AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [activeSection]);

  const introTheme = introFrames[introStep];
  const leftNavItems = navItems.slice(0, 3);
  const rightNavItems = navItems.slice(3);
  const renderAnimatedEmphasis = (
    text: string,
    progress: number,
    visibleClassName: string,
    charClassName: string
  ) => {
    let charIndex = 0;

    return (
      <span className="copy-panel__emphasis" aria-label={text}>
        {text.split(" ").map((word, wordIndex, words) => (
          <span aria-hidden="true" className="copy-panel__emphasis-word" key={`${word}-${wordIndex}`}>
            {word.split("").map((character) => {
              const currentIndex = charIndex;
              charIndex += 1;
              const isVisible = progress * text.length > currentIndex;

              return (
                <span
                  aria-hidden="true"
                  className={`${charClassName} ${isVisible ? visibleClassName : ""}`}
                  key={`${word}-${wordIndex}-${currentIndex}`}
                >
                  {character}
                </span>
              );
            })}
            {wordIndex < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </span>
    );
  };
  const renderCopyParagraph = (sectionId: string, paragraph: string) => {
    if (sectionId !== "why-we-exist" || !paragraph.includes(WHY_WE_EXIST_UNDERLINE_TEXT)) {
      if (
        sectionId !== "problems-we-solve" ||
        !paragraph.includes(PROBLEM_WE_SOLVE_STRIKETHROUGH_TEXT)
      ) {
        return paragraph;
      }

      const [introText] = paragraph.split(PROBLEM_WE_SOLVE_STRIKETHROUGH_TEXT);

      return (
        <>
          {introText}
          {renderAnimatedEmphasis(
            PROBLEM_WE_SOLVE_STRIKETHROUGH_TEXT,
            problemWeSolveStrikeProgress,
            "copy-panel__strike-char--visible",
            "copy-panel__strike-char"
          )}
        </>
      );
    }

    const [introText] = paragraph.split(WHY_WE_EXIST_UNDERLINE_TEXT);

    return (
      <>
        {introText}
        {renderAnimatedEmphasis(
          WHY_WE_EXIST_UNDERLINE_TEXT,
          whyWeExistUnderlineProgress,
          "copy-panel__emphasis-char--visible",
          "copy-panel__emphasis-char"
        )}
      </>
    );
  };

  return (
    <div className="page-shell">
      <header className={`site-nav ${introDone ? "site-nav--visible" : ""}`}>
        <button
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
          className="nav-link nav-link--mobile"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="nav-group nav-group--left" aria-label="Primary">
          {leftNavItems.map((item) => (
            <a className="nav-link nav-link--desktop" href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className={`nav-brand ${activeSection > 0 ? "nav-brand--visible" : ""}`}
          href="#information"
          aria-label="JB52 home"
        >
          <Logo className="nav-brand__logo" />
        </a>
        <nav className="nav-group nav-group--right" aria-label="Primary">
          {rightNavItems.map((item) => (
            <a className="nav-link nav-link--desktop" href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={`nav-menu ${menuOpen ? "nav-menu--open" : ""}`}>
          {navItems.map((item) => (
            <a
              className="nav-menu__link"
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <div
        aria-hidden="true"
        className={`intro-overlay intro-overlay--${introTheme} ${introDone ? "intro-overlay--done" : ""}`}
        style={{ ["--intro-step" as string]: introStep }}
      >
        <Logo className="intro-overlay__logo" />
      </div>

      <main className={`story ${introDone ? "story--ready" : ""}`}>
        {sections.map((section, index) => {
          const isActive = activeSection === index;

          return (
            <section
              className={`story-step ${
                section.layout === "principlesCards" ? "story-step--principles-cards" : ""
              } ${section.layout === "servicesScroll" ? "story-step--services-scroll" : ""
              }`}
              data-index={index}
              data-story-section
              id={section.id}
              key={section.eyebrow}
              style={
                section.layout === "principlesCards"
                  ? ({ ["--principle-count" as string]: section.principles?.length ?? 0 } as CSSProperties)
                  : undefined
              }
            >
              <div
                className={`story-panel ${section.layout === "hero" ? "story-panel--hero" : ""} ${
                  section.layout === "principlesCards" ? "story-panel--principles-cards" : ""
                } ${section.layout === "servicesScroll" ? "story-panel--services-scroll" : ""
                } ${isActive ? "story-panel--active" : ""}`}
              >
                <div
                  className={`story-panel__grid ${section.layout === "hero" ? "story-panel__grid--hero" : ""} ${
                    section.layout === "principlesCards" ? "story-panel__grid--principles-cards" : ""
                  } ${section.layout === "servicesScroll" ? "story-panel__grid--services-scroll" : ""
                  }`}
                >
                  {section.layout === "hero" ||
                  section.layout === "statement" ||
                  section.layout === "contact" ||
                  section.layout === "servicesScroll" ||
                  section.layout === "principlesCards" ||
                  section.layout === "bioFeature" ? null : (
                    <p className="story-panel__eyebrow story-reveal story-reveal--1">{section.eyebrow}</p>
                  )}

                  {section.layout === "hero" ? (
                    <div className="hero-panel">
                      <Image
                        alt="JB52 wordmark"
                        className="hero-panel__logo story-reveal story-reveal--2"
                        priority
                        src="/assets/jb52-wordmark-full.svg"
                        width={780}
                        height={260}
                      />
                      <h2
                        aria-label={section.body?.[0]}
                        className={`hero-panel__lede ${heroLedeVisible ? "hero-panel__lede--visible" : ""}`}
                      >
                        {section.body?.[0] ? renderSplitWords(section.body[0]) : null}
                      </h2>
                    </div>
                  ) : null}

                  {section.layout === "copy" ? (
                    <div className="copy-panel">
                      {section.title ? (
                        <h2 className="copy-panel__title story-reveal story-reveal--1">{section.title}</h2>
                      ) : null}
                      {section.body?.map((paragraph) => (
                        <h2 className="copy-panel__body story-reveal story-reveal--2" key={paragraph}>
                          {renderCopyParagraph(section.id, paragraph)}
                        </h2>
                      ))}
                      {section.list ? (
                        <div className="copy-panel__list">
                          {section.list.map((item) => (
                            <h2 className="copy-panel__body story-reveal story-reveal--2" key={item}>
                              {item}
                            </h2>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {section.layout === "servicesScroll" ? (
                    <>
                      <p className="story-panel__eyebrow">{section.eyebrow}</p>
                      <div className="services-panel">
                      <div className="services-panel__list" aria-label="What we do services">
                        {section.list?.map((item, itemIndex) => {
                          const isCurrent = itemIndex === activeService;
                          const isPast = itemIndex < activeService;

                          return (
                            <h2
                              className={`services-panel__item ${
                                isCurrent ? "services-panel__item--current" : ""
                              } ${isPast ? "services-panel__item--past" : ""}`}
                              key={item}
                            >
                              <span className="services-panel__text" aria-label={item}>
                                {renderSplitText(item)}
                              </span>
                            </h2>
                          );
                        })}
                      </div>
                      </div>
                    </>
                  ) : null}

                  {section.layout === "statement" ? (
                    <div className="statement-panel">
                      {section.body?.map((paragraph) => (
                        <h2 className="statement-panel__body story-reveal story-reveal--2" key={paragraph}>
                          {paragraph}
                        </h2>
                      ))}
                    </div>
                  ) : null}

                  {section.layout === "principlesCards" ? (
                    <>
                      <p className="principles-cards-panel__eyebrow">{section.eyebrow}</p>
                      <div className="principles-cards-panel">
                        <div className="principles-cards-panel__body">
                          <div className="principles-cards-panel__current">
                            {section.principles?.map((principle, principleIndex) => (
                              <article
                                aria-hidden={principleIndex !== activePrinciple}
                                className={`principle-card ${
                                  principleIndex === activePrinciple
                                    ? "principle-card--current"
                                    : principleIndex < activePrinciple
                                      ? "principle-card--past"
                                      : principleIndex === activePrinciple + 1
                                        ? "principle-card--next"
                                        : "principle-card--future"
                                }`}
                                key={principle}
                              >
                                <p className="principle-card__index">
                                  {String(principleIndex + 1).padStart(2, "0")}
                                </p>
                                <h2 className="principle-card__body">{principle}</h2>
                              </article>
                            ))}
                          </div>
                          <div aria-label="Principles index" className="principles-cards-panel__rail">
                            {section.principles?.map((principle, principleIndex) => (
                              <button
                                aria-label={`Show principle ${principleIndex + 1}`}
                                className={`principles-cards-panel__rail-item ${
                                  principleIndex === activePrinciple
                                    ? "principles-cards-panel__rail-item--active"
                                    : principleIndex < activePrinciple
                                      ? "principles-cards-panel__rail-item--past"
                                      : ""
                                }`}
                                key={`${principleIndex + 1}-${principle}`}
                                onClick={() => setActivePrinciple(principleIndex)}
                                type="button"
                              >
                                <span className="principles-cards-panel__rail-number">
                                  {String(principleIndex + 1).padStart(2, "0")}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}

                  {section.layout === "bioFeature" ? (
                    <div className="bio-feature-panel">
                      <div className="bio-feature-panel__image-wrap">
                        <Image
                          alt="Portrait of Javier Bonilla"
                          className="bio-feature-panel__image"
                          priority
                          sizes="100vw"
                          src="/assets/profile.png"
                          fill
                        />
                      </div>
                      <div className="bio-feature-panel__veil" />
                      <div className="bio-feature-panel__content">
                        <p className="bio-feature-panel__eyebrow story-reveal story-reveal--1">
                          {section.eyebrow}
                        </p>
                        <div className="bio-feature-panel__identity story-reveal story-reveal--2">
                          <h2 className="bio-feature-panel__title">{section.title}</h2>
                        </div>
                        <p className="bio-feature-panel__note story-reveal story-reveal--3">
                          {section.body?.[0]}
                        </p>
                        <a
                          className="bio-feature-panel__link story-reveal story-reveal--4"
                          href="https://javier-bonilla.com/"
                          rel="noreferrer"
                          target="_blank"
                        >
                          View Portfolio
                        </a>
                      </div>
                    </div>
                  ) : null}

                  {section.layout === "contact" ? (
                    <div className="contact-panel">
                      <h2 className="contact-panel__prompt story-reveal story-reveal--2">{section.body?.[0]}</h2>
                      <h2 className="contact-panel__prompt story-reveal story-reveal--3">{section.body?.[1]}</h2>
                      <a
                        className="contact-panel__email story-reveal story-reveal--4"
                        href="mailto:javier.bonilla@jb52.com"
                      >
                        {section.body?.[2]}
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      <footer className="site-footer">
        <span>JB52</span>
        <span>2026</span>
      </footer>
    </div>
  );
}
