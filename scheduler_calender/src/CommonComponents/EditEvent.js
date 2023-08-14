import { Box, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
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

import { CreateNewEvent, updateTask } from "../services/http.service";

export const EditEvent = ({
  item,
  handleEditEvent,
  HandleRefresh,
  OpenEventEditView,
}) => {
  const EditSchema = Yup.object().shape({
    starttime: Yup.string().required("Start Time is required"),
    endtime: Yup.string().required("End Time is required"),
    eventname: Yup.string().required("Event Name is required"),
    moreinformation: Yup.string().required("More Information is required"),
  });
  // useEffect(() => {
  //   formik.setFieldValue("starttime", item.starttime);
  //   formik.setFieldValue("endtime", item.endtime);
  //   formik.setFieldValue("eventname", item.eventname);
  //   formik.setFieldValue("moreinformation", item.moreinformation);
  // }, []);
  const EditHandle = (values) => {
    const id = item.id;
    const JsonData = {
      date: item.date,
      starttime: values.starttime,
      endtime: values.endtime,
      eventname: values.eventname,
      moreinformation: values.moreinformation,
    };
    updateTask(id, JsonData)
      .then(() => {
        toast.success("Successfully Updated", {
          theme: "colored",
        });
        HandleRefresh();
        handleEditEvent();
      })
      .catch((error) => {
        toast.warn(error.message, {
          theme: "colored",
        });
        handleEditEvent();
      });
  };
  const formik = useFormik({
    initialValues: {
      starttime: item.starttime,
      endtime: item.endtime,
      eventname: item.eventname,
      moreinformation: item.moreinformation,
    },
    onSubmit: (values) => {
      EditHandle(values);
      handleEditEvent();
    },
    validationSchema: EditSchema,
  });
  return (
    <div>
      <Dialog
        fullWidth
        open={OpenEventEditView}
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
                    defaultValue={item.starttime}
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
                    defaultValue={item.endtime}
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
                    defaultValue={item.eventname}
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
                    defaultValue={item.moreinformation}
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
                    <Button onClick={handleEditEvent}>Close</Button>
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
