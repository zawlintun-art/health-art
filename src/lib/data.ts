import { db } from "@/lib/db";
import { formatShortDate, getMonthRange, getWeekStart } from "@/lib/health";

export interface UserCount {
  healthLogs?: number;
  ratings?: number;
}

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
  onboarded: boolean;
  createdAt: Date;
  _count: UserCount;
};

export type HealthLog = {
  id: string;
  userId: string;
  date: Date;
  steps: number;
  waterLiters: number;
};

export type Rating = {
  id: string;
  userId: string;
  weekStart: Date;
  score: number;
};

export async function getUserDashboardData(userId: string) {
  const { start, end } = getMonthRange();
  const [user, logs, ratings] = await Promise.all([
    db.user.findUniqueOrThrow({ where: { id: userId } }),
    db.healthLog.findMany({
      where: { userId, date: { gte: start, lte: end } },
      orderBy: { date: "asc" },
    }),
    db.rating.findMany({
      where: {
        userId,
        weekStart: {
          gte: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7 * 8),
        },
      },
      orderBy: { weekStart: "asc" },
    }),
  ]);

  const stepsSeries = logs.map((log: HealthLog) => ({
    label: formatShortDate(log.date),
    value: log.steps,
  }));

  const waterSeries = logs.map((log: HealthLog) => ({
    label: formatShortDate(log.date),
    value: Number(log.waterLiters.toFixed(1)),
  }));

  const weeklyRatings = Array.from({ length: 8 }).map((_, index) => {
    const current = new Date();
    current.setDate(current.getDate() - (7 - index) * 7);
    const weekStart = getWeekStart(current);
    const found = ratings.find((rating: Rating) => rating.weekStart.getTime() === weekStart.getTime());
    return {
      label: formatShortDate(weekStart),
      value: found?.score ?? 0,
    };
  });

  const totals = logs.reduce(
    (acc: { steps: number; water: number }, item: HealthLog) => {
      acc.steps += item.steps;
      acc.water += item.waterLiters;
      return acc;
    },
    { steps: 0, water: 0 }
  );

  return {
    user,
    stepsSeries,
    waterSeries,
    weeklyRatings,
    recentLogs: [...logs]
      .sort((a: HealthLog, b: HealthLog) => b.date.getTime() - a.date.getTime())
      .slice(0, 5),
    latestRating: ratings.at(-1) ?? null,
    totals: {
      steps: totals.steps,
      water: Number(totals.water.toFixed(1)),
    },
  };
}

export async function getAdminDashboardData() {
  const now = new Date();
  const growthSeries = await Promise.all(
    Array.from({ length: 6 }).map(async (_, index) => {
      const month = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const nextMonth = new Date(now.getFullYear(), now.getMonth() - (4 - index), 1);
      const count = await db.user.count({
        where: {
          createdAt: {
            gte: month,
            lt: nextMonth,
          },
        },
      });

      return {
        label: month.toLocaleString("en-US", { month: "short" }),
        value: count,
      };
    })
  );

  const weeklyRatingSeries = await Promise.all(
    Array.from({ length: 8 }).map(async (_, index) => {
      const weekStart = getWeekStart(new Date(Date.now() - (7 - index) * 7 * 24 * 60 * 60 * 1000));
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 7);

      const ratings = await db.rating.findMany({
        where: {
          weekStart: {
            gte: weekStart,
            lt: weekEnd,
          },
        },
      });

      const value = ratings.length
        ? Number((ratings.reduce((sum: number, item: Rating) => sum + item.score, 0) / ratings.length).toFixed(1))
        : 0;

      return {
        label: formatShortDate(weekStart),
        value,
      };
    })
  );

  const [totalUsers, onboardedUsers, recentUsers] = await Promise.all([
    db.user.count(),
    db.user.count({ where: { onboarded: true } }),
    db.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        _count: {
          select: {
            healthLogs: true,
          },
        },
      },
    }),
  ]);

  return {
    growthSeries,
    weeklyRatingSeries,
    totalUsers,
    onboardedUsers,
    recentUsers,
  };
}

export async function getAllUsers() {
  return db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          healthLogs: true,
          ratings: true,
        },
      },
    },
  });
}
