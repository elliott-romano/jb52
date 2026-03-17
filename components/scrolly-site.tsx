"use client";

import Image from "next/image";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";

type Section = {
  eyebrow: string;
  title?: string;
  body?: string[];
  list?: string[];
  layout?: "hero" | "copy" | "bio" | "contact";
};

const sections: Section[] = [
  {
    eyebrow: "Information",
    layout: "hero",
    body: ["JB52 is a full-service creative studio based in New York City."]
  },
  {
    eyebrow: "Problem we solve",
    layout: "copy",
    body: [
      "Often traditional big agencies get unnecessarily complex in the way they operate. Work suffers and consistency becomes a challenge.",
      "We believe in a flat free process where brands have always access to top senior talent that comes with extensive agency experience. No red tape. No BS."
    ]
  },
  {
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
    eyebrow: "What we do",
    layout: "copy",
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
    eyebrow: "Bio / Profile",
    layout: "bio",
    title: "Javier Bonilla",
    body: ["Founder", "Full bio coming soon."]
  },
  {
    eyebrow: "Contact",
    layout: "contact",
    body: [
      "Have a project or collaboration in mind?",
      "Please email us at:",
      "hello@JB52.com"
    ]
  }
];

const introFrames = ["light", "dark", "light", "dark", "light"] as const;

export function ScrollySite() {
  const [introStep, setIntroStep] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

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

  const introTheme = introFrames[introStep];

  return (
    <div className="page-shell">
      <header className={`site-nav ${introDone ? "site-nav--visible" : ""}`}>
        <button className="nav-link nav-link--mobile" type="button" aria-label="Menu">
          <span />
          <span />
        </button>
        <a className="nav-link nav-link--desktop" href="#information">
          Information
        </a>
        <a className="nav-brand" href="#information" aria-label="JB52 home">
          <Logo className="nav-brand__logo" />
        </a>
        <a className="nav-link nav-link--desktop" href="#contact">
          Contact
        </a>
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
              className="story-step"
              data-index={index}
              data-story-section
              id={index === 0 ? "information" : index === sections.length - 1 ? "contact" : undefined}
              key={section.eyebrow}
            >
              <div className={`story-panel ${isActive ? "story-panel--active" : ""}`}>
                <div
                  className={`story-panel__grid ${section.layout === "hero" ? "story-panel__grid--hero" : ""}`}
                >
                  <p className="story-panel__eyebrow story-reveal story-reveal--1">{section.eyebrow}</p>

                  {section.layout === "hero" ? (
                    <div className="hero-panel">
                      <Logo className="hero-panel__logo story-reveal story-reveal--2" />
                      <h3 className="hero-panel__lede story-reveal story-reveal--3">{section.body?.[0]}</h3>
                    </div>
                  ) : null}

                  {section.layout === "copy" ? (
                    <div className="copy-panel">
                      {section.title ? (
                        <h2 className="copy-panel__title story-reveal story-reveal--1">{section.title}</h2>
                      ) : null}
                      {section.body?.map((paragraph) => (
                        <h3 className="copy-panel__body story-reveal story-reveal--2" key={paragraph}>
                          {paragraph}
                        </h3>
                      ))}
                      {section.list ? (
                        <div className="copy-panel__list">
                          {section.list.map((item) => (
                            <h3 className="copy-panel__body story-reveal story-reveal--2" key={item}>
                              {item}
                            </h3>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {section.layout === "bio" ? (
                    <div className="bio-panel">
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
                      <div className="bio-panel__meta">
                        <h2 className="bio-panel__name story-reveal story-reveal--2">{section.title}</h2>
                        <p className="bio-panel__role story-reveal story-reveal--3">{section.body?.[0]}</p>
                        <a className="bio-panel__link story-reveal story-reveal--3" href="#contact">
                          View Portfolio
                        </a>
                        <p className="bio-panel__note story-reveal story-reveal--4">{section.body?.[1]}</p>
                      </div>
                    </div>
                  ) : null}

                  {section.layout === "contact" ? (
                    <div className="contact-panel">
                      <h3 className="contact-panel__prompt story-reveal story-reveal--2">{section.body?.[0]}</h3>
                      <h3 className="contact-panel__prompt story-reveal story-reveal--3">{section.body?.[1]}</h3>
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
