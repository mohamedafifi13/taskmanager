import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

import * as yup from "yup";
// import { useAddNote } from "../apis/note-apis";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { useEffect } from "react";
const notify = () => toast.success("Note added!");
function DrawerComponent({
  isDrawerOpen,
  toggleDrawer,
  setTasks,
  currentTaskId,
  setCurrentTaskId,
  tasks,
  handleAddItem,
}) {
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"), // Make title required
    // description: yup.string().required("Description is required"),
    dueDate: yup.string().required("Due Date is required"), // Msake dueDate required
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    reset();
  }, [isDrawerOpen]);

  return (
    <div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => {
          toggleDrawer();
          reset(); // Clear the form fields when the dialog is closed
        }}
        sx={{ width: "80%" }} // Adjust the width as desired
      >
        <div style={{ padding: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Create a Task</h2>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          <form
            onSubmit={handleSubmit(handleAddItem)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem", // Increased spacing using rem units
              margin: "1rem 0", // Add margin for spacing between text fields
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              {...register("title")}
              error={!!errors.title} // Check if there's an error for the title field
              helperText={errors.title?.message} // Display the error message
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={10}
              {...register("description")}
              error={!!errors.description} // Check if there's an error for the description field
              helperText={errors.description?.message} // Display the error message
              sx={{ marginBottom: "1rem" }} // Increased spacing using rem units
            />
            <Typography variant="h6" color="primary">
              Due Date
            </Typography>
            <TextField
              type="date"
              variant="outlined"
              {...register("dueDate")}
              error={!!errors.dueDate} // Check if there's an error for the dueDate field
              helperText={errors.dueDate?.message} // Display the error message
            />
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </form>
        </div>
      </Drawer>
    </div>
  );
}

export default DrawerComponent;
