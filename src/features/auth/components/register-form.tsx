"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Check, X } from "lucide-react";
import { routes } from "@/config/routes";
import { registerAction } from "@/features/auth/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const requirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter (A-Z)", test: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter (a-z)", test: (p: string) => /[a-z]/.test(p) },
  { label: "One number (0-9)", test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character (!@#$%^&*)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function RegisterForm() {
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const [state, formAction, pending] = useActionState(
    async (_prev: unknown, formData: FormData) => registerAction(formData),
    null
  );

  const formError =
    state &&
    !state.success &&
    state.error &&
    ("form" in state.error ? state.error.form?.[0] : undefined);

  const fieldErrors =
    state && !state.success && state.error && !("form" in state.error)
      ? state.error
      : null;

  const successMessage =
    state && state.success && "message" in state ? state.message : null;

  return (
    <Card className="w-full max-w-md border-border/60">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Join Nuntheer System learning and careers</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-4">
          {formError && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md p-3" role="alert">
              {formError}
            </p>
          )}
          {successMessage && (
            <p className="text-sm text-primary bg-primary/10 rounded-md p-3" role="status">
              {successMessage}
            </p>
          )}

          {/* Full name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" name="fullName" required placeholder="Jane Doe" />
            {fieldErrors?.fullName && (
              <p className="text-xs text-destructive">{fieldErrors.fullName[0]}</p>
            )}
          </div>

          {/* Email */}
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
            {fieldErrors?.email && (
              <p className="text-xs text-destructive">{fieldErrors.email[0]}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setTouched(true);
              }}
            />
            {fieldErrors?.password && (
              <p className="text-xs text-destructive">{fieldErrors.password[0]}</p>
            )}
            {/* Live requirements checklist */}
            {touched && (
              <ul className="space-y-1 mt-2">
                {requirements.map((req) => {
                  const passed = req.test(password);
                  return (
                    <li key={req.label} className={`flex items-center gap-2 text-xs ${passed ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                      {passed
                        ? <Check className="h-3 w-3 shrink-0" />
                        : <X className="h-3 w-3 shrink-0" />}
                      {req.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Confirm password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
            />
            {fieldErrors?.confirmPassword && (
              <p className="text-xs text-destructive">{fieldErrors.confirmPassword[0]}</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account…" : "Create account"}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href={routes.auth.login} className="hover:text-primary">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
