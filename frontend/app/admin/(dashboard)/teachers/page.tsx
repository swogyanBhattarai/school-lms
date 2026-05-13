import PageHeader from "../../../_components/PageHeader";

export default function TeachersPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Teachers"
        description="Coordinate timetables, professional development, and mentoring duties."
      />
      <div className="rounded-3xl border border-white/50 bg-white/75 p-6 shadow-sm backdrop-blur">
        <p className="text-sm text-muted-foreground">
          Teacher management tools are coming next.
        </p>
      </div>
    </div>
  );
}
