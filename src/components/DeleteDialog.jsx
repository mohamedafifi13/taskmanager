import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";

import * as React from "react";

const DeleteClosingForm = ({ taskId, open, handleClose, deleteTask }) => {
  const notify = () => toast.success("Note deleted!");
  const handleDelete = () => {
    deleteTask(taskId);
    notify();
    handleClose();
  };

  const handleCloseDialog = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <DialogTitle id="alert-dialog-title">{"Delete Post"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you click the Delete button, your post will be deleted
              permanently. Are you sure you want to proceed with this action?
            </DialogContentText>
          </DialogContent>
        </>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteClosingForm;
