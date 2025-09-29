import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const ChartComponent = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        backgroundColor: "#1e1e1e",
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { color: "#333" },
        horzLines: { color: "#333" },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: "#555",
      },
      timeScale: {
        borderColor: "#555",
      },
    });

    
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderVisible: false,
      wickUpColor: "#4bffb5",
      wickDownColor: "#ff4976",
    });

    
    candleSeries.setData([
      { time: "2025-09-01", open: 100, high: 110, low: 95, close: 105 },
      { time: "2025-09-02", open: 105, high: 115, low: 102, close: 110 },
      { time: "2025-09-03", open: 110, high: 120, low: 108, close: 115 },
    ]);

    
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <div ref={chartContainerRef} style={{ width: "100%", height: "400px" }} />;
};

export default ChartComponent;
