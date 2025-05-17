import { AreaSeries, createChart, ColorType } from "lightweight-charts";
import { useEffect, useRef } from "react";
export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#4B40EE",
      textColor = "#4B40EE00",
      areaTopColor = "#E8E7FF",
      areaBottomColor = "#FFFFFF",
    } = {},
    isFullscreen,
    setprice,
  } = props;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
      },
      width: chartContainerRef.current.clientWidth,
      height: isFullscreen ? chartContainerRef.current.clientHeight : 450,
      timeScale: {
        timeVisible: false, // hides the labels
        ticksVisible: false, // hides the tick marks
        borderVisible: true, // ensures the bottom border is still shown
      },
    });

    chart.timeScale().fitContent();

    // Example of applying both properties in a single call
    chart.timeScale().applyOptions({
      timeVisible: false, // Hide labels
      borderVisible: true, // Show line
      borderColor: "#E6E8EB", // Match your existing color
      ticksVisible: false,
    });

    chart.applyOptions({
      rightPriceScale: {
        borderColor: "#E6E8EB",
        textColor: "#8957e500",
      },

      crosshair: {
        vertLine: {
          labelVisible: false,
          labelBackgroundColor: "#9B7DFF00",
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          labelBackgroundColor: "#1A243A",
        },
      },
      grid: {
        horzLines: { visible: false },
      },
    });

    const newSeries = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
    });
    newSeries.setData(data);
    chart.subscribeCrosshairMove((param) => {
      const hoverdata = param.seriesData.get(newSeries);
      if (hoverdata) {
        setprice(hoverdata);
      } else {
        setprice(
          data[data.length > 2 ? data.length - 2 : data.length - 1] || 0
        );
      }
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return <div ref={chartContainerRef} />;
};

export default function PriceChart(props) {
  return <ChartComponent {...props}></ChartComponent>;
}
