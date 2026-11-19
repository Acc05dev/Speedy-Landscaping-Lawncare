import Link from "next/link";
import type { Service } from "@/lib/services";
import { ArrowIcon } from "./icons";
import { Photo } from "./Photo";

export function ServiceCard({ service, sizes, className = "" }: { service: Service; sizes: string; className?: string }) {
  return (
    <Link href={`/services/${service.slug}`} className={`group flex flex-col gap-5 ${className}`}>
      <div className="frame aspect-[4/5]">
        <Photo name={service.heroImage} sizes={sizes} />
        <span className="absolute right-4 bottom-4 grid size-12 place-items-center rounded-full bg-white text-brand shadow-[var(--shadow-soft)] transition-[transform,background-color,color] duration-500 ease-soft group-hover:-rotate-45 group-hover:bg-brand group-hover:text-white">
          <ArrowIcon />
        </span>
      </div>
      <div>
        <h3 className="h-sub transition-colors duration-300 group-hover:text-brand">{service.name}</h3>
        <p className="mt-1.5 text-stone">{service.summary}</p>
      </div>
    </Link>
  );
}
