import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Forgot password",
  description: "Reset your Nutheer System password.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
