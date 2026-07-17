"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { submitContactForm } from "@/lib/server-actions";
import { contactFormSchema, validateForm } from "@/lib/schemas";
import { HOME_PROJECTS } from "@/lib/home-projects";
import {
  buildHomeReelItems,
  HOME_SECTION,
  reelIndexForSection,
} from "@/lib/home-reel";
import { HOME_RESET_EVENT } from "@/components/home/PlasticBrandLink";
import { SectionReelBar } from "@/components/home/SectionReelBar";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { PlasticProjectSlide } from "@/components/home/PlasticProjectSlide";
import { PROJECT_HERO_MAP } from "@/lib/project-heroes";
import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { SlideReveal } from "@/components/motion/SlideReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import {
  useSmoothSectionScroll,
  type GoToOptions,
} from "@/components/home/useSmoothSectionScroll";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", type: "hero" as const },
  { id: "portfolio-index", type: "portfolio-index" as const },
  ...HOME_PROJECTS.map((p) => ({
    id: p.id,
    type: "project" as const,
    projectId: p.id,
  })),
  { id: "contact", type: "contact" as const },
  { id: "footer", type: "footer" as const },
];

const TOTAL = SECTIONS.length;
const FIRST_PROJECT_SECTION = HOME_SECTION.firstProject;
const CONTACT_SECTION = HOME_SECTION.contact;

const HOME_REEL_ITEMS = buildHomeReelItems();

function sectionLabel(index: number): string {
  const section = SECTIONS[index];
  if (!section) return `Section ${index + 1}`;
  if (section.type === "hero") return "Introduction";
  if (section.type === "portfolio-index") return "Portfolio index";
  if (section.type === "contact") return "Contact";
  if (section.type === "footer") return "Studio";
  if (section.type === "project") {
    const project = HOME_PROJECTS.find((p) => p.id === section.id);
    return project?.name ?? section.id;
  }
  return `Section ${index + 1}`;
}

function LetterSpacedTitle({ text }: { text: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <h1 className="plastic-hero-title" aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={cn(
            "plastic-hero-letter",
            reduceMotion && "plastic-hero-letter--static",
          )}
          style={
            reduceMotion
              ? undefined
              : { animationDelay: `${0.08 + i * 0.04}s` }
          }
          aria-hidden="true"
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </h1>
  );
}

function HeroSlide({
  onEnterWork,
  onContact,
}: {
  onEnterWork: () => void;
  onContact: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="h-full w-full flex flex-col bg-black text-white relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <LetterSpacedTitle text="furma.tech" />
        <p
          className={cn(
            "mt-10 font-sans text-[11px] uppercase tracking-[0.2em] text-white/60",
            !reduceMotion && "opacity-0 animate-fade-up",
          )}
          style={
            reduceMotion
              ? undefined
              : { animationDelay: "1.2s", animationFillMode: "forwards" }
          }
        >
          Digital venture studio
        </p>
      </div>

      <div
        className={cn(
          "shrink-0 border-t border-white/10 px-6 md:px-12 py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6",
          !reduceMotion && "opacity-0 animate-fade-up",
        )}
        style={
          reduceMotion
            ? undefined
            : { animationDelay: "1.5s", animationFillMode: "forwards" }
        }
      >
        <p className="plastic-paragraph text-white max-w-md !text-[clamp(18px,2.2vw,26px)] !leading-[1.35]">
          Bootstrapped studio building industry SaaS and the Aitlas AI ecosystem.
        </p>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onEnterWork}
            className="plastic-cta plastic-cta--inverse"
          >
            See projects
            <span aria-hidden>↓</span>
          </button>
          <button
            type="button"
            onClick={onContact}
            className="plastic-cta plastic-cta--inverse plastic-cta--quiet"
          >
            Contact
          </button>
        </div>
      </div>

      {!reduceMotion && (
        <div
          className="plastic-hero-scroll-cue absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-0 animate-fade-up"
          style={{ animationDelay: "2s", animationFillMode: "forwards" }}
          aria-hidden="true"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
            Scroll
          </span>
          <span className="block w-px h-8 bg-white/40 animate-pulse" />
        </div>
      )}
    </div>
  );
}

