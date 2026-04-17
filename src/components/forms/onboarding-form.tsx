"use client";

import { useActionState } from "react";

import { onboardingAction, type ActionState } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {
  success: false,
  message: "",
};

type OnboardingFormProps = {
  defaultWeight?: number | null;
  defaultHeight?: number | null;
};

export function OnboardingForm({ defaultWeight, defaultHeight }: OnboardingFormProps) {
  const [state, action] = useActionState(onboardingAction, initialState);

  return (
    <>
      <CardHeader>
        <CardTitle>Health onboarding</CardTitle>
        <CardDescription>
          Enter your current weight and height to calculate BMI and a daily water target.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weightKg">Weight (kg)</Label>
            <Input id="weightKg" name="weightKg" type="number" step="0.1" defaultValue={defaultWeight ?? ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="heightCm">Height (cm)</Label>
            <Input id="heightCm" name="heightCm" type="number" step="0.1" defaultValue={defaultHeight ?? ""} required />
          </div>
          <FormMessage message={state.message} tone={state.success ? "default" : "error"} />
          <SubmitButton className="w-full" pendingLabel="Calculating...">
            Save and continue
          </SubmitButton>
        </form>
      </CardContent>
    </>
  );
}
