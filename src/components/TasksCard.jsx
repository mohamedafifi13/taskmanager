import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconPin, IconTrash, IconEdit } from "@tabler/icons-react";
import PushPinIcon from "@mui/icons-material/PushPin";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

function TaskCard({
  title,
  description,
  dueDate,
  handleClickOpen,
  pinned,
  handlePinned,
  handleDelete,
  id,
  setEditingTaskId,
  openEditModal,
}) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        width: "100%",
        height: "200px",
        boxShadow: "0px 10px 10px 0px rgb(30,65,100)",
      }}
      onClick={handleClickOpen}
      style={{ cursor: "pointer" }}
    >
      <CardHeader
        sx={{
          borderBottom: `1px solid ${theme.palette.primary.main}`,
          maxHeight: "70px",
        }}
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
              {title}
            </Typography>
            {pinned ? (
              <Typography
                variant="body1"
                style={{ marginTop: 8, color: "green", fontWeight: 500 }}
              >
                Done ! Great Work
              </Typography>
            ) : (
              <Typography
                variant="body1"
                style={{ marginTop: 8, color: "#333", fontWeight: 500 }}
              >
                Due Date: {dueDate}
              </Typography>
            )}
          </Stack>
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="subtitle2" color="inherit">
              {description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Grid item>
          <Button
            onClick={(event) => {
              event.stopPropagation();
              handlePinned(id);
            }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            {pinned ? (
              <CheckBoxIcon style={{ color: "green" }} />
            ) : (
              <CheckBoxOutlineBlankIcon color={theme.palette.primary.main} />
            )}
          </Button>
          <Button
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              setEditingTaskId(id);
              openEditModal();
            }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <IconEdit color={theme.palette.primary.main} />
          </Button>
          <Button
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(id);
            }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <IconTrash color={theme.palette.error.main} />
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default TaskCard;
