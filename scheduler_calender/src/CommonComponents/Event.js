import { Chip, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { ConfirmDialogBox } from "./ConfirmDialogBox";
import { EditEvent } from "./EditEvent";
import useMediaQuery from "@mui/material/useMediaQuery";

export const Event = ({ HandleRefresh, item }) => {
  const title = item.eventname;
  const matches = useMediaQuery("(min-width:500px)");

  const reduceTitle = title.substring(0, matches ? 17 : 8) + "..";

  const [OpenConfirmationView, setOpenConfirmationView] = useState(false);
  const handleAddNewEvent = () => {
    setOpenConfirmationView(!OpenConfirmationView);
  };

  const [OpenEventEditView, setOpenEventEditView] = useState(false);
  const handleEditEvent = () => {
    setOpenEventEditView(!OpenEventEditView);
  };
  return (
    <div style={{ marginBottom: 1 }}>
      {/* <Chip deleteIc label="Clickable asdasdasdasd" style={{ marginBottom: 2 }} /> */}
      <Tooltip title={title} placement="top">
        <Chip
          size="small"
          label={reduceTitle}
          clickable
          onClick={handleEditEvent}
        />
      </Tooltip>

      <IconButton
        style={{ width: 16, height: 16, padding: 8, background: "teal" }}
        onClick={handleAddNewEvent}
      >
        <CloseIcon style={{ width: 13, height: 13, color: "#fff" }} />
      </IconButton>
      {OpenConfirmationView && (
        <ConfirmDialogBox
          item={item}
          handleAddNewEvent={handleAddNewEvent}
          HandleRefresh={HandleRefresh}
          OpenConfirmationView={OpenConfirmationView}
        />
      )}
      {OpenEventEditView && (
        <EditEvent
          item={item}
          handleEditEvent={handleEditEvent}
          HandleRefresh={HandleRefresh}
          OpenEventEditView={OpenEventEditView}
        />
      )}
    </div>
  );
};
