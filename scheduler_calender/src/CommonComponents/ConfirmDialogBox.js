import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DeleteEvent } from "../services/http.service";
import { toast } from "react-toastify";

export const ConfirmDialogBox = ({
  item,
  handleAddNewEvent,
  HandleRefresh,
  OpenConfirmationView,
}) => {
  const handleSubmit = () => {
    DeleteEvent(item.id)
      .then(() => {
        toast.success("Successfully Deleted Event", {
          theme: "colored",
        });
        HandleRefresh();
        handleAddNewEvent();
      })
      .catch((error) => {
        toast.warn(error.message, {
          theme: "colored",
        });
      });
  };

  return (
    <div>
      <Dialog
        fullWidth
        open={OpenConfirmationView}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Event Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to Delete this Event ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddNewEvent}>Disagree</Button>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
