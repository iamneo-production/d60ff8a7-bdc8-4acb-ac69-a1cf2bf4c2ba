import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { Form, Formik, useFormik } from "formik";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { CreateNewEvent } from "../services/http.service";

export const AddEvent = ({
  HandleRefresh,
  data,
  handleAddNewEvent,
  OpenAddNewEvent,
}) => {
  const AddSchema = Yup.object().shape({
    starttime: Yup.string().required("Start Time is required"),
    endtime: Yup.string().required("End Time is required"),
    eventname: Yup.string().required("Event Name is required"),
    moreinformation: Yup.string().required("More Information is required"),
  });

  const SaveEvent = (values) => {
    const id = uuidv4();
    const JsonData = {
      id: id,
      date: data.date,
      starttime: values.starttime,
      endtime: values.endtime,
      eventname: values.eventname,
      moreinformation: values.moreinformation,
    };
    CreateNewEvent(JsonData)
      .then(() => {
        toast.success("Successfully Added ", {
          theme: "colored",
        });
        HandleRefresh();
      })
      .catch((error) => {
        toast.warn(error.message, {
          theme: "colored",
        });
      });
  };
  const formik = useFormik({
    initialValues: {
      starttime: "",
      endtime: "",
      eventname: "",
      moreinformation: "",
    },
    onSubmit: (values) => {
      SaveEvent(values);
      handleAddNewEvent();
    },
    validationSchema: AddSchema,
  });
  return (
    <div>
      <Dialog
        fullWidth
        open={OpenAddNewEvent}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add New Events</DialogTitle>
        <DialogContent>
          <Box>
            <Box>
              <Formik>
                <Form onSubmit={formik.handleSubmit}>
                  <TextField
                    type="time"
                    margin="normal"
                    fullWidth
                    id="starttime"
                    // label="Please Enter Start Time"
                    name="starttime"
                    autoFocus
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.starttime && formik.touched.starttime ? (
                    <div style={{ color: "red", fontWeight: "bold" }}>
                      {formik.errors.starttime}
                    </div>
                  ) : (
                    <></>
                  )}
                  <TextField
                    type="time"
                    margin="normal"
                    fullWidth
                    id="endtime"
                    placeholder="Please Enter Start Time"
                    name="endtime"
                    autoFocus
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.endtime && formik.touched.endtime ? (
                    <div style={{ color: "red", fontWeight: "bold" }}>
                      {formik.errors.endtime}
                    </div>
                  ) : (
                    <></>
                  )}
                  <TextField
                    margin="normal"
                    fullWidth
                    id="eventname"
                    placeholder="Please Enter Event Name"
                    name="eventname"
                    autoFocus
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.eventname && formik.touched.eventname ? (
                    <div style={{ color: "red", fontWeight: "bold" }}>
                      {formik.errors.eventname}
                    </div>
                  ) : (
                    <></>
                  )}
                  <TextField
                    multiline
                    rows={3}
                    margin="normal"
                    fullWidth
                    id="moreinformation"
                    placeholder="Please Enter Event Name"
                    name="moreinformation"
                    autoFocus
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.moreinformation &&
                  formik.touched.moreinformation ? (
                    <div style={{ color: "red", fontWeight: "bold" }}>
                      {formik.errors.moreinformation}
                    </div>
                  ) : (
                    <></>
                  )}
                  <DialogActions>
                    <Button onClick={handleAddNewEvent}>Close</Button>
                    <Button type="submit">Save</Button>
                  </DialogActions>
                </Form>
              </Formik>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
