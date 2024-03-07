import { Card, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import TaskCard from "./TasksCard";

function TasksGrid({
  tasks,
  handleDelete,
  handlePinned,
  openEditModal,
  setEditingTaskId,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const [currentTasks, setCurrentTasks] = useState(
    tasks.slice(indexOfFirstTask, indexOfLastTask)
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    setCurrentTasks(tasks.slice(indexOfFirstTask, indexOfLastTask));
  }, [tasks]);

  return (
    currentTasks && (
      <div style={{ padding: "10px", marginTop: "10px" }}>
        <Grid container spacing={2}>
          {currentTasks.map((task) => (
            <Grid item xs={12} sm={4} md={4} key={task._id}>
              <TaskCard
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                pinned={task.pinned}
                handlePinned={handlePinned}
                handleDelete={handleDelete}
                id={task._id}
                openEditModal={openEditModal}
                setEditingTaskId={setEditingTaskId}
              />
            </Grid>
          ))}
        </Grid>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            alignSelf: "center",
            bottom: "0",
            position: "fixed",
            left: "50%",
          }}
        >
          {" "}
          <Pagination
            count={Math.ceil(tasks.length / tasksPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
            shape="rounded"
          />
        </div>
      </div>
    )
  );
}
export default TasksGrid;
