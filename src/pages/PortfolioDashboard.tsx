import { usePortfolio } from '@/hooks/usePortfolio';
import { PortfolioHeader } from '@/components/portfolio/PortfolioHeader';
import { PortfolioTable } from '@/components/portfolio/PortfolioTable';
import { SectorSummary } from '@/components/portfolio/SectorSummary';

export const PortfolioDashboard = () => {
  const { stocks, lastUpdated, portfolioSummary, sectorSummaries } = usePortfolio();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Portfolio Header with Summary Cards */}
        <PortfolioHeader 
          summary={portfolioSummary} 
          lastUpdated={lastUpdated} 
        />

        {/* Sector Analysis */}
        <SectorSummary sectors={sectorSummaries} />

        {/* Portfolio Holdings Table */}
        <PortfolioTable stocks={stocks} />
      </div>
    </div>
  );
};