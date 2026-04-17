import { AppShell } from "@/components/app-shell";
import { OnboardingForm } from "@/components/forms/onboarding-form";
import { Card } from "@/components/ui/card";
import { requireUser } from "@/lib/auth";

export default async function OnboardingPage() {
  const user = await requireUser();

  return (
    <AppShell
      role={user.role}
      currentPath="/onboarding"
      title="Health onboarding"
      description="Save your baseline measurements so the dashboard can calculate BMI and daily hydration guidance."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,560px)_1fr]">
        <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
          <OnboardingForm defaultWeight={user.weightKg} defaultHeight={user.heightCm} />
        </Card>
        <Card className="rounded-[2rem] border-[#edf0df] bg-white/92 p-6 shadow-[0_18px_44px_-34px_rgba(108,136,92,0.38)]">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">How onboarding is used</h2>
            <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
              <li>Your BMI is calculated from weight and height.</li>
              <li>Your daily water target is estimated from body weight.</li>
              <li>These values appear on the dashboard and in AI support responses.</li>
            </ul>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
