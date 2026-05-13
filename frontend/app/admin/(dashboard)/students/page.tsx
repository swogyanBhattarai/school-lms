import PageHeader from "../../../_components/PageHeader";

export default function StudentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Students"
        description="Track admissions, attendance, and student support plans across every section."
      />
      <div className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-sm backdrop-blur">
        <p className="text-sm text-muted-foreground">
          Student management tools are coming next.
        </p>
      </div>
    </div>
  );
}
