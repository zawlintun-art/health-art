import { redirect } from "next/navigation";
import { Activity, Droplets, HeartPulse, MoonStar } from "lucide-react";

import { AiChat } from "@/components/ai-chat";
import { AppShell } from "@/components/app-shell";
import { DashboardProfilePanel } from "@/components/dashboard-profile-panel";
import { DashboardTableCard } from "@/components/dashboard-table-card";
import { DailyLogForm } from "@/components/forms/daily-log-form";
import { RatingForm } from "@/components/forms/rating-form";
import { MetricCard } from "@/components/metric-card";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";
import { getUserDashboardData } from "@/lib/data";

export default async function UserDashboardPage() {
  const user = await requireUser();

  if (user.role === "ADMIN") {
    redirect("/admin/dashboard");
  }

  if (!user.onboarded) {
    redirect("/onboarding");
  }

  const data = await getUserDashboardData(user.id);
  const age = new Date().getFullYear() - new Date(user.dateOfBirth).getFullYear();
  const recentRows = data.recentLogs.map((log) => ({
    date: log.date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    steps: `${log.steps.toLocaleString()} steps`,
    water: `${log.waterLiters.toFixed(1)} L`,
    note: log.steps > 7000 ? "Strong activity" : "Steady routine",
  }));

  return (
    <AppShell
      role="USER"
      currentPath="/dashboard"
      title={`Welcome back, ${user.firstName}`}
      description="Review this month’s movement, hydration, and weekly wellbeing in one workspace."
    >
      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="space-y-6">
          <DashboardProfilePanel
            firstName={user.firstName}
            lastName={user.lastName}
            age={age}
            weightKg={user.weightKg}
            heightCm={user.heightCm}
            bmi={user.bmi}
            dailyWaterLiters={user.dailyWaterLiters}
          />
          <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 p-6 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
            <h3 className="text-[1.45rem] font-semibold tracking-tight text-[#23342f]">Lifestyle & wellness</h3>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.4rem] border border-[#edf0df] bg-[#fbfcf7] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Hydration</p>
                    <p className="text-xs text-muted-foreground">{data.totals.water} liters logged this month</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <span
                        key={index}
                        className={`h-8 w-1.5 rounded-full ${index < Math.min(Math.round((data.totals.water / Math.max(user.dailyWaterLiters ?? 1, 1)) * 4), 8) ? "bg-[#4c87ff]" : "bg-[#dbe5fb]"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-[1.4rem] border border-[#edf0df] bg-[#fbfcf7] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Weekly rating</p>
                    <p className="text-xs text-muted-foreground">{data.latestRating?.note || "No note recorded yet"}</p>
                  </div>
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#eef7df] font-semibold text-[#6e9f35]">
                    {data.latestRating?.score ?? "--"}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="BMI"
              value={`${data.user.bmi ?? "--"}`}
              hint="Calculated from your onboarding metrics."
              icon={HeartPulse}
              tone="mint"
            />
            <MetricCard
              title="Water target"
              value={`${data.user.dailyWaterLiters ?? "--"} L`}
              hint="Recommended liters per day."
              icon={Droplets}
              tone="sky"
            />
            <MetricCard
              title="Monthly steps"
              value={data.totals.steps.toLocaleString()}
              hint="Summed from daily logs."
              icon={Activity}
              tone="coral"
            />
            <MetricCard
              title="Recovery"
              value={`${data.latestRating?.score ?? "--"}/5`}
              hint="Your latest weekly check-in."
              icon={MoonStar}
              tone="gold"
            />
          </div>

          <div className="grid gap-6 2xl:grid-cols-[0.95fr_1.15fr]">
            <SimpleBarChart
              title="Analytics"
              subtitle="Your movement pattern across the current month."
              data={data.stepsSeries}
              tone="steps"
            />
            <DashboardTableCard
              title="Health activity"
              subtitle="Recent tracking entries and progress markers."
              tabs={["Daily logs", "Hydration", "Movement", "Summary"]}
              columns={[
                { key: "date", label: "Date" },
                { key: "steps", label: "Steps" },
                { key: "water", label: "Water" },
                { key: "note", label: "Comment" },
              ]}
              rows={
                recentRows.length
                  ? recentRows
                  : [{ date: "No logs", steps: "--", water: "--", note: "Start adding daily activity" }]
              }
            />
          </div>

          <div className="grid gap-6 xl:grid-cols-[0.9fr_0.9fr_1.2fr]">
            <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
              <DailyLogForm />
            </Card>
            <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
              <RatingForm />
            </Card>
            <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
              <AiChat />
            </Card>
          </div>

          <SimpleBarChart
            title="Hydration trend"
            subtitle="Daily water intake for the current month."
            data={data.waterSeries}
            tone="water"
          />
          <SimpleBarChart
            title="Weekly rating trend"
            subtitle="Your last eight weekly check-ins."
            data={data.weeklyRatings}
            tone="neutral"
            maxValue={5}
          />
        </div>
      </div>
    </AppShell>
  );
}
