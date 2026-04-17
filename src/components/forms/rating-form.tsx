"use client";

import { useActionState } from "react";

import { submitWeeklyRatingAction, type ActionState } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function RatingForm() {
  const [state, action] = useActionState(submitWeeklyRatingAction, initialState);

  return (
    <>
      <CardHeader>
        <CardTitle>Weekly rating</CardTitle>
        <CardDescription>Rate this week from 1 to 5 and leave a short note if it helps.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="score">Score</Label>
            <Input id="score" name="score" type="number" min="1" max="5" defaultValue="4" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="note">Note</Label>
            <Textarea id="note" name="note" placeholder="Energy was stable and hydration improved." />
          </div>
          <FormMessage message={state.message} tone={state.success ? "default" : "error"} />
          <SubmitButton pendingLabel="Submitting...">Save weekly rating</SubmitButton>
        </form>
      </CardContent>
    </>
  );
}
