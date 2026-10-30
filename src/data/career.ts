/** Career entries for /work. Newest first. Keep each `story` to one paragraph:
 *  what the sides were, where the incentives conflicted, what had to be decided before code. */
export const careerIntro =
  "Every product I've worked on sits in the middle of a transaction between people who need each other and want different things. The engineering was never the hard part. The hard part was deciding whose problem the product solves first, because that decision gets made before the first line of code and everything downstream inherits it.";

export type CareerEntry = {
  id: string;
  company: string;
  url: string;
  roles: string;
  years: string;
  sides: string;
  story: string;
};

export const career: CareerEntry[] = [
  {
    id: "newzip",
    company: "Newzip",
    url: "https://newzip.com",
    roles: "Chief Product Officer",
    years: "2022 to now",
    sides: "Lenders · Agents · Homebuyers · Internal teams",
    story:
      "A real estate platform that puts loan officers at the front of the homebuying process and hands off to agents, with the buyer in the middle of both. Every side's economics depend on a handoff it doesn't control: the lender wants the lead, the agent wants the client, the buyer wants a house and would rather not be a lead at all. The decision that shapes everything is where the handoff happens and who it's designed around. I run product, a small distributed team, and the platform that holds all four together.",
  },
  {
    id: "rigup",
    company: "RigUp",
    url: "https://www.rigup.com",
    roles: "Senior Product Manager, then Lead Product Manager",
    years: "2018 to 2022",
    sides: "Operators · Service companies · Independent contractors · Compliance",
    story:
      "A marketplace for oilfield labor: operators who need crews, the companies and independents who supply them, and the payments, insurance, and compliance layer that makes any of it legal. Operators want the crew tomorrow at the lowest rate. Contractors want steady work and fast pay. Compliance wants nobody on site without the right cert. It looks like a job board and is actually a trust and payments system with listings attached. Optimize one side and the other side's experience quietly degrades.",
  },
  {
    id: "bazaarvoice",
    company: "Bazaarvoice",
    url: "https://www.bazaarvoice.com",
    roles: "Implementation engineering, then product catalog and API services, then product",
    years: "2011 to 2018",
    sides: "Brands · Retailers · Shoppers",
    story:
      "Ratings and reviews between brands who want them, retailers who display them, and shoppers who write and read them. The brand wants every review syndicated and the bad ones buried. The retailer wants volume and authenticity, because a fake review costs them the shopper. The shopper wants to know if the thing is any good. Seven years, starting in implementation and ending in product, learning that the schema of a relationship matters more than the schema of the database.",
  },
];
