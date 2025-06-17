import type { FinancialProfile, AdvisorRecommendation, Income, Expense, SavingsGoal, DebtPayment } from '../types/financial';

export function createFinancialProfile(
  incomes: Income[],
  expenses: Expense[],
  savingsGoals: SavingsGoal[],
  debts: DebtPayment[]
): FinancialProfile {
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const fixedExpenses = expenses.filter(expense => expense.isFixed).reduce((sum, expense) => sum + expense.amount, 0);
  const variableExpenses = totalExpenses - fixedExpenses;
  const totalDebt = debts.reduce((sum, debt) => sum + debt.remainingAmount, 0);
  const monthlyDebtPayments = debts.reduce((sum, debt) => sum + debt.monthlyPayment, 0);
  const currentSavings = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const availableAmount = totalIncome - totalExpenses;

  // Determinar perfil de riesgo basado en la situación financiera
  let riskProfile: 'conservative' | 'moderate' | 'aggressive' = 'moderate';
  
  const debtToIncomeRatio = (totalDebt / (totalIncome * 12)) * 100;
  const savingsRate = (currentSavings / (totalIncome * 12)) * 100;
  
  if (debtToIncomeRatio > 40 || savingsRate < 10) {
    riskProfile = 'conservative';
  } else if (debtToIncomeRatio < 20 && savingsRate > 20) {
    riskProfile = 'aggressive';
  }

  return {
    totalIncome,
    totalExpenses,
    fixedExpenses,
    variableExpenses,
    totalDebt,
    monthlyDebtPayments,
    currentSavings,
    availableAmount,
    debtToIncomeRatio,
    savingsRate,
    riskProfile,
    hasEmergencyFund: currentSavings >= (fixedExpenses * 3),
    hasHighInterestDebt: debts.some(debt => debt.interestRate > 15)
  };
}

