export function calculateBmi(weightKg: number, heightCm: number) {
  const heightMeters = heightCm / 100;
  if (!heightMeters) return 0;
  return Number((weightKg / (heightMeters * heightMeters)).toFixed(1));
}

export function calculateDailyWaterIntake(weightKg: number) {
  return Number(((weightKg * 35) / 1000).toFixed(1));
}

export function getWeekStart(date = new Date()) {
  const value = new Date(date);
  const day = value.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  value.setHours(0, 0, 0, 0);
  value.setDate(value.getDate() + diff);
  return value;
}

export function getStartOfDay(date = new Date()) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

export function getMonthRange(date = new Date()) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
}

export function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}
