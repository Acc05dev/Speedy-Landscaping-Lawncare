import { StarIcon } from "./icons";

export function Stars({ rating = 5, size = 18, className = "text-sun" }: { rating?: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} size={size} className={i < Math.round(rating) ? "" : "opacity-25"} />
      ))}
    </span>
  );
}
