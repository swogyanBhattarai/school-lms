import PageHeader from "../../../_components/PageHeader";

export default function SubjectsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Subjects"
        description="Manage subject catalogs, grading rules, and curriculum mapping."
      />
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Subject management tools are coming next.
        </p>
      </div>
    </div>
  );
}
