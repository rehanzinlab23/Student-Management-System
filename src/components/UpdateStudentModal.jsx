import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

export default function UpdateStudentModal({
  editModalOpen,
  currentStudent,
  handleModalClose,
  handelChange,
  handleSaveStudent,
}) {
  return (
    <Dialog
      open={editModalOpen}
      onClose={handleModalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          borderRadius: 4,
          paddingY: 1,
          paddingX: 0.5,
          backgroundColor: "var(--surface)",
          color: "var(--text)",
          boxShadow: "0 30px 70px rgba(15, 23, 42, 0.25)",
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600 }}>Update Student</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Student Name"
          type="text"
          fullWidth
          value={currentStudent?.name || ""}
          onChange={handelChange}
          sx={{
            mt: 1,
            "& .MuiInputBase-root": {
              backgroundColor: "var(--input-bg)",
              color: "var(--text)",
            },
            "& .MuiInputBase-input": {
              color: "var(--text)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-border)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-border)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-focus)",
              boxShadow: "0 0 0 4px var(--ring)",
            },
            "& .MuiInputLabel-root": {
              color: "var(--muted)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--muted)",
            },
          }}
        />
        <TextField
          margin="dense"
          name="age"
          label="Student Age"
          type="number"
          fullWidth
          value={currentStudent?.age || ""}
          onChange={handelChange}
          sx={{
            mt: 2,
            "& .MuiInputBase-root": {
              backgroundColor: "var(--input-bg)",
              color: "var(--text)",
            },
            "& .MuiInputBase-input": {
              color: "var(--text)",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-border)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-border)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "var(--input-focus)",
              boxShadow: "0 0 0 4px var(--ring)",
            },
            "& .MuiInputLabel-root": {
              color: "var(--muted)",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "var(--muted)",
            },
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={handleModalClose}
          sx={{
            textTransform: "none",
            borderRadius: 999,
            color: "var(--muted)",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveStudent}
          variant="contained"
          sx={{
            textTransform: "none",
            borderRadius: 999,
            backgroundColor: "var(--primary)",
            color: "var(--on-primary)",
            "&:hover": { opacity: 0.9 },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
