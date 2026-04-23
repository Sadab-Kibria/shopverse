"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "url(#inStockGradient)",
  "url(#outStockGradient)"
];

export default function StockPieChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const renderLabel = (entry: any) =>
    `${entry.name}: ${((entry.percent || 0) * 100).toFixed(0)}%`;

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <PieChart>
          {/* Gradients */}
          <defs>
            <linearGradient id="inStockGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="5%" stopColor="#34d399" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.9} />
            </linearGradient>
            <linearGradient id="outStockGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="5%" stopColor="#f87171" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.9} />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label={renderLabel}
            labelLine={false}
            stroke="white"
            strokeWidth={2}
            cornerRadius={8}
          >
            {data.map((_, i) => (
              <Cell
                key={`cell-${i}`}
                fill={COLORS[i % COLORS.length]}
                style={{ filter: "drop-shadow(0px 2px 6px rgba(0,0,0,0.2))" }}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
