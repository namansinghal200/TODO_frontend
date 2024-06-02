import {
  Card,
  Box,
  CardContent,
  CardActionArea,
  Typography,
  Button,
} from "@mui/material";
const Task = ({ task }) => {
  return (
    <>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {task.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Date: {task.date.split("T")[0]}
            </Typography>
            .<Typography sx={{ p: 0 }}>{task.type}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};
export default Task;
