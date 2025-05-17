import React from "react";
import { ArrowUp } from "lucide-react";

interface CryptoPriceHeaderProps {
  price: number;
  currency: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

const CryptoPriceHeader = ({
  price,
  currency,
  change,
  changePercent,
  isPositive,
}: CryptoPriceHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-start">
        <h1 className="text-5xl font-semibold text-slate-700">
          {price.toFixed(3)}
        </h1>
        <span className="ml-2 text-lg text-gray-400">{currency}</span>
      </div>
      <div
        className={`flex items-center mt-1 ${
          isPositive ? "text-positive" : "text-negative"
        }`}
      >
        <span>
          {isPositive ? "+ " : " "}
          {change} ({changePercent}%)
        </span>
      </div>
    </div>
  );
};

export default CryptoPriceHeader;