export function generateRecommendations(profile: FinancialProfile): AdvisorRecommendation[] {
  const recommendations: AdvisorRecommendation[] = [];

  // Recomendación de Fondo de Emergencia
  if (!profile.hasEmergencyFund) {
    const emergencyFundTarget = profile.fixedExpenses * 6;
    const monthlyEmergencyContribution = Math.min(profile.availableAmount * 0.3, emergencyFundTarget / 12);
    
    recommendations.push({
      id: 'emergency-fund',
      title: 'Construir Fondo de Emergencia',
      description: `Tu fondo de emergencia debería cubrir 6 meses de gastos fijos (${profile.fixedExpenses.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })} × 6). Esto te protegerá ante imprevistos como pérdida de empleo o gastos médicos inesperados.`,
      category: 'emergency',
      priority: 'high',
      suggestedAmount: monthlyEmergencyContribution,
      timeframe: '6-12 meses',
      actionSteps: [
        'Abre una cuenta de ahorros separada solo para emergencias',
        `Transfiere automáticamente ${monthlyEmergencyContribution.toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })} cada mes`,
        'No toques este dinero a menos que sea una verdadera emergencia',
        'Una vez completo, considera invertir el exceso en instrumentos de mayor rendimiento'
      ]
    });
  }

  // Recomendación de Pago de Deudas de Alto Interés
  if (profile.hasHighInterestDebt) {
    const extraDebtPayment = Math.min(profile.availableAmount * 0.4, profile.monthlyDebtPayments * 0.5);
    
    recommendations.push({
      id: 'high-interest-debt',
      title: 'Acelerar Pago de Deudas de Alto Interés',
      description: 'Tienes deudas con intereses superiores al 15% anual. Pagar estas deudas rápidamente es equivalente a obtener una rentabilidad garantizada de ese porcentaje.',
      category: 'debt',
      priority: 'high',
      suggestedAmount: extraDebtPayment,
      timeframe: '12-24 meses',
      actionSteps: [
        'Identifica la deuda con mayor tasa de interés',
        'Paga el mínimo en todas las deudas, pero agrega el extra a la de mayor interés',
        'Una vez pagada, aplica todo ese dinero a la siguiente deuda más cara',
        'Considera consolidar deudas si puedes obtener una tasa menor'
      ]
    });
  }

  // Recomendación de Ahorro para Departamento
  const departmentSavings = profile.availableAmount * 0.25;
  recommendations.push({
    id: 'department-savings',
    title: 'Acelerar Ahorro para Departamento Propio',
    description: 'Estás pagando tanto alquiler como cuota de departamento. Acelerar el ahorro te permitirá mudarte pronto y eliminar el gasto de alquiler, liberando más dinero mensual.',
    category: 'savings',
    priority: 'medium',
    suggestedAmount: departmentSavings,
    timeframe: '18-36 meses',
    actionSteps: [
      'Calcula cuánto necesitas para mudarte (acabados, mudanza, etc.)',
      'Considera si puedes reducir gastos variables temporalmente',
      'Evalúa si puedes generar ingresos adicionales',
      'Una vez que te mudes, usa el dinero del alquiler para otros objetivos'
    ]
  });

  // Recomendación de Inversión
  if (profile.riskProfile !== 'conservative' && profile.hasEmergencyFund) {
    const investmentAmount = profile.availableAmount * 0.2;
    
    recommendations.push({
      id: 'investment',
      title: 'Comenzar a Invertir',
      description: 'Con tu fondo de emergencia establecido, es momento de hacer crecer tu dinero. En Perú tienes opciones como fondos mutuos, depósitos a plazo, o incluso el mercado de valores.',
      category: 'investment',
      priority: 'medium',
      suggestedAmount: investmentAmount,
      timeframe: 'Largo plazo (5+ años)',
      actionSteps: [
        'Edúcate sobre opciones de inversión en Perú',
        'Considera fondos mutuos como primera opción (diversificación automática)',
        'Evalúa tu tolerancia al riesgo',
        'Comienza con montos pequeños mientras aprendes'
      ]
    });
  }

  // Recomendación de Optimización de Gastos
  if (profile.variableExpenses > profile.fixedExpenses * 0.5) {
    recommendations.push({
      id: 'expense-optimization',
      title: 'Optimizar Gastos Variables',
      description: 'Tus gastos variables son altos comparados con tus gastos fijos. Hay oportunidad de optimizar y liberar más dinero para tus objetivos.',
      category: 'optimization',
      priority: 'low',
      suggestedAmount: profile.variableExpenses * 0.2,
      timeframe: '1-3 meses',
      actionSteps: [
        'Revisa tus gastos de los últimos 3 meses',
        'Identifica gastos innecesarios o que puedas reducir',
        'Considera alternativas más económicas (cocinar vs. delivery, transporte público vs. Uber)',
        'Establece un presupuesto mensual para gastos variables'
      ]
    });
  }

  // Recomendación de Gastos Personales
  const lifestyleAmount = Math.max(profile.availableAmount * 0.15, 200);
  recommendations.push({
    id: 'lifestyle',
    title: 'Mantener Calidad de Vida',
    description: 'Es importante mantener un equilibrio. Destina una parte de tu dinero disponible para gastos personales y entretenimiento sin culpa.',
    category: 'lifestyle',
    priority: 'low',
    suggestedAmount: lifestyleAmount,
    timeframe: 'Mensual',
    actionSteps: [
      'Define qué actividades te dan más satisfacción',
      'Establece un presupuesto mensual para entretenimiento',
      'Busca alternativas económicas para tus hobbies',
      'Recuerda que es un gasto planificado, no un impulso'
    ]
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

export function calculateOptimalDistribution(profile: FinancialProfile): Record<string, number> {
  const distribution: Record<string, number> = {};
  
  if (!profile.hasEmergencyFund) {
    distribution.emergency = profile.availableAmount * 0.4;
  } else {
    distribution.emergency = 0;
  }
  
  if (profile.hasHighInterestDebt) {
    distribution.debtPayment = profile.availableAmount * 0.3;
  } else {
    distribution.debtPayment = profile.availableAmount * 0.15;
  }
  
  distribution.savings = profile.availableAmount * 0.25;
  distribution.investment = profile.hasEmergencyFund ? profile.availableAmount * 0.2 : 0;
  distribution.lifestyle = profile.availableAmount * 0.15;
  
  // Ajustar para que sume 100%
  const total = Object.values(distribution).reduce((sum, amount) => sum + amount, 0);
  const remaining = profile.availableAmount - total;
  
  if (remaining > 0) {
    distribution.savings += remaining;
  }
  
  return distribution;
}