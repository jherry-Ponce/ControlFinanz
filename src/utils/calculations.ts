import type { Income, Expense, SavingsGoal, DebtPayment } from '../types/financial';

export function calculateTotalIncome(incomes: Income[]): number {
  return incomes.reduce((total, income) => total + income.amount, 0);
}

export function calculateTotalExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function calculateTotalSavings(savingsGoals: SavingsGoal[]): number {
  return savingsGoals.reduce((total, goal) => total + goal.currentAmount, 0);
}

export function calculateBalance(income: number, expenses: number): number {
  return income - expenses;
}

export function calculateSavingsProgress(goal: SavingsGoal): number {
  return (goal.currentAmount / goal.targetAmount) * 100;
}

export function calculateMonthsToGoal(goal: SavingsGoal, monthlyContribution: number): number {
  const remaining = goal.targetAmount - goal.currentAmount;
  return Math.ceil(remaining / monthlyContribution);
}

export function calculateDebtPayoffMonths(debt: DebtPayment): number {
  if (debt.monthlyPayment <= 0) return 0;
  
  const monthlyRate = debt.interestRate / 100 / 12;
  const remaining = debt.remainingAmount;
  const payment = debt.monthlyPayment;
  
  if (monthlyRate === 0) {
    return Math.ceil(remaining / payment);
  }
  
  return Math.ceil(Math.log(1 + (remaining * monthlyRate) / payment) / Math.log(1 + monthlyRate));
}

export function getExpensesByCategory(expenses: Expense[]): Record<string, number> {
  return expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);
}

export function getIncomesBySource(incomes: Income[]): Record<string, number> {
  return incomes.reduce((acc, income) => {
    acc[income.source] = (acc[income.source] || 0) + income.amount;
    return acc;
  }, {} as Record<string, number>);
}