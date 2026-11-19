import Image from "next/image";
import { business } from "@/lib/business";

/**
 * Horizontal lockup: shield mark + wordmark, redrawn without the cartoon mascot.
 * The client's original badge is kept at /brand/logo-original.webp. To use it instead,
 * swap the src below (see README, "Logo").
 */
export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Image
      src={tone === "light" ? "/brand/logo-horizontal-light.svg" : "/brand/logo-horizontal.svg"}
      alt={business.name}
      width={700}
      height={148}
      unoptimized
      className={className}
    />
  );
}
