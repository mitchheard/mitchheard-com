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
      "A marketplace for oilfield labor: operators who need crews, the companies and independents who supply them, and the payments, insurance, and compliance layer that keeps everyone covered. Operators want the right crew on site tomorrow at the best rate. Contractors want steady work and fast pay. Compliance wants every person on site qualified and insured before the job starts. It looks like a job board and is actually a trust and payments system with listings attached. Improve one side and you have to check what it did to the other two.",
  },
  {
    id: "bazaarvoice",
    company: "Bazaarvoice",
    url: "https://www.bazaarvoice.com",
    roles: "Implementation engineering, then product catalog and API services, then product",
    years: "2011 to 2018",
    sides: "Brands · Retailers · Shoppers",
    story:
      "Ratings and reviews between brands, the retailers who sell their products, and the shoppers deciding what to buy. Brands want reviews on every product, because a product with none is a hard sell and the feedback, good and bad, is how the next version gets better. Retailers want reviews across their whole catalog too: the ones they collect themselves plus the ones syndicated from brands. Shoppers want to trust that what they're reading is real, so they can solve whatever sent them shopping. I spent seven years on the technical side of making that work for new partners, starting in implementation and ending in product. It's also where I learned to manage, with teams in Austin, London, Ukraine, and Costa Rica, and where I learned that the schema of a relationship matters more than the schema of the database.",
  },
];
