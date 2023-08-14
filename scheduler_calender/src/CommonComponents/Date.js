import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Chip, IconButton, Typography } from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Event } from "./Event";
import { AddEvent } from "./AddEvent";
import { getAllTask } from "../services/http.service";
import { toast } from "react-toastify";
export const Date = ({ day }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    height: 150,
    borderRadius: 0,
    color: theme.palette.text.secondary,
    ":hover": {
      transform: "scale(1.04)",
      cursor: "pointer",
    },
  }));
  const [OpenAddNewEvent, setOpenAddNewEvent] = React.useState(false);
  const [RefreshLoading, setRefreshLoading] = React.useState(false);
  const [AllTask, setAllTask] = React.useState([]);
  const handleAddNewEvent = () => {
    setOpenAddNewEvent(!OpenAddNewEvent);
  };
  const HandleRefresh = () => {
    setRefreshLoading(!RefreshLoading);
  };
  const Loadtasks = () => {
    getAllTask()
      .then((data) => {
        const filteredDat = data.data.filter((item) => {
          return item.date === day.date;
        });

        setAllTask(filteredDat);
      })
      .catch((error) => {
        toast.warn(error.message, {
          theme: "colored",
        });
      });
  };
  React.useEffect(() => {
    Loadtasks();
  }, [RefreshLoading]);
  return (
    <>
      <Item>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box display="flex" flexDirection="row">
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", color: "teal" }}
            >
              {" "}
              Day
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", marginLeft: 8, color: "teal" }}
            >
              {day.date}
            </Typography>
          </Box>
          <IconButton
            style={{ width: 15 }}
            aria-label="delete"
            size="small"
            onClick={handleAddNewEvent}
          >
            <ControlPointIcon
              fontSize="inherit"
              style={{ color: "green", width: 20, height: 20 }}
            />
          </IconButton>
        </Box>
        {AllTask.length >= 1 && (
          <div style={{ fontWeight: "bold", color: "green" }}>Events</div>
        )}
        <Box
          sx={{
            height: 100,
            overflow: "hidden",
            overflowY: "auto",
          }}
        >
          {AllTask.length >= 1 ? (
            <>
              {AllTask.map((item, index) => {
                return (
                  <Event
                    HandleRefresh={HandleRefresh}
                    item={item}
                    key={index}
                  />
                );
              })}
            </>
          ) : (
            <div style={{ fontWeight: "bold" }}>No Events</div>
          )}
        </Box>
      </Item>
      {OpenAddNewEvent && (
        <AddEvent
          HandleRefresh={HandleRefresh}
          data={day}
          handleAddNewEvent={handleAddNewEvent}
          OpenAddNewEvent={OpenAddNewEvent}
        />
      )}
    </>
  );
};
