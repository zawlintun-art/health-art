import { cn } from "@/lib/utils";

type ChartPoint = {
  label: string;
  value: number;
};

type SimpleBarChartProps = {
  title: string;
  subtitle: string;
  data: ChartPoint[];
  tone?: "steps" | "water" | "neutral";
  maxValue?: number;
};

const toneClass = {
  steps: "bg-primary",
  water: "bg-accent",
  neutral: "bg-chart-3",
};

export function SimpleBarChart({
  title,
  subtitle,
  data,
  tone = "neutral",
  maxValue,
}: SimpleBarChartProps) {
  const highest = maxValue ?? Math.max(...data.map((item) => item.value), 1);

  const pillLabel =
    tone === "steps" ? "Heart Rate" : tone === "water" ? "Hydration" : "Weekly score";

  return (
    <div className="rounded-[2rem] border border-[#edf0df] bg-white/92 p-6 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="text-[1.75rem] font-semibold tracking-tight text-[#23342f]">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[#a9cd63] px-4 py-2 text-sm font-medium text-white">{pillLabel}</span>
          <span className="rounded-full border border-[#e7eadc] bg-white px-4 py-2 text-sm text-foreground/80">
            Month
          </span>
          <span className="rounded-full border border-[#e7eadc] bg-white px-4 py-2 text-sm text-foreground/80">
            Trend
          </span>
        </div>
      </div>
      <div className="flex h-64 items-end gap-3 overflow-x-auto pb-2">
        {data.length ? (
          data.map((item) => (
            <div key={`${item.label}-${item.value}`} className="flex min-w-10 flex-1 flex-col items-center gap-3">
              <div className="text-xs font-medium text-muted-foreground">{item.value}</div>
              <div className="flex h-44 w-full items-end rounded-full bg-[#f5f7ef] p-1">
                <div
                  className={cn(
                    "w-full rounded-full transition-all",
                    toneClass[tone],
                    tone === "steps" && "bg-[linear-gradient(180deg,#d9eda0_0%,#8ec54f_100%)]",
                    tone === "water" && "bg-[linear-gradient(180deg,#8ce1d3_0%,#2ab9a0_100%)]",
                    tone === "neutral" && "bg-[linear-gradient(180deg,#d8f0cb_0%,#79b273_100%)]"
                  )}
                  style={{ height: `${Math.max((item.value / highest) * 100, item.value > 0 ? 6 : 0)}%` }}
                />
              </div>
              <div className="text-center text-[11px] text-muted-foreground">{item.label}</div>
            </div>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            No data yet.
          </div>
        )}
      </div>
    </div>
  );
}
