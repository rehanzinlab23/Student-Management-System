import { addDoc, collection } from "firebase/firestore";
import { db } from "../FireBaseConfig";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const CreateStudent = ({ getStudents, students }) => {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isCreatingStudent, setIsCreatingStudent] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Age validation
    if (age < 5 || age > 60) {
      setErrorMessage("Age must be between 5 and 60.");
      setErrorModalOpen(true);
      return;
    }

    // Unique roll number
    const exists = students.find((s) => s.rollNo === Number(rollNo));
    if (exists) {
      setErrorMessage("Roll number already exists.");
      setErrorModalOpen(true);
      return;
    }

    try {
      setIsCreatingStudent(true);
      await addDoc(collection(db, "students"), {
        rollNo: Number(rollNo),
        name: name.trim().toLowerCase(),
        age: Number(age),
        createdAt: new Date(),
      });

      setRollNo("");
      setName("");
      setAge("");
      await getStudents();
    } catch (error) {
      console.error(error);
      setErrorMessage("Error creating student.");
      setErrorModalOpen(true);
    } finally {
      setIsCreatingStudent(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          Add Student
        </p>
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          Fill in the details below to create a new record.
        </p>
      </div>

      <div className="grid gap-3">
        <input
          type="number"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          placeholder="Enter Student Roll No."
          required
          className="w-full"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Student Name"
          required
          className="w-full"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter Student Age"
          required
          className="w-full"
        />
      </div>

      <button
        type="submit"
        className="group relative mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-[0_12px_24px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 cursor-pointer"
        style={{
          background: "var(--primary)",
          color: "var(--on-primary)",
        }}
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 transition group-hover:scale-110" />
        {isCreatingStudent ? "Creating..." : "Create Student"}
      </button>

      <Dialog
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            paddingY: 2,
            paddingX: 2,
            minWidth: 360,
            maxWidth: 420,
            backgroundColor: "var(--surface)",
            color: "var(--text)",
            boxShadow: "0 30px 70px rgba(15, 23, 42, 0.25)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1.5 }}>
          Unable to Create
        </DialogTitle>
        <DialogContent sx={{ pb: 0, position: "relative", zIndex: 999 }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            {errorMessage}
          </p>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 2 }}>
          <Button
            onClick={() => setErrorModalOpen(false)}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 999,
              backgroundColor: "var(--primary)",
              color: "var(--on-primary)",
              "&:hover": { opacity: 0.9 },
            }}
          >
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default CreateStudent;