function PortfolioIndexSlide({
  onStart,
  count,
  isActive,
}: {
  onStart: () => void;
  count: number;
  isActive: boolean;
}) {
  return (
    <div className="h-full w-full flex flex-col bg-background text-foreground">
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-[1280px] w-full grid grid-cols-12 gap-6">
          <SlideReveal isActive={isActive} className="col-span-12 md:col-span-4">
            <p className="plastic-label">Portfolio</p>
            <p className="plastic-label mt-6">Index 00</p>
          </SlideReveal>
          <div className="col-span-12 md:col-span-8 md:col-start-5">
            <h2 className="plastic-headline">
              <AnimatedNumber value={count} trigger={isActive} className="inline" />
              {" "}
              <SplitReveal
                as="span"
                text="products across AI, SaaS, games, and civic tech."
                className="inline"
                delay={120}
                trigger={isActive}
              />
            </h2>
            <SlideReveal isActive={isActive} delay={0.2}>
              <button
                type="button"
                onClick={onStart}
                className="plastic-cta mt-12"
              >
                Start with {HOME_PROJECTS[0]?.name ?? "projects"}
                <span aria-hidden>→</span>
              </button>
              <div className="mt-6">
                <Link
                  href="/portfolio"
                  className="plastic-label motion-link-subtle hover:text-foreground"
                >
                  Or open full index
                </Link>
              </div>
            </SlideReveal>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactSlide({ isActive }: { isActive: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function focusFirstInvalid(errors: Record<string, string>) {
    const order = ["name", "email", "message"] as const;
    const first = order.find((key) => errors[key]);
    if (!first || !formRef.current) return;
    const el = formRef.current.querySelector<HTMLElement>(`#${first}`);
    el?.focus();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setFieldErrors({});

    const fd = new FormData(formRef.current!);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: "",
      subject: String(fd.get("subject") ?? "general"),
      message: String(fd.get("message") ?? ""),
      newsletter: false,
    };

    const clientValidation = validateForm(contactFormSchema, payload);
    if (clientValidation.errors) {
      const errors = Object.fromEntries(
        Object.entries(clientValidation.errors).map(([key, messages]) => [
          key,
          messages[0] ?? "Invalid value",
        ]),
      );
      setFieldErrors(errors);
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields.");
      focusFirstInvalid(errors);
      return;
    }

    setStatus("sending");
    try {
      const result = await submitContactForm(fd);
      if (!result.success) {
        const errors = result.fieldErrors ?? {};
        setFieldErrors(errors);
        setStatus("error");
        setErrorMessage(
          result.error ?? "Something went wrong. Please try again.",
        );
        if (Object.keys(errors).length) focusFirstInvalid(errors);
        else statusRef.current?.focus();
        return;
      }
      setStatus("sent");
      formRef.current?.reset();
      window.setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't send right now. Please try again in a moment.");
    }
  }

  useEffect(() => {
    if (status === "sent") statusRef.current?.focus();
  }, [status]);

  const fieldsLocked = status === "sending" || status === "sent";

  return (
    <div
      className="h-full w-full flex items-center bg-background overflow-y-auto"
      data-section-scroll
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <SlideReveal isActive={isActive}>
              <p className="plastic-label mb-6">Contact</p>
              <SplitReveal
                as="h2"
                text="Let's build something together."
                className="plastic-headline block mb-6"
                delay={60}
                trigger={isActive}
              />
            </SlideReveal>
            <SlideReveal isActive={isActive} delay={0.12}>
              <p className="plastic-paragraph text-foreground/70 max-w-sm mb-8">
                Interested in our products, a collaboration, or integrating
                sovereign AI? We read every message.
              </p>
              <div className="flex gap-10">
                {[
                  ["Email", "hello@furma.tech", "mailto:hello@furma.tech"],
                  ["GitHub", "@Fuuurma", "https://github.com/Fuuurma"],
                ].map(([label, text, href]) => (
                  <div key={label} className="flex flex-col gap-1">
                    <span className="plastic-label">{label}</span>
                    <a
                      href={href}
                      target={label === "GitHub" ? "_blank" : undefined}
                      rel={
                        label === "GitHub" ? "noopener noreferrer" : undefined
                      }
                      className="text-[14px] text-foreground border-b border-foreground/20 pb-0.5 hover:border-foreground transition-colors"
                    >
                      {text}
                    </a>
                  </div>
                ))}
              </div>
            </SlideReveal>
          </div>
          <SlideReveal
            isActive={isActive}
            className="lg:col-span-6 lg:col-start-7"
            delay={0.18}
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
              noValidate
              aria-busy={status === "sending"}
            >
              <input type="hidden" name="subject" value="general" />
              {[
                {
                  id: "name",
                  label: "Name",
                  type: "text",
                  placeholder: "Your name",
                  autoComplete: "name",
                },
                {
                  id: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "your@email.com",
                  autoComplete: "email",
                },
              ].map((f) => {
                const errorId = `${f.id}-error`;
                const hasError = Boolean(fieldErrors[f.id]);
                return (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="plastic-label block mb-2">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      className={cn(
                        "plastic-field w-full border-b bg-transparent pb-2.5 pt-1 font-mono text-[13px] text-foreground placeholder:text-foreground/35 outline-none transition-colors",
                        hasError
                          ? "border-foreground plastic-field--invalid"
                          : "border-foreground/25 focus-visible:border-foreground",
                      )}
                      aria-invalid={hasError || undefined}
                      aria-describedby={hasError ? errorId : undefined}
                      disabled={fieldsLocked}
                      onChange={() => clearFieldError(f.id)}
                    />
                    {hasError && (
                      <p id={errorId} className="plastic-field-error" role="alert">
                        {fieldErrors[f.id]}
                      </p>
                    )}
                  </div>
                );
              })}
              <div>
                <label htmlFor="message" className="plastic-label block mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Tell us what you're building…"
                  className={cn(
                    "plastic-field w-full resize-none border-b bg-transparent pb-2.5 pt-1 font-mono text-[13px] text-foreground placeholder:text-foreground/35 outline-none transition-colors",
                    fieldErrors.message
                      ? "border-foreground plastic-field--invalid"
                      : "border-foreground/25 focus-visible:border-foreground",
                  )}
                  aria-invalid={fieldErrors.message ? true : undefined}
                  aria-describedby={
                    fieldErrors.message ? "message-error" : undefined
                  }
                  disabled={fieldsLocked}
                  onChange={() => clearFieldError("message")}
                />
                {fieldErrors.message && (
                  <p id="message-error" className="plastic-field-error" role="alert">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              <p
                ref={statusRef}
                id="contact-form-status"
                role="status"
                aria-live="polite"
                tabIndex={-1}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.12em] outline-none min-h-[1.25rem]",
                  status === "idle"
                    ? "sr-only"
                    : status === "error"
                      ? "text-foreground"
                      : "text-foreground/70",
                )}
              >
                {status === "sending"
                  ? "Sending your message…"
                  : status === "sent"
                    ? "Message sent. We'll get back to you soon."
                    : status === "error"
                      ? errorMessage
                      : ""}
              </p>
              <button
                type="submit"
                disabled={fieldsLocked}
                className={cn(
                  "plastic-submit h-12 w-full font-mono text-[11px] uppercase tracking-[0.12em] transition-opacity duration-300",
                  status === "sent"
                    ? "bg-foreground/80 text-background"
                    : "bg-foreground text-background hover:opacity-80",
                  fieldsLocked && "cursor-not-allowed",
                )}
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                    ? "Sent ✓"
                    : "Send message →"}
              </button>
            </form>
          </SlideReveal>
        </div>
      </div>
    </div>
  );
}

