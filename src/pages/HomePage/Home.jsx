import { Button, TextField, Typography } from "@mui/material";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import DrawerComponent from "../../components/AddingDrawer";
import TasksGrid from "./TasksGrid";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import TaskDialog from "./TaskDialog";
import Autocomplete from "@mui/material/Autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    setTasks(newTasks);
  };
  const handleAddItem = async (data) => {
    try {
      if (!data.title) {
        data = { ...data, title: "Untitled" };
      }

      data = { ...data, _id: currentTaskId + 1, pinned: false };
      setCurrentTaskId(currentTaskId + 1);

      setTasks((prevNotes) => {
        return [...prevNotes, data];
      });

      toggleDrawer();
    } catch (error) {
      throw error;
    }
  };

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

  useEffect(() => {
    if (filter === "Pinned") {
      setFilteredTasks(tasks.filter((task) => task.pinned));
    } else if (filter === "Not Pinned") {
      setFilteredTasks(tasks.filter((task) => !task.pinned));
    } else {
      setFilteredTasks(tasks);
    }
  }, [filter, tasks]);

  useEffect(() => {
    if (sort === "from New to Old") {
      setFilteredTasks(
        [...tasks].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
      );
    } else if (sort === "from Old to New") {
      setFilteredTasks(
        [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      );
    } else {
      // No sorting applied
    }
  }, [sort, tasks, handleAddItem]);

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
      <Typography
        variant="h4"
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
            marginLeft: "20px",
            padding: "10px",
            marginTop: "10px",
            height: "25px",
          }}
        >
          <Typography fontSize={12}>Add Task</Typography>
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
                width: 200,
                height: "30px",
                bgcolor: "background.paper",
                color: (theme) =>
                  theme.palette.getContrastText(theme.palette.background.paper),
                marginTop: "10px",
                marginLeft: "10px",
                marginRight: "10px",
              },
            }}
            id="custom-input-demo"
            options={["from New to Old", "from Old to New", "None"]}
            onChange={(event, value) => {
              if (value === "None") {
                setSort("");
              }
              setSort(value || ""); // Set the filter with the selected value
            }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <input type="text" {...params.inputProps} />
              </div>
            )}
          />
        </label>
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
              checked={filter === "Pinned"}
              onChange={() => handleCheckboxChange("Pinned")}
            />
          }
          label="Pinned"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filter === "Not Pinned"}
              onChange={() => handleCheckboxChange("Not Pinned")}
            />
          }
          label="Not Pinned"
        />
      </div>

      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{ right: 5, position: "fixed", marginTop: "10px", top: 0 }}
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
        handleDelete={deleteTask}
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
