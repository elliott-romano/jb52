"use client";

import Image from "next/image";
import Lenis from "lenis";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
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
    | "chapter"
    | "principlesMarquee"
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
      "We are a modern & dynamic brand building ad agency. We exist to provide fat free, top quality thinking and ideas, with only one goal: Help our clients grow their business."
    ]
  },
  {
    id: "problems-we-solve",
    eyebrow: "Problem we solve",
    layout: "copy",
    body: [
      "We believe that clients should have access to top talent & quality thinking without having to deal with the complexity of traditional agencies. No red tape. No layers. No BS."
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
    id: "principles-intro",
    eyebrow: "",
    layout: "chapter",
    body: ["Our principles"]
  },
  {
    id: "principles-cards",
    eyebrow: "Our principles",
    layout: "principlesMarquee",
    principles: [...interactivePrinciples]
  },
  {
    id: "what-we-do",
    eyebrow: "What we do",
    layout: "servicesScroll",
    list: [
      "Brand and campaign ideas",
      "Creative strategy",
      "Visual Identity",
      "Initiative conceptualization",
      "Production"
    ]
  },
  {
    id: "who-we-are",
    eyebrow: "How we work",
    layout: "copy",
    body: [
      "With a vast access to a network of top talent, we will lead and assemble a support team that is tailored for each project."
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
const WHY_WE_EXIST_UNDERLINE_TEXT = "Help our clients grow their business.";
const PROBLEM_WE_SOLVE_STRIKETHROUGH_TEXT = "No red tape. No layers. No BS.";

const navItems = [
  { id: "why-we-exist", label: "Why we exist" },
  { id: "problems-we-solve", label: "Problem we solve" },
  { id: "principles-cards", label: "Principles" },
  { id: "what-we-do", label: "What we do" },
  { id: "who-we-are", label: "How we work" },
  { id: "contact", label: "Contact" }
] as const;

const whatWeDoItems = sections.find((section) => section.id === "what-we-do")?.list ?? [];
const darkSectionIds = new Set(["problems-we-solve", "what-we-do", "contact"]);
const sectionThemeColors: Record<string, [number, number, number]> = {
  hero: [5, 5, 5],
  "why-we-exist": [247, 245, 241],
  "problems-we-solve": [5, 5, 5],
  "principles-intro": [247, 245, 241],
  "principles-cards": [247, 245, 241],
  "what-we-do": [5, 5, 5],
  "who-we-are": [247, 245, 241],
  "javier-bonilla": [22, 22, 22],
  contact: [5, 5, 5]
};
const DEFAULT_THEME_COLOR: [number, number, number] = [247, 245, 241];

export function ScrollySite() {
  const [introStep, setIntroStep] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [heroLedeVisible, setHeroLedeVisible] = useState(false);
  const [whyWeExistUnderlineProgress, setWhyWeExistUnderlineProgress] = useState(0);
  const [problemWeSolveStrikeProgress, setProblemWeSolveStrikeProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      wheelMultiplier: 0.92,
      touchMultiplier: 0.9,
      lerp: 0.08
    });
    lenisRef.current = lenis;

    let frameId = 0;

    const animate = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const section = document.getElementById("what-we-do");
      if (!section) {
        return;
      }
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Only intercept while the section is currently pinned to the viewport.
      if (rect.top > 0 || rect.bottom < viewportHeight) {
        return;
      }

      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const itemCount = whatWeDoItems.length;
      if (itemCount === 0) {
        return;
      }
      const sectionScrolled = -rect.top;
      const currentProgress = Math.min(Math.max(sectionScrolled / scrollableDistance, 0), 0.9999);
      const currentIndex = Math.min(itemCount - 1, Math.floor(currentProgress * itemCount));

      const direction = event.key === "ArrowDown" ? 1 : -1;
      const targetIndex = currentIndex + direction;
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + section.offsetHeight;

      let targetY: number;
      if (targetIndex < 0) {
        // Exit section upward.
        targetY = sectionTop - 1;
      } else if (targetIndex >= itemCount) {
        // Exit section downward.
        targetY = sectionBottom - viewportHeight + 1;
      } else {
        const targetProgress = (targetIndex + 0.5) / itemCount;
        targetY = sectionTop + targetProgress * scrollableDistance;
      }

      event.preventDefault();
      lenisRef.current?.scrollTo(targetY, { duration: 0.7 });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateThemeColor = () => {
      const stepNodes = document.querySelectorAll<HTMLElement>("[data-story-section]");
      if (stepNodes.length === 0) {
        return;
      }
      const viewportHeight = window.innerHeight;

      // Once the last section's top reaches the viewport top, lock the theme
      // color to that section's color so the page bottom and footer feel like
      // one continuous block (no lerp toward the default light color).
      const lastNode = stepNodes[stepNodes.length - 1];
      const lastRect = lastNode.getBoundingClientRect();
      if (lastRect.top <= 0) {
        const [lr, lg, lb] = sectionThemeColors[lastNode.id] ?? DEFAULT_THEME_COLOR;
        document.documentElement.style.setProperty(
          "--theme-color",
          `rgb(${lr}, ${lg}, ${lb})`
        );
        return;
      }

      let r = 0;
      let g = 0;
      let b = 0;
      let totalFraction = 0;

      stepNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const top = Math.max(rect.top, 0);
        const bottom = Math.min(rect.bottom, viewportHeight);
        const visible = Math.max(bottom - top, 0);
        if (visible <= 0) {
          return;
        }
        const fraction = visible / viewportHeight;
        const [cr, cg, cb] = sectionThemeColors[node.id] ?? DEFAULT_THEME_COLOR;
        r += cr * fraction;
        g += cg * fraction;
        b += cb * fraction;
        totalFraction += fraction;
      });

      if (totalFraction <= 0) {
        return;
      }

      document.documentElement.style.setProperty(
        "--theme-color",
        `rgb(${Math.round(r / totalFraction)}, ${Math.round(g / totalFraction)}, ${Math.round(b / totalFraction)})`
      );
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateThemeColor);
    };

    updateThemeColor();
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
    let frameId = 0;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const updatePrinciplesMarquee = () => {
      const section = document.getElementById("principles-cards");
      if (!section) {
        return;
      }
      const items = section.querySelectorAll<HTMLElement>(
        ".principles-marquee-panel__item"
      );
      if (items.length === 0) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.min(Math.max(rawProgress, 0), 1);
      const itemCount = items.length;

      items.forEach((item, index) => {
        const localProgress = (progress - index / itemCount) * itemCount;
        const clamped = Math.min(Math.max(localProgress, 0), 1);
        item.style.setProperty("--reveal", String(easeOutQuart(clamped)));
      });
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updatePrinciplesMarquee);
    };

    updatePrinciplesMarquee();
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
  const renderAnimatedEmphasis = (
    text: string,
    progress: number,
    visibleClassName: string,
    charClassName: string
  ) => {
    let charIndex = 0;

    return (
      <span className="copy-panel__emphasis" aria-label={text}>
        {text.split(" ").map((word, wordIndex, words) => {
          const wordChars =
            wordIndex < words.length - 1 ? `${word}\u00A0`.split("") : word.split("");

          return (
            <span aria-hidden="true" className="copy-panel__emphasis-word" key={`${word}-${wordIndex}`}>
              {wordChars.map((character) => {
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
            </span>
          );
        })}
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
      <div aria-hidden="true" className="theme-bg" />
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
                section.layout === "principlesMarquee" ? "story-step--principles-marquee" : ""
              } ${section.layout === "servicesScroll" ? "story-step--services-scroll" : ""
              }`}
              data-index={index}
              data-story-section
              id={section.id}
              key={section.eyebrow}
              style={
                section.layout === "principlesMarquee"
                  ? ({ ["--principle-count" as string]: section.principles?.length ?? 0 } as CSSProperties)
                  : undefined
              }
            >
              <div
                className={`story-panel ${section.layout === "hero" ? "story-panel--hero" : ""} ${
                  section.layout === "principlesMarquee" ? "story-panel--principles-marquee" : ""
                } ${section.layout === "servicesScroll" ? "story-panel--services-scroll" : ""
                } ${section.layout === "chapter" ? "story-panel--chapter" : ""} ${
                  darkSectionIds.has(section.id) ? "story-panel--dark" : ""
                } ${isActive ? "story-panel--active" : ""}`}
              >
                <div
                  className={`story-panel__grid ${section.layout === "hero" ? "story-panel__grid--hero" : ""} ${
                    section.layout === "principlesMarquee" ? "story-panel__grid--principles-marquee" : ""
                  } ${section.layout === "servicesScroll" ? "story-panel__grid--services-scroll" : ""
                  }`}
                >
                  {section.layout === "hero" ||
                  section.layout === "statement" ||
                  section.layout === "chapter" ||
                  section.layout === "contact" ||
                  section.layout === "servicesScroll" ||
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

                  {section.layout === "chapter" ? (
                    <div className="chapter-panel">
                      <h2 className="chapter-panel__title">{section.body?.[0]}</h2>
                    </div>
                  ) : null}

                  {section.layout === "principlesMarquee" ? (
                    <div className="principles-marquee-panel">
                      <ol className="principles-marquee-panel__list">
                        {section.principles?.map((principle, principleIndex) => (
                          <li className="principles-marquee-panel__item" key={principle}>
                            <span className="principles-marquee-panel__index" aria-hidden="true">
                              {String(principleIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="principles-marquee-panel__text">{principle}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
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
        <Logo className="site-footer__logo" />
        <div className="site-footer__meta">
          <span>New York, NY</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
