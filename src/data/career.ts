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
    sides: "Lenders · Agents · Buyers and sellers",
    story:
      "Newzip runs real estate programs for mortgage lenders, under their brand. We match buyers and sellers with the right agent and stay in the deal through closing. Every side wants something different. The lender wants to keep the borrower and finally see what happens after the referral. The agent wants clients worth their time. The buyer or seller wants to move and would rather not be a lead. Matching is where Newzip started, and it's still the core: we vet whether an agent is good, judge separately whether they're right for this client, and build everything else around that. Today that runs across 40+ financial institutions and 15,000+ agents. I lead product, design, and engineering, a team across four countries, and build our internal tools myself.",
  },
  {
    id: "rigup",
    company: "RigUp",
    url: "https://www.rigup.com",
    roles: "Lead Product Manager",
    years: "2018 to 2022",
    sides: "Operators · Service companies · Independent contractors · Compliance",
    story:
      "A marketplace for oilfield labor: operators who need crews, the companies and independents who supply them, and the payments, insurance, and compliance layer that keeps everyone covered. Operators want the right crew on site tomorrow at the best rate. Contractors want steady work and fast pay. Compliance wants every person on site qualified and insured before the job starts. We digitized the whole thing, finding work, finding workers, and all the HR in between, taking processes like timesheets from spreadsheets to a mobile app in a worker's pocket. The company grew about eightfold while I was there. It's where I learned to make big bets, and to build for everyone from a crew lead in the field to an analyst in the office.",
  },
  {
    id: "bazaarvoice",
    company: "Bazaarvoice",
    url: "https://www.bazaarvoice.com",
    roles: "Senior Manager, Global Technical Services",
    years: "2011 to 2018",
    sides: "Brands · Retailers · Shoppers",
    story:
      "Ratings and reviews between brands, the retailers who sell their products, and the shoppers deciding what to buy. Brands want reviews on every product, because a product with none is a hard sell and the feedback, good and bad, is how the next version gets better. Retailers want reviews across their whole catalog too: the ones they collect themselves plus the ones syndicated from brands. Shoppers want to trust that what they're reading is real, so they can solve whatever sent them shopping. I spent seven years on the technical side of making that work for new partners, starting in implementation and ending in product. It's also where I learned to manage, with teams in Austin, London, Ukraine, and Costa Rica, and where I learned that the schema of a relationship matters more than the schema of the database.",
  },
];
