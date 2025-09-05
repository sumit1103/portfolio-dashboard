import { Stock } from '@/types/portfolio';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PortfolioTableProps {
  stocks: Stock[];
}

export const PortfolioTable = ({ stocks }: PortfolioTableProps) => {
  const totalInvestment = stocks.reduce((sum, stock) => sum + (stock.purchasePrice * stock.quantity), 0);

  const calculatePortfolioWeight = (stock: Stock) => {
    const investment = stock.purchasePrice * stock.quantity;
    return ((investment / totalInvestment) * 100).toFixed(2);
  };

  const calculateGainLoss = (stock: Stock) => {
    const investment = stock.purchasePrice * stock.quantity;
    const presentValue = stock.currentPrice * stock.quantity;
    return presentValue - investment;
  };

  const GainLossCell = ({ stock }: { stock: Stock }) => {
    const gainLoss = calculateGainLoss(stock);
    const isProfit = gainLoss >= 0;
    const Icon = isProfit ? TrendingUp : TrendingDown;
    
    return (
      <div className={`flex items-center space-x-2 ${
        isProfit ? 'text-profit' : 'text-loss'
      }`}>
        <Icon className="w-4 h-4" />
        <span className="font-semibold">
          {isProfit ? '+' : ''}₹{gainLoss.toLocaleString('en-IN')}
        </span>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden border-card-border shadow-card">
      <div className="p-6 border-b border-card-border">
        <h2 className="text-xl font-bold text-foreground">Portfolio Holdings</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed view of all your stock positions
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold text-foreground">Particulars</th>
              <th className="text-right p-4 font-semibold text-foreground">Purchase Price</th>
              <th className="text-right p-4 font-semibold text-foreground">Qty</th>
              <th className="text-right p-4 font-semibold text-foreground">Investment</th>
              <th className="text-right p-4 font-semibold text-foreground">Portfolio %</th>
              <th className="text-center p-4 font-semibold text-foreground">Exchange</th>
              <th className="text-right p-4 font-semibold text-foreground">CMP</th>
              <th className="text-right p-4 font-semibold text-foreground">Present Value</th>
              <th className="text-right p-4 font-semibold text-foreground">Gain/Loss</th>
              <th className="text-right p-4 font-semibold text-foreground">P/E Ratio</th>
              <th className="text-right p-4 font-semibold text-foreground">Latest Earnings</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, index) => (
              <tr 
                key={stock.id}
                className={`border-b border-card-border hover:bg-muted/30 transition-colors ${
                  index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
                }`}
              >
                <td className="p-4">
                  <div>
                    <div className="font-semibold text-foreground">{stock.name}</div>
                    <div className="text-sm text-muted-foreground">{stock.symbol}</div>
                  </div>
                </td>
                <td className="p-4 text-right text-foreground">
                  ₹{stock.purchasePrice.toLocaleString('en-IN')}
                </td>
                <td className="p-4 text-right text-foreground">
                  {stock.quantity}
                </td>
                <td className="p-4 text-right text-foreground font-semibold">
                  ₹{(stock.purchasePrice * stock.quantity).toLocaleString('en-IN')}
                </td>
                <td className="p-4 text-right">
                  <Badge variant="secondary" className="text-xs">
                    {calculatePortfolioWeight(stock)}%
                  </Badge>
                </td>
                <td className="p-4 text-center">
                  <Badge 
                    variant={stock.exchange === 'NSE' ? 'default' : 'outline'}
                    className="text-xs"
                  >
                    {stock.exchange}
                  </Badge>
                </td>
                <td className="p-4 text-right font-semibold text-primary">
                  ₹{stock.currentPrice.toLocaleString('en-IN')}
                </td>
                <td className="p-4 text-right text-foreground font-semibold">
                  ₹{(stock.currentPrice * stock.quantity).toLocaleString('en-IN')}
                </td>
                <td className="p-4 text-right">
                  <GainLossCell stock={stock} />
                </td>
                <td className="p-4 text-right text-foreground">
                  {stock.peRatio.toFixed(1)}
                </td>
                <td className="p-4 text-right text-foreground">
                  ₹{stock.latestEarnings.toLocaleString('en-IN')}Cr
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};