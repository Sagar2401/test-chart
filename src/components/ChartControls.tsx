import React from "react";
import { Maximize, BarChart2 } from "lucide-react";

interface ChartControlsProps {
  activeTimePeriod: string;
  onTimePeriodChange: (period: string) => void;
  onFullscreen: () => void;
  onCompare: () => void;
}

const ChartControls = ({
  activeTimePeriod,
  onTimePeriodChange,
  onFullscreen,
  onCompare,
}: ChartControlsProps) => {
  const timePeriods = ["1d", "3d", "1w", "1m", "6m", "1y", "max"];

  return (
    <div className="flex justify-between mb-6">
      <div className="flex space-x-4">
        <button
          className="flex items-center text-muted-foreground "
          onClick={onFullscreen}
        >
          <Maximize size={16} className="mr-2" />
          Fullscreen
        </button>
        <button
          className="flex items-center text-muted-foreground "
          onClick={onCompare}
        >
          <BarChart2 size={16} className="mr-2" />
          Compare
        </button>
      </div>
      <div className="flex space-x-1">
        {timePeriods.map((period) => (
          <button
            key={period}
            className={`time-period-button ${
              activeTimePeriod === period ? "active" : ""
            }`}
            onClick={() => onTimePeriodChange(period)}
          >
            {period}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartControls;
