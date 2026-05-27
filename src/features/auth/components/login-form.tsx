"use client";

import Link from "next/link";
import { useActionState } from "react";
import { routes } from "@/config/routes";
import { loginAction } from "@/features/auth/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => loginAction(formData),
    null
  );

  const formError =
    state &&
    !state.success &&
    state.error &&
    ("form" in state.error
      ? state.error.form?.[0]
      : state.error.email?.[0] ?? state.error.password?.[0]);

  return (
    <Card className="w-full max-w-md border-border/60">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your Nutheer account</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {formError && (
            <p className="text-sm text-destructive" role="alert">
              {formError}
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
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            <Link href={routes.auth.forgotPassword} className="hover:text-primary">
              Forgot password?
            </Link>
            {" · "}
            <Link href={routes.auth.register} className="hover:text-primary">
              Create account
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
