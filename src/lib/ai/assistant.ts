type AssistantContext = {
  name: string;
  bmi?: number | null;
  dailyWaterLiters?: number | null;
};

export function buildAssistantReply(message: string, context: AssistantContext) {
  const normalized = message.toLowerCase();

  if (normalized.includes("water")) {
    return `Your recommended daily water target is ${context.dailyWaterLiters ?? "not set"} liters. Spread intake across the day and add an extra 0.5-1.0 liters when activity or heat increases.`;
  }

  if (normalized.includes("bmi") || normalized.includes("weight")) {
    return `Your current BMI is ${context.bmi ?? "not available yet"}. BMI is a broad screening signal, so combine it with sleep, energy, activity, and clinician advice rather than treating it as a diagnosis.`;
  }

  if (normalized.includes("steps")) {
    return "A steady baseline is usually more sustainable than big spikes. Try setting a consistent minimum for weekdays, then add a short evening walk when you need a simple bump.";
  }

  return `Hi ${context.name.split(" ")[0]}, focus on three basics this week: stay near your hydration target, log movement daily even when it is modest, and use the weekly rating to notice patterns in energy or stress.`;
}
