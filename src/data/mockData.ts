import type { User, Income, Expense, SavingsGoal, PaymentMethod, DebtPayment } from '../types/financial';

export const mockUser: User = {
  id: '1',
  name: 'Ana García',
  email: 'ana.garcia@email.com',
  salary: 3500,
  currency: 'PEN'
};

export const mockPaymentMethods: PaymentMethod[] = [
  { type: 'cash', name: 'Efectivo' },
  { type: 'card', name: 'Tarjeta BCP', lastFourDigits: '1234' },
  { type: 'yape', name: 'Yape', lastFourDigits: '9876' },
  { type: 'plin', name: 'Plin', lastFourDigits: '5432' },
  { type: 'bank_transfer', name: 'Transferencia Bancaria BCP' },
  { type: 'card', name: 'Tarjeta Interbank', lastFourDigits: '7890' }
];

export const mockIncomes: Income[] = [
  {
    id: '1',
    userId: '1',
    amount: 3500,
    source: 'salary',
    description: 'Sueldo mensual - Empresa Tech Solutions',
    date: '2024-01-01',
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '2',
    userId: '1',
    amount: 850,
    source: 'business',
    description: 'Ventas de repostería artesanal',
    date: '2024-01-15',
    isRecurring: false
  },
  {
    id: '3',
    userId: '1',
    amount: 450,
    source: 'freelance',
    description: 'Diseño web para restaurante',
    date: '2024-01-10',
    isRecurring: false
  },
  {
    id: '4',
    userId: '1',
    amount: 120,
    source: 'investment',
    description: 'Dividendos de acciones',
    date: '2024-01-20',
    isRecurring: true,
    recurringPeriod: 'monthly'
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    userId: '1',
    amount: 900,
    category: 'utilities',
    subcategory: 'Alquiler',
    description: 'Alquiler departamento Miraflores',
    date: '2024-01-01',
    paymentMethod: mockPaymentMethods[4],
    isFixed: true,
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '2',
    userId: '1',
    amount: 180,
    category: 'utilities',
    subcategory: 'Electricidad',
    description: 'Recibo de luz - Luz del Sur',
    date: '2024-01-05',
    paymentMethod: mockPaymentMethods[2],
    isFixed: true,
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '3',
    userId: '1',
    amount: 85,
    category: 'utilities',
    subcategory: 'Agua',
    description: 'Recibo de agua - Sedapal',
    date: '2024-01-05',
    paymentMethod: mockPaymentMethods[3],
    isFixed: true,
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '4',
    userId: '1',
    amount: 120,
    category: 'utilities',
    subcategory: 'Internet',
    description: 'Internet Movistar Fibra',
    date: '2024-01-03',
    paymentMethod: mockPaymentMethods[1],
    isFixed: true,
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '5',
    userId: '1',
    amount: 65,
    category: 'utilities',
    subcategory: 'Celular',
    description: 'Plan Entel postpago',
    date: '2024-01-03',
    paymentMethod: mockPaymentMethods[1],
    isFixed: true,
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '6',
    userId: '1',
    amount: 45,
    category: 'transport',
    description: 'Pasajes de bus - Metropolitano',
    date: '2024-01-08',
    paymentMethod: mockPaymentMethods[0],
    isFixed: false,
    isRecurring: false
  },
  {
    id: '7',
    userId: '1',
    amount: 35,
    category: 'transport',
    description: 'Uber al trabajo',
    date: '2024-01-12',
    paymentMethod: mockPaymentMethods[2],
    isFixed: false,
    isRecurring: false
  },
  {
    id: '8',
    userId: '1',
    amount: 28,
    category: 'food',
    description: 'Almuerzo - Menú ejecutivo',
    date: '2024-01-08',
    paymentMethod: mockPaymentMethods[2],
    isFixed: false,
    isRecurring: false
  },
  {
    id: '9',
    userId: '1',
    amount: 450,
    category: 'food',
    description: 'Compras del mes - Supermercado',
    date: '2024-01-06',
    paymentMethod: mockPaymentMethods[1],
    isFixed: false,
    isRecurring: false
  },
  {
    id: '10',
    userId: '1',
    amount: 300,
    category: 'debt',
    description: 'Pago tarjeta de crédito BCP',
    date: '2024-01-15',
    paymentMethod: mockPaymentMethods[4],
    isFixed: true,
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '11',
    userId: '1',
    amount: 220,
    category: 'healthcare',
    description: 'Seguro de salud EPS',
    date: '2024-01-01',
    paymentMethod: mockPaymentMethods[4],
    isFixed: true,
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '12',
    userId: '1',
    amount: 85,
    category: 'entertainment',
    description: 'Netflix y Spotify',
    date: '2024-01-02',
    paymentMethod: mockPaymentMethods[1],
    isFixed: true,
    isRecurring: true,
    recurringPeriod: 'monthly'
  },
  {
    id: '13',
    userId: '1',
    amount: 150,
    category: 'entertainment',
    description: 'Cena en restaurante',
    date: '2024-01-14',
    paymentMethod: mockPaymentMethods[2],
    isFixed: false,
    isRecurring: false
  }
];

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    userId: '1',
    name: 'Fondo de Emergencia',
    targetAmount: 12000,
    currentAmount: 4200,
    targetDate: '2024-12-31',
    priority: 'high',
    category: 'emergency'
  },
  {
    id: '2',
    userId: '1',
    name: 'Vacaciones en Cusco',
    targetAmount: 3500,
    currentAmount: 950,
    targetDate: '2024-07-15',
    priority: 'medium',
    category: 'vacation'
  },
  {
    id: '3',
    userId: '1',
    name: 'Laptop Gaming Nueva',
    targetAmount: 5200,
    currentAmount: 1400,
    targetDate: '2024-06-01',
    priority: 'medium',
    category: 'other'
  },
  {
    id: '4',
    userId: '1',
    name: 'Inicial para Departamento',
    targetAmount: 35000,
    currentAmount: 8500,
    targetDate: '2025-12-31',
    priority: 'high',
    category: 'house'
  },
  {
    id: '5',
    userId: '1',
    name: 'Curso de Programación',
    targetAmount: 2200,
    currentAmount: 800,
    targetDate: '2024-04-30',
    priority: 'medium',
    category: 'education'
  }
];

export const mockDebts: DebtPayment[] = [
  {
    id: '1',
    userId: '1',
    creditorName: 'Tarjeta de Crédito BCP Visa',
    totalAmount: 6500,
    remainingAmount: 3800,
    monthlyPayment: 350,
    interestRate: 3.8,
    dueDate: '2025-03-15',
    priority: 'high'
  },
  {
    id: '2',
    userId: '1',
    creditorName: 'Préstamo Personal Interbank',
    totalAmount: 12000,
    remainingAmount: 7200,
    monthlyPayment: 520,
    interestRate: 2.5,
    dueDate: '2026-01-20',
    priority: 'medium'
  },
  {
    id: '3',
    userId: '1',
    creditorName: 'Cuotas Celular Entel',
    totalAmount: 1800,
    remainingAmount: 900,
    monthlyPayment: 180,
    interestRate: 1.8,
    dueDate: '2024-08-15',
    priority: 'low'
  },
  {
    id: '4',
    userId: '1',
    creditorName: 'Tarjeta Ripley',
    totalAmount: 2400,
    remainingAmount: 1600,
    monthlyPayment: 200,
    interestRate: 4.2,
    dueDate: '2024-10-30',
    priority: 'medium'
  }
];