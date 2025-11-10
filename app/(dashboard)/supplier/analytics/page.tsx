"use client";

import { useMemo } from "react";

import { SalesChart } from "../../../../components/charts/sales-chart";

interface SalesDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

interface ProductPerformancePoint {
  month: string;
  arabica: number;
  sensors: number;
  packaging: number;
}

interface RegionRevenuePoint {
  region: string;
  revenue: number;
}

const SALES_TREND: SalesDataPoint[] = [
  { month: "Jun", revenue: 42000, orders: 68 },
  { month: "Jul", revenue: 47000, orders: 75 },
  { month: "Aug", revenue: 52000, orders: 79 },
  { month: "Sep", revenue: 61000, orders: 88 },
  { month: "Oct", revenue: 64000, orders: 92 },
  { month: "Nov", revenue: 58500, orders: 83 },
];

const PRODUCT_TRENDS: ProductPerformancePoint[] = [
  { month: "Jun", arabica: 12000, sensors: 9500, packaging: 6300 },
  { month: "Jul", arabica: 13800, sensors: 10900, packaging: 7200 },
  { month: "Aug", arabica: 15200, sensors: 11300, packaging: 7450 },
  { month: "Sep", arabica: 17800, sensors: 12800, packaging: 8100 },
  { month: "Oct", arabica: 18500, sensors: 13900, packaging: 9200 },
  { month: "Nov", arabica: 16400, sensors: 12500, packaging: 8700 },
];

const REGION_REVENUE: RegionRevenuePoint[] = [
  { region: "North America", revenue: 28600 },
  { region: "Europe", revenue: 21450 },
  { region: "MENA", revenue: 14800 },
  { region: "APAC", revenue: 13450 },
];

export default function SupplierAnalyticsPage() {
  const totals = useMemo(() => {
    const totalRevenue = SALES_TREND.reduce(
      (sum, point) => sum + point.revenue,
      0
    );
    const totalOrders = SALES_TREND.reduce(
      (sum, point) => sum + point.orders,
      0
    );
    const avgOrderValue = totalRevenue / totalOrders;

    const topProduct = PRODUCT_TRENDS.reduce(
      (acc, point) => {
        const monthTotal = point.arabica + point.sensors + point.packaging;
        if (monthTotal > acc.total) {
          return {
            total: monthTotal,
            month: point.month,
          };
        }
        return acc;
      },
      { total: 0, month: SALES_TREND[0]?.month ?? "Jun" }
    );

    return {
      totalRevenue,
      totalOrders,
      avgOrderValue,
      bestMonth: topProduct.month,
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-12 bg-slate-50 px-4 py-10">
      <header className="mx-auto flex w-full max-w-6xl flex-col gap-3 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
          Analytics Overview
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Sales performance & customer trends
        </h1>
        <p className="text-sm text-slate-600">
          High-level insight into sales velocity, best-performing products, and
          priority regions.
        </p>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-4 md:grid-cols-4">
        <MetricCard
          label="Total revenue (6m)"
          value={formatCurrency(totals.totalRevenue)}
          description="Across all channels"
        />
        <MetricCard
          label="Orders processed"
          value={totals.totalOrders.toLocaleString()}
          description="Confirmed and shipped"
        />
        <MetricCard
          label="Average order value"
          value={formatCurrency(totals.avgOrderValue)}
          description="6-month moving average"
        />
        <MetricCard
          label="Peak month"
          value={totals.bestMonth}
          description="Highest blended revenue"
        />
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-2">
        <AnalyticsPanel
          title="Revenue vs orders"
          subtitle="Track top-line revenue against shipment volume"
        >
          <div className="h-72">
            <SalesChart
              data={SALES_TREND.map((point) => ({
                month: point.month,
                revenue: point.revenue,
                orders: point.orders,
              }))}
              dataKey="revenue"
              xKey="month"
              series={[
                { name: "revenue", color: "#2563eb" },
                { name: "orders", color: "#38bdf8" },
              ]}
              currency
            />
          </div>
        </AnalyticsPanel>

        <AnalyticsPanel
          title="Top product contribution"
          subtitle="Blend of revenue across lead SKUs"
        >
          <div className="h-72">
            <SalesChart
              data={PRODUCT_TRENDS.map((point) => ({
                month: point.month,
                arabica: point.arabica,
                sensors: point.sensors,
                packaging: point.packaging,
              }))}
              dataKey="arabica"
              xKey="month"
              series={[
                { name: "arabica", color: "#22c55e" },
                { name: "sensors", color: "#f97316" },
                { name: "packaging", color: "#6366f1" },
              ]}
              currency
            />
          </div>
        </AnalyticsPanel>
      </section>

      <section className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Revenue by region
            </h2>
            <p className="text-sm text-slate-500">
              Where demand is accelerating for your current catalogue.
            </p>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {REGION_REVENUE.map((region) => (
            <div
              key={region.region}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-5"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {region.region}
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {formatCurrency(region.revenue)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Login to drill into buyer activity →
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{description}</p>
    </article>
  );
}

function AnalyticsPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <header>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </header>
      <div className="mt-6">{children}</div>
    </article>
  );
}

function formatCurrency(value: number) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
