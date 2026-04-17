import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: string;
  hint: string;
  icon?: LucideIcon;
  tone?: "mint" | "coral" | "sky" | "gold";
};

const toneStyles = {
  mint: "bg-[#eef7df] text-[#6e9f35]",
  coral: "bg-[#fff1ea] text-[#f18967]",
  sky: "bg-[#edf8fb] text-[#62bfd5]",
  gold: "bg-[#fff7e8] text-[#ecb453]",
};

export function MetricCard({ title, value, hint, icon: Icon, tone = "mint" }: MetricCardProps) {
  return (
    <Card className="rounded-[1.75rem] border-[#edf0df] bg-white/92 shadow-[0_16px_36px_-30px_rgba(108,136,92,0.4)]">
      <CardHeader className="flex flex-row items-start justify-between pb-3">
        <div>
          <CardTitle className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {title}
          </CardTitle>
        </div>
        {Icon ? (
          <div className={cn("flex size-10 items-center justify-center rounded-2xl", toneStyles[tone])}>
            <Icon className="size-4" />
          </div>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-3xl font-semibold tracking-tight text-[#1d2d29]">{value}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}
