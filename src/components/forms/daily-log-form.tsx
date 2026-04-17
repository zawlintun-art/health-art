"use client";

import { useActionState } from "react";

import { addHealthLogAction, type ActionState } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function DailyLogForm() {
  const [state, action] = useActionState(addHealthLogAction, initialState);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <CardHeader>
        <CardTitle>Daily tracking</CardTitle>
        <CardDescription>Log today’s steps and water intake. Existing entries update in place.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" name="date" type="date" defaultValue={today} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="steps">Steps</Label>
            <Input id="steps" name="steps" type="number" min="0" step="1" placeholder="8500" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waterLiters">Water (liters)</Label>
            <Input id="waterLiters" name="waterLiters" type="number" min="0" step="0.1" placeholder="2.4" />
          </div>
          <div className="space-y-3 md:col-span-3">
            <FormMessage message={state.message} tone={state.success ? "default" : "error"} />
            <SubmitButton pendingLabel="Saving entry...">Save daily log</SubmitButton>
          </div>
        </form>
      </CardContent>
    </>
  );
}
