import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconPin, IconTrash } from "@tabler/icons";
import PushPinIcon from "@mui/icons-material/PushPin";

function TaskCard({
  title,
  description,
  handleClickOpen,
  pinned,
  handlePinned,
  handleDelete,
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
            <Button
              onClick={(event) => {
                event.stopPropagation();
                handlePinned();
              }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              {pinned ? (
                <PushPinIcon />
              ) : (
                <IconPin color={theme.palette.primary.main} />
              )}
            </Button>
          </Stack>
        }
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item>
            <Typography variant="subtitle2" color="inherit">
              {description.split(" ").length > 10
                ? description.split(" ").splice(0, 10).join(" ") + "..."
                : description}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Grid item>
          <Button
            size="small"
            onClick={(event) => {
              event.stopPropagation();
              handleDelete();
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
