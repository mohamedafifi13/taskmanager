import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    width: "40%", // Adjust this value to your desired width
    maxWidth: "none", // Allow the dialog to exceed maxWidth
  },
}));

export default function TaskDialog({
  id,
  editTask,
  task,
  handleClose,
  isOpen,
}) {
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);
  const [dueDate, setDueDate] = useState(task?.dueDate);

  const applyChanges = () => {
    const data = {
      title,
      description,
      dueDate,
    };
    editTask(id, data);
    handleClose();
  };
  useEffect(() => {
    setTitle(task?.title);
    setDescription(task?.description);
    setDueDate(task?.dueDate);
  }, [task]);

  return (
    <>
      {task && (
        <React.Fragment>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Edit Task
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography variant="h6" color="primary">
                Title
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                defaultValue={task?.title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
              <Typography variant="h6" color="primary">
                Description
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                defaultValue={task?.description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
              <Typography variant="h6" color="primary">
                Due Date
              </Typography>
              <TextField
                id="outlined-basic"
                variant="outlined"
                defaultValue={task?.dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                type="date"
                sx={{ marginBottom: "1rem", width: "100%" }}
              />
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={applyChanges}>
                Save changes
              </Button>
              <Button autoFocus onClick={handleClose} color={"error"}>
                Cancel
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </React.Fragment>
      )}
    </>
  );
}
