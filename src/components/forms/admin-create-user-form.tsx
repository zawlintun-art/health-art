"use client";

import { useActionState } from "react";

import { adminCreateUserAction, type ActionState } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {
  success: false,
  message: "",
};

export function AdminCreateUserForm() {
  const [state, action] = useActionState(adminCreateUserAction, initialState);

  return (
    <>
      <CardHeader>
        <CardTitle>Create user</CardTitle>
        <CardDescription>Create a user directly from the admin panel.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" name="surname" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
            <Input id="dateOfBirth" name="dateOfBirth" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              defaultValue="USER"
              className="flex h-11 w-full rounded-xl border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="password">Temporary password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-3 md:col-span-2">
            <FormMessage message={state.message} tone={state.success ? "default" : "error"} />
            <SubmitButton pendingLabel="Creating user...">Create user</SubmitButton>
          </div>
        </form>
      </CardContent>
    </>
  );
}
