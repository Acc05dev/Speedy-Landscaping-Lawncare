"use client";

import { useState, type FormEvent } from "react";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { ArrowIcon, CheckIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Estimate request form. Posts JSON to /api/contact, which forwards it to the inbox
 * or webhook configured in CONTACT_WEBHOOK_URL (see README). If sending fails for any
 * reason the visitor is told to call or text instead, so a lead is never silently lost.
 */
export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col gap-4 rounded-3xl border border-silver bg-white p-8">
        <span className="grid size-12 place-items-center rounded-full bg-turf text-white">
          <CheckIcon size={22} />
        </span>
        <h3 className="h-sub">Request sent</h3>
        <p className="text-slate">
          Thanks. {business.owner.firstName} will get back to you about your estimate. If it is urgent, call or text{" "}
          <a href={business.phone.href} className="link">
            {business.phone.display}
          </a>
          .
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-outline w-fit">
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-3xl border border-silver bg-white p-6 shadow-[var(--shadow-soft)] sm:grid-cols-2 sm:p-8"
    >
      <label className="flex flex-col gap-2 text-[0.95rem] font-semibold">
        Name
        <input className="field" name="name" autoComplete="name" required placeholder="Your name" />
      </label>
      <label className="flex flex-col gap-2 text-[0.95rem] font-semibold">
        Phone
        <input className="field" name="phone" type="tel" autoComplete="tel" inputMode="tel" required placeholder="(678) 555-0123" />
      </label>
      <label className="flex flex-col gap-2 text-[0.95rem] font-semibold">
        <span>
          Email <span className="font-normal text-slate">(optional)</span>
        </span>
        <input className="field" name="email" type="email" autoComplete="email" placeholder="you@example.com" />
      </label>
      <label className="flex flex-col gap-2 text-[0.95rem] font-semibold">
        City or ZIP code
        <input className="field" name="location" autoComplete="postal-code" required placeholder="Marietta, 30008" />
      </label>
      <label className="flex flex-col gap-2 text-[0.95rem] font-semibold sm:col-span-2">
        What do you need?
        <select className="field" name="service" defaultValue={defaultService ?? ""} required>
          <option value="" disabled>
            Choose a service
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </select>
      </label>
      <label className="flex flex-col gap-2 text-[0.95rem] font-semibold sm:col-span-2">
        Tell us about the job
        <textarea
          className="field min-h-32 resize-y"
          name="message"
          rows={4}
          placeholder="Size of the yard, what you want done, and when you need it."
        />
      </label>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <label className="hidden" aria-hidden>
        Company
        <input name="company" tabIndex={-1} autoComplete="off" />
      </label>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:cursor-wait disabled:opacity-70">
          {status === "sending" ? "Sending…" : "Request my free estimate"}
          <ArrowIcon />
        </button>
        <p className="text-[0.95rem] text-slate">
          Prefer to talk? Call or text{" "}
          <a href={business.phone.href} className="link">
            {business.phone.display}
          </a>
        </p>
      </div>

      {status === "error" ? (
        <p role="alert" className="rounded-xl bg-sun/25 p-4 text-[0.98rem] sm:col-span-2">
          Your request could not be sent. Please call or text{" "}
          <a href={business.phone.href} className="font-bold underline">
            {business.phone.display}
          </a>{" "}
          and we will take the details over the phone.
        </p>
      ) : null}
    </form>
  );
}
