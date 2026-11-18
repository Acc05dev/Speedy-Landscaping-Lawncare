import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { SiteChrome } from "@/components/SiteChrome";
import { ArrowIcon, PhoneIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Speedy Landscaping" },
  description: "That page does not exist. Find our landscaping services in Marietta, GA or call (678) 748-2590.",
};

export default function NotFound() {
  return (
    <SiteChrome>
      <section className="relative overflow-hidden pt-36 pb-24 lg:pt-48 lg:pb-32">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="display display-italic text-[clamp(5rem,16vw,12rem)] leading-none text-turf">404</p>
            <h1 className="display h-page mt-4">This patch has not been planted</h1>
            <p className="lead mt-6 text-shield">
              The page you were looking for does not exist or has moved. Head back to the home page, pick a service
              below, or call and we will point you the right way.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="btn btn-primary">
                Back to the home page
                <ArrowIcon />
              </Link>
              <a href={business.phone.href} className="btn btn-call">
                <PhoneIcon />
                Call {business.phone.display}
              </a>
            </div>
          </div>
          <nav aria-label="Services" className="rounded-3xl border border-silver bg-white p-8">
            <h2 className="h-sub">Our services</h2>
            <ul className="mt-4 flex flex-col">
              {services.map((s) => (
                <li key={s.slug} className="border-b border-silver last:border-0">
                  <Link href={`/services/${s.slug}`} className="group flex items-center justify-between gap-4 py-3.5 font-semibold hover:text-turf">
                    {s.name}
                    <ArrowIcon className="text-turf transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </SiteChrome>
  );
}
