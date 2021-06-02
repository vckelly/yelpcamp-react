import { React, useEffect, useState, useRef } from 'react';
import { Redirect, useParams, useHistory } from "react-router-dom"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default function NewCampground() {

    const history = useHistory();
    const [redirect, setRedirect] = useState(false);
    const [files, setFiles] = useState([]);
    const fileInput = useRef(null);

    const validationSchema = yup.object({
        title: yup
          .string('Enter your title')
          .required('title is required'),
        location: yup
          .string('Enter your location')
          .min(3, 'Location should be of minimum 3 characters length')
          .required('location is required'),
        price: yup
          .number('Enter your price')
          .min(1, 'Price should be of minimum of $1')
          .required('price is required'),
        description: yup
          .string('Enter your description')
          .min(3, 'Description should be of minimum 3 characters length')
          .required('description is required'),
    });

    const formik = useFormik({
        initialValues: {
          title: '',
          location: '',
          price: 1,
          description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
                campground: {
                    title: values.title,
                    location: values.location,
                    price: values.price,
                    description: values.description
                }
            };
            const formData = new FormData();
            formData.append('campground', JSON.stringify(data.campground));
            if (files?.target?.files)  { 
                console.log(files.target.files[0]);
                formData.append('image', files.target.files[0]) 
            };
            

            fetch(`http://localhost:5000/campgrounds/`, {
                credentials: 'include',
                method: 'POST',
                body: formData

            }).then((res) => {
                if (res.ok) {
                    const id = res.url.split('/');
                    history.push({
                        pathname: id[id.length-1],
                        state: { 
                            from: 'new'
                        }
                    })
                }
                else {
                    formik.resetForm();
                    toast.error('Sorry, something is wrong with your campground. Try again.', {
                        position: "top-right",
                        autoClose: 2500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
        },
    });

    
    return (
    <div>
        <form onSubmit={formik.handleSubmit}>
        <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
            fullWidth
            id="location"
            name="location"
            label="Location"
            onChange={formik.handleChange}
            value={formik.values.location}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
        />
        <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
        />
        <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
        />

        <Button
          variant="contained"
          component="label"
        >
        Upload Image
        <input
          type="file"
          id="image"
          ref={fileInput}
          onChange={setFiles}
          hidden
        />
        </Button>
        <Button color="primary" variant="contained" fullWidth type="submit">
            Add Campground
        </Button>
        </form>
    </div>
    );
};

