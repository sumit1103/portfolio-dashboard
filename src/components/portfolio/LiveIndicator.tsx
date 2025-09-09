import { useState, useEffect } from 'react';

export const LiveIndicator = () => {
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 mt-1 rounded-full transition-all duration-300 ${
        isLive ? 'bg-profit animate-pulse' : 'bg-profit/50'
      }`} />
      <span className="text-sm text-muted-foreground">Live</span>
    </div>
  );
};