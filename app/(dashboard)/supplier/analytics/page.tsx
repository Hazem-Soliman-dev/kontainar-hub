"use client";

import { useMemo } from "react";
import { BarChart3, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

import { SalesChart } from "../../../../components/charts/sales-chart";
import { MobileDashboardNav } from "../../../../components/dashboard/mobile-dashboard-nav";
import { Breadcrumb } from "../../../../components/ui/breadcrumb";

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

  const metrics = [
    {
      id: "metric-revenue",
      label: "Total Revenue (6m)",
      value: formatCurrency(totals.totalRevenue),
      description: "Across all channels",
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "metric-orders",
      label: "Orders Processed",
      value: totals.totalOrders.toLocaleString(),
      description: "Confirmed and shipped",
      icon: ShoppingCart,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "metric-avg",
      label: "Average Order Value",
      value: formatCurrency(totals.avgOrderValue),
      description: "6-month moving average",
      icon: TrendingUp,
      color: "from-violet-500 to-violet-600",
    },
    {
      id: "metric-peak",
      label: "Peak Month",
      value: totals.bestMonth,
      description: "Highest blended revenue",
      icon: BarChart3,
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <MobileDashboardNav role="supplier" />
      
      <main className="flex min-h-screen flex-col gap-6 px-4 sm:px-6 lg:px-8 pt-20 lg:pt-8 pb-10">
        <header className="mx-auto w-full max-w-7xl">
          <Breadcrumb />
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-200">Analytics</h1>
            <p className="mt-1 text-neutral-900 dark:text-neutral-200">Detailed performance metrics and insights</p>
          </div>
        </header>

        <section className="mx-auto grid w-full max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <article
                key={metric.id}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-xl bg-gradient-to-br ${metric.color} p-3`}>
                    <Icon className="h-5 w-5 text-neutral-900 dark:text-neutral-200" />
                  </div>
                </div>
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-200">
                  {metric.label}
                </p>
                <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-200">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs text-neutral-900 dark:text-neutral-200">
                  {metric.description}
                </p>
              </article>
            );
          })}
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-2">
          <AnalyticsPanel
            title="Revenue vs Orders"
            subtitle="Track top-line revenue against shipment volume"
          >
            <div className="h-72 w-full">
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
            title="Top Product Contribution"
            subtitle="Blend of revenue across lead SKUs"
          >
            <div className="h-72 w-full">
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

        <section className="mx-auto w-full max-w-7xl rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
          <header className="mb-6">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">
              Revenue by Region
            </h2>
            <p className="text-sm text-neutral-900 dark:text-neutral-200 mt-1">
              Where demand is accelerating for your current catalogue
            </p>
          </header>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {REGION_REVENUE.map((region) => (
              <div
                key={region.region}
                className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-5"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-900 dark:text-neutral-200">
                  {region.region}
                </p>
                <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-200">
                  {formatCurrency(region.revenue)}
                </p>
                <p className="mt-1 text-xs text-neutral-900 dark:text-neutral-200">
                  View buyer activity →
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
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
    <article className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm">
      <header className="mb-6">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-200">{title}</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{subtitle}</p>
      </header>
      <div>{children}</div>
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
