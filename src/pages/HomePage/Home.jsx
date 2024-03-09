import { Button, TextField, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import DrawerComponent from "../../components/AddingDrawer";
import TasksGrid from "../../components/TasksGrid";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskDialog from "../../components/TaskDialog";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteClosingForm from "../../components/DeleteDialog";

const Home = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isOpenEditingModal, setIsOpenEditingModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);
  const closeDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };
  const openDeleteDialog = (id) => {
    setIsOpenDeleteDialog(true);
    setDeletingTaskId(id);
  };
  const notify = () => toast.success("Task added!");

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);
  };
  const handleAddItem = useCallback(async (data) => {
    try {
      if (!data.title) {
        data = { ...data, title: "Untitled" };
      }

      data = { ...data, _id: currentTaskId + 1, pinned: false };
      setCurrentTaskId(currentTaskId + 1);

      setTasks((prevTasks) => {
        return [...prevTasks, data];
      });

      toggleDrawer();
      notify();
    } catch (error) {
      throw error;
    }
  });

  const editTask = (id, data) => {
    const newTasks = tasks.map((task) => {
      if (task._id === id) {
        task.title = data.title;
        task.description = data.description;
        task.pinned = data.pinned;
        task.dueDate = data.dueDate;
      }
      return task;
    });
    setTasks(newTasks);
  };

  const openEditModal = () => {
    setIsOpenEditingModal(true);
  };
  const closeEditModal = () => {
    setIsOpenEditingModal(false);
  };

  const handlePinned = (id) => {
    const newTasks = tasks.map((task) => {
      if (task._id === id) {
        task.pinned = !task.pinned;
      }
      return task;
    });
    setTasks(newTasks);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // useEffect(() => {
  //   if (filter === "Completed") {
  //     setFilteredTasks(tasks.filter((task) => task.pinned));
  //   } else if (filter === "Not Completed") {
  //     setFilteredTasks(tasks.filter((task) => !task.pinned));
  //   }
  // }, [filter, tasks]);

  useEffect(() => {
    let newTasks = [...tasks];
    if (sort === "from New to Old") {
      newTasks = [...tasks].sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
      );
    } else if (sort === "from Old to New") {
      newTasks = [...tasks].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );
    } else if (sort === "Recently Added") {
      newTasks = [...tasks];
    }
    if (filter === "Completed") {
      newTasks = newTasks.filter((task) => task.pinned);
    } else if (filter === "Not Completed") {
      newTasks = newTasks.filter((task) => !task.pinned);
    }
    setFilteredTasks(newTasks);
  }, [sort, tasks, handleAddItem, filter]);

  // This effect ensures that filtering is applied after tasks state is updateds

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleCheckboxChange = (value) => {
    if (filter === value) {
      // If the same checkbox is clicked again, deselect it
      setFilter("");
    } else {
      // Otherwise, select the clicked checkbox
      setFilter(value);
    }
  };
  return (
    <div>
      <ToastContainer />
      <Typography
        variant="h6"
        fontFamily="Roboto, Arial, sans-serif"
        fontWeight="bold"
        color="primary"
        sx={{ marginTop: "10px", marginLeft: "10px" }}
      >
        Hello {JSON.parse(localStorage.getItem("user")).email}! This is your
        Task Manager. Good Luck!
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button
          variant="contained"
          onClick={toggleDrawer}
          sx={{
            marginLeft: "10px",
            padding: "10px",
            marginTop: "8px",
            height: "30px",
            borderRadius: "10px",
          }}
        >
          <Typography fontSize={14}>Add Task</Typography>
          <AddIcon
            sx={{ marginLeft: "3px", marginBottom: "3px" }}
            fontSize="small"
          />
        </Button>
        <Typography
          variant="h7"
          fontFamily="Roboto, Arial, sans-serif"
          fontWeight="bold"
          color="primary"
          sx={{ marginTop: "10px", marginLeft: "10px" }}
        >
          Sort By:
        </Typography>
        <label>
          <Autocomplete
            sx={{
              display: "inline-block",
              "& input": {
                width: 150,
                height: "20px",
                bgcolor: "background.paper",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.background.paper),
                marginTop: "10px",
                marginLeft: "10px",
                marginRight: "10px",
              },
            }}
            value={sort}
            id="custom-input-demo"
            options={["from New to Old", "from Old to New", "Recently Added"]}
            onChange={(event, value) => {
              setSort(value || ""); // Set the filter with the selected value
            }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input type="text" {...params.inputProps} />
              </div>
            )}
          />
        </label>
        <Button
          variant="contained"
          onClick={() => setSort("")}
          color="error"
          sx={{
            marginTop: "12px",
            cursor: "pointer",
            borderRadius: "8px",
            minWidth: "45px", // Use minWidth instead of width to allow the button to shrink
            height: "20px",
            padding: "0px",
            fontSize: "10px", // Adjust font size to fit within the smaller button
          }}
        >
          Clear
        </Button>

        <Typography
          variant="h7"
          fontFamily="Roboto, Arial, sans-serif"
          fontWeight="bold"
          color="primary"
          sx={{ marginTop: "10px", marginLeft: "10px", marginRight: "10px" }}
        >
          Filter By:
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={filter === "Completed"}
              onChange={() => handleCheckboxChange("Completed")}
            />
          }
          label="Completed"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filter === "Not Completed"}
              onChange={() => handleCheckboxChange("Not Completed")}
            />
          }
          label="Not Completed"
        />
      </div>

      <DeleteClosingForm
        open={isOpenDeleteDialog}
        handleClose={closeDeleteDialog}
        deleteTask={deleteTask}
        taskId={deletingTaskId}
      ></DeleteClosingForm>

      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{ right: 5, position: "fixed", bottom: 5 }}
      >
        Logout
        <LogoutIcon />
      </Button>
      <DrawerComponent
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        setTasks={setTasks}
        setCurrentTaskId={setCurrentTaskId}
        currentTaskId={currentTaskId}
        editingTaskId={editingTaskId}
        handleAddItem={handleAddItem}
      />
      <TasksGrid
        tasks={filteredTasks}
        handleDelete={openDeleteDialog}
        handlePinned={handlePinned}
        openEditModal={openEditModal}
        setEditingTaskId={setEditingTaskId}
      />
      <TaskDialog
        isOpen={isOpenEditingModal}
        handleClose={closeEditModal}
        task={tasks.find((task) => task._id === editingTaskId)}
        id={editingTaskId}
        editTask={editTask}
      />
    </div>
  );
};
export default Home;
