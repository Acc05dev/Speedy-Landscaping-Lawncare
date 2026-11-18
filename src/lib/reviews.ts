/**
 * Real Google reviews, transcribed word for word from the client's screenshots (2026-11-18).
 * Names are shown as first name + last initial. Nothing here is edited or invented.
 *
 * `excerpt: true` means Google cut the text off in the screenshot ("… More").
 * TODO: paste the full text of those reviews and set excerpt to false.
 */

export type Review = {
  id: string;
  author: string;
  /** Relative date as shown by Google on the capture date. */
  when: string;
  rating: 5;
  text: string;
  lang?: "es";
  excerpt?: boolean;
  /** Shown on the home page and service pages. */
  featured?: boolean;
  /** Service slugs this review speaks to. */
  services?: string[];
};

export const reviewsCapturedOn = "2026-11-18";

export const reviews: Review[] = [
  {
    id: "karen-z",
    author: "Karen Z.",
    when: "4 months ago",
    rating: 5,
    text: "First time using speedy landscaping and I 100% will use them again and recommend them to all ! They were super quick, great customer service, and did an amazing job !",
    featured: true,
  },
  {
    id: "myrth-g",
    author: "Myrth G.",
    when: "a year ago",
    rating: 5,
    text: "The speedy team responds quickly to messages, showed up on time and did quality work. They pruned trees, put in French drains, Pinestraw & are providing weekly yard maintenance.",
    featured: true,
    services: ["tree-service", "lawn-maintenance", "mulch-pine-straw", "landscape-design"],
  },
  {
    id: "thomas-r",
    author: "Thomas R.",
    when: "2 years ago",
    rating: 5,
    text: "Best landscaping company in Georgia. Always on time, goes above and beyond each visit, and all for a great price.",
    featured: true,
  },
  {
    id: "tiffany-b",
    author: "Tiffany B.",
    when: "2 years ago",
    rating: 5,
    text: "Speedy Landscaping has provided my lawn service for over a year, and he is incredibly professional, doing a phenomenal job. Highly recommend",
    featured: true,
    services: ["lawn-maintenance"],
  },
  {
    id: "alanna-f",
    author: "Alanna F.",
    when: "a year ago",
    rating: 5,
    text: "Super fast response time, very reasonable pricing and great work. Will definitely call again!",
    featured: true,
  },
  {
    id: "sriura-s",
    author: "Sriura S.",
    when: "10 months ago",
    rating: 5,
    text: "Beautifully done great job on both mulching and pressure washing",
    featured: true,
    services: ["mulch-pine-straw", "pressure-washing"],
  },
  {
    id: "ricashae",
    author: "Ricashae",
    when: "2 years ago",
    rating: 5,
    text: "Same day service as a new customer. Great job. I'm hoping for continuous business with you. Much appreciated.",
    featured: true,
  },
  {
    id: "david-n",
    author: "David N.",
    when: "a year ago",
    rating: 5,
    text: "Great service always on time and goes the extra mile.",
    featured: true,
  },
  {
    id: "zip-r",
    author: "Zip R.",
    when: "a year ago",
    rating: 5,
    text: "Lives up to the name! We needed to have our yard and flower beds cleared. He was able to come to our house within hours of first contacting him. Three days …",
    excerpt: true,
    services: ["yard-cleanup"],
  },
  {
    id: "john-s",
    author: "John S.",
    when: "2 years ago",
    rating: 5,
    text: "I recently had some extensive landscaping work done in my backyard, and I couldn't be more pleased with the results. The job involved laying down mulch, …",
    excerpt: true,
    services: ["landscape-design", "mulch-pine-straw"],
  },
  {
    id: "marvin-n",
    author: "Marvin N.",
    when: "a year ago",
    rating: 5,
    text: "These guys do great work! They came on time and completed my job ahead of schedule. They were very flexible with adjustments I made as the project evolved. …",
    excerpt: true,
  },
  {
    id: "melissa-p",
    author: "Melissa P.",
    when: "a year ago",
    rating: 5,
    text: "We first hired Speedy Landscaping to do regular lawn maintenance at our rental property. Since then, we have hired him to do a number of other jobs for us at …",
    excerpt: true,
    services: ["lawn-maintenance"],
  },
  {
    id: "abby-r",
    author: "Abby R.",
    when: "a year ago",
    rating: 5,
    text: "Y'all, this man does incredible work! Let me tell you, he transformed the yard and did some handy work around the house with impeccability. When I first got to …",
    excerpt: true,
  },
  {
    id: "lyn-j",
    author: "Lyn J.",
    when: "a year ago",
    rating: 5,
    text: "Perfection and yes very speedy. I am very happy with the service and professional work I received my lawn looks great. I highly recommend Speedy Landscaping. I …",
    excerpt: true,
    services: ["lawn-maintenance"],
  },
  {
    id: "john-o",
    author: "John O.",
    when: "a year ago",
    rating: 5,
    text: "Hello Friends, I Use Speedy Landscaping for ALL my Landscaping Services, I am a Vietnam War Veteran, Live in Kennesaw, I am Hispanic, I never have seen such …",
    excerpt: true,
  },
  {
    id: "belinda-h",
    author: "Belinda H.",
    when: "a year ago",
    rating: 5,
    text: "These guys are great!!! I love their work and work ethics. Very professional. Thank you.",
  },
  {
    id: "erika-g",
    author: "Erika G.",
    when: "a year ago",
    rating: 5,
    text: "He came out so fast and did an amazing job!! Muy bien gracias!!!",
  },
  {
    id: "jennifer-c",
    author: "Jennifer C.",
    when: "a year ago",
    rating: 5,
    text: "excellent service.. Thank you so much.",
  },
  {
    id: "atiyah-h",
    author: "Atiyah H.",
    when: "a year ago",
    rating: 5,
    lang: "es",
    text: "Recomiendo ampliamente Speedy Landscaping para today sus necessitates de Jardin. Son profesionales y justos.",
  },
  {
    id: "carlos-n",
    author: "Carlos N.",
    when: "2 years ago",
    rating: 5,
    lang: "es",
    text: "Excelente servicio. Cumplimiento, calidad y amabilidad.",
  },
];

export const featuredReviews = reviews.filter((r) => r.featured);

export const reviewById = (id: string) => reviews.find((r) => r.id === id);

export const reviewsForService = (slug: string, limit = 2) =>
  reviews.filter((r) => r.services?.includes(slug)).slice(0, limit);

/** Reviews complete enough to publish as schema.org Review items (no cut-off text). */
export const schemaReviews = reviews.filter((r) => !r.excerpt);
