import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";

type AdminStubProps = {
  title: string;
  description: string;
};

export function AdminStub({ title, description }: AdminStubProps) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <EmptyState
        className="mt-8"
        title="Admin module stub"
        description="Connect Supabase CRUD and role checks to activate this section."
      />
    </>
  );
}
