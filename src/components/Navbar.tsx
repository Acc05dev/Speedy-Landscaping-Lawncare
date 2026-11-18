"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "@/lib/business";
import { mainNav } from "@/lib/nav";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

/**
 * Fixed header. Sits transparent over the top of the page, then turns into a compact
 * frosted bar once the visitor starts scrolling. All links are server-rendered.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile menu while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      data-scrolled={scrolled || open}
      className="group fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,box-shadow] duration-300 data-[scrolled=true]:border-silver/70 data-[scrolled=true]:bg-marble/90 data-[scrolled=true]:shadow-[0_8px_30px_-18px_rgb(10_61_20/0.35)] data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="container-page flex h-[4.75rem] items-center justify-between gap-6 transition-[height] duration-300 group-data-[scrolled=true]:h-16">
        <Link href="/" aria-label={`${business.name}, home`} onClick={() => setOpen(false)} className="shrink-0">
          <Logo className="h-11 w-auto transition-[height] duration-300 group-data-[scrolled=true]:h-9" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative rounded-full px-3.5 py-2 text-[0.98rem] font-semibold text-ink/80 transition-colors hover:bg-white hover:text-ink aria-[current=page]:text-turf"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={business.phone.href} className="btn btn-call btn-sm hidden sm:inline-flex">
            <PhoneIcon size={18} />
            <span>
              <span className="hidden xl:inline">Call </span>
              {business.phone.display}
            </span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-ink/15 bg-white/70 text-ink lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-silver bg-marble lg:hidden"
      >
        <nav aria-label="Mobile" className="container-page flex flex-col gap-8 py-8">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-silver">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="display block py-4 text-3xl aria-[current=page]:text-turf"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <a href={business.phone.href} className="btn btn-call">
              <PhoneIcon />
              Call {business.phone.display}
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-primary">
              Get a free estimate
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
