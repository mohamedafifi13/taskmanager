import { Card, Grid, Pagination } from "@mui/material";
import React, { useState } from "react";
import TaskCard from "./TasksCard";

function TasksGrid({ tasks }) {
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  const handleClickOpenEdit = (id) => () => {
    // Handle edit functionality
  };

  const handleClickOpenDelete = (id) => () => {
    // Handle delete functionality
  };
  const handlePinned = (id) => () => {
    // Handle delete functionality
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Grid container spacing={2}>
        {currentTasks.map((task) => (
          <Grid item xs={12} sm={4} md={4} key={task._id}>
            <TaskCard
              title={task.title}
              description={task.content}
              pinned={task.pinned}
              handleClickOpen={handleClickOpenEdit(task._id)}
              handlePinned={handlePinned(task._id)}
              handleDelete={handleClickOpenDelete(task._id)}
            />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(tasks.length / tasksPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
        shape="rounded"
      />
    </>
  );
}
export default TasksGrid;
