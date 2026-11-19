import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/business";
import { services } from "@/lib/services";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { ArrowIcon, PhoneIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Speedy Landscaping" },
  description: "That page does not exist. Find our landscaping services in Marietta, GA or call (678) 748-2590.",
};

export default function NotFound() {
  return (
    <SiteChrome>
      <section data-hero-root="" className="relative overflow-clip pt-36 pb-24 lg:pt-48 lg:pb-32">
        <div className="container-page grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <p
              className="tabular text-[clamp(5rem,16vw,12rem)] leading-none font-semibold tracking-[-0.06em] text-brand"
              data-hero=""
            >
              404
            </p>
            <h1 className="display h-page mt-4" data-hero-title="">
              This patch has not been planted
            </h1>
            <p className="lead mt-7 text-charcoal" data-hero="">
              The page you were looking for does not exist or has moved. Head back to the home page, pick a service
              below, or call and we will point you the right way.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row" data-hero="">
              <Link href="/" className="btn btn-primary">
                Back to the home page
                <ArrowIcon />
              </Link>
              <a href={business.phone.href} className="btn btn-soft">
                <PhoneIcon size={18} />
                Call {business.phone.display}
              </a>
            </div>
          </div>
          <nav aria-label="Services" className="card p-8" data-hero="">
            <h2 className="h-sub">Our services</h2>
            <ul className="mt-4 flex flex-col">
              {services.map((s) => (
                <li key={s.slug} className="border-b border-line last:border-0">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between gap-4 py-3.5 font-semibold transition-colors duration-300 hover:text-brand"
                  >
                    {s.name}
                    <ArrowIcon className="text-brand transition-transform duration-500 ease-soft group-hover:translate-x-1" />
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
