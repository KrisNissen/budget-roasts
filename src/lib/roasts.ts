import { SnarkLevel } from "./snark-context";

export interface RoastCollection {
  low: string[];
  medium: string[];
  nuclear: string[];
}

// Daily judgement banner roasts
export const dailyRoasts: RoastCollection = {
  low: [
    "Your wallet could use a little TLC today.",
    "Maybe skip the coffee shop run just once?",
    "You're doing okay, but we can do better.",
    "Small wins today lead to big wins tomorrow!",
    "Remember: every dollar has a job to do.",
  ],
  medium: [
    "Your spending habits are... interesting.",
    "Ah yes, another day of financial gymnastics.",
    "Your bank account called. It's exhausted.",
    "Treating yourself again? Bold strategy.",
    "The audacity of your spending knows no bounds.",
  ],
  nuclear: [
    "Congratulations, you're a professional money burner.",
    "Your financial decisions would make a dumpster fire jealous.",
    "At this rate, retirement is a myth you tell your kids.",
    "Even your money is embarrassed to know you.",
    "I've seen better budgeting skills in a raccoon.",
  ],
};

// Category-specific budget roasts
export const budgetRoasts: Record<string, RoastCollection> = {
  groceries: {
    low: ["Groceries went a tiny bit over budget."],
    medium: ["Groceries? More like Gourmet Delusions."],
    nuclear: ["Whole Foods called. They want their stock options back."],
  },
  dining: {
    low: ["Eating out added up this month."],
    medium: ["Your DoorDash driver knows your name. Red flag."],
    nuclear: ["You've funded three restaurant owner's vacations this month."],
  },
  shopping: {
    low: ["Shopping was a bit indulgent."],
    medium: ["Amazon sends you a birthday card, doesn't it?"],
    nuclear: ["Jeff Bezos personally thanks you for his yacht fuel."],
  },
  entertainment: {
    low: ["Entertainment spending crept up."],
    medium: ["Netflix, Hulu, Disney+, HBO... Pick a personality."],
    nuclear: ["You're subscribed to apps you forgot existed. Literally burning money."],
  },
  transportation: {
    low: ["Transportation costs were higher than planned."],
    medium: ["Uber Eats counts as transportation to you, doesn't it?"],
    nuclear: ["Your Uber rating is higher than your credit score."],
  },
  utilities: {
    low: ["Utilities ran a bit high."],
    medium: ["Turn off a light. Any light. Please."],
    nuclear: ["The power company is considering naming a turbine after you."],
  },
  subscriptions: {
    low: ["Subscriptions added up quietly."],
    medium: ["You're subscribed to the 'I forgot to cancel' club."],
    nuclear: ["Your subscription list is longer than your therapy session."],
  },
  default: {
    low: ["Spending was slightly over in this category."],
    medium: ["This category is screaming for attention."],
    nuclear: ["This category alone could fund a small country."],
  },
};

// Hall of Shame purchase labels
export const shameLabels: RoastCollection = {
  low: [
    "Questionable Choice",
    "Hmm, Interesting",
    "Worth Discussing",
  ],
  medium: [
    "The Audacity Award",
    "Impulse Purchase of the Week",
    "The 'I Deserve This' Delusion",
    "Financial Red Flag",
  ],
  nuclear: [
    "Crimes Against Your Wallet",
    "Peak Financial Stupidity",
    "Hall of Shame Legend",
    "Your Accountant's Nightmare",
    "Generational Wealth Destroyer",
  ],
};

// Get a random roast from a collection
export function getRandomRoast(collection: RoastCollection, level: SnarkLevel): string {
  const roasts = collection[level];
  return roasts[Math.floor(Math.random() * roasts.length)];
}

// Get a budget roast for a specific category
export function getBudgetRoast(category: string, level: SnarkLevel): string {
  const normalizedCategory = category.toLowerCase();
  const roasts = budgetRoasts[normalizedCategory] || budgetRoasts.default;
  return roasts[level][Math.floor(Math.random() * roasts[level].length)];
}

// Get a shame label
export function getShameLabel(level: SnarkLevel): string {
  const labels = shameLabels[level];
  return labels[Math.floor(Math.random() * labels.length)];
}
