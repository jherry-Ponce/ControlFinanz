export function formatCurrency(amount: number, currency: string = 'PEN'): string {
  const formatter = new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  });
  
  return formatter.format(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}