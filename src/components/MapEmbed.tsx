import { business } from "@/lib/business";

/**
 * Embedded Google map. Until the business's own place embed is available it shows
 * the home city (TODO in business.ts: google.mapEmbedUrl).
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`frame aspect-[4/3] ${className}`}>
      <iframe
        src={business.google.mapEmbedUrl}
        title={`Map of ${business.address.city}, ${business.address.region}, where ${business.name} is based`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 size-full border-0"
      />
    </div>
  );
}
