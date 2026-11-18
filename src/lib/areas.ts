import type { Faq } from "./services";

/**
 * City pages. Only cities with evidence of real customers or listings are included
 * (see /research/business-info.md, section 3). Marietta, the home city, is covered by
 * the home page, so it has no page here and the two never compete for the same keyword.
 *
 * TODO: add Smyrna and Austell once the owner confirms the service area on Google.
 * Adding a city is one more object in this array; routes, sitemap and schema follow.
 */

export type Area = {
  slug: string;
  city: string;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** The verifiable reason this city is listed. Shown on the page. */
  evidence: string;
  zipCodes: string[];
  landmarks: string[];
  sections: { heading: string; paragraphs: string[] }[];
  popularServices: string[];
  faqs: Faq[];
};

const PHONE = "(678) 748-2590";

export const areas: Area[] = [
  {
    slug: "mableton",
    city: "Mableton",
    keyword: "landscaping in Mableton, GA",
    title: "Landscaping in Mableton, GA | Speedy Landscaping",
    description:
      "Landscaping and lawn care in Mableton, GA: sod, mulch, yard cleanup, tree trimming and pressure washing from a 5-star local crew. Call (678) 748-2590.",
    h1: "Landscaping and lawn care in Mableton, GA",
    intro: `Speedy Landscaping & Lawncare serves Mableton, GA from our base in nearby Marietta, with lawn maintenance, sod, mulch, yard cleanups, tree trimming and pressure washing. Call or text ${PHONE} for a free estimate.`,
    evidence: "Speedy Landscaping is listed on Yelp under Mableton, GA 30126.",
    zipCodes: ["30126"],
    landmarks: ["Silver Comet Trail", "Mable House Barnes Amphitheatre", "Veterans Memorial Highway", "the Chattahoochee River"],
    sections: [
      {
        heading: "Yards in Mableton",
        paragraphs: [
          "Mableton is the largest city in Cobb County, and its yards are as varied as its streets. Around the Mable House and along Veterans Memorial Highway you find ranch homes from the 1960s and 70s on big, wooded lots. Closer to the East-West Connector and the Chattahoochee River, newer subdivisions have smaller, sloped lawns with homeowners association standards to meet.",
          "The older lots share one challenge: mature oaks and pines. They are beautiful, and they also shade out Bermuda grass, fill gutters and bury lawns in leaves every fall.",
        ],
      },
      {
        heading: "What Mableton homeowners ask us for most",
        paragraphs: [
          "On wooded lots the work is usually about managing the trees: trimming limbs back from the roof, clearing leaves and pine needles, cleaning gutters and refreshing pine straw under the canopy. Where grass has thinned in the shade, raising the canopy and laying a shade-tolerant sod can bring the lawn back.",
          "In the newer neighborhoods the requests are different. Homeowners want clean bed edges, fresh mulch before spring, and a weekly mowing schedule that keeps the front yard within neighborhood rules.",
        ],
      },
      {
        heading: "Slopes, clay and runoff",
        paragraphs: [
          "Much of Mableton drains toward the Chattahoochee and its creeks, so sloped yards are common. Heavy summer storms wash mulch out of beds and cut channels through bare clay. Pine straw, which knits together and stays put on a slope, is often the better ground cover here, and stone borders or decorative rock hold the areas where water concentrates.",
        ],
      },
    ],
    popularServices: ["yard-cleanup", "mulch-pine-straw", "tree-service", "gutter-cleaning", "lawn-maintenance"],
    faqs: [
      {
        q: "Do you offer lawn care in Mableton, GA?",
        a: `Yes. Speedy Landscaping & Lawncare serves Mableton from nearby Marietta, with weekly and biweekly lawn maintenance as well as one-time projects. Call or text ${PHONE}.`,
      },
      {
        q: "What works best on a shady, wooded Mableton lot?",
        a: "Pine straw or mulch under the trees, shade-tolerant fescue where you want grass, and regular leaf and gutter cleanups in fall. Trimming lower limbs lets in more light for the lawn.",
      },
      {
        q: "How do I get an estimate in Mableton?",
        a: `Call or text ${PHONE} with your address and what you need. Estimates are free, and photos of the yard help us answer faster.`,
      },
    ],
  },

  {
    slug: "powder-springs",
    city: "Powder Springs",
    keyword: "landscaping in Powder Springs, GA",
    title: "Landscaping in Powder Springs, GA | Speedy Landscaping",
    description:
      "Landscaping and lawn care in Powder Springs, GA: mowing, bed cleanups, sod, mulch and pressure washing from a 5-star crew. Call or text (678) 748-2590.",
    h1: "Landscaping and lawn care in Powder Springs, GA",
    intro: `Speedy Landscaping & Lawncare works in Powder Springs, GA, mowing lawns, cleaning up garden beds, laying sod and mulch, and pressure washing driveways. Call or text ${PHONE} for a free estimate.`,
    evidence: "Powder Springs neighbors ask for lawn and garden help on Nextdoor, and Obdulio answers them personally.",
    zipCodes: ["30127"],
    landmarks: ["Silver Comet Trail", "Thurman Springs Park", "Wild Horse Creek Park", "Lost Mountain"],
    sections: [
      {
        heading: "Yards in Powder Springs",
        paragraphs: [
          "Powder Springs sits in the southwest corner of Cobb County, where suburbs start to give way to open land. Lots here tend to be larger than in Marietta: half-acre and one-acre yards are common out toward Lost Mountain, alongside newer subdivisions near the Silver Comet Trail and the downtown around Thurman Springs Park.",
          "More ground means more to keep up with. A big sunny lawn in Bermuda grass can need mowing every week from April to October, and long driveways show every season of algae and clay.",
        ],
      },
      {
        heading: "What Powder Springs homeowners ask us for most",
        paragraphs: [
          "Regular mowing comes first, usually with edging and trimming along long fence lines. After that it is garden bed cleanup: weeding, cutting back and fresh mulch so the beds near the house look cared for even when the lot is large.",
          "Open, sunny yards are also the best candidates for new Bermuda or Zoysia sod, and bare patches left by construction or old play areas are a common reason people call.",
        ],
      },
      {
        heading: "Bigger lots, practical choices",
        paragraphs: [
          "On an acre you cannot mulch everything, and you should not have to. We usually suggest concentrating beds, color and stone near the house and the street, and keeping the rest simple and easy to mow. Pine straw covers large natural areas for less than shredded mulch, and a pressure-washed driveway does a lot for a long approach.",
        ],
      },
    ],
    popularServices: ["lawn-maintenance", "yard-cleanup", "sod-installation", "mulch-pine-straw", "pressure-washing"],
    faqs: [
      {
        q: "Do you mow lawns in Powder Springs, GA?",
        a: `Yes. We offer weekly and every-other-week mowing with edging and trimming in Powder Springs. Call or text ${PHONE} for a free estimate.`,
      },
      {
        q: "Can you handle a large lot?",
        a: "Yes. Larger lots are common in Powder Springs. We look at the property first and price the mowing, beds and any cleanup based on what is actually there.",
      },
      {
        q: "Do you clean up garden beds as a one-time job?",
        a: "Yes. A single bed cleanup, with weeding, cutting back and fresh mulch or pine straw, is one of our most common requests.",
      },
    ],
  },

  {
    slug: "kennesaw",
    city: "Kennesaw",
    keyword: "landscaping in Kennesaw, GA",
    title: "Landscaping in Kennesaw, GA | Speedy Landscaping",
    description:
      "Landscaping in Kennesaw, GA: lawn maintenance, mulch, sod, planting beds, tree trimming and pressure washing. 5-star Google reviews. Call (678) 748-2590.",
    h1: "Landscaping and lawn care in Kennesaw, GA",
    intro: `Speedy Landscaping & Lawncare serves homeowners in Kennesaw, GA with lawn maintenance, mulch, sod, new planting beds, tree trimming and pressure washing. Call or text ${PHONE} for a free estimate.`,
    evidence: "A Google reviewer who lives in Kennesaw writes that he uses Speedy Landscaping for all of his landscaping.",
    zipCodes: ["30144", "30152"],
    landmarks: ["Kennesaw Mountain National Battlefield Park", "Kennesaw State University", "Swift-Cantrell Park", "Smith-Gilbert Gardens"],
    sections: [
      {
        heading: "Yards in Kennesaw",
        paragraphs: [
          "Kennesaw grew quickly from the 1990s on, and most of its homes sit in planned subdivisions with front lawns that face the street and a homeowners association that notices when they slip. Neighborhoods such as Legacy Park set a high bar for curb appeal, and the yards around Kennesaw Mountain add steep grades and rocky ground to the mix.",
          "The city also has plenty of rental homes near Kennesaw State University, where owners need the yard kept tidy without visiting every week.",
        ],
      },
      {
        heading: "What Kennesaw homeowners ask us for most",
        paragraphs: [
          "Curb appeal work leads the list: weekly mowing with sharp edges, fresh mulch in the front beds each spring, shrubs kept in shape, and a driveway and front walk pressure washed once pollen season is over.",
          "Many homes here are now twenty to thirty years old, which is about when the original builder landscaping wears out. Overgrown foundation shrubs come out, beds are re-edged with stone, and new plants go in. It is one of the most satisfying jobs we do, because the house looks new again from the street.",
        ],
      },
      {
        heading: "One crew for the whole yard",
        paragraphs: [
          "John O., a Vietnam veteran who lives in Kennesaw, writes in his Google review that he uses Speedy Landscaping for all of his landscaping services. That is how we prefer to work: the same people mowing the lawn are the ones who know where the drainage is poor and which shrub needs to come out.",
        ],
      },
    ],
    popularServices: ["lawn-maintenance", "mulch-pine-straw", "landscape-design", "pressure-washing", "tree-service"],
    faqs: [
      {
        q: "Do you serve Kennesaw, GA?",
        a: `Yes. One of our Google reviewers lives in Kennesaw and uses us for all of his landscaping. Call or text ${PHONE} for a free estimate.`,
      },
      {
        q: "Can you keep my yard within homeowners association standards?",
        a: "Yes. A regular mowing and edging schedule, mulched beds and trimmed shrubs cover what most associations look for. Tell us about any notice you have received and we will deal with those items first.",
      },
      {
        q: "Can you replace old, overgrown shrubs?",
        a: "Yes. We remove tired foundation plantings, re-edge the beds and replant with shrubs sized for the space, then finish with mulch or stone.",
      },
    ],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

/** Marietta facts for the home page and the service-area hub. */
export const marietta = {
  city: "Marietta",
  zipCodes: ["30008", "30060", "30062", "30064", "30066", "30067", "30068"],
  neighborhoods: ["Marietta Square", "East Cobb", "West Cobb", "Whitlock Avenue", "the Kennesaw Mountain area"],
};

/** Every place named as served, for schema.org areaServed and the footer. */
export const servedCities = ["Marietta", ...areas.map((a) => a.city)];
