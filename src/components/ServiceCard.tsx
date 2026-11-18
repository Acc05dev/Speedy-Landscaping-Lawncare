import Link from "next/link";
import type { Service } from "@/lib/services";
import { ArrowIcon } from "./icons";
import { Photo } from "./Photo";

export function ServiceCard({ service, sizes, className = "" }: { service: Service; sizes: string; className?: string }) {
  return (
    <Link href={`/services/${service.slug}`} className={`group flex flex-col gap-4 ${className}`}>
      <div className="frame aspect-[4/5]">
        <Photo name={service.heroImage} sizes={sizes} />
        <span className="absolute right-4 bottom-4 grid size-12 place-items-center rounded-full bg-sun text-ink transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover:-rotate-45">
          <ArrowIcon />
        </span>
      </div>
      <div>
        <h3 className="h-sub transition-colors group-hover:text-turf">{service.name}</h3>
        <p className="mt-1.5 text-slate">{service.summary}</p>
      </div>
    </Link>
  );
}
