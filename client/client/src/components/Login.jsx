import { React, useEffect, useState, useContext } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../UserContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  let [userCon, setUser] = useContext(UserContext);

  const validationSchema = yup.object({
    username: yup
      .string("Enter your username")
      .required("username is required"),
    password: yup
      .string("Enter your password")
      .min(3, "Password should be of minimum 3 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "con",
      password: "con",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        username: values.username,
        password: values.password,
      };

      fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.ok) {
          setUser({ user: values.username });
          history.push({
            pathname: `/campgrounds/`,
            state: {
              from: "login",
            },
          });
        } else {
          formik.resetForm();
          toast.error("Username or password was incorrect. Try again.", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        //TODO: Error handling
      });
    },
  });

  useEffect(() => {
    if (location.state) {
      const toastObj = {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        };
      if (location.state.from === 'edit') {
        toast.error('Please login to edit campgrounds!', toastObj);
      }
      if (location.state.from === 'new') {
        toast.error('Please login to create campgrounds!', toastObj);
      }
      location.state.user = '';
    }
  }, []);
  
  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="row">
        <h2>Login</h2>
        <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
          <div className="card shadow">
            <img
              src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
              alt=""
              className="card-img-top"
            />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="username"
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              style={{ padding: "1vh" }}
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              style={{ padding: "1vh" }}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
