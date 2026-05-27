import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "My Bookings",
  description: "Your live session bookings.",
  path: "/dashboard/bookings",
  noIndex: true,
});

export default function BookingsPage() {
  return (
    <>
      <PageHeader
        title="My bookings"
        description="Sessions you have reserved appear here."
      />
      <EmptyState
        className="mt-8"
        title="No bookings yet"
        description="Book a live session from the sessions page when you are ready."
      />
    </>
  );
}
