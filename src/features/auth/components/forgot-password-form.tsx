"use client";

import Link from "next/link";
import { useActionState } from "react";
import { routes } from "@/config/routes";
import { forgotPasswordAction } from "@/features/auth/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => forgotPasswordAction(formData),
    null
  );

  const formError =
    state &&
    !state.success &&
    state.error &&
    ("form" in state.error ? state.error.form?.[0] : state.error.email?.[0]);
  const successMessage =
    state && state.success && "message" in state ? state.message : null;

  return (
    <Card className="w-full max-w-md border-border/60">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>We will email you a link to reset your password</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {formError && (
            <p className="text-sm text-destructive" role="alert">
              {formError}
            </p>
          )}
          {successMessage && (
            <p className="text-sm text-primary" role="status">
              {successMessage}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Sending…" : "Send reset link"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            <Link href={routes.auth.login} className="hover:text-primary">
              Back to sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
