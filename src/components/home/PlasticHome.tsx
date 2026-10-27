"use client";

// Immersive full-page home: section-navigated panels with focus managed per panel
// (focus moves with content via preventScroll), a validated contact form that
// moves focus to its status on send, and body-scroll lock while mounted.

import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { submitContactForm } from "@/lib/server-actions";
import { contactFormSchema, validateForm } from "@/lib/schemas";
import { HOME_PROJECTS } from "@/lib/home-projects";
import { EASE_OUT_EXPO } from "@/lib/motion";
import {
  buildHomeReelItems,
  HOME_SECTION,
  reelIndexForSection,
} from "@/lib/home-reel";
import { HOME_RESET_EVENT } from "@/components/home/PlasticBrandLink";
import { SectionReelBar } from "@/components/home/SectionReelBar";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { StudioWaterFooter } from "@/components/studio/StudioWaterFooter";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { PlasticProjectSlide } from "@/components/home/PlasticProjectSlide";
import { PROJECT_HERO_MAP } from "@/lib/project-heroes";
import { SlideReveal } from "@/components/motion/SlideReveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { DitherWave } from "@/components/dither-wave-tw";
import { FloatingProjectCards } from "@/components/home/FloatingProjectCards";
import { useStableReducedMotion } from "@/lib/use-reduced-motion";
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
  const reduceMotion = useStableReducedMotion();
  return (
    <h1 className="plastic-hero-title" aria-label={text} data-screen-reserve>
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
  const surfaceRef = useRef<HTMLDivElement>(null);

  return (
    <div className="plastic-entry-frame" ref={surfaceRef}>
      {/* The hero is the house's wave: it prints the swell that says the page
          continues, and the swell waits for an idle reader. The entry's own
          type keeps clean paper around itself on the plate. */}
      <DitherWave
        surfaceRef={surfaceRef}
        primaryColor="#000000"
        secondaryColor="#ffffff"
        tertiaryColor="#ffffff"
        speed={0.6}
        intensity={1}
        scale={5}
        downScale={0.5}
        quality="medium"
        maxFPS={60}
        idleCue
        idleCueDelay={5000}
        interactive
      />
      <div className="plastic-entry" data-section-scroll>
        <div className="plastic-entry-center">
          <LetterSpacedTitle text="furma.tech" />
          <p className="plastic-entry-kind" data-screen-reserve>
            Digital studio
          </p>
        </div>
        <div className="plastic-entry-foot">
          <div className="plastic-entry-actions">
            <button type="button" onClick={onEnterWork} className="plastic-cta plastic-cta--inverse">
              See projects <span aria-hidden>↓</span>
            </button>
            <button type="button" onClick={onContact} className="plastic-cta plastic-cta--inverse plastic-cta--quiet">
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* What the studio builds, one kind at a time. The sentence stays put and only
   the kind changes, so the line reads as a claim about one kind of work at a
   time instead of a list. */
const STUDIO_TYPES = ["games", "tools", "civic tech"] as const;
const STUDIO_TYPE_HOLD = 2600;

// The kind set in the biggest type on the page. It changes under the reader at
// a walk's pace; the slot is sized for the longest kind so the centred line
// never shifts sideways between words. The list is exposed once, in the
// headline's own text, and the moving copy is decoration for the eye.
function RotatingType({ isActive }: { isActive: boolean }) {
  const reduceMotion = useStableReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isActive || reduceMotion) return;
    const id = window.setInterval(
      () => setIndex((current) => (current + 1) % STUDIO_TYPES.length),
      STUDIO_TYPE_HOLD,
    );
    return () => window.clearInterval(id);
  }, [isActive, reduceMotion]);

  if (reduceMotion) {
    return (
      <span className="plastic-index__word plastic-index__word--static">
        {STUDIO_TYPES.join(", ")}
      </span>
    );
  }

  return (
    <span className="plastic-index__type">
      <span className="plastic-index__sizer" aria-hidden="true">
        {STUDIO_TYPES.reduce((longest, type) =>
          type.length > longest.length ? type : longest,
        )}
      </span>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={STUDIO_TYPES[index]}
          className="plastic-index__word"
          initial={{ y: "0.35em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-0.3em", opacity: 0 }}
          transition={{ duration: 0.36, ease: EASE_OUT_EXPO }}
        >
          {STUDIO_TYPES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function PortfolioIndexSlide({
  isActive,
  onOpenProject,
}: {
  isActive: boolean;
  onOpenProject: (projectIndex: number) => void;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={surfaceRef}
      className="h-full w-full flex flex-col bg-background text-foreground relative overflow-hidden"
    >
      {/* A quiet ground: the same wave, at low gain, printed in the page's own
          paper and ink so it follows the theme. The reader can write into it;
          the words keep clean paper around them. */}
      <DitherWave
        surfaceRef={surfaceRef}
        primaryColor="var(--background)"
        secondaryColor="var(--foreground)"
        tertiaryColor="var(--foreground)"
        speed={0.5}
        scale={4}
        downScale={0.5}
        quality="low"
        maxFPS={45}
        composition="field"
        interactive
      />
      <FloatingProjectCards
        projects={HOME_PROJECTS}
        isActive={isActive}
        onOpen={onOpenProject}
      />
      <div
        // The title layer is transparent to the pointer: the windows sit under
        // it, and a full-panel heading must not swallow their clicks.
        className="flex-1 min-h-0 relative z-10 overflow-y-auto overscroll-contain px-6 md:px-12 pointer-events-none"
        data-section-scroll
      >
        <h2 className="plastic-index min-h-full" data-screen-reserve>
          <span className="plastic-index__type-row" aria-hidden="true">
            <RotatingType isActive={isActive} />
          </span>
          <span className="sr-only">{STUDIO_TYPES.join(", ")}.</span>
        </h2>
      </div>
    </div>
  );
}

const CONTACT_EMAIL = "hello@furma.tech";

// The address is the contact's headline: one tap opens a mail client, and a
// second control copies it for the reader who has none.
function ContactSlide({ isActive }: { isActive: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [sentTo, setSentTo] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  function clearFieldError(field: string) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function focusFirstInvalid(errors: Record<string, string>) {
    const ids: Record<string, string> = {
      name: "contact-name",
      email: "contact-email",
      message: "contact-message",
    };
    const first = (["name", "email", "message"] as const).find(
      (key) => errors[key],
    );
    if (!first || !formRef.current) return;
    formRef.current.querySelector<HTMLElement>(`#${ids[first]}`)?.focus();
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
      setSentTo(payload.email);
      setStatus("sent");
      formRef.current?.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't send right now. Please try again in a moment.");
    }
  }

  function writeAnother() {
    setStatus("idle");
    setSentTo("");
    setErrorMessage("");
    setFieldErrors({});
  }

  useEffect(() => {
    if (status === "sent") statusRef.current?.focus();
  }, [status]);

  const fieldsLocked = status === "sending";

  return (
    <div
      className="h-full w-full bg-background overflow-y-auto overscroll-contain"
      data-section-scroll
    >
      <div className="min-h-full flex items-center">
        <div className="w-full max-w-[880px] mx-auto px-6 md:px-12 py-14">
          <SlideReveal isActive={isActive}>
            <p className="plastic-label">Contact</p>
            <SplitReveal
              as="h2"
              text="Write to us."
              className="plastic-letter__title block"
              delay={60}
              trigger={isActive}
            />
            <p className="plastic-letter__lede">
              One person reads this. Products, a collaboration, or integrating
              sovereign AI — say what you are making and why it matters.
            </p>
          </SlideReveal>

          <SlideReveal isActive={isActive} delay={0.12}>
            {status === "sent" ? (
              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="plastic-letter__sent outline-none"
              >
                <p className="plastic-letter__label">Sent</p>
                <p className="plastic-letter__title plastic-letter__title--sent">
                  Thank you.
                </p>
                <p className="plastic-letter__lede">
                  {sentTo ? (
                    <>
                      Your message reached us from{" "}
                      <span className="text-foreground">{sentTo}</span>.{" "}
                    </>
                  ) : (
                    "Your message reached us. "
                  )}
                  You&apos;ll get a reply within two working days.
                </p>
                <button type="button" onClick={writeAnother} className="plastic-letter__again">
                  Write another <span aria-hidden>→</span>
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="plastic-letter"
                noValidate
                aria-busy={status === "sending"}
              >
                <input type="hidden" name="subject" value="general" />

                <div className="plastic-letter__field">
                  <label htmlFor="contact-name" className="plastic-letter__label">
                    Who is writing
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    className={cn(
                      "plastic-letter__input",
                      fieldErrors.name && "plastic-letter__input--invalid",
                    )}
                    aria-invalid={fieldErrors.name ? true : undefined}
                    aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                    disabled={fieldsLocked}
                    onChange={() => clearFieldError("name")}
                  />
                  {fieldErrors.name && (
                    <p id="contact-name-error" className="plastic-field-error" role="alert">
                      {fieldErrors.name}
                    </p>
                  )}
                </div>

                <div className="plastic-letter__field">
                  <label htmlFor="contact-email" className="plastic-letter__label">
                    Where to write back
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@company.com"
                    required
                    className={cn(
                      "plastic-letter__input",
                      fieldErrors.email && "plastic-letter__input--invalid",
                    )}
                    aria-invalid={fieldErrors.email ? true : undefined}
                    aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                    disabled={fieldsLocked}
                    onChange={() => clearFieldError("email")}
                  />
                  {fieldErrors.email && (
                    <p id="contact-email-error" className="plastic-field-error" role="alert">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div className="plastic-letter__field">
                  <label htmlFor="contact-message" className="plastic-letter__label">
                    What are we making
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={3}
                    placeholder="A paragraph is plenty. A link is welcome."
                    required
                    className={cn(
                      "plastic-letter__input plastic-letter__input--area",
                      fieldErrors.message && "plastic-letter__input--invalid",
                    )}
                    aria-invalid={fieldErrors.message ? true : undefined}
                    aria-describedby={
                      fieldErrors.message
                        ? "contact-message-error contact-message-hint"
                        : "contact-message-hint"
                    }
                    disabled={fieldsLocked}
                    onChange={() => clearFieldError("message")}
                  />
                  {fieldErrors.message && (
                    <p id="contact-message-error" className="plastic-field-error" role="alert">
                      {fieldErrors.message}
                    </p>
                  )}
                  <p id="contact-message-hint" className="plastic-letter__hint">
                    All three fields are required. Only used to reply — no list,
                    no sharing.
                  </p>
                </div>

                {status === "error" && (
                  <p role="alert" className="plastic-form-alert">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={fieldsLocked}
                  className={cn("plastic-send", fieldsLocked && "plastic-send--busy")}
                >
                  <span>{status === "sending" ? "Sending…" : "Send message"}</span>
                  <span aria-hidden className="plastic-send__arrow">
                    →
                  </span>
                </button>

                <p className="plastic-letter__elsewhere">
                  Or write to{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="plastic-facts__link">
                    {CONTACT_EMAIL}
                  </a>
                  <span aria-hidden> · </span>
                  <a
                    href="https://github.com/Fuuurma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plastic-facts__link"
                  >
                    github.com/Fuuurma
                  </a>
                </p>
              </form>
            )}
          </SlideReveal>
        </div>
      </div>
    </div>
  );
}

function FooterSlide({ isActive }: { isActive: boolean }) {
  return (
    <StudioWaterFooter
      isActive={isActive}
      variant="panel"
      className="h-full w-full"
    />
  );
}

export default function PlasticHome() {
  const { activeIndex, goTo, setFocusHandler } = useSmoothSectionScroll(TOTAL);
  const reduceMotion = useStableReducedMotion();
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const preferContactFormFocus = useRef(false);
  const announcement = `Section ${activeIndex + 1} of ${TOTAL}: ${sectionLabel(activeIndex)}`;

  const activeReelIndex = reelIndexForSection(activeIndex, HOME_REEL_ITEMS);
  const showReel = activeReelIndex >= 0;

  const navigate = useCallback(
    (index: number, options: GoToOptions = {}) => {
      goTo(index, options);
    },
    [goTo],
  );

  const syncContactHash = useCallback((index: number) => {
    if (typeof window === "undefined") return;
    const onContact = index === CONTACT_SECTION;
    const hasContactHash = window.location.hash === "#contact";
    if (onContact && !hasContactHash) {
      window.history.replaceState(null, "", "#contact");
    } else if (!onContact && hasContactHash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  }, []);

  const navigateToContact = useCallback(() => {
    preferContactFormFocus.current = true;
    navigate(CONTACT_SECTION, { force: true, focus: true });
  }, [navigate]);

  useEffect(() => {
    setFocusHandler((index) => {
      if (index === CONTACT_SECTION && preferContactFormFocus.current) {
        preferContactFormFocus.current = false;
        const nameField = document.getElementById("contact-name");
        if (nameField) {
          nameField.focus({ preventScroll: true });
          return;
        }
      }
      panelRefs.current[index]?.focus({ preventScroll: true });
    });
    return () => setFocusHandler(null);
  }, [setFocusHandler]);

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
    if (window.location.hash === "#contact") {
      preferContactFormFocus.current = true;
      navigate(CONTACT_SECTION, { force: true, focus: true });
    }

    const handleHashChange = () => {
      if (window.location.hash === "#contact") {
        preferContactFormFocus.current = true;
        navigate(CONTACT_SECTION, { force: true, focus: true });
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [navigate]);

  // Declared after the effect that reads the incoming hash: effects run in
  // order, and on mount this one sees section 0 and would strip "#contact"
  // before a deep link to it had been read.
  useEffect(() => {
    syncContactHash(activeIndex);
  }, [activeIndex, syncContactHash]);

  const handleReelSelect = (reelIndex: number) => {
    const target = HOME_REEL_ITEMS[reelIndex];
    if (!target) return;
    if (target.sectionIndex === CONTACT_SECTION) {
      navigateToContact();
      return;
    }
    navigate(target.sectionIndex, { force: true, focus: true });
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
                id={
                  section.type === "contact"
                    ? "contact"
                    : `home-section-${section.id}`
                }
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
                    onContact={navigateToContact}
                  />
                )}
                {section.type === "portfolio-index" && (
                  <PortfolioIndexSlide
                    isActive={isActive}
                    onOpenProject={(projectIndex) =>
                      navigate(FIRST_PROJECT_SECTION + projectIndex, {
                        force: true,
                        focus: true,
                      })
                    }
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
