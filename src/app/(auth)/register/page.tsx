import Link from "next/link";

import { RegisterForm } from "@/components/forms/register-form";
import { Card } from "@/components/ui/card";
import { redirectIfAuthenticated } from "@/lib/auth";

export default async function RegisterPage() {
  await redirectIfAuthenticated();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#dcebbd_0%,#edf3d3_16%,#f7f8ef_34%,#fffdf8_100%)] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1320px] rounded-[2.5rem] border border-white/60 bg-[rgba(242,246,225,0.76)] p-4 shadow-[0_26px_80px_-54px_rgba(69,117,97,0.42)] backdrop-blur md:p-6">
        <div className="grid min-h-[800px] gap-6 rounded-[2rem] border border-white/75 bg-white/72 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] lg:grid-cols-[1.05fr_0.95fr] lg:p-6">
          <div className="flex items-center justify-center order-2 lg:order-1">
            <div className="w-full max-w-2xl space-y-6">
              <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 shadow-[0_28px_90px_-42px_rgba(33,78,70,0.24)]">
                <RegisterForm />
              </Card>
              <p className="text-center text-sm text-muted-foreground">
                Already registered?{" "}
                <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
                  Login
                </Link>
              </p>
            </div>
          </div>

          <div className="order-1 overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#afcf69_0%,#a2c55d_100%)] p-8 text-white shadow-[0_26px_50px_-38px_rgba(89,122,53,0.55)] lg:order-2">
            <p className="inline-flex rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur">
              Guided onboarding
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-balance">
              Create your account and move straight into health setup.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/85">
              We collect the essentials first, then calculate BMI and hydration guidance so the dashboard feels useful from day one.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] bg-white/18 p-4 backdrop-blur">
                <p className="text-sm font-medium">Simple registration</p>
                <p className="mt-1 text-sm text-white/80">Email, profile details, and secure password setup.</p>
              </div>
              <div className="rounded-[1.4rem] bg-white/18 p-4 backdrop-blur">
                <p className="text-sm font-medium">Health baseline</p>
                <p className="mt-1 text-sm text-white/80">Weight and height flow into onboarding immediately after login.</p>
              </div>
            </div>

            <div className="mt-8 rounded-[1.6rem] bg-white/18 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">What happens next</p>
              <div className="mt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-white text-[#2c6659] text-sm font-semibold">1</span>
                  <div>
                    <p className="font-medium">Create your account</p>
                    <p className="text-sm text-white/80">Store identity details in the secure health workspace.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-white text-[#2c6659] text-sm font-semibold">2</span>
                  <div>
                    <p className="font-medium">Complete onboarding</p>
                    <p className="text-sm text-white/80">Add weight and height to unlock BMI and water guidance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-7 items-center justify-center rounded-full bg-white text-[#2c6659] text-sm font-semibold">3</span>
                  <div>
                    <p className="font-medium">Start tracking</p>
                    <p className="text-sm text-white/80">Log steps, hydration, and weekly wellness inside the dashboard.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-10 h-[220px] overflow-hidden rounded-[1.8rem] bg-[linear-gradient(180deg,#9ec65d_0%,#8dc04d_100%)]">
              <div className="absolute -left-10 bottom-8 h-44 w-52 rounded-[50%] bg-[#0d8d6a]" />
              <div className="absolute left-16 bottom-0 h-36 w-44 rounded-[50%] bg-[#2ab9a0]" />
              <div className="absolute right-2 bottom-6 h-40 w-40 rounded-[44%] bg-[#5ed9c6]" />
              <div className="absolute -left-6 bottom-[-3rem] h-44 w-56 rounded-[50%] bg-[#0b6e56]" />
              <div className="absolute left-20 bottom-[-4rem] h-44 w-52 rounded-[50%] bg-[#1f9278]" />
              <div className="absolute right-[-1rem] bottom-[-4rem] h-40 w-44 rounded-[50%] bg-[#28c5aa]" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
