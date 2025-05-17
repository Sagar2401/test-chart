import React, { useState, useCallback, useMemo } from "react";
import CryptoPriceHeader from "./CryptoPriceHeader";
import NavigationTabs from "./NavigationTabs";
import ChartControls from "./ChartControls";
import PriceChart from "./PriceChart";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

const generateMockData = (activePeriod) => {
  const data = [];
  const startPrice = 60000;
  const points =
    activePeriod === "max"
      ? 100
      : activePeriod === "1y"
      ? 52
      : activePeriod === "6m"
      ? 26
      : activePeriod === "1m"
      ? 30
      : activePeriod === "1w"
      ? 7
      : activePeriod === "3d"
      ? 3
      : 24;

  let prevPrice = startPrice;

  for (let i = 0; i < points; i++) {
    var date = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
    if (activePeriod === "1d" || activePeriod === "3d") {
      // For 1d and 3d, use hours
      date.setHours(date.getHours() - (points - i));

      // Use the correct time format for lightweight-charts
      const timeStr = date.getTime() / 1000;

      // Generate realistic price fluctuations
      const change = Math.random() * 1000 - 400; // Random price change
      const price = Math.max(prevPrice + change, 45000); // Ensure price doesn't go below 45000
      prevPrice = price;

      data.push({
        time: timeStr,
        value: price,
      });
    } else {
      // For other periods, use days
      date.setDate(date.getDate() - (points - i));
      // Use the correct date format for lightweight-charts
      const timeStr = date.getTime() / 1000;

      // Generate realistic price fluctuations
      const change = Math.random() * 1000 - 400; // Random price change
      const price = Math.max(prevPrice + change, 45000); // Ensure price doesn't go below 45000
      prevPrice = price;

      data.push({
        time: timeStr,
        value: price,
      });
    }
  }

  // Ensure last data point is close to 63,179.71
  const lastItem = data[data.length - 1];
  lastItem.price = 63179.71;

  return data;
};

const CryptoChart = () => {
  const [activeTab, setActiveTab] = useState("Chart");
  const [activeTimePeriod, setActiveTimePeriod] = useState("1w");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [price, setPrice] = useState(null);
  const chartData = useMemo(() => {
    return generateMockData(activeTimePeriod);
  }, [activeTimePeriod]);
  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // In a real implementation, you would toggle fullscreen mode
  };

  const handlePriceChange = () => {
    const valueChange =
      Number(price?.value) - Number(chartData[chartData.length - 1].value);
    const percentChange = Number((valueChange / price?.value) * 100).toFixed(2);
    const isPositive = Number(percentChange) >= 0;

    return {
      changePercent: percentChange || 0,
      isPositive,
      change: valueChange || 0,
    };
  };

  const renderTabs = () => {
    switch (activeTab) {
      case "Chart":
        return (
          <div>
            <ChartControls
              activeTimePeriod={activeTimePeriod}
              onTimePeriodChange={setActiveTimePeriod}
              onFullscreen={handleFullscreen}
              onCompare={() => {}}
            />

            <PriceChart
              setprice={setPrice}
              data={chartData}
              activeTimePeriod={activeTimePeriod}
            />
          </div>
        );

      case "Summary":
        return <div className="text-black">{activeTab}</div>;

      case "Statistics":
        return <div className="text-black">{activeTab}</div>;

      default:
        return <div className="text-black">{activeTab}</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CryptoPriceHeader
        price={chartData[chartData.length - 1].value || 0}
        currency="USD"
        {...handlePriceChange()}
      />

      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {renderTabs()}

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl w-[95vw] h-[90vh] pt-10 bg-white">
          <PriceChart
            data={chartData}
            setprice={setPrice}
            activeTimePeriod={activeTimePeriod}
            isFullscreen={isFullscreen}
          />{" "}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CryptoChart;
