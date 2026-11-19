"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business } from "@/lib/business";
import { mainNav } from "@/lib/nav";
import { Logo } from "@/components/ui/Logo";
import { ArrowIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";

/**
 * Fixed header. Clear over the top of the page; once the visitor starts scrolling a frosted
 * backdrop fades in behind it (opacity only, no layout change). All links are server-rendered.
 */
export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
    <header data-scrolled={scrolled || open} className="group fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-bone/80 opacity-0 shadow-[0_1px_0_0_rgb(20_38_26/0.08)] backdrop-blur-xl transition-opacity duration-500 group-data-[scrolled=true]:opacity-100"
      />

      <div className="container-page flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={`${business.name}, home`} onClick={() => setOpen(false)} className="shrink-0">
          <Logo className="h-10 w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative block px-3.5 py-2 text-[0.95rem] font-semibold text-charcoal transition-colors duration-300 after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-forest after:transition-transform after:duration-500 after:ease-soft hover:text-forest hover:after:scale-x-100 aria-[current=page]:text-forest aria-[current=page]:after:scale-x-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={business.phone.href}
            className="hidden items-center gap-2 text-[0.95rem] font-bold text-forest transition-colors duration-300 hover:text-brand xl:flex"
          >
            <PhoneIcon size={16} />
            {business.phone.display}
          </a>
          <Link href="/contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
            Free estimate
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full bg-white text-forest shadow-[inset_0_0_0_1px_var(--color-line)] lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="menu-in h-[calc(100dvh-4.5rem)] overflow-y-auto bg-bone lg:hidden">
        <nav aria-label="Mobile" className="container-page flex min-h-full flex-col justify-between gap-10 pt-4 pb-10">
          <ul className="flex flex-col">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="h-section flex items-center justify-between py-4 font-semibold aria-[current=page]:text-brand"
                >
                  {item.label}
                  <ArrowIcon size={22} className="text-sage-400" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <a href={business.phone.href} className="btn btn-primary">
              <PhoneIcon size={18} />
              Call {business.phone.display}
            </a>
            <Link href="/contact" onClick={() => setOpen(false)} className="btn btn-soft">
              Get a free estimate
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
