export interface User {
  id: string;
  name: string;
  email: string;
  salary: number;
  currency: string;
}

export interface Income {
  id: string;
  userId: string;
  amount: number;
  source: 'salary' | 'business' | 'freelance' | 'investment' | 'other';
  description: string;
  date: string;
  isRecurring: boolean;
  recurringPeriod?: 'weekly' | 'monthly' | 'yearly';
}

export interface Expense {
  id: string;
  userId: string;
  amount: number;
  category: 'food' | 'transport' | 'entertainment' | 'healthcare' | 'education' | 'utilities' | 'debt' | 'services' | 'other';
  subcategory?: string;
  description: string;
  date: string;
  paymentMethod: PaymentMethod;
  isFixed: boolean;
  isRecurring: boolean;
  recurringPeriod?: 'weekly' | 'monthly' | 'yearly';
}

export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  priority: 'high' | 'medium' | 'low';
  category: 'emergency' | 'vacation' | 'house' | 'car' | 'education' | 'investment' | 'other';
}

export interface PaymentMethod {
  type: 'cash' | 'card' | 'yape' | 'plin' | 'bank_transfer' | 'other';
  name: string;
  lastFourDigits?: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  balance: number;
  monthlyProjection: number;
}

export interface DebtPayment {
  id: string;
  userId: string;
  creditorName: string;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
  interestRate: number;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

export interface FinancialProfile {
  totalIncome: number;
  totalExpenses: number;
  fixedExpenses: number;
  variableExpenses: number;
  totalDebt: number;
  monthlyDebtPayments: number;
  currentSavings: number;
  availableAmount: number;
  debtToIncomeRatio: number;
  savingsRate: number;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  hasEmergencyFund: boolean;
  hasHighInterestDebt: boolean;
}

export interface AdvisorRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'savings' | 'debt' | 'investment' | 'emergency' | 'lifestyle' | 'optimization';
  priority: 'high' | 'medium' | 'low';
  suggestedAmount?: number;
  timeframe?: string;
  actionSteps?: string[];
}