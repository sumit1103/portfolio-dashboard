import { SectorSummary as SectorSummaryType } from '@/types/portfolio';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, PieChart } from 'lucide-react';

interface SectorSummaryProps {
  sectors: SectorSummaryType[];
}

export const SectorSummary = ({ sectors }: SectorSummaryProps) => {
  const totalPortfolioValue = sectors.reduce((sum, sector) => sum + sector.totalPresentValue, 0);

  const SectorCard = ({ sector }: { sector: SectorSummaryType }) => {
    const isProfit = sector.totalGainLoss >= 0;
    const Icon = isProfit ? TrendingUp : TrendingDown;
    const weightPercentage = ((sector.totalPresentValue / totalPortfolioValue) * 100).toFixed(1);

    return (
      <Card className={`p-4 border-card-border shadow-card transition-all duration-300 hover:shadow-elevated ${
        isProfit ? 'hover:bg-profit-light/30' : 'hover:bg-loss-light/30'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <PieChart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">{sector.sector}</h3>
          </div>
          <Badge variant="outline" className="text-xs">
            {weightPercentage}% of portfolio
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Stocks:</span>
            <span className="text-foreground font-medium">{sector.stocks.length}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Investment:</span>
            <span className="text-foreground font-medium">
              ₹{sector.totalInvestment.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Present Value:</span>
            <span className="text-foreground font-medium">
              ₹{sector.totalPresentValue.toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-card-border">
            <span className="text-sm text-muted-foreground">Gain/Loss:</span>
            <div className={`flex items-center space-x-1 ${
              isProfit ? 'text-profit' : 'text-loss'
            }`}>
              <Icon className="w-4 h-4" />
              <span className="font-semibold text-sm">
                {isProfit ? '+' : ''}₹{sector.totalGainLoss.toLocaleString('en-IN')}
              </span>
              <span className="text-xs">
                ({isProfit ? '+' : ''}{sector.totalGainLossPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-card-border">
          <div className="text-xs text-muted-foreground mb-1">Holdings:</div>
          <div className="flex flex-wrap gap-1">
            {sector.stocks.map((stock) => (
              <Badge 
                key={stock.id} 
                variant="secondary" 
                className="text-xs py-0 px-2"
              >
                {stock.symbol}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Sector Analysis</h2>
        <Badge variant="outline" className="text-sm">
          {sectors.length} sectors
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectors.map((sector) => (
          <SectorCard key={sector.sector} sector={sector} />
        ))}
      </div>
    </div>
  );
};