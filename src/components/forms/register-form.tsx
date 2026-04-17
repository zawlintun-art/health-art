"use client";

import { useActionState } from "react";

import { registerAction, type ActionState } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function RegisterForm() {
  const [state, action] = useActionState(registerAction, initialState);

  return (
    <>
      <CardHeader className="pb-4">
        <div className="inline-flex w-fit rounded-full bg-[#eef7df] px-4 py-2 text-sm font-medium text-[#6e9f35]">
          New account
        </div>
        <CardTitle className="mt-4 text-[1.9rem] text-[#23342f]">Create account</CardTitle>
        <CardDescription>Start with your identity details, then continue into health onboarding.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" required className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" required className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" name="surname" required className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
            <Input id="dateOfBirth" name="dateOfBirth" type="date" required className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]" />
          </div>
          <div />
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]" />
          </div>
          <div className="space-y-3 md:col-span-2">
            <FormMessage message={state.message} tone={state.success ? "default" : "error"} />
            <SubmitButton
              className="w-full rounded-full bg-[#a9cd63] text-white hover:bg-[#98be52]"
              pendingLabel="Creating account..."
            >
              Create account
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </>
  );
}