function FooterSlide({ isActive }: { isActive: boolean }) {
  return (
    <div className="h-full w-full flex flex-col bg-foreground text-background overflow-hidden">
      <div className="flex-1 flex flex-col justify-center min-h-0 relative z-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <SlideReveal isActive={isActive} className="lg:col-span-5 flex flex-col justify-between gap-10">
              <div>
                <p className="plastic-label text-background/40 mb-8">Furma.tech</p>
                <SplitReveal
                  as="h3"
                  text="We build sovereign digital futures."
                  className="font-sans text-[clamp(28px,4vw,48px)] font-medium leading-[1.1] tracking-[-0.03em] text-background block mb-6"
                  trigger={isActive}
                  delay={40}
                />
                <p className="font-sans text-[14px] text-background/50 max-w-sm leading-relaxed">
                  Venture studio for industry SaaS and autonomous AI ecosystems.
                  Sitges · Global.
                </p>
              </div>
              <div className="space-y-4">
                <p className="plastic-label text-background/40">Connect</p>
                <a
                  href="mailto:hello@furma.tech"
                  className="text-[17px] font-medium text-background hover:opacity-60 transition-opacity block"
                >
                  hello@furma.tech
                </a>
                <div className="flex gap-6">
                  <a
                    href="https://github.com/Fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-label text-background/55 hover:text-background"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://twitter.com/fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-label text-background/55 hover:text-background"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </SlideReveal>

            <SlideReveal isActive={isActive} className="lg:col-span-7 border-l border-background/10 pl-8 lg:pl-16" delay={0.12}>
              <p className="plastic-label text-background/40 mb-8">Portfolio</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {HOME_PROJECTS.map((p) => (
                  <Link
                    key={p.id}
                    href={p.href}
                    className="text-[15px] font-medium text-background hover:opacity-50 transition-opacity"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 mt-10 plastic-label text-background/50 hover:text-background motion-link-subtle"
              >
                All projects <span aria-hidden>→</span>
              </Link>
            </SlideReveal>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-6 md:px-12 py-5 border-t border-background/10 flex justify-between items-center">
        <span className="plastic-label text-background/40">© 2026 Furma.tech</span>
        <span className="plastic-label text-background/40">Sitges, Catalonia</span>
      </div>
    </div>
  );
}

export default function PlasticHome() {
  const { activeIndex, goTo, setFocusHandler } = useSmoothSectionScroll(TOTAL);
  const reduceMotion = useReducedMotion();
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const [announcement, setAnnouncement] = useState(
    `Section 1 of ${TOTAL}: ${sectionLabel(0)}`,
  );

  const activeReelIndex = reelIndexForSection(activeIndex, HOME_REEL_ITEMS);
  const showReel = activeReelIndex >= 0;

  const navigate = useCallback(
    (index: number, options: GoToOptions = {}) => {
      goTo(index, options);
    },
    [goTo],
  );

  useEffect(() => {
    setFocusHandler((index) => {
      const panel = panelRefs.current[index];
      panel?.focus({ preventScroll: true });
    });
    return () => setFocusHandler(null);
  }, [setFocusHandler]);

  useEffect(() => {
    setAnnouncement(
      `Section ${activeIndex + 1} of ${TOTAL}: ${sectionLabel(activeIndex)}`,
    );
  }, [activeIndex]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.setAttribute("data-plastic-home", "true");
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-plastic-home");
    };
  }, []);

  useEffect(() => {
    const handleHomeReset = () => navigate(0, { force: true, focus: true });
    window.addEventListener(HOME_RESET_EVENT, handleHomeReset);
    return () => window.removeEventListener(HOME_RESET_EVENT, handleHomeReset);
  }, [navigate]);

  useEffect(() => {
    const navigateToContact = () => {
      navigate(CONTACT_SECTION, { force: true, focus: true });
    };

    if (window.location.hash === "#contact") {
      navigateToContact();
    }

    const handleHashChange = () => {
      if (window.location.hash === "#contact") navigateToContact();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [navigate]);

  const handleReelSelect = (reelIndex: number) => {
    const target = HOME_REEL_ITEMS[reelIndex];
    if (target) navigate(target.sectionIndex, { force: true, focus: true });
  };

  return (
    <div
      className="plastic-home fixed inset-0 z-10 flex flex-col bg-background text-foreground overflow-hidden"
      aria-label="Furma.tech portfolio"
      aria-describedby="home-nav-instructions"
    >
      <p id="home-nav-instructions" className="sr-only">
        Immersive portfolio. Use arrow keys or Page Up and Page Down to move
        between sections. Press Escape to focus the site header. Scroll or swipe
        also moves between sections.
      </p>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>

      {activeIndex !== HOME_SECTION.hero &&
        (showReel && activeReelIndex >= 0 ? (
          <SectionReelBar
            items={HOME_REEL_ITEMS}
            activeReelIndex={activeReelIndex}
            onSelect={handleReelSelect}
            onBrandReset={() => navigate(0, { force: true, focus: true })}
          />
        ) : (
          <StudioChrome
            onBrandReset={() => navigate(0, { force: true, focus: true })}
          />
        ))}

      <div className="relative flex-1 min-h-0 overflow-hidden">
        <ScrollProgress activeIndex={activeIndex} total={TOTAL} />

        <div className="absolute inset-0">
          {SECTIONS.map((section, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            const translateY = isActive ? 0 : isPast ? -100 : 100;
            const label = sectionLabel(i);

            return (
              <section
                key={section.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                id={`home-section-${section.id}`}
                tabIndex={-1}
                aria-label={`${label}, section ${i + 1} of ${TOTAL}`}
                aria-hidden={!isActive}
                inert={isActive ? undefined : true}
                className={cn(
                  "plastic-home__panel absolute inset-0 outline-none",
                  !reduceMotion &&
                    "transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                )}
                style={{
                  transform: `translateY(${translateY}%)`,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {section.type === "hero" && (
                  <HeroSlide
                    onEnterWork={() =>
                      navigate(1, { force: true, focus: true })
                    }
                    onContact={() =>
                      navigate(CONTACT_SECTION, { force: true, focus: true })
                    }
                  />
                )}
                {section.type === "portfolio-index" && (
                  <PortfolioIndexSlide
                    count={HOME_PROJECTS.length}
                    onStart={() =>
                      navigate(FIRST_PROJECT_SECTION, {
                        force: true,
                        focus: true,
                      })
                    }
                    isActive={isActive}
                  />
                )}
                {section.type === "project" &&
                  (() => {
                    const project = HOME_PROJECTS.find(
                      (p) => p.id === section.id,
                    )!;
                    const pIndex = HOME_PROJECTS.indexOf(project);
                    return (
                      <PlasticProjectSlide
                        project={project}
                        index={pIndex}
                        total={HOME_PROJECTS.length}
                        HeroVisual={PROJECT_HERO_MAP[section.id]}
                        isActive={isActive}
                      />
                    );
                  })()}
                {section.type === "contact" && (
                  <ContactSlide isActive={isActive} />
                )}
                {section.type === "footer" && (
                  <FooterSlide isActive={isActive} />
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
