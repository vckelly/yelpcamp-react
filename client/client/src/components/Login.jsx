import { React, useEffect, useState, useContext } from 'react'
import { Redirect, useHistory, useLocation } from "react-router-dom"; 
import { UserContext } from '../UserContext.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function Login() {

    const history = useHistory();
    const location = useLocation();
    let [userCon, setUser] = useContext(UserContext);

    const validationSchema = yup.object({
        username: yup
          .string('Enter your username')
          .required('username is required'),
        password: yup
          .string('Enter your password')
          .min(3, 'Password should be of minimum 3 characters length')
          .required('Password is required'),
      });

    const formik = useFormik({
        initialValues: {
          username: 'con',
          password: 'con',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                username: values.username,
                password: values.password
            };

            fetch('http://localhost:5000/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then((res) => {
                console.log(res);

                
                if (res.ok) {          
                    history.push({
                        pathname: `/campgrounds/`,
                        state: {
                          from: "login",
                        },
                    });            
                }
                else {
                    formik.resetForm();
                    toast.error('Username or password was incorrect. Try again.', {
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
            })
        },
    });

    
    return (
    <div>
        <ToastContainer />
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
    );
};

