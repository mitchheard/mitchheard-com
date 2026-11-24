/** Career entries for /career. Newest first. Keep each `story` to one paragraph:
 *  what the sides were, where the incentives conflicted, what had to be decided before code. */
export const careerIntro =
  "Every product I've worked on sits in the middle of a transaction between people who need each other and want different things. You can't pick a favorite. The work is finding the one thing every side needs to go right, and making that the product.";

export type CareerEntry = {
  id: string;
  company: string;
  url: string;
  roles: string;
  years: string;
  sides: string;
  story: string;
  /** Optional proof lines, shown under the story. Only add numbers you are allowed to share and can stand behind. */
  outcomes?: string[];
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
      "Newzip runs real estate programs for mortgage lenders, under their brand. We match buyers and sellers with the right agent and stay in the deal through closing. The lender wants to keep the borrower and finally see what happens after the referral. The agent wants clients worth their time. The buyer or seller wants to move and would rather not be a lead. What all three need to go right is the match: the right agent for this client. That's where Newzip started and it's still the core. We vet whether an agent is good, judge separately whether they're right for this client, and build everything else around that, across 40+ financial institutions and 15,000+ agents. I lead product, design, and engineering, a team across four countries, and build our internal tools myself.",
  },
  {
    id: "rigup",
    company: "RigUp",
    url: "https://www.rigup.com",
    roles: "Lead Product Manager",
    years: "2018 to 2022",
    sides: "Operators · Service companies · Independent contractors · Compliance",
    story:
      "A marketplace for oilfield labor: operators who need crews, the companies and independents who supply them, and the payments, insurance, and compliance layer that keeps everyone covered. Operators want the right crew on site tomorrow at the best rate. Contractors want steady work and fast pay. Compliance wants every person qualified and insured before the job starts. The one thing all of them need to go right is the job itself, a qualified crew that shows up, does the work, and gets paid. We digitized everything around that, finding work, finding workers, and all the HR in between, taking timesheets from spreadsheets to a mobile app in a worker's pocket. The company grew about eightfold while I was there. It's where I learned to make big bets, and to build for everyone from a crew lead in the field to an analyst in the office.",
  },
  {
    id: "bazaarvoice",
    company: "Bazaarvoice",
    url: "https://www.bazaarvoice.com",
    roles: "Senior Manager, Global Technical Services",
    years: "2011 to 2018",
    sides: "Brands · Retailers · Shoppers",
    story:
      "Ratings and reviews between brands, the retailers who sell their products, and the shoppers deciding what to buy. Brands want reviews on every product, because a product with none is a hard sell and the feedback, good and bad, is how the next version gets better. Retailers want reviews across their whole catalog, their own plus the ones syndicated from brands. Shoppers want to solve whatever sent them shopping. All three need the same thing: reviews people can trust. I spent seven years on the technical side of making that work for new partners. I came to it as an engineer, started in implementation, and ended in product. It's also where I learned to manage, with teams in Austin, London, Ukraine, and Costa Rica, and where I learned that the schema of a relationship matters more than the schema of the database.",
  },
];
