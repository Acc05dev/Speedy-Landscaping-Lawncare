import type { Faq } from "./services";
import { business } from "./business";
import { services } from "./services";
import { servedCities } from "./areas";

const PHONE = business.phone.display;

const list = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items[0];

/** General questions for the home page. Each answer leads with the direct answer. */
export const homeFaqs: Faq[] = [
  {
    q: "What services does Speedy Landscaping & Lawncare offer?",
    a: `${list(services.map((s) => s.name.toLowerCase()))}. One crew handles all of it, so you can combine jobs in a single visit.`,
  },
  {
    q: "What areas do you serve?",
    a: `We are based in Marietta, GA and work across Cobb County, including ${list(servedCities.slice(1))}. If you are nearby and not sure, call or text ${PHONE} and ask.`,
  },
  {
    q: "How fast can you come out?",
    a: `Call or text ${PHONE}. Speed is what customers mention most on Google: one reviewer had Obdulio at the house within hours of first contact, and another received same-day service as a new customer.`,
  },
  {
    q: "Are estimates free?",
    a: `Yes. Call or text ${PHONE}, or send the form on this page, and we will look at the job and give you a price before any work starts.`,
  },
  {
    q: "Who will I be dealing with?",
    a: `${business.owner.firstName}, the owner. The phone number on our yard signs is his, and he is the one who answers and comes out to look at the job.`,
  },
  {
    q: "Do you work on rental properties?",
    a: "Yes. Our customers include landlords who use us for regular lawn maintenance at their rental properties, as their reviews mention.",
  },
];
