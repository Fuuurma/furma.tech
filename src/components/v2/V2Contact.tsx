"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitContactForm } from "@/lib/server-actions";

interface FormState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  messageId?: string;
}

const initialState: FormState = { success: false };

async function formAction(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const result = await submitContactForm(formData);
  if (result.success) {
    const data = result.data as { messageId?: string } | undefined;
    return { success: true, messageId: data?.messageId };
  }
  return {
    success: false,
    error: result.error,
    fieldErrors: result.fieldErrors,
  };
}

export function V2Contact() {
  const [state, action, pending] = useActionState(formAction, initialState);

  return (
    <section
      id="contact"
      className="v2-blueprint-dark relative bg-[var(--v2-dark)] px-[var(--v2-gutter)] py-[var(--v2-section)] text-[var(--v2-cream-on-dark)]"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left — pitch */}
        <div>
          <p className="v2-label v2-label--cream mb-6">
            <span className="text-[var(--v2-accent)]">§04</span> — Commission the
            workshop
          </p>
          <h2 className="v2-display v2-display--relaxed text-[clamp(2.6rem,6.5vw,5.5rem)]">
            Let&apos;s build
            <br />
            something{" "}
            <span className="v2-serif-accent font-normal normal-case">
              that
            </span>
            <br />
            works<span className="text-[var(--v2-accent)]">.</span>
          </h2>
          <p className="mt-8 max-w-[42ch] text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.65] text-[var(--v2-cream-60)]">
            Partnerships, product demos, early Aitlas access — or just a second
            opinion on something you&apos;re shipping. The workshop door is
            open.
          </p>
          <a
            href="mailto:hello@furma.tech"
            data-cursor-label="mail"
            className="v2-link-line mt-10 inline-block font-[family-name:var(--v2-font-display)] text-[clamp(1.2rem,2.2vw,1.8rem)] font-bold tracking-[-0.01em] [font-stretch:115%]"
          >
            hello@furma.tech
          </a>
        </div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {state.success ? (
            <div className="flex h-full min-h-[320px] flex-col items-start justify-center border border-[oklch(1_0_0/0.15)] p-10">
              <span className="v2-sticker mb-8">Received</span>
              <p className="font-[family-name:var(--v2-font-display)] text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.2] font-bold [font-stretch:115%]">
                Your message is on the workbench.
              </p>
              <p className="v2-label v2-label--cream mt-4">
                Ref {state.messageId ?? "—"} · we reply within 48h
              </p>
            </div>
          ) : (
            <form action={action} className="flex flex-col gap-8" noValidate>
              <div>
                <label htmlFor="v2-name" className="v2-label v2-label--cream">
                  Your name *
                </label>
                <input
                  id="v2-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  className="v2-field"
                />
                {state.fieldErrors?.name ? (
                  <p className="v2-field-error">{state.fieldErrors.name}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="v2-email" className="v2-label v2-label--cream">
                  Email *
                </label>
                <input
                  id="v2-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="ada@analytical.engine"
                  className="v2-field"
                />
                {state.fieldErrors?.email ? (
                  <p className="v2-field-error">{state.fieldErrors.email}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="v2-message" className="v2-label v2-label--cream">
                  What are we building? *
                </label>
                <textarea
                  id="v2-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about the problem, not the solution…"
                  className="v2-field resize-none"
                />
                {state.fieldErrors?.message ? (
                  <p className="v2-field-error">{state.fieldErrors.message}</p>
                ) : null}
              </div>

              {state.error ? (
                <p className="v2-field-error" role="alert">
                  {state.error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                data-cursor-label="send"
                className="group inline-flex w-fit items-center gap-3 rounded-full bg-[var(--v2-accent)] px-8 py-4 font-[family-name:var(--v2-font-mono)] text-[11px] font-semibold tracking-[0.12em] text-[var(--v2-ink)] uppercase transition-all duration-300 hover:bg-[var(--v2-cream-on-dark)] disabled:cursor-wait disabled:opacity-60"
              >
                {pending ? "Sending…" : "Send to the workshop"}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
