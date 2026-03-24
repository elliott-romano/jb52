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
  layout?: "hero" | "statement" | "copy" | "principlesCards" | "servicesScroll" | "bio" | "contact";
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
    body: ["JB52 is a brand building. Creative agency based in New York City"]
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
      "Often traditional big agencies get unnecessarily complex in the way they operate. Work suffers and consistency becomes a challenge.",
      "We believe in a flat free process where brands have always access to top senior talent that comes with extensive agency experience. No red tape. No BS."
    ]
  },
  {
    id: "principles",
    eyebrow: "Our principles",
    layout: "copy",
    body: [
      "What matters to our clients matters to us. We are consumer and business focused. We are not industry obsessed.",
      "We believe that in an overcommunicated world a simple clear ownable and distinctive brand idea is everything and imperative for survival.",
      "Smart meaningful great creative cures everything.",
      "We don't chase awards. We chase the reward of helping our client grow their business.",
      "We believe in joy, because to us this is not a job is our absolute passion."
    ]
  },
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
      "Brand Campaign Ideas",
      "Communication Ideas & toolkits",
      "Creative Strategy",
      "Brand Visual Identity",
      "Initiative conceptualization",
      "Product naming",
      "Production"
    ]
  },
  {
    id: "who-we-are",
    eyebrow: "Who we are",
    layout: "bio",
    title: "Javier Bonilla",
    lead: "With vast access to a network of top proven talent, I will lead and assemble a team that fits the specific needs of each project.",
    body: [
      "Founder",
      "A seasoned creative leader with more than 25 years of experience across multiple continents: North America, Europe, Latin America and Asia. With a strong background in beauty and CPG, Javier has developed highly effective creative that that resonates in culture to build brands. He has led the creation of campaigns for billion dollar brands as well as niche businesses. A true believer that great advertising can only be great if it sells, Javier has always dreamed about starting a lean, dynamic creative agency with impeccable, exquisite dedication to clients and business challenges. Based in NY."
    ]
  },
  {
    id: "contact",
    eyebrow: "Contact",
    layout: "contact",
    body: [
      "Have a project or collaboration in mind?",
      "Please email us at:",
      "hello@JB52.com"
    ]
  }
];

const introFrames = ["light", "dark", "light", "dark", "light", "dark", "light", "dark"] as const;

const navItems = [
  { id: "why-we-exist", label: "Why we exist" },
  { id: "problems-we-solve", label: "Problems we solve" },
  { id: "principles", label: "Principles" },
  { id: "what-we-do", label: "What we do" },
  { id: "who-we-are", label: "Who we are" },
  { id: "contact", label: "Contact" }
] as const;

const whatWeDoItems = sections.find((section) => section.id === "what-we-do")?.list ?? [];

export function ScrollySite() {
  const [introStep, setIntroStep] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [activeService, setActiveService] = useState(0);

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

  const renderSplitText = (text: string) =>
    text.split("").map((character, charIndex) => (
      <span
        aria-hidden="true"
        className="services-panel__char"
        key={`${text}-${charIndex}`}
        style={{ transitionDelay: `${Math.min(charIndex * 14, 360)}ms` }}
      >
        {character === " " ? "\u00A0" : character}
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
    let frameId = 0;

    const updatePrinciples = () => {
      const section = document.getElementById("principles-cards");

      if (!section) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 0.9999);
      const nextIndex = Math.min(
        interactivePrinciples.length - 1,
        Math.floor(progress * interactivePrinciples.length)
      );

      setActivePrinciple(nextIndex);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updatePrinciples);
    };

    updatePrinciples();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const introTheme = introFrames[introStep];
  const leftNavItems = navItems.slice(0, 3);
  const rightNavItems = navItems.slice(3);

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
                  section.layout === "principlesCards" ||
                  section.layout === "servicesScroll" ? null : (
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
                      <h2 className="hero-panel__lede story-reveal story-reveal--3">{section.body?.[0]}</h2>
                    </div>
                  ) : null}

                  {section.layout === "copy" ? (
                    <div className="copy-panel">
                      {section.title ? (
                        <h2 className="copy-panel__title story-reveal story-reveal--1">{section.title}</h2>
                      ) : null}
                      {section.body?.map((paragraph) => (
                        <h2 className="copy-panel__body story-reveal story-reveal--2" key={paragraph}>
                          {paragraph}
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
                      <p className="services-panel__eyebrow">{section.eyebrow}</p>
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
                      <div className="principles-cards-panel__stack">
                        {section.principles?.map((principle, principleIndex) => {
                          const isCurrent = principleIndex === activePrinciple;
                          const isNext = principleIndex === activePrinciple + 1;
                          const isPast = principleIndex < activePrinciple;

                          return (
                            <article
                              className={`principle-card ${
                                isCurrent ? "principle-card--current" : ""
                              } ${isNext ? "principle-card--next" : ""} ${
                                isPast ? "principle-card--past" : ""
                              }`}
                              key={principle}
                            >
                              <p className="principle-card__index">
                                Principle #{principleIndex + 1}
                              </p>
                              <h2 className="principle-card__body">{principle}</h2>
                            </article>
                          );
                        })}
                      </div>
                      <div aria-label="Principles progress" className="principles-cards-panel__dots">
                        {section.principles?.map((principle, principleIndex) => (
                          <span
                            aria-hidden="true"
                            className={`principles-cards-panel__dot ${
                              principleIndex === activePrinciple ? "principles-cards-panel__dot--active" : ""
                            }`}
                            key={principle}
                          />
                        ))}
                      </div>
                      </div>
                    </>
                  ) : null}

                  {section.layout === "bio" ? (
                    <div className="bio-panel">
                      {section.lead ? (
                        <h4 className="bio-panel__lead story-reveal story-reveal--2">{section.lead}</h4>
                      ) : null}
                      <div className="bio-panel__profile">
                        <div className="bio-panel__portrait story-reveal story-reveal--2">
                          <Image
                            alt="Portrait of Javier Bonilla"
                            className="bio-panel__image"
                            priority
                            sizes="(max-width: 840px) 100vw, 22rem"
                            src="/assets/profile.png"
                            fill
                          />
                        </div>
                        <div className="bio-panel__identity">
                          <p className="bio-panel__name story-reveal story-reveal--2">{section.title}</p>
                          <p className="bio-panel__role story-reveal story-reveal--3">{section.body?.[0]}</p>
                          <a className="bio-panel__link story-reveal story-reveal--3" href="#contact">
                            View Portfolio
                          </a>
                        </div>
                      </div>
                      <div className="bio-panel__meta">
                        <p className="bio-panel__note story-reveal story-reveal--4">{section.body?.[1]}</p>
                      </div>
                    </div>
                  ) : null}

                  {section.layout === "contact" ? (
                    <div className="contact-panel">
                      <h2 className="contact-panel__prompt story-reveal story-reveal--2">{section.body?.[0]}</h2>
                      <h2 className="contact-panel__prompt story-reveal story-reveal--3">{section.body?.[1]}</h2>
                      <a
                        className="contact-panel__email story-reveal story-reveal--4"
                        href="mailto:hello@JB52.com"
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
