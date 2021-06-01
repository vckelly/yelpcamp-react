import { React, useEffect, useState } from 'react'
import { Redirect, useHistory, useLocation } from "react-router-dom"; 
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Register() {

    const history = useHistory();
    const location = useLocation();

    const validationSchema = yup.object({
        email: yup
          .string("Enter your email address")
          .email("Must be a valid email address")
          .required("An email address is required"),
        username: yup
          .string("Enter a username")
          .min(3, "Username should be at least 3 characters long")
          .max(15, "Username should not be more than 15 characters long")
          .required("Username is required"),
        password: yup
          .string("Enter your password")
          .min(3, "Password should be of minimum 3 characters length")
          .required("Password is required"),
      });
    
      const formik = useFormik({
        initialValues: {
          email: "",
          username: "",
          password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          const data = {
            username: values.username,
            password: values.password,
            email: values.email
          };
    
          fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            //console.log("response", res);
            if (res.status === 200) {
                history.push({
                    pathname: `/campgrounds/`,
                    state: {
                      from: "register",
                    },
                });
            }
            else {
                res.json()
                .then((resJSON) => {
                    console.log(resJSON);
                    formik.resetForm();
                    toast.error(resJSON['error'], {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
            }
          });
        },
      });
    
      return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
              <div className="card shadow">
                <img
                  src="https://images.unsplash.com/photo-1571863533956-01c88e79957e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
                  alt=""
                  className="card-img-top"
                />
              </div>
              <ToastContainer />
              <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  fullWidth
                  id="username"
                  name="username"
                  label="Username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
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

 
