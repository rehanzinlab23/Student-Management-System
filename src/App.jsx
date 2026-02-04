import { collection, getDocs, query, orderBy } from "firebase/firestore";
import CreateStudent from "./components/CreateStudent";
import StudentList from "./components/StudentList";
import { useEffect, useState } from "react";
import { db } from "./FireBaseConfig";

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });

  const getStudents = async () => {
    try {
      setLoading(true);
      const studentsCollection = collection(db, "students");
      const q = query(studentsCollection, orderBy("createdAt", "desc"));
      const studentSnapShot = await getDocs(q);

      const studentList = studentSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStudents(studentList);
    } catch (err) {
      console.error(err);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen w-full px-4 py-8 sm:py-10 lg:py-14 lg:flex lg:items-center">
      <div className="mx-auto w-full max-w-5xl">
        <div
          className="mb-8 rounded-3xl border p-6 backdrop-blur"
          style={{
            background: "var(--surface-strong)",
            borderColor: "var(--surface-border)",
            boxShadow: "var(--shadow-strong)",
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-[0.3em]"
                style={{ color: "var(--muted-2)" }}
              >
                Student Portal
              </p>
              <h1
                className="mt-3 text-3xl font-semibold sm:text-4xl"
                style={{
                  fontFamily: '"Fraunces", "Times New Roman", serif',
                  color: "var(--text)",
                }}
              >
                Student Management System
              </h1>
              <p
                className="mt-2 max-w-2xl text-sm sm:text-base"
                style={{ color: "var(--muted)" }}
              >
                Keep track of student records with a clean, focused interface
                built for quick updates.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
              className="relative h-10 w-20 rounded-full cursor-pointer"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(148, 163, 184, 0.25)"
                    : "rgba(15, 23, 42, 0.9)",
                boxShadow: "0 12px 24px rgba(15, 23, 42, 0.2)",
                transition:
                  "background-color 0.25s ease, box-shadow 0.25s ease",
              }}
              aria-pressed={theme === "dark"}
              aria-label="Toggle theme"
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                🌞
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
                🌙
              </span>
              <span
                className="absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full"
                style={{
                  left: theme === "dark" ? "44px" : "4px",
                  background:
                    theme === "dark" ? "var(--text)" : "var(--on-primary)",
                  transition: "left 0.25s ease, background-color 0.25s ease",
                }}
              />
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.1fr_2fr]">
          <div
            className="rounded-3xl border p-6"
            style={{
              background: "var(--surface)",
              borderColor: "var(--surface-border)",
              boxShadow: "var(--shadow)",
            }}
          >
            <CreateStudent getStudents={getStudents} students={students} />
          </div>
          <div
            className="rounded-3xl border p-6"
            style={{
              background: "var(--surface)",
              borderColor: "var(--surface-border)",
              boxShadow: "var(--shadow)",
            }}
          >
            <StudentList
              students={students}
              setStudents={setStudents}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
