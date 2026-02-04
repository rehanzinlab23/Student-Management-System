import StudentTable from "./StudentTable";

const StudentList = ({ students, setStudents, loading }) => {
  if (loading)
    return (
      <div className="flex items-center gap-3 text-sm font-medium">
        <span
          className="h-2.5 w-2.5 animate-pulse rounded-full"
          style={{ background: "var(--muted)" }}
        />
        <span style={{ color: "var(--muted)" }}>Loading students...</span>
      </div>
    );

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            Student List
          </h1>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            Track, edit, or remove student records.
          </p>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            background: "var(--badge-bg)",
            color: "var(--badge-text)",
          }}
        >
          {students.length} records
        </span>
      </div>
      <StudentTable students={students} setStudents={setStudents} />
    </>
  );
};

export default StudentList;
