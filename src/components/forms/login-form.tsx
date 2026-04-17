"use client";

import { useActionState } from "react";

import { loginAction, type ActionState } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState);

  return (
    <>
      <CardHeader className="pb-4">
        <div className="inline-flex w-fit rounded-full bg-[#eef7df] px-4 py-2 text-sm font-medium text-[#6e9f35]">
          Account login
        </div>
        <CardTitle className="mt-4 text-[1.9rem] text-[#23342f]">Sign in</CardTitle>
        <CardDescription>Use your email and password to open the health workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="rounded-[1rem] border-[#e4e9d6] bg-[#fbfcf7]"
            />
          </div>
          <FormMessage message={state.message} tone={state.success ? "default" : "error"} />
          <SubmitButton
            className="w-full rounded-full bg-[#a9cd63] text-white hover:bg-[#98be52]"
            pendingLabel="Signing in..."
          >
            Sign in
          </SubmitButton>
        </form>
      </CardContent>
    </>
  );
}
