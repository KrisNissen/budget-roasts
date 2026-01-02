// Mock transaction data for development
export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  category: string;
  date: string;
  isShameworthy?: boolean;
  audacityScore?: number;
}

export interface Budget {
  category: string;
  allocated: number;
  spent: number;
  icon: string;
}

export interface NetWorthDataPoint {
  month: string;
  netWorth: number;
}

export interface BurnRateDataPoint {
  month: string;
  income: number;
  expenses: number;
}

// Recent transactions
export const mockTransactions: Transaction[] = [
  { id: "1", merchant: "Whole Foods Market", amount: 287.43, category: "Groceries", date: "2026-01-02", isShameworthy: true, audacityScore: 72 },
  { id: "2", merchant: "DoorDash - Fancy Sushi", amount: 89.99, category: "Dining", date: "2026-01-01", isShameworthy: true, audacityScore: 85 },
  { id: "3", merchant: "Amazon Prime", amount: 14.99, category: "Subscriptions", date: "2026-01-01" },
  { id: "4", merchant: "Spotify Premium", amount: 10.99, category: "Subscriptions", date: "2026-01-01" },
  { id: "5", merchant: "Uber Eats", amount: 45.67, category: "Dining", date: "2025-12-31" },
  { id: "6", merchant: "Target", amount: 156.23, category: "Shopping", date: "2025-12-30", isShameworthy: true, audacityScore: 68 },
  { id: "7", merchant: "Netflix", amount: 15.99, category: "Subscriptions", date: "2025-12-30" },
  { id: "8", merchant: "Starbucks", amount: 8.75, category: "Dining", date: "2025-12-29" },
  { id: "9", merchant: "Gas Station", amount: 52.00, category: "Transportation", date: "2025-12-28" },
  { id: "10", merchant: "Electric Company", amount: 145.00, category: "Utilities", date: "2025-12-27" },
  { id: "11", merchant: "Designer Store - 'Investment Piece'", amount: 450.00, category: "Shopping", date: "2025-12-26", isShameworthy: true, audacityScore: 95 },
  { id: "12", merchant: "2AM Amazon Impulse Buy", amount: 67.99, category: "Shopping", date: "2025-12-25", isShameworthy: true, audacityScore: 88 },
];

// Budget data
export const mockBudgets: Budget[] = [
  { category: "Groceries", allocated: 400, spent: 287, icon: "🛒" },
  { category: "Dining", allocated: 200, spent: 312, icon: "🍔" },
  { category: "Shopping", allocated: 150, spent: 674, icon: "🛍️" },
  { category: "Subscriptions", allocated: 50, spent: 42, icon: "📺" },
  { category: "Transportation", allocated: 200, spent: 52, icon: "🚗" },
  { category: "Utilities", allocated: 150, spent: 145, icon: "💡" },
  { category: "Entertainment", allocated: 100, spent: 89, icon: "🎮" },
];

// Net worth over time
export const mockNetWorthData: NetWorthDataPoint[] = [
  { month: "Jul", netWorth: 12500 },
  { month: "Aug", netWorth: 13200 },
  { month: "Sep", netWorth: 12800 },
  { month: "Oct", netWorth: 14100 },
  { month: "Nov", netWorth: 13500 },
  { month: "Dec", netWorth: 15200 },
  { month: "Jan", netWorth: 14800 },
];

// Income vs Expenses (burn rate)
export const mockBurnRateData: BurnRateDataPoint[] = [
  { month: "Jul", income: 5200, expenses: 4100 },
  { month: "Aug", income: 5200, expenses: 4500 },
  { month: "Sep", income: 5400, expenses: 5100 },
  { month: "Oct", income: 5200, expenses: 3900 },
  { month: "Nov", income: 5600, expenses: 4800 },
  { month: "Dec", income: 5200, expenses: 5500 },
  { month: "Jan", income: 5200, expenses: 4200 },
];

// Calculate totals
export function getTotalSpent(): number {
  return mockBudgets.reduce((sum, b) => sum + b.spent, 0);
}

export function getTotalBudget(): number {
  return mockBudgets.reduce((sum, b) => sum + b.allocated, 0);
}

export function getShameTransactions(): Transaction[] {
  return mockTransactions
    .filter(t => t.isShameworthy)
    .sort((a, b) => (b.audacityScore || 0) - (a.audacityScore || 0))
    .slice(0, 3);
}
