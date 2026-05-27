import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { routes } from "@/config/routes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12">
      <Link href={routes.home} className="mb-8 block">
        <Logo linked={false} />
      </Link>
      {children}
    </div>
  );
}
