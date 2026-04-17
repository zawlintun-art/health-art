import Link from "next/link";

import { LoginForm } from "@/components/forms/login-form";
import { Card } from "@/components/ui/card";
import { redirectIfAuthenticated } from "@/lib/auth";

export default async function LoginPage() {
  await redirectIfAuthenticated();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#dcebbd_0%,#edf3d3_16%,#f7f8ef_34%,#fffdf8_100%)] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px] rounded-[2.5rem] border border-white/60 bg-[rgba(242,246,225,0.76)] p-4 shadow-[0_26px_80px_-54px_rgba(69,117,97,0.42)] backdrop-blur md:p-6">
        <div className="grid min-h-[760px] gap-6 rounded-[2rem] border border-white/75 bg-white/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] lg:grid-cols-[0.95fr_1.05fr] lg:p-6">
          <div className="overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#afcf69_0%,#a2c55d_100%)] p-8 text-white shadow-[0_26px_50px_-38px_rgba(89,122,53,0.55)]">
            <p className="inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur">
              Secure access
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-balance">
              Welcome back to your health workspace.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/85">
              Review movement, hydration, onboarding metrics, and admin insights from the same calm, modern dashboard.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[1.4rem] bg-white/18 p-4 backdrop-blur">
                <p className="text-sm font-medium">Personal tracking</p>
                <p className="mt-1 text-sm text-white/80">Log steps, water intake, and weekly wellbeing in one place.</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/18 p-4 backdrop-blur">
                <p className="text-sm font-medium">Admin visibility</p>
                <p className="mt-1 text-sm text-white/80">Follow onboarding completion, user growth, and activity trends.</p>
              </div>
            </div>

            <div className="relative mt-10 h-[260px] overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,#9ec65d_0%,#8dc04d_100%)]">
              <div className="absolute -left-10 bottom-8 h-44 w-52 rounded-[50%] bg-[#0d8d6a]" />
              <div className="absolute left-16 bottom-0 h-36 w-44 rounded-[50%] bg-[#2ab9a0]" />
              <div className="absolute right-2 bottom-6 h-40 w-40 rounded-[44%] bg-[#5ed9c6]" />
              <div className="absolute -left-6 bottom-[-3rem] h-44 w-56 rounded-[50%] bg-[#0b6e56]" />
              <div className="absolute left-20 bottom-[-4rem] h-44 w-52 rounded-[50%] bg-[#1f9278]" />
              <div className="absolute right-[-1rem] bottom-[-4rem] h-40 w-44 rounded-[50%] bg-[#28c5aa]" />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg space-y-6">
              <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 shadow-[0_28px_90px_-42px_rgba(33,78,70,0.24)]">
                <LoginForm />
              </Card>
              <p className="text-center text-sm text-muted-foreground">
                Need an account?{" "}
                <Link href="/register" className="font-medium text-foreground underline underline-offset-4">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
