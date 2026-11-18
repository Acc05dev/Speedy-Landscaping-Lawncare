import type { ImageKey } from "./images";

/**
 * Service pages. One primary keyword per page, never shared with another page.
 * Every service listed here is advertised by the business (yard sign or former website)
 * or confirmed by a customer review. See /research/business-info.md, section 2.
 *
 * Copy rules: no prices, no guarantees, no licence or insurance claims until the
 * client confirms them. Lawn and plant advice is general horticulture for north Georgia.
 */

export type ServiceSection = {
  heading: string;
  /** Shown before the list or steps. */
  lead?: string;
  /** Shown after the list or steps. */
  paragraphs?: string[];
  bullets?: string[];
  /** Only for real sequences. Rendered as a numbered list. */
  steps?: { title: string; text: string }[];
};

export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  shortName: string;
  keyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  h1: string;
  /** Answer-first lead: what, where, how to act, in one or two sentences. */
  intro: string;
  /** One line for cards and lists. */
  summary: string;
  heroImage: ImageKey;
  gallery: ImageKey[];
  sections: ServiceSection[];
  faqs: Faq[];
  related: string[];
};

const PHONE = "(678) 748-2590";

export const services: Service[] = [
  {
    slug: "lawn-maintenance",
    name: "Lawn care and maintenance",
    shortName: "Lawn care",
    keyword: "lawn care in Marietta, GA",
    secondaryKeywords: ["lawn maintenance Marietta GA", "lawn mowing service Marietta", "weekly yard maintenance"],
    title: "Lawn Care in Marietta, GA | Speedy Landscaping",
    description:
      "Weekly and biweekly lawn care in Marietta, GA: mowing, edging, trimming and cleanup by a 5-star local crew. Call (678) 748-2590 for a free estimate.",
    h1: "Lawn care and maintenance in Marietta, GA",
    intro: `Speedy Landscaping & Lawncare mows, edges and trims lawns for homes and rental properties in Marietta, GA, on a weekly or every-other-week schedule. Call or text ${PHONE} for a free estimate.`,
    summary: "Mowing, edging, trimming and cleanup on a weekly or biweekly schedule.",
    heroImage: "lawn-front",
    gallery: ["lawn-porch", "lawn-curb", "hedge-trim"],
    sections: [
      {
        heading: "What a maintenance visit covers",
        lead: "A good-looking lawn is mostly a matter of showing up on schedule and finishing the edges. Every visit follows the same routine, so the yard looks the same on week twelve as it did on week one.",
        bullets: [
          "Mowing at a height that suits your grass type and the season",
          "Edging along driveways, sidewalks and bed lines",
          "String trimming around fences, trees, mailboxes and anywhere the mower cannot reach",
          "Blowing clippings off the driveway, walkways and porch",
          "Hedge and shrub trimming when you ask for it",
        ],
      },
      {
        heading: "How often should a Marietta lawn be mowed?",
        paragraphs: [
          "During the growing season, roughly April through October, most Marietta lawns need mowing once a week. Bermuda and Zoysia, the two most common grasses in Cobb County, grow fast in summer heat, and cutting off more than a third of the blade at once leaves the lawn brown and stressed.",
          "Every-other-week service can work for slower-growing or shaded lawns. In the cooler months growth slows right down, and the work shifts toward leaves and keeping beds tidy.",
        ],
      },
      {
        heading: "Mowing for Georgia grass and Georgia clay",
        paragraphs: [
          "Warm-season grasses want a low cut: about 1 to 2 inches for Bermuda and 1 to 2.5 inches for Zoysia. Tall fescue, which you will find under the oaks and pines in shadier Marietta yards, does better at 3 to 4 inches, especially in July and August.",
          "Red clay soil compacts easily and sheds water, so a lawn here is quicker to thin out when it is scalped or mowed wet. Matching the cut to the grass is the simplest way to keep it thick enough to crowd out weeds.",
        ],
      },
      {
        heading: "Rental properties and second homes",
        paragraphs: [
          "Landlords are among our long-term customers. One Google reviewer first hired Speedy for regular lawn maintenance at a rental property and went on to hire us for other jobs. If you manage a property from a distance, a reliable weekly visit keeps the yard presentable for tenants and neighbors without you having to check on it.",
        ],
      },
      {
        heading: "Why customers stay on the schedule",
        paragraphs: [
          "The reviews say it better than we can. Tiffany B. has used Speedy for lawn service for over a year and calls the work phenomenal. Thomas R. writes that we are always on time and go above and beyond on each visit. Myrth G. has us on weekly yard maintenance after we pruned her trees and put in French drains.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does lawn care cost in Marietta, GA?",
        a: `The price depends on the size of the lot, how overgrown the lawn is and how often we visit. Estimates are free: call or text ${PHONE} and we will give you a number after seeing the yard.`,
      },
      {
        q: "How often should my lawn be mowed?",
        a: "Weekly from about April through October for Bermuda and Zoysia lawns. Shaded or slower-growing lawns can often go two weeks between cuts, and visits taper off in winter.",
      },
      {
        q: "Do you maintain rental properties?",
        a: "Yes. Our customers include landlords, such as a Google reviewer who started with regular lawn maintenance at a rental property and has since hired us for other jobs.",
      },
      {
        q: "How quickly can you start?",
        a: `Call or text ${PHONE}. Customers on Google describe fast replies, and one new customer reported same-day service.`,
      },
    ],
    related: ["sod-installation", "mulch-pine-straw", "yard-cleanup"],
  },

  {
    slug: "sod-installation",
    name: "Sod installation",
    shortName: "Sod",
    keyword: "sod installation in Marietta, GA",
    secondaryKeywords: ["sod installers Marietta GA", "new lawn installation", "Bermuda sod", "Zoysia sod"],
    title: "Sod Installation in Marietta, GA | Speedy Landscaping",
    description:
      "Sod installation in Marietta, GA. We clear the old lawn, grade the soil and lay fresh Bermuda, Zoysia or fescue sod. Free estimates: (678) 748-2590.",
    h1: "Sod installation in Marietta, GA",
    intro: `Speedy Landscaping & Lawncare installs new sod lawns in Marietta, GA. We strip the old turf, grade the soil and lay fresh sod seam to seam, so you go from bare dirt to a green lawn. Call or text ${PHONE} for a free estimate.`,
    summary: "Old turf out, soil graded, fresh sod laid tight from edge to edge.",
    heroImage: "sod-side-after",
    gallery: ["sod-front", "sod-progress", "sod-fence", "design-backyard"],
    sections: [
      {
        heading: "From bare soil to a finished lawn",
        lead: "Sod is the fastest way to a full lawn, and almost all of the result comes from what happens before the first roll goes down. The photos on this page are our own jobs: the same yards, before and after.",
        steps: [
          { title: "Measure and plan", text: "We look at the yard, the sun it gets and how water moves across it, then measure for the amount of sod." },
          { title: "Clear and grade", text: "Old grass and weeds come out, and the soil is raked and leveled so the sod sits flat and drains away from the house." },
          { title: "Lay the sod", text: "Rows are staggered like brickwork with the seams pushed tight, then trimmed to fit around beds, walks and walls." },
          { title: "Water it in", text: "New sod is watered straight away so the roots make contact with the soil underneath." },
        ],
      },
      {
        heading: "Which sod suits a Marietta yard?",
        paragraphs: [
          "Sun decides most of it. Bermuda is the workhorse for open, sunny lawns: it handles heat, traffic and drought, but it needs six to eight hours of direct sun. Zoysia is denser and softer underfoot and tolerates light shade. For yards under mature oaks and pines, tall fescue is usually the only grass that will hold.",
          "If you are not sure what you have now or what would do well, we can tell you when we come out to measure.",
        ],
      },
      {
        heading: "The best time to lay sod in north Georgia",
        paragraphs: [
          "Bermuda and Zoysia root fastest from late spring through summer, when they are actively growing. They can be laid while dormant in winter, but they will sit brown and root slowly until the soil warms up. Fescue is the opposite: it is best installed in early fall so it can establish before the next summer.",
        ],
      },
      {
        heading: "Looking after new sod",
        bullets: [
          "Water every day for the first two weeks, and twice a day in peak summer heat",
          "Keep foot traffic, pets and furniture off it for two to three weeks",
          "Give it the first mow once the sod resists a gentle tug, usually after two to three weeks",
          "Cut high the first time and never take off more than a third of the blade",
        ],
        paragraphs: [
          "Red clay holds water once it is wet but sheds it when it is dry and hard, so short, frequent watering works better than one long soak in the first weeks.",
        ],
      },
      {
        heading: "Sod as part of a bigger project",
        paragraphs: [
          "Many sod jobs come with new beds, rock borders or mulch at the same time, and doing them together gives clean lines between lawn and planting. See our landscape design page for examples.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does sod installation cost in Marietta, GA?",
        a: `It depends on the square footage, the type of grass and how much clearing and grading the yard needs. We measure the yard and give you a free estimate: call or text ${PHONE}.`,
      },
      {
        q: "When is the best time to install sod in Marietta?",
        a: "Late spring through summer for Bermuda and Zoysia, which root fastest in warm soil. Early fall for tall fescue.",
      },
      {
        q: "What type of sod is best for my yard?",
        a: "Bermuda for full sun, Zoysia for sun with some light shade, and tall fescue for shaded yards under trees. We can recommend one after seeing how much sun your lawn gets.",
      },
      {
        q: "How long before I can walk on or mow new sod?",
        a: "Stay off it for two to three weeks. Mow for the first time when the sod has rooted and resists a gentle tug, which is usually two to three weeks after installation.",
      },
    ],
    related: ["landscape-design", "lawn-maintenance", "yard-cleanup"],
  },

  {
    slug: "mulch-pine-straw",
    name: "Mulch and pine straw installation",
    shortName: "Mulch and pine straw",
    keyword: "mulch installation in Marietta, GA",
    secondaryKeywords: ["pine straw installation Marietta GA", "mulching service", "black mulch", "red mulch"],
    title: "Mulch Installation in Marietta, GA | Speedy Landscaping",
    description:
      "Mulch and pine straw installation in Marietta, GA. Black, brown or red mulch spread evenly in clean, edged beds. Free estimates: (678) 748-2590.",
    h1: "Mulch and pine straw installation in Marietta, GA",
    intro: `Speedy Landscaping & Lawncare delivers and spreads mulch and pine straw in planting beds, around trees and along foundations in Marietta, GA. Choose black, brown or red mulch, or classic Georgia pine straw. Call or text ${PHONE} for a free estimate.`,
    summary: "Black, brown or red mulch, or pine straw, spread evenly in clean beds.",
    heroImage: "mulch-brown",
    gallery: ["mulch-shrubs", "mulch-red", "mulch-black", "mulch-large"],
    sections: [
      {
        heading: "What a mulch job includes",
        bullets: [
          "Clearing weeds, leaves and debris out of the beds first",
          "Cutting a clean edge between bed and lawn",
          "Spreading mulch or pine straw to an even depth across the whole bed",
          "Keeping mulch pulled back from tree trunks and the base of shrubs",
          "Sweeping walks and driveways before we leave",
        ],
      },
      {
        heading: "Mulch or pine straw?",
        paragraphs: [
          "Both hold moisture, cool the soil and keep weeds down. The choice comes down to the look you want and the ground you are covering.",
          "Shredded mulch gives a bold, uniform color and suits flat beds near the house. Pine straw is lighter, knits together so it stays put on slopes, and is the traditional finish under pines and azaleas across Cobb County. It breaks down faster, so most beds get topped up once or twice a year.",
        ],
      },
      {
        heading: "Choosing a color for your home",
        paragraphs: [
          "Our photos show all three mulch colors on real jobs. Black mulch makes green foliage and white stone stand out and looks sharp against stone and grey siding. Brown is the most natural and forgiving choice. Red mulch picks up the tone of Georgia brick and matches the red curbing many neighborhoods here use.",
        ],
      },
      {
        heading: "How deep, and how often",
        paragraphs: [
          "Two to three inches is the right depth for mulch. Thinner than that and weeds push through; much thicker and water struggles to reach the roots. Piling mulch against a trunk, the so-called mulch volcano, holds moisture against the bark and invites rot, which is why we keep it pulled back.",
          "Dyed mulch keeps its color for about a year in the Georgia sun. Spring is the most popular time to refresh it, before summer heat arrives, with fall a close second.",
        ],
      },
      {
        heading: "Pairs well with pressure washing",
        paragraphs: [
          "Fresh mulch next to a dark, stained driveway only does half the job. Sriura S. had us do both and described the result on Google as beautifully done. Booking them together is the quickest way to lift how a house looks from the street.",
        ],
      },
    ],
    faqs: [
      {
        q: "How deep should mulch be?",
        a: "Two to three inches. That is enough to block weeds and hold moisture while still letting water reach the roots. Keep it a few inches back from tree trunks.",
      },
      {
        q: "Is mulch or pine straw better?",
        a: "Mulch gives stronger color and lasts longer on flat beds. Pine straw stays in place on slopes and suits wooded yards, but usually needs topping up once or twice a year.",
      },
      {
        q: "How often should mulch be replaced?",
        a: "About once a year for dyed mulch, since sun fades the color. Spring and fall are the usual times to refresh it.",
      },
      {
        q: "Do you clean out the beds before mulching?",
        a: "Yes. Weeds, leaves and debris are cleared and the bed edge is cut before any mulch goes down. Badly overgrown beds are handled as a yard cleanup first.",
      },
    ],
    related: ["landscape-design", "pressure-washing", "yard-cleanup"],
  },

  {
    slug: "landscape-design",
    name: "Landscape design and installation",
    shortName: "Landscape design",
    keyword: "landscape design in Marietta, GA",
    secondaryKeywords: ["landscaping installation Marietta GA", "flower bed installation", "decorative rock", "French drain"],
    title: "Landscape Design in Marietta, GA | Speedy Landscaping",
    description:
      "Landscape design and installation in Marietta, GA: planting beds, stone borders, decorative rock, garden paths and French drains. Call (678) 748-2590.",
    h1: "Landscape design and installation in Marietta, GA",
    intro: `Speedy Landscaping & Lawncare designs and builds planting beds, stone borders, rock features and garden paths for homes in Marietta, GA. We mark the layout on the ground first, so you see the design before anything is dug. Call or text ${PHONE} for a free estimate.`,
    summary: "Planting beds, stone borders, decorative rock, garden paths and drainage.",
    heroImage: "hero",
    gallery: ["design-rose-path", "design-stone-edging", "design-white-rock", "design-stepping-stones", "design-curbing", "design-river-rock"],
    sections: [
      {
        heading: "What we design and build",
        bullets: [
          "New planting beds with shrubs, roses, perennials and seasonal color",
          "Stone block borders and clean bed edging",
          "Decorative rock: white marble chips, river rock and gravel",
          "Gravel garden paths and stepping-stone walks",
          "Tree rings and island beds",
          "French drains for yards that hold water",
          "Full front or backyard makeovers that combine beds, rock and new sod",
        ],
      },
      {
        heading: "How a project runs",
        steps: [
          { title: "Walk the yard", text: "We look at sun, slope and drainage with you and talk through what you want the space to do." },
          { title: "Mark it out", text: "Bed lines are painted on the ground and the plants are set out in their pots, so you can adjust the layout before any digging starts." },
          { title: "Build", text: "Edging goes in, plants go in the ground, and the bed is finished with mulch or stone." },
          { title: "Clean up and walk through", text: "We clear the site and go over the finished work with you." },
        ],
        paragraphs: [
          "Plans change once you see them full size, and that is fine. Marvin N. wrote on Google that we were very flexible with the adjustments he made as his project evolved, and still finished ahead of schedule.",
        ],
      },
      {
        heading: "Plants that cope with Georgia summers",
        paragraphs: [
          "Marietta has hot, humid summers, mild winters and heavy clay soil, so plant choice matters more than almost anything else. We match each plant to the sun it will actually get: sun-lovers like roses and crape myrtles out in the open, hostas and other shade plants under the trees, and tough evergreen shrubs for year-round structure along the foundation.",
          "Fall is the best planting season here because roots keep growing through the mild winter. Spring works well too. Summer planting is possible but needs much more watering.",
        ],
      },
      {
        heading: "Rock, borders and paths",
        paragraphs: [
          "Stone does not fade or wash away, which makes it a good fit for narrow side yards, downspout areas and anywhere mulch keeps floating off. White marble chips brighten shaded entries, river rock suits beds next to brick, and a gravel path turns a worn track across the lawn into a feature.",
        ],
      },
      {
        heading: "Drainage and French drains",
        paragraphs: [
          "Clay soil drains slowly, so low spots stay soggy and water collects against foundations. A French drain, a gravel-filled trench with a perforated pipe, collects that water and carries it somewhere it can soak away. Myrth G. mentions in her Google review that we put in French drains at her home along with tree pruning and pine straw.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does landscaping cost in Marietta, GA?",
        a: `Every yard is different, so we price each project after seeing it. A single bed costs far less than a full backyard makeover. Estimates are free: call or text ${PHONE}.`,
      },
      {
        q: "Do you take small jobs, like one flower bed?",
        a: "Yes. Many of the projects in our gallery are a single bed, a tree ring or a short path.",
      },
      {
        q: "Can you fix a yard that holds water?",
        a: "Often, yes. We install French drains, and a customer review on Google mentions the ones we put in at her home. We need to see where the water sits before recommending a fix.",
      },
      {
        q: "When is the best time to plant in Georgia?",
        a: "Fall is best for shrubs and trees, because roots establish over the mild winter. Spring is the second-best window. Summer planting works but needs frequent watering.",
      },
    ],
    related: ["sod-installation", "mulch-pine-straw", "tree-service"],
  },

  {
    slug: "tree-service",
    name: "Tree trimming and tree service",
    shortName: "Tree service",
    keyword: "tree trimming in Marietta, GA",
    secondaryKeywords: ["tree service Marietta GA", "tree pruning", "tree cutting", "shrub trimming"],
    title: "Tree Trimming in Marietta, GA | Speedy Landscaping",
    description:
      "Tree trimming, pruning and tree cutting in Marietta, GA, with full cleanup. 5-star local crew, fast response. Call or text (678) 748-2590.",
    h1: "Tree trimming and tree service in Marietta, GA",
    intro: `Speedy Landscaping & Lawncare trims, prunes and cuts trees and overgrown shrubs for homeowners in Marietta, GA, and cleans up the debris afterwards. Call or text ${PHONE} for a free estimate.`,
    summary: "Trimming, pruning and tree cutting, with the debris cleaned up.",
    heroImage: "lawn-trees",
    gallery: ["tree-ring", "hedge-trim"],
    sections: [
      {
        heading: "Tree work we handle",
        bullets: [
          "Pruning limbs back from roofs, gutters, driveways and fences",
          "Removing dead, broken and storm-damaged branches",
          "Raising low canopies so you can mow and walk underneath",
          "Shaping ornamental trees and crape myrtles",
          "Cutting back overgrown hedges and large shrubs",
          "Tree cutting, with the wood and brush cleaned up",
        ],
        paragraphs: [
          "Every tree job starts with a look at the tree, the access and what sits underneath it. Texting a few photos is the fastest way to get the conversation started.",
        ],
      },
      {
        heading: "When to trim trees in north Georgia",
        paragraphs: [
          "Late winter, while trees are dormant, is the best time for most pruning: the branch structure is easy to see and the tree puts its spring energy into healing the cuts. Crape myrtles are pruned in late winter too, lightly, without the hard topping that leaves knobby stumps.",
          "Spring bloomers such as dogwoods and azaleas are the exception. Prune those just after they flower, or you will cut off next year's buds. Dead or hazardous limbs can come down at any time of year.",
        ],
      },
      {
        heading: "Signs a tree needs attention",
        bullets: [
          "Dead branches or limbs with no leaves in summer",
          "Limbs hanging over the roof or resting on the gutters",
          "Branches that cross and rub against each other",
          "Cracks where a large limb joins the trunk",
          "A canopy so dense that grass will not grow underneath",
        ],
        paragraphs: [
          "Marietta's summer thunderstorms are hard on overextended limbs. Dealing with them before storm season is far cheaper than dealing with what they land on.",
        ],
      },
      {
        heading: "More light for the lawn",
        paragraphs: [
          "Thin, patchy grass under trees is usually a light problem. Raising and thinning the canopy lets more sun reach the ground, and it is often the step that makes new sod or a shade-tolerant fescue lawn work.",
        ],
      },
      {
        heading: "Part of looking after the whole yard",
        paragraphs: [
          "Tree work rarely happens on its own. Myrth G. had us prune her trees, install French drains and lay pine straw, and we now handle her weekly yard maintenance. One crew for all of it means the cleanup is done once and done properly.",
        ],
      },
    ],
    faqs: [
      {
        q: "When is the best time to trim trees in Marietta, GA?",
        a: "Late winter, while trees are dormant, suits most species. Trees that flower in spring should be pruned right after they bloom. Dead or dangerous limbs can be removed at any time.",
      },
      {
        q: "How much does tree trimming cost?",
        a: `It depends on the size of the tree, how easy it is to reach and how much has to come off. Text photos or call ${PHONE} for a free estimate.`,
      },
      {
        q: "Do you cut down whole trees?",
        a: "Yes, tree cutting is part of our tree service. Send photos of the tree and what is around it so we can assess the job.",
      },
      {
        q: "Do you clean up after tree work?",
        a: "Yes. Branches, brush and debris are cleaned up when the work is finished.",
      },
    ],
    related: ["yard-cleanup", "lawn-maintenance", "landscape-design"],
  },

  {
    slug: "pressure-washing",
    name: "Pressure washing",
    shortName: "Pressure washing",
    keyword: "pressure washing in Marietta, GA",
    secondaryKeywords: ["driveway cleaning Marietta GA", "concrete cleaning", "patio pressure washing"],
    title: "Pressure Washing in Marietta, GA | Speedy Landscaping",
    description:
      "Pressure washing in Marietta, GA for driveways, walkways and patios. We lift algae, red clay stains and pollen from concrete. Call (678) 748-2590.",
    h1: "Pressure washing in Marietta, GA",
    intro: `Speedy Landscaping & Lawncare pressure washes driveways, walkways and patios in Marietta, GA, lifting the dark algae, red clay stains and pollen film that Georgia weather leaves on concrete. Call or text ${PHONE} for a free estimate.`,
    summary: "Driveways, walkways and patios cleaned of algae, clay stains and pollen.",
    heroImage: "wash-driveway",
    gallery: ["wash-clean", "wash-walkway", "wash-drive-bed"],
    sections: [
      {
        heading: "What we clean",
        bullets: [
          "Concrete driveways and parking pads",
          "Front walks, sidewalks and steps",
          "Patios and pool-side concrete",
          "Stone and paver paths",
        ],
        paragraphs: [
          "Have another surface in mind? Ask when you call and we will tell you whether it is something we take on.",
        ],
      },
      {
        heading: "Why concrete turns dark in Georgia",
        paragraphs: [
          "The grey-black film on a Marietta driveway is mostly algae and mildew, which thrive in our humidity and spread fastest in shade. Add the orange stain from red clay that washes across after every storm, yellow pine pollen in March and April, and tannin marks from wet leaves, and a driveway can look years older than it is.",
          "None of that is permanent. The photo at the top of this page was taken mid-job: you can see the line between the cleaned concrete and the part still to do.",
        ],
      },
      {
        heading: "How often, and when",
        paragraphs: [
          "Once a year keeps most driveways and walks looking clean. Shaded areas and north-facing surfaces grow algae faster and may need it more often.",
          "Late spring is the most popular time, after pollen season has finished coating everything. Homeowners also book before listing a house for sale, before a party, or in fall once the leaves are down.",
        ],
      },
      {
        heading: "What pressure washing will and will not fix",
        paragraphs: [
          "Pressure washing removes what sits on the surface: algae, mildew, clay, pollen, leaf stains and general grime. That covers almost everything that makes a driveway look tired.",
          "Deep oil stains, rust marks left by fertilizer or metal furniture, and old paint are different. They soak into the concrete and may only lighten rather than disappear. Cracks and flaking are damage, not dirt, and washing will not repair them. If you are not sure what you are looking at, text us a photo before we come out.",
        ],
      },
      {
        heading: "Getting ready for the visit",
        bullets: [
          "Move cars off the driveway",
          "Clear furniture, planters and grills from patios",
          "Close nearby windows and doors",
          "Keep pets and children inside while we work",
        ],
      },
      {
        heading: "Better together with fresh mulch",
        paragraphs: [
          "Clean concrete and newly mulched beds change the look of a house from the street more than any other pair of jobs. Sriura S. left a 5-star Google review after we did both, calling it a great job on the mulching and the pressure washing.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often should a driveway be pressure washed in Georgia?",
        a: "About once a year. Shaded concrete grows algae faster and may need cleaning more often.",
      },
      {
        q: "How much does pressure washing cost in Marietta?",
        a: `The price depends on the size and condition of the area. Call or text ${PHONE} with the surfaces you want cleaned for a free estimate.`,
      },
      {
        q: "When is the best time to pressure wash?",
        a: "Late spring, once pine pollen season is over, is the most popular time. Fall after the leaves drop also works well.",
      },
      {
        q: "Can you pressure wash and do yard work in the same visit?",
        a: "Yes. Customers often combine pressure washing with mulch or a yard cleanup, and one Google reviewer had mulching and pressure washing done together.",
      },
    ],
    related: ["mulch-pine-straw", "gutter-cleaning", "yard-cleanup"],
  },

  {
    slug: "gutter-cleaning",
    name: "Gutter cleaning",
    shortName: "Gutter cleaning",
    keyword: "gutter cleaning in Marietta, GA",
    secondaryKeywords: ["gutter cleaning service Marietta", "downspout cleaning", "clogged gutters"],
    title: "Gutter Cleaning in Marietta, GA | Speedy Landscaping",
    description:
      "Gutter cleaning in Marietta, GA. Leaves, pine needles and debris cleared from gutters and downspouts so rain drains away. Call (678) 748-2590.",
    h1: "Gutter cleaning in Marietta, GA",
    intro: `Speedy Landscaping & Lawncare clears leaves, pine needles and roof grit out of gutters and downspouts for homes in Marietta, GA, so rain drains away from the roof and the foundation. Call or text ${PHONE} for a free estimate.`,
    summary: "Leaves and pine needles cleared so rain drains away from your home.",
    heroImage: "gutter-home",
    gallery: ["lawn-porch", "mulch-red"],
    sections: [
      {
        heading: "What gutter cleaning includes",
        bullets: [
          "Clearing leaves, pine needles and debris out of the gutters",
          "Checking that downspouts are open and draining",
          "Collecting the debris and taking it away",
          "Cleaning up anything that lands on beds, walks and the driveway",
        ],
      },
      {
        heading: "Why gutters clog so fast in Cobb County",
        paragraphs: [
          "Marietta is a city of tall trees. Oaks drop leaves in fall, pines shed needles all year, and spring brings catkins, seed pods and pollen strings. All of it ends up on the roof and washes into the gutters with the first hard rain.",
          "The Atlanta area gets around 50 inches of rain a year, much of it in short, heavy downpours. A blocked gutter cannot carry that, so water spills over the edge instead.",
        ],
      },
      {
        heading: "What overflowing gutters do to a house",
        bullets: [
          "Water soaks the fascia boards and roof edge, which leads to rot",
          "Runoff pools against the foundation and finds its way into crawl spaces",
          "Mulch and soil wash out of the beds below, leaving trenches",
          "Standing water in the gutter breeds mosquitoes all summer",
        ],
        paragraphs: [
          "Cleaning costs very little compared with any one of those repairs.",
        ],
      },
      {
        heading: "How often to clean them",
        paragraphs: [
          "Twice a year is the usual advice for north Georgia: once in late spring after the pollen and seed drop, and once in late fall after the leaves are down. Homes with pines directly overhead often need a third visit, because needles fall year-round and mat together.",
        ],
      },
      {
        heading: "Signs your gutters are overdue",
        bullets: [
          "Water pouring over the side during rain",
          "Plants or moss growing in the gutter",
          "Dark streaks on the siding below",
          "Gutters sagging or pulling away from the roofline",
          "Washed-out mulch or soil directly underneath",
        ],
        paragraphs: [
          "Gutter cleaning fits naturally alongside a fall yard cleanup, when the same leaves are being cleared from the lawn and beds.",
        ],
      },
    ],
    faqs: [
      {
        q: "How often should gutters be cleaned in Marietta, GA?",
        a: "Twice a year for most homes: late spring and late fall. Houses under pine trees often need a third cleaning because needles drop all year.",
      },
      {
        q: "How much does gutter cleaning cost?",
        a: `It depends on the size and height of the house and how full the gutters are. Call or text ${PHONE} for a free estimate.`,
      },
      {
        q: "When is the best time to clean gutters?",
        a: "Late fall, once most leaves have dropped, is the most important cleaning of the year. A second cleaning in late spring clears pollen and seed debris.",
      },
      {
        q: "Do you check the downspouts too?",
        a: "Yes. Clearing the gutter does little good if the downspout is blocked, so we check that each one is draining.",
      },
    ],
    related: ["yard-cleanup", "pressure-washing", "tree-service"],
  },

  {
    slug: "yard-cleanup",
    name: "Yard cleanup and junk removal",
    shortName: "Yard cleanup",
    keyword: "yard cleanup in Marietta, GA",
    secondaryKeywords: ["junk removal Marietta GA", "leaf removal", "overgrown yard clearing", "flower bed cleanup"],
    title: "Yard Cleanup in Marietta, GA | Speedy Landscaping",
    description:
      "Yard cleanup and junk removal in Marietta, GA. Overgrown beds, leaves, brush and unwanted items cleared and hauled away fast. Call (678) 748-2590.",
    h1: "Yard cleanup and junk removal in Marietta, GA",
    intro: `Speedy Landscaping & Lawncare clears overgrown yards, weedy flower beds, leaves and unwanted junk for homeowners and landlords in Marietta, GA, and hauls it all away. Call or text ${PHONE} for a free estimate.`,
    summary: "Overgrown beds, leaves, brush and junk cleared and hauled away.",
    heroImage: "cleanup-after",
    gallery: ["cleanup-before", "cleanup-corner", "cleanup-grading"],
    sections: [
      {
        heading: "What we clear",
        bullets: [
          "Overgrown flower beds, weeds and vines",
          "Fallen leaves, sticks and storm debris",
          "Brush, dead plants and old shrubs",
          "Worn-out mulch and landscape fabric",
          "Household junk such as old furniture and bed frames",
        ],
        paragraphs: [
          "Everything we clear leaves with us, so you are not left with a pile at the curb.",
        ],
      },
      {
        heading: "Fast when you need it fast",
        paragraphs: [
          "Cleanups are often urgent: guests arriving, a notice from the homeowners association, a house going on the market. Zip R. needed a yard and flower beds cleared and wrote on Google that Obdulio came to the house within hours of the first contact. His review opens with the words we are proudest of: lives up to the name.",
        ],
      },
      {
        heading: "Cleanup is usually step one",
        paragraphs: [
          "A cleared bed is a blank page. The before and after photos on this page show the same front bed: stripped back to bare soil, then rebuilt with stone edging, black mulch and new plants. Once the old growth is gone we can mulch, plant or lay sod in the same project.",
        ],
      },
      {
        heading: "Landlords, sellers and move-outs",
        paragraphs: [
          "Rental turnovers and home sales have deadlines. We clear the yard and take away what the last occupants left behind, so the property is ready to show. We already look after rental properties for landlords, as their Google reviews mention.",
        ],
      },
      {
        heading: "Seasonal cleanups in Marietta",
        paragraphs: [
          "Leaf season here runs from late October into December, and a thick layer of wet oak leaves will smother a lawn if it sits all winter. A fall cleanup clears lawn and beds once the trees are bare.",
          "A spring cleanup does the opposite job: cutting back dead growth, clearing winter debris and getting beds ready for fresh mulch before the heat arrives.",
        ],
      },
    ],
    faqs: [
      {
        q: "How fast can you come out for a yard cleanup?",
        a: `Call or text ${PHONE}. One Google reviewer had Obdulio at the house within hours of first contacting him, and others mention same-day service.`,
      },
      {
        q: "Do you haul everything away?",
        a: "Yes. Yard waste, brush and junk are loaded up and removed, so nothing is left at the curb.",
      },
      {
        q: "What kind of junk do you remove?",
        a: "Household items such as furniture and bed frames, along with yard debris. Call about anything unusual or very heavy so we can confirm before we come.",
      },
      {
        q: "How much does a yard cleanup cost in Marietta?",
        a: `It depends on the size of the yard and how much has to be cleared and hauled. Estimates are free: call or text ${PHONE}, and photos help.`,
      },
    ],
    related: ["mulch-pine-straw", "landscape-design", "gutter-cleaning"],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export const relatedServices = (service: Service) =>
  service.related.map(serviceBySlug).filter((s): s is Service => Boolean(s));
