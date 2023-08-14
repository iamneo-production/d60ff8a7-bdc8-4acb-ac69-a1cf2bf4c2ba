import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Form, Formik, useFormik } from "formik";
import { toast } from "react-toastify";

import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { CheckLogin } from "./../services/http.service";
import { Card } from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    CheckLogin(e.email)
      .then((resp) => {
        if (e.email !== resp.data.id) {
          toast.warn("Invalid Credentials", {
            theme: "colored",
          });
        } else {
          if (resp.data.password === e.password) {
            sessionStorage.setItem("email", e.email);
            toast.success("Successfully Logged In", {
              theme: "colored",
            });
            navigate("/home");
          } else {
            toast.warn("Invalid Credentials", {
              theme: "colored",
            });
          }
        }
      })
      .catch((err) => {
        toast.warn(err.message, {
          theme: "colored",
        });
      });
  };
  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters")
      .max(12, "Maximum 12 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogin(values);
    },
    validationSchema: SigninSchema,
  });
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card
        sx={{
          padding: 3,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CalendarMonthIcon style={{ width: 40, height: 40 }} />

        <Typography component="h1" variant="h5">
          Welcome to the Calender
        </Typography>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Formik>
            <Form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email ? (
                <div style={{ color: "red", fontWeight: "bold" }}>
                  {formik.errors.email}
                </div>
              ) : (
                <></>
              )}
              <TextField
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {formik.errors.password && formik.touched.password ? (
                <div style={{ color: "red", fontWeight: "bold" }}>
                  {formik.errors.password}
                </div>
              ) : (
                <></>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Form>
          </Formik>
        </Box>
      </Card>
    </Container>
  );
};
