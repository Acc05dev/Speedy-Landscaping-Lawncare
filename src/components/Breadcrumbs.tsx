import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema, type Crumb } from "@/lib/schema";

/** Visible breadcrumb trail plus its BreadcrumbList markup. Pass the trail without "Home". */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const crumbs: Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[0.95rem] text-slate">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-semibold text-ink">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="underline-offset-4 hover:text-turf hover:underline">
                      {c.name}
                    </Link>
                    <span aria-hidden className="text-silver">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  );
}
