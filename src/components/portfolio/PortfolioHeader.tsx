import { PortfolioSummary } from '@/types/portfolio';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';
import { LiveIndicator } from './LiveIndicator';
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface PortfolioHeaderProps {
  summary: PortfolioSummary;
  lastUpdated: Date;
}

export const PortfolioHeader = ({ summary, lastUpdated }: PortfolioHeaderProps) => {
  const isProfit = summary.totalGainLoss >= 0;
  const GainLossIcon = isProfit ? TrendingUp : TrendingDown;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time portfolio tracking and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <LiveIndicator />
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button onClick={() => window.location.reload()} variant="outline" className="flex items-center gap-2 hover:shadow-md active:scale-95 hover:bg-gray-100 transition duration-200">
            <RotateCcw size={18} />Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 border-card-border shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Investment</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{summary.totalInvestment.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-card-border shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Present Value</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{summary.totalPresentValue.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-zinc-700 flex items-center justify-center">
              <Activity className="w-6 h-6 text-neutral-foreground" />
            </div>
          </div>
        </Card>

        <Card className={`p-6 border-card-border shadow-card transition-all duration-300 ${
          isProfit ? 'bg-profit-light' : 'bg-loss-light'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Gain/Loss</p>
              <p className={`text-2xl font-bold ${
                isProfit ? 'text-profit' : 'text-loss'
              }`}>
                {isProfit ? '+' : ''}₹{summary.totalGainLoss.toLocaleString('en-IN')}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isProfit ? 'bg-gradient-profit' : 'bg-gradient-loss'
            }`}>
              <GainLossIcon className={`w-6 h-6 ${
                isProfit ? 'text-profit-foreground' : 'text-loss-foreground'
              }`} />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-card-border shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Return %</p>
              <p className={`text-2xl font-bold ${
                isProfit ? 'text-profit' : 'text-loss'
              }`}>
                {isProfit ? '+' : ''}{summary.totalGainLossPercent.toFixed(2)}%
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isProfit ? 'bg-gradient-profit' : 'bg-gradient-loss'
            }`}>
              <GainLossIcon className={`w-6 h-6 ${
                isProfit ? 'text-profit-foreground' : 'text-loss-foreground'
              }`} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};