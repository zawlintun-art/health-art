import { Activity, Droplets, Ruler, Scale, UserRound } from "lucide-react";

import { Card } from "@/components/ui/card";

type DashboardProfilePanelProps = {
  firstName: string;
  lastName: string;
  age: number;
  weightKg?: number | null;
  heightCm?: number | null;
  bmi?: number | null;
  dailyWaterLiters?: number | null;
};

function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

export function DashboardProfilePanel({
  firstName,
  lastName,
  age,
  weightKg,
  heightCm,
  bmi,
  dailyWaterLiters,
}: DashboardProfilePanelProps) {
  const stats = [
    { label: "Age", value: `${age} years`, icon: UserRound },
    { label: "Weight", value: weightKg ? `${weightKg} kg` : "--", icon: Scale },
    { label: "Height", value: heightCm ? `${heightCm} cm` : "--", icon: Ruler },
    { label: "Hydration", value: dailyWaterLiters ? `${dailyWaterLiters} L/day` : "--", icon: Droplets },
  ];

  return (
    <Card className="overflow-hidden rounded-[2rem] border-[#dfe7c4] bg-[linear-gradient(180deg,#afcf69_0%,#a2c55d_100%)] shadow-[0_26px_50px_-38px_rgba(89,122,53,0.55)]">
      <div className="p-5 text-white">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-white/80">Profile</p>
        <div className="mt-5 rounded-[1.6rem] bg-white/28 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/75 font-semibold text-[#2c6659]">
              {getInitials(firstName, lastName)}
            </div>
            <div>
              <p className="font-semibold text-[#1c312b]">
                {firstName} {lastName}
              </p>
              <p className="text-sm text-[#38594f]">Health workspace</p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-[1.25rem] bg-white px-3 py-3 text-[#213430] shadow-sm">
              <div className="flex items-center gap-2 text-[#6eb8a4]">
                <Icon className="size-4" />
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </div>
              <p className="mt-1 text-sm font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-72 overflow-hidden bg-[linear-gradient(180deg,#9ec65d_0%,#8dc04d_100%)]">
        <div className="absolute -left-10 bottom-8 h-44 w-52 rounded-[50%] bg-[#0d8d6a]" />
        <div className="absolute left-16 bottom-0 h-36 w-44 rounded-[50%] bg-[#2ab9a0]" />
        <div className="absolute right-2 bottom-6 h-40 w-40 rounded-[44%] bg-[#5ed9c6]" />
        <div className="absolute -left-6 bottom-[-3rem] h-44 w-56 rounded-[50%] bg-[#0b6e56]" />
        <div className="absolute left-20 bottom-[-4rem] h-44 w-52 rounded-[50%] bg-[#1f9278]" />
        <div className="absolute right-[-1rem] bottom-[-4rem] h-40 w-44 rounded-[50%] bg-[#28c5aa]" />
        <div className="absolute left-6 top-5 flex items-center gap-2 rounded-full bg-white/18 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          <Activity className="size-3.5" />
          BMI {bmi ?? "--"}
        </div>
      </div>
    </Card>
  );
}
