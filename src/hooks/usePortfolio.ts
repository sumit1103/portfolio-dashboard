import { useState, useEffect, useCallback } from 'react';
import { Stock, PortfolioSummary, SectorSummary } from '@/types/portfolio';
import { mockStocks, getUpdatedPrice } from '@/data/mockPortfolio';

export const usePortfolio = () => {
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Update prices every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          currentPrice: getUpdatedPrice(stock.currentPrice),
          lastUpdated: new Date()
        }))
      );
      setLastUpdated(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const calculatePortfolioSummary = useCallback((): PortfolioSummary => {
    const totalInvestment = stocks.reduce((sum, stock) => 
      sum + (stock.purchasePrice * stock.quantity), 0
    );
    
    const totalPresentValue = stocks.reduce((sum, stock) => 
      sum + (stock.currentPrice * stock.quantity), 0
    );
    
    const totalGainLoss = totalPresentValue - totalInvestment;
    const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;

    return {
      totalInvestment,
      totalPresentValue,
      totalGainLoss,
      totalGainLossPercent
    };
  }, [stocks]);

  const calculateSectorSummaries = useCallback((): SectorSummary[] => {
    const sectorMap = new Map<string, Stock[]>();
    
    stocks.forEach(stock => {
      if (!sectorMap.has(stock.sector)) {
        sectorMap.set(stock.sector, []);
      }
      sectorMap.get(stock.sector)!.push(stock);
    });

    return Array.from(sectorMap.entries()).map(([sector, sectorStocks]) => {
      const totalInvestment = sectorStocks.reduce((sum, stock) => 
        sum + (stock.purchasePrice * stock.quantity), 0
      );
      
      const totalPresentValue = sectorStocks.reduce((sum, stock) => 
        sum + (stock.currentPrice * stock.quantity), 0
      );
      
      const totalGainLoss = totalPresentValue - totalInvestment;
      const totalGainLossPercent = (totalGainLoss / totalInvestment) * 100;

      return {
        sector,
        stocks: sectorStocks,
        totalInvestment,
        totalPresentValue,
        totalGainLoss,
        totalGainLossPercent
      };
    }).sort((a, b) => b.totalPresentValue - a.totalPresentValue);
  }, [stocks]);

  return {
    stocks,
    lastUpdated,
    portfolioSummary: calculatePortfolioSummary(),
    sectorSummaries: calculateSectorSummaries()
  };
};