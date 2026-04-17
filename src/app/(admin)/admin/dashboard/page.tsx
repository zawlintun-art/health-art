import { BarChart3, TrendingUp, UserCheck, Users } from "lucide-react";

import { AppShell } from "@/components/app-shell";
import { DashboardTableCard } from "@/components/dashboard-table-card";
import { MetricCard } from "@/components/metric-card";
import { SimpleBarChart } from "@/components/simple-bar-chart";
import { requireAdmin } from "@/lib/auth";
import { getAdminDashboardData } from "@/lib/data";

export default async function AdminDashboardPage() {
  const admin = await requireAdmin();
  const data = await getAdminDashboardData();

  return (
    <AppShell
      role="ADMIN"
      currentPath="/admin/dashboard"
      title={`Admin dashboard, ${admin.firstName}`}
      description="Monitor adoption, onboarding completion, and weekly wellness feedback across the platform."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total users" value={data.totalUsers.toString()} hint="All registered accounts." icon={Users} tone="mint" />
        <MetricCard title="Onboarded users" value={data.onboardedUsers.toString()} hint="Users with baseline health data." icon={UserCheck} tone="sky" />
        <MetricCard
          title="Onboarding rate"
          value={`${data.totalUsers ? Math.round((data.onboardedUsers / data.totalUsers) * 100) : 0}%`}
          hint="Share of users who completed onboarding."
          icon={TrendingUp}
          tone="gold"
        />
        <MetricCard title="Series tracked" value="2" hint="Growth and weekly rating analytics." icon={BarChart3} tone="coral" />
      </div>

      <div className="mt-6 grid gap-6 2xl:grid-cols-[1fr_1.15fr]">
        <SimpleBarChart
          title="User growth"
          subtitle="New registered users over the last six months."
          data={data.growthSeries}
          tone="steps"
        />
        <SimpleBarChart
          title="Weekly rating average"
          subtitle="Average weekly user rating over the last eight weeks."
          data={data.weeklyRatingSeries}
          tone="water"
          maxValue={5}
        />
        <DashboardTableCard
          title="Recent users"
          subtitle="Newest accounts and their onboarding status."
          tabs={["Users", "Access", "Monitoring"]}
          columns={[
            { key: "name", label: "User" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status" },
            { key: "activity", label: "Activity" },
          ]}
          rows={data.recentUsers.map((user) => ({
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
            status: user.onboarded ? "Onboarded" : "Pending",
            activity: `${user._count.healthLogs} logs`,
          }))}
        />
      </div>
    </AppShell>
  );
}
