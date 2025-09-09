import { Stock } from '@/types/portfolio';

export const mockStocks: Stock[] = [
  {
    id: '1',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    sector: 'Energy',
    exchange: 'NSE',
    purchasePrice: 2350,
    quantity: 50,
    currentPrice: 2485.60,
    peRatio: 14.2,
    latestEarnings: 15678,
    lastUpdated: new Date()
  },
  {
    id: '2',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Technology',
    exchange: 'NSE',
    purchasePrice: 3250,
    quantity: 30,
    currentPrice: 3421.85,
    peRatio: 26.8,
    latestEarnings: 42890,
    lastUpdated: new Date()
  },
  {
    id: '3',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd',
    sector: 'Financials',
    exchange: 'NSE',
    purchasePrice: 1580,
    quantity: 75,
    currentPrice: 1622.40,
    peRatio: 18.5,
    latestEarnings: 58420,
    lastUpdated: new Date()
  },
  {
    id: '4',
    symbol: 'INFY',
    name: 'Infosys Ltd',
    sector: 'Technology',
    exchange: 'NSE',
    purchasePrice: 1450,
    quantity: 40,
    currentPrice: 1398.25,
    peRatio: 24.1,
    latestEarnings: 28560,
    lastUpdated: new Date()
  },
  {
    id: '5',
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd',
    sector: 'Financials',
    exchange: 'NSE',
    purchasePrice: 920,
    quantity: 100,
    currentPrice: 956.30,
    peRatio: 15.7,
    latestEarnings: 33250,
    lastUpdated: new Date()
  },
  {
    id: '6',
    symbol: 'ITC',
    name: 'ITC Ltd',
    sector: 'Consumer Goods',
    exchange: 'NSE',
    purchasePrice: 420,
    quantity: 200,
    currentPrice: 448.60,
    peRatio: 28.9,
    latestEarnings: 16890,
    lastUpdated: new Date()
  },
  {
    id: '7',
    symbol: 'HINDUNILVR',
    name: 'Hindustan Unilever Ltd',
    sector: 'Consumer Goods',
    exchange: 'NSE',
    purchasePrice: 2680,
    quantity: 25,
    currentPrice: 2634.75,
    peRatio: 52.3,
    latestEarnings: 9870,
    lastUpdated: new Date()
  },
  {
    id: '8',
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd',
    sector: 'Telecommunications',
    exchange: 'NSE',
    purchasePrice: 810,
    quantity: 80,
    currentPrice: 847.90,
    peRatio: 19.4,
    latestEarnings: 12450,
    lastUpdated: new Date()
  }
];

// Function to simulate real-time price updates
export const getUpdatedPrice = (currentPrice: number): number => {
  const change = (Math.random() - 0.5) * 0.05; // ±2.5% random change
  return Number((currentPrice * (1 + change)).toFixed(2));
};