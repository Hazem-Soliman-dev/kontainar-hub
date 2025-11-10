'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type SalesChartSeries = {
  name: string;
  color: string;
};

export interface SalesChartProps<T extends Record<string, unknown>> {
  data: T[];
  dataKey: keyof T;
  series?: SalesChartSeries[];
  xKey?: keyof T;
  height?: number;
  currency?: boolean;
}

export function SalesChart<T extends Record<string, unknown>>({
  data,
  dataKey,
  series = [],
  xKey = 'name',
  height = 320,
  currency = false,
}: SalesChartProps<T>) {
  const formatValue = (value: number) => {
    if (currency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value);
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }

    return value.toString();
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey={xKey as string}
          stroke="#94a3b8"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#94a3b8"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatValue(Number(value))}
        />
        <Tooltip
          formatter={(value) =>
            currency
              ? formatValue(Number(value))
              : Number(value).toLocaleString()
          }
          labelClassName="text-sm font-semibold text-slate-900"
        />
        {series.length > 0 ? (
          series.map((serie) => (
            <Area
              key={serie.name}
              type="monotone"
              dataKey={serie.name}
              stroke={serie.color}
              strokeWidth={2}
              fillOpacity={0.2}
              fill={serie.color}
              activeDot={{ r: 6 }}
            />
          ))
        ) : (
          <Area
            type="monotone"
            dataKey={dataKey as string}
            stroke="#2563eb"
            strokeWidth={2}
            fillOpacity={0.2}
            fill="#2563eb"
            activeDot={{ r: 6 }}
          />
        )}
        {series.length > 0 && (
          <Legend
            verticalAlign="top"
            height={32}
            iconType="circle"
            wrapperStyle={{ paddingBottom: '0.5rem' }}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  );
}

