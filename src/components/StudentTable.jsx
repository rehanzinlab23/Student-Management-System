import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../FireBaseConfig";
import UpdateStudentModal from "./UpdateStudentModal";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export default function StudentTable({ students, setStudents }) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Update Student
  const handleUpdateStudent = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    setCurrentStudent(student);
    setEditModalOpen(true);
  };

  const handleSaveStudent = async () => {
    const studentDoc = doc(db, "students", currentStudent.id);
    await updateDoc(studentDoc, {
      name: currentStudent.name,
      age: currentStudent.age,
    });
    setStudents(
      students.map((student) =>
        student.id === currentStudent.id ? currentStudent : student,
      ),
    );
    handleModalClose();
  };

  // Delete Student
  const handleDeleteStudent = async (studentId) => {
    const studentDoc = doc(db, "students", studentId);
    await deleteDoc(studentDoc);
    //   setStudents
    setStudents(students.filter((student) => student.id !== studentId));
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return;
    await handleDeleteStudent(studentToDelete.id);
    setDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  const handleDeleteClose = () => {
    setDeleteModalOpen(false);
    setStudentToDelete(null);
  };

  // Close Update Modal
  const handleModalClose = () => {
    setEditModalOpen(false);
    setCurrentStudent(null);
  };

  // Handle Change in Modal Values
  const handelChange = (e) => {
    const { name, value } = e.target;
    setCurrentStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          boxShadow: "var(--shadow)",
          border: "1px solid var(--surface-border)",
          backgroundColor: "var(--surface)",
          color: "var(--text)",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 520 }} aria-label="student table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "var(--surface-soft)" }}>
              <TableCell sx={{ fontWeight: 600, color: "var(--muted)" }}>
                Student Roll #
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "var(--muted)" }}
              >
                Student Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "var(--muted)" }}
              >
                Student Age
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: 600, color: "var(--muted)" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <p className="text-sm" style={{ color: "var(--muted)" }}>
                    No students yet. Add the first record to get started.
                  </p>
                </TableCell>
              </TableRow>
            )}
            {students.map((student) => (
              <TableRow
                key={student.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "var(--row-hover)" },
                }}
              >
                <TableCell scope="row">
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "var(--badge-bg)",
                      color: "var(--badge-text)",
                    }}
                  >
                    {student.rollNo}
                  </span>
                </TableCell>
                <TableCell align="center" className="capitalize">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {student.name}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    {student.age}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <div className="flex items-center justify-center gap-1">
                    <Tooltip title="Edit student">
                      <IconButton
                        size="small"
                        onClick={() => handleUpdateStudent(student.id)}
                        sx={{
                          border: "1px solid var(--surface-border)",
                          color: "var(--text)",
                          "&:hover": { backgroundColor: "var(--row-hover)" },
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete student">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(student)}
                        sx={{
                          border: "1px solid rgba(248, 113, 113, 0.3)",
                          color: "#dc2626",
                          "&:hover": {
                            backgroundColor: "rgba(248, 113, 113, 0.15)",
                          },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateStudentModal
        editModalOpen={editModalOpen}
        currentStudent={currentStudent}
        handleModalClose={handleModalClose}
        handelChange={handelChange}
        handleSaveStudent={handleSaveStudent}
      />

      <Dialog
        open={deleteModalOpen}
        onClose={handleDeleteClose}
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
          Delete Student
        </DialogTitle>
        <DialogContent sx={{ pb: 0, position: "relative", zIndex: 999 }}>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Are you sure you want to delete{" "}
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              {studentToDelete?.name || "this student"}
            </span>
            ? This action cannot be undone.
          </p>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, pt: 2 }}>
          <Button
            onClick={handleDeleteClose}
            sx={{
              textTransform: "none",
              borderRadius: 999,
              color: "var(--muted)",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              textTransform: "none",
              borderRadius: 999,
              backgroundColor: "#dc2626",
              "&:hover": { backgroundColor: "#b91c1c" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
