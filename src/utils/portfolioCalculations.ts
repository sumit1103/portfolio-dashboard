import { Stock } from '@/types/portfolio';

export const calculateInvestment = (stock: Stock): number => {
  return stock.purchasePrice * stock.quantity;
};

export const calculatePresentValue = (stock: Stock): number => {
  return stock.currentPrice * stock.quantity;
};

export const calculateGainLoss = (stock: Stock): number => {
  return calculatePresentValue(stock) - calculateInvestment(stock);
};

export const calculateGainLossPercentage = (stock: Stock): number => {
  const investment = calculateInvestment(stock);
  const gainLoss = calculateGainLoss(stock);
  return (gainLoss / investment) * 100;
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatPercentage = (percentage: number, showSign: boolean = true): string => {
  const sign = showSign && percentage >= 0 ? '+' : '';
  return `${sign}${percentage.toFixed(2)}%`;
};