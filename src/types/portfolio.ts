export interface Stock {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  exchange: 'NSE' | 'BSE';
  purchasePrice: number;
  quantity: number;
  currentPrice: number;
  peRatio: number;
  latestEarnings: number;
  lastUpdated: Date;
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}

export interface SectorSummary {
  sector: string;
  stocks: Stock[];
  totalInvestment: number;
  totalPresentValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
}