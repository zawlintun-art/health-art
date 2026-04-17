import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Droplets,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth";

const features = [
  {
    icon: Stethoscope,
    title: "Personal health tracking",
    description:
      "Capture daily steps, water intake, BMI, and weekly wellbeing scores in one place.",
  },
  {
    icon: Sparkles,
    title: "Guided onboarding",
    description:
      "Collect weight and height once, then automatically calculate BMI and recommended hydration.",
  },
  {
    icon: ShieldCheck,
    title: "Admin visibility",
    description:
      "Monitor user growth, ratings, and account access from a dedicated admin control panel.",
  },
];

const quickStats = [
  {
    icon: HeartPulse,
    label: "Heart health",
    value: "BMI + baseline metrics",
  },
  {
    icon: Droplets,
    label: "Hydration",
    value: "Daily water guidance",
  },
  {
    icon: Activity,
    label: "Activity",
    value: "Monthly movement tracking",
  },
];

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#dcebbd_0%,#edf3d3_16%,#f7f8ef_34%,#fffdf8_100%)] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] rounded-[2.5rem] border border-white/60 bg-[rgba(242,246,225,0.76)] p-4 shadow-[0_26px_80px_-54px_rgba(69,117,97,0.42)] backdrop-blur md:p-6">
        <div className="rounded-[2rem] border border-white/75 bg-white/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:p-6">
          <header className="rounded-[1.8rem] border border-[#e6ebd4] bg-[linear-gradient(180deg,#eef5d9_0%,#e6efcb_100%)] px-5 py-4 shadow-[0_12px_30px_-24px_rgba(115,145,95,0.45)]">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#7fd2be_0%,#2f9f88_58%,#2f6f62_100%)] text-white shadow-md">
                  <div className="size-5 rounded-full bg-white/30" />
                </div>
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-primary">
                    Health<span className="text-[#9fbe58]">OS</span>
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-primary/60">
                    Personal care dashboard
                  </p>
                </div>
              </div>
              <nav className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#a9cd63] px-5 py-2.5 text-sm font-medium text-white">
                  Overview
                </span>
                <span className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground/80">
                  Tracking
                </span>
                <span className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground/80">
                  Wellness
                </span>
                <span className="rounded-full px-5 py-2.5 text-sm font-medium text-foreground/80">
                  Admin
                </span>
              </nav>
              <div className="flex gap-3">
                {user ? (
                  <Button asChild className="rounded-full bg-[#a9cd63] text-white hover:bg-[#98be52]">
                    <Link href={user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard"}>
                      Open dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild className="rounded-full border-[#d8dfbf] bg-white/80">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="rounded-full bg-[#a9cd63] text-white hover:bg-[#98be52]">
                      <Link href="/register">Create account</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </header>

          <section className="grid gap-6 pt-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <Card className="overflow-hidden rounded-[2rem] border-[#dfe7c4] bg-[linear-gradient(180deg,#afcf69_0%,#a2c55d_100%)] shadow-[0_26px_50px_-38px_rgba(89,122,53,0.55)]">
                <CardContent className="grid gap-8 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                  <div className="space-y-5 text-[#213430]">
                    <p className="inline-flex rounded-full bg-white/28 px-4 py-1.5 text-sm font-medium text-white shadow-sm backdrop-blur">
                      Modern wellness operations
                    </p>
                    <div className="space-y-4">
                      <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white text-balance">
                        Track the numbers that matter and keep every routine in one place.
                      </h1>
                      <p className="max-w-2xl text-lg leading-8 text-white/85">
                        Register securely, complete your health onboarding, log daily progress,
                        review activity trends, and give admins a clean overview of user growth.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        size="lg"
                        asChild
                        className="rounded-full bg-white text-[#24473f] hover:bg-white/90"
                      >
                        <Link href={user ? (user.role === "ADMIN" ? "/admin/dashboard" : "/dashboard") : "/register"}>
                          {user ? "Continue to workspace" : "Start onboarding"}
                          <ArrowRight className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="rounded-full border-white/45 bg-white/16 text-white hover:bg-white/22"
                      >
                        <Link href="/login">Secure login</Link>
                      </Button>
                    </div>
                  </div>
                  <div className="relative h-[280px] overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,#9ec65d_0%,#8dc04d_100%)]">
                    <div className="absolute -left-10 bottom-8 h-44 w-52 rounded-[50%] bg-[#0d8d6a]" />
                    <div className="absolute left-16 bottom-0 h-36 w-44 rounded-[50%] bg-[#2ab9a0]" />
                    <div className="absolute right-2 bottom-6 h-40 w-40 rounded-[44%] bg-[#5ed9c6]" />
                    <div className="absolute -left-6 bottom-[-3rem] h-44 w-56 rounded-[50%] bg-[#0b6e56]" />
                    <div className="absolute left-20 bottom-[-4rem] h-44 w-52 rounded-[50%] bg-[#1f9278]" />
                    <div className="absolute right-[-1rem] bottom-[-4rem] h-40 w-44 rounded-[50%] bg-[#28c5aa]" />
                    <div className="absolute left-5 top-5 rounded-full bg-white/18 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                      Care, tracking, and admin in one system
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-3">
                {quickStats.map(({ icon: Icon, label, value }) => (
                  <Card
                    key={label}
                    className="rounded-[1.75rem] border-[#edf0df] bg-white/92 shadow-[0_16px_36px_-30px_rgba(108,136,92,0.4)]"
                  >
                    <CardContent className="p-5">
                      <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-[#eef7df] text-[#6e9f35]">
                        <Icon className="size-5" />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {label}
                      </p>
                      <p className="mt-2 text-base font-semibold text-[#1d2d29]">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 shadow-[0_24px_60px_-40px_rgba(47,111,98,0.45)]">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-[1.5rem] text-[#23342f]">Platform overview</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    A calmer health UI with onboarding, tracking, and admin visibility.
                  </p>
                </div>
                <span className="rounded-full bg-[#a9cd63] px-4 py-2 text-sm font-medium text-white">
                  Overview
                </span>
              </CardHeader>
              <CardContent className="space-y-5">
                {features.map(({ icon: Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-[1.4rem] border border-[#edf0df] bg-[#fbfcf7] p-4"
                  >
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-[#eef7df] text-[#6e9f35] shadow-sm">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-[#23342f]">{title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
